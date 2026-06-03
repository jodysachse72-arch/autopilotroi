import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/require-admin'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'placeholder' || key === 'placeholder') return null
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

const DB_UNAVAILABLE = NextResponse.json(
  { error: 'Database not configured. Partners require Supabase.' },
  { status: 503 }
)

// GET — list all partners from profiles (role = 'partner')
export async function GET() {
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = getServiceClient()
    if (!supabase) return DB_UNAVAILABLE

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, partner_code, created_at')
      .eq('role', 'partner')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Map profiles → shape the admin page expects
    const partners = (data || []).map((p: Record<string, unknown>) => ({
      id: p.id,
      name: p.full_name || '',
      email: p.email,
      referral_code: p.partner_code || '',
      is_active: true,
      created_at: p.created_at,
    }))

    return NextResponse.json({ partners })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// TODO(B3): POST — create a new partner
// Creating a partner requires creating an auth user + setting role='partner'
// in profiles, which is a multi-step flow. For now, manage partners through
// Supabase Auth directly.
export async function POST(request: NextRequest) {
  void request
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    return NextResponse.json(
      { error: 'Creating partners via this endpoint is not yet supported. Manage partners through Supabase Auth and set their profile role to "partner".' },
      { status: 501 }
    )
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// TODO(B3): PATCH — update partner
// The activate/deactivate concept doesn't map to profiles.
// Partners are active by virtue of having role='partner'.
export async function PATCH(request: NextRequest) {
  void request
  try {
    const denied = await requireAdmin()
    if (denied) return denied

    return NextResponse.json(
      { error: 'Partner status management is not yet supported. Manage partner roles directly in Supabase.' },
      { status: 501 }
    )
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
