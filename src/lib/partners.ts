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
 * TODO(drip): parked — needs last_seen_at column. No-op until added.
 */
export async function updateLeadLastSeen(_leadId: string): Promise<void> {
  // no-op
}

/**
 * Get leads that haven't been seen in N hours (for re-engagement drip).
 * TODO(drip): parked — needs drip_emails_sent + last_seen_at columns.
 * Returns [] until those columns exist.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaleLeads(_hoursInactive: number = 48): Promise<Array<any>> {
  // TODO(drip): parked — needs drip_emails_sent + last_seen_at columns.
  return []
}

/**
 * Mark a drip email template as sent for a lead (prevents duplicates).
 * TODO(drip): parked — needs drip_emails_sent column. No-op until added.
 */
export async function markLeadDripSent(_leadId: string, _templateKey: string): Promise<void> {
  // no-op
}

