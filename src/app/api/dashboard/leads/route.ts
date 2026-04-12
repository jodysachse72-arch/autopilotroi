import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD LEADS API
   Returns leads for the partner dashboard.
   In production, filter by partner's referral_code.
   ═══════════════════════════════════════════════════════════════ */

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ leads: [], demo: true })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('leads')
      .select('id, name, email, tier, score, onboarding_status, drip_emails_sent, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    // Map onboarding_status to the dashboard status format
    const leads = (data || []).map((l) => ({
      ...l,
      status: l.onboarding_status || 'new',
    }))

    return NextResponse.json({ leads, demo: false })
  } catch (error) {
    console.error('[API/dashboard/leads] Error:', error)
    return NextResponse.json({ leads: [], demo: true })
  }
}
