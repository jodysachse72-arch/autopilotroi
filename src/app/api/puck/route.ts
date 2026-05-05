/**
 * Puck Data API — Save, load, list and delete page content via Supabase
 *
 * GET  /api/puck?path=/           → load page data for path
 * GET  /api/puck?list=true        → list all saved pages
 * POST /api/puck { path, data }   → save (upsert) page data for path
 * DELETE /api/puck?path=/about    → delete a saved page
 *
 * Reads from `puck_pages` table using the anon key (public read via RLS).
 * Writes using the service_role key (bypasses RLS for admin operations).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
  const listAll = request.nextUrl.searchParams.get('list')
  const pagePath = request.nextUrl.searchParams.get('path') || '/'

  try {
    const supabase = getReadClient()

    // ── List all pages ──
    if (listAll === 'true') {
      const { data, error } = await supabase
        .from('puck_pages')
        .select('path, updated_at')
        .order('path', { ascending: true })

      if (error) {
        console.error('[Puck API] List error:', error)
        return NextResponse.json([], { status: 200 })
      }

      // Always include known static routes so the page switcher has them
      const STATIC_PAGES = [
        '/', '/products', '/calculator', '/faqs', '/contact',
        '/signup', '/start', '/privacy', '/terms', '/disclaimer',
      ]

      const savedPaths = new Set((data || []).map((d: { path: string }) => d.path))
      const pages = STATIC_PAGES.map((p) => ({
        path: p,
        saved: savedPaths.has(p),
        updated_at: data?.find((d: { path: string; updated_at?: string }) => d.path === p)?.updated_at || null,
      }))

      // Add any saved pages that aren't in the static list (user-created pages)
      for (const d of data || []) {
        if (!STATIC_PAGES.includes(d.path)) {
          pages.push({ path: d.path, saved: true, updated_at: d.updated_at || null })
        }
      }

      return NextResponse.json(pages)
    }

    // ── Load single page ──
    const { data, error } = await supabase
      .from('puck_pages')
      .select('data')
      .eq('path', pagePath)
      .single()

    if (error || !data) {
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
    const body = await request.json()
    const { path: pagePath, data } = body

    if (!pagePath || !data) {
      return NextResponse.json({ error: 'Missing path or data' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { error } = await supabase
      .from('puck_pages')
      .upsert(
        { path: pagePath, data, updated_at: new Date().toISOString() },
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

export async function DELETE(request: NextRequest) {
  try {
    const pagePath = request.nextUrl.searchParams.get('path')
    if (!pagePath) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { error } = await supabase
      .from('puck_pages')
      .delete()
      .eq('path', pagePath)

    if (error) {
      console.error('[Puck API DELETE] Error:', error)
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('[Puck API DELETE] Error:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
