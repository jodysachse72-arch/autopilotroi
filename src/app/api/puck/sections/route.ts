/**
 * Saved Sections API — CRUD for reusable campaign section library
 *
 * GET    /api/puck/sections              → list all saved sections
 * GET    /api/puck/sections?category=cta  → filter by category
 * POST   /api/puck/sections { name, category, data }  → save a new section
 * DELETE /api/puck/sections?id=<uuid>    → delete a saved section
 *
 * WRITE PROTECTION: POST and DELETE require x-puck-write-secret header.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function requireWriteSecret(request: NextRequest): NextResponse | null {
  const secret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: NEXT_PUBLIC_PUCK_WRITE_SECRET is not set.' },
      { status: 500 }
    )
  }
  const header = request.headers.get('x-puck-write-secret')
  if (!header || header !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized: missing or incorrect x-puck-write-secret header.' },
      { status: 401 }
    )
  }
  return null
}

function getReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

function getWriteClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || (!serviceKey && !anonKey)) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey || anonKey!, {
    auth: { persistSession: false },
  })
}

/** Section categories for the UI */
export const SECTION_CATEGORIES = [
  { key: 'hero',    label: '🎯 Heroes' },
  { key: 'cta',     label: '📢 CTAs & Offers' },
  { key: 'trust',   label: '🛡️ Trust & Proof' },
  { key: 'pricing', label: '💰 Pricing' },
  { key: 'faq',     label: '❓ FAQs' },
  { key: 'content', label: '📝 Content Sections' },
] as const

export async function GET(request: NextRequest) {
  try {
    const supabase = getReadClient()
    const category = request.nextUrl.searchParams.get('category')
    const sectionId = request.nextUrl.searchParams.get('id')
    const full = request.nextUrl.searchParams.get('full') === 'true'

    // PHASE A: Fetch single section with full data for insertion
    if (sectionId && full) {
      const { data, error } = await supabase
        .from('puck_saved_sections')
        .select('id, name, category, data, created_at')
        .eq('id', sectionId)
        .single()

      if (error || !data) {
        return NextResponse.json({ error: 'Section not found' }, { status: 404 })
      }

      return NextResponse.json({ section: data })
    }

    let query = supabase
      .from('puck_saved_sections')
      .select('id, name, category, created_at')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('[Sections API] List error:', error)
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json({
      sections: data || [],
      categories: SECTION_CATEGORIES,
    })
  } catch (err) {
    console.error('[Sections API GET] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { name, category, data } = body

    if (!name || !data) {
      return NextResponse.json({ error: 'Missing name or data' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { data: inserted, error } = await supabase
      .from('puck_saved_sections')
      .insert({
        name,
        category: category || 'content',
        data,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[Sections API] Save error:', error)
      return NextResponse.json({ error: 'Failed to save section' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: inserted?.id })
  } catch (err) {
    console.error('[Sections API POST] Error:', err)
    return NextResponse.json({ error: 'Failed to save section' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { error } = await supabase
      .from('puck_saved_sections')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[Sections API] Delete error:', error)
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Sections API DELETE] Error:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
