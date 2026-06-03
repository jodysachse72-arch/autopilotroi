/* ═══════════════════════════════════════════════════════════════
   ADMIN CMS API — item-level (get / update / delete / publish)

   Uses the service-role key to bypass RLS.

   Auth: middleware gates /api/admin to admin role; requireAdmin
   provides defense-in-depth at the handler level.
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/require-admin'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'placeholder' || key === 'placeholder') return null
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

const DB_UNAVAILABLE = NextResponse.json(
  { error: 'Database not configured. CMS requires Supabase.' },
  { status: 503 },
)

type RouteParams = { params: Promise<{ id: string }> }

// ── GET — single post ────────────────────────────────────────
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const { id } = await params
    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const { data, error } = await supabase
      .from('cms_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 404 })
    return NextResponse.json({ post: data })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── PATCH — update post fields ───────────────────────────────
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const { id } = await params
    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const body = await request.json()
    // Only allow safe fields
    const allowed = ['type', 'title', 'slug', 'body_html', 'body', 'meta', 'status', 'sort_order']
    const updates: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) updates[key] = body[key]
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('cms_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ post: data })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── DELETE — delete post ─────────────────────────────────────
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const { id } = await params
    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const { error } = await supabase
      .from('cms_posts')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── POST — actions: publish / unpublish ──────────────────────
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const { id } = await params
    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const body = await request.json()
    const action = body.action

    if (action === 'publish') {
      const { data, error } = await supabase
        .from('cms_posts')
        .update({ status: 'published', publish_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ post: data })
    }

    if (action === 'unpublish') {
      const { data, error } = await supabase
        .from('cms_posts')
        .update({ status: 'draft' })
        .eq('id', id)
        .select()
        .single()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ post: data })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
