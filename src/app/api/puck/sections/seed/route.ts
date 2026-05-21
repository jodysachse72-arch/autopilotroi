/**
 * Section Seeding API — populates the section library with operational building blocks.
 *
 * POST /api/puck/sections/seed
 *
 * Inserts all curated section seeds into the puck_saved_sections table.
 * Skips sections that already exist (by name) to avoid duplicates.
 *
 * WRITE PROTECTION: Requires x-puck-write-secret header.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SECTION_SEEDS } from '@/lib/puck-section-seeds'

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

export async function POST(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || (!serviceKey && !anonKey)) {
      return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
    }

    const supabase = createClient(url, serviceKey || anonKey!, {
      auth: { persistSession: false },
    })

    // Get existing section names to avoid duplicates
    const { data: existing } = await supabase
      .from('puck_saved_sections')
      .select('name')

    const existingNames = new Set((existing || []).map((s: { name: string }) => s.name))

    // Filter to only new sections
    const newSeeds = SECTION_SEEDS.filter(s => !existingNames.has(s.name))

    if (newSeeds.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'All sections already exist.',
        inserted: 0,
        skipped: SECTION_SEEDS.length,
      })
    }

    // Insert new sections
    const { error } = await supabase
      .from('puck_saved_sections')
      .insert(newSeeds.map(s => ({
        name: s.name,
        category: s.category,
        data: s.data,
      })))

    if (error) {
      console.error('[Section Seed] Insert error:', error)
      return NextResponse.json({ error: 'Failed to seed sections' }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      message: `Seeded ${newSeeds.length} sections.`,
      inserted: newSeeds.length,
      skipped: SECTION_SEEDS.length - newSeeds.length,
    })
  } catch (err) {
    console.error('[Section Seed] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
