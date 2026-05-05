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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Read client — uses anon key (RLS allows public reads)
function getReadClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Write client — uses service_role key (bypasses RLS)
function getWriteClient() {
  const key = supabaseServiceKey || supabaseAnonKey
  return createClient(supabaseUrl, key, {
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
      return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(data.data)
  } catch {
    return NextResponse.json(null, { status: 500 })
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
        { path: pagePath, data },
        { onConflict: 'path' }
      )

    if (error) {
      console.error('Puck save error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('Puck save error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
