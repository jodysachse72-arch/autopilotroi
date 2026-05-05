/**
 * Puck Data API — Save and load page content via Supabase
 *
 * GET  /api/puck?path=/           → load page data for path
 * POST /api/puck { path, data }   → save page data for path
 *
 * Reads from `puck_pages` table using the anon key (public read via RLS).
 * Writes using the service_role key (bypasses RLS for admin operations).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Read client — uses anon key (RLS allows public reads)
function getReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

// Write client — uses service_role key (bypasses RLS)
function getWriteClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || (!serviceKey && !anonKey)) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey || anonKey!, {
    auth: { persistSession: false },
  })
}

export async function GET(request: NextRequest) {
  const pagePath = request.nextUrl.searchParams.get('path') || '/'

  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('puck_pages')
      .select('data')
      .eq('path', pagePath)
      .single()

    if (error || !data) {
      // No page data found — expected for pages that haven't been edited yet
      return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(data.data)
  } catch (err) {
    console.error('[Puck API GET] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anonKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    }

    // ── Auth check: require admin role ──
    const cookieStore = await cookies()
    const authClient = createServerClient(url, anonKey, {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() { /* read-only in route handlers */ },
      },
    })
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: profile } = await authClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden — admin role required' }, { status: 403 })
    }

    const body = await request.json()
    const { path: pagePath, data } = body

    if (!pagePath || !data) {
      return NextResponse.json({ error: 'Missing path or data' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { error } = await supabase
      .from('puck_pages')
      .upsert(
        { path: pagePath, data },
        { onConflict: 'path' }
      )

    if (error) {
      console.error('[Puck API POST] Save error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('[Puck API POST] Error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
