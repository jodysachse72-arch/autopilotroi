import { createClient } from '@supabase/supabase-js'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

export interface Partner {
  id: string
  name: string
  email: string
  partner_code: string
}

/**
 * Look up a partner by their Aurum referral code.
 * Queries profiles where partner_code matches and role = 'partner'.
 * Used when a lead completes assessment to notify the correct partner.
 */
export async function getPartnerByReferralCode(referralCode: string): Promise<Partner | null> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, partner_code')
    .eq('partner_code', referralCode)
    .eq('role', 'partner')
    .single()

  if (error || !data) {
    console.log(`[Partners] No partner found for code: ${referralCode}`)
    return null
  }

  return {
    id: data.id,
    name: data.full_name || '',
    email: data.email,
    partner_code: data.partner_code,
  }
}

/**
 * Update a lead's last_seen timestamp for re-engagement tracking.
 */
export async function updateLeadLastSeen(leadId: string): Promise<void> {
  const supabase = getServiceClient()

  await supabase
    .from('leads')
    .update({ last_seen_at: new Date().toISOString() })
    .eq('id', leadId)
}

/**
 * Get leads that haven't been seen in N hours (for re-engagement drip).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaleLeads(hoursInactive: number = 48): Promise<Array<any>> {
  const supabase = getServiceClient()
  const cutoff = new Date(Date.now() - hoursInactive * 60 * 60 * 1000).toISOString()

  const { data } = await supabase
    .from('leads')
    .select('id, name, email, score, tier, referred_by, drip_emails_sent, created_at, last_seen_at')
    .eq('onboarding_status', 'assessed')
    .lt('last_seen_at', cutoff)
    .limit(100)

  return data || []
}

/**
 * Mark a drip email template as sent for a lead (prevents duplicates).
 */
export async function markLeadDripSent(leadId: string, templateKey: string): Promise<void> {
  const supabase = getServiceClient()

  // Get current drip_emails_sent array
  const { data } = await supabase
    .from('leads')
    .select('drip_emails_sent')
    .eq('id', leadId)
    .single()

  const current = data?.drip_emails_sent || []
  const updated = [...current, templateKey]

  await supabase
    .from('leads')
    .update({ drip_emails_sent: updated })
    .eq('id', leadId)
}

