/* ═══════════════════════════════════════════════════════════════
   ADMIN CMS API — collection-level (list + create)

   Uses the service-role key to bypass RLS. All writes to
   cms_posts go through this route — never from the browser.

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

// ── GET — list posts ─────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const { searchParams } = new URL(request.url)
    const type   = searchParams.get('type')
    const status = searchParams.get('status')

    let q = supabase
      .from('cms_posts')
      .select('id,type,slug,title,meta,status,sort_order,updated_at')
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false })

    if (type)                      q = q.eq('type', type)
    if (status && status !== 'all') q = q.eq('status', status)

    const { data, error } = await q
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ posts: data ?? [] })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── POST — create a new post ─────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const body = await request.json()
    const { type, title, slug, body_html, meta, status, sort_order } = body

    if (!type || !title) {
      return NextResponse.json(
        { error: 'type and title are required' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase
      .from('cms_posts')
      .insert({
        type,
        title,
        slug: slug || null,
        body_html: body_html || null,
        body: null,
        meta: meta || {},
        status: status || 'draft',
        sort_order: sort_order ?? 0,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A post with that slug already exists' },
          { status: 409 },
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post: data })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
