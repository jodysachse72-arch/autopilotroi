/* ═══════════════════════════════════════════════════════════════
   ADMIN PROSPECTS API — GET /api/admin/prospects

   Returns all leads from the real `leads` table, mapped to the
   Prospect shape used by admin/prospects/page.tsx.

   Auth: requireAdmin (A1 gate) — admin role only.
   Uses service-role key to bypass RLS.

   Column mapping (leads → Prospect):
     id               → id
     name             → name
     email            → email
     readiness_tier   → tier
     readiness_score  → score
     onboarding_status→ status  (new|assessed|invited|onboarding|active)
     referred_by      → referredBy  (partner code or null — read-only)
     created_at       → date  (ISO string)
   ═══════════════════════════════════════════════════════════════ */

import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/require-admin'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'placeholder' || key === 'placeholder') return null
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

export async function GET() {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = getServiceClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 },
      )
    }

    const { data, error } = await supabase
      .from('leads')
      .select('id, name, email, readiness_score, readiness_tier, onboarding_status, referred_by, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API/admin/prospects] Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const prospects = (data ?? []).map((l: {
      id: string
      name: string
      email: string
      readiness_score: number | null
      readiness_tier: string | null
      onboarding_status: string | null
      referred_by: string | null
      created_at: string
    }) => ({
      id:          l.id,
      name:        l.name,
      email:       l.email,
      tier:        l.readiness_tier   ?? 'beginner',
      score:       l.readiness_score  ?? 0,
      status:      l.onboarding_status ?? 'new',
      referredBy:  l.referred_by,          // read-only; not "assignedTo" — that feature doesn't exist
      date:        l.created_at,
    }))

    return NextResponse.json({ prospects })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
