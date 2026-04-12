import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPartnerByReferralCode } from '@/lib/partners'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, readinessScore, readinessTier, quizAnswers } = body

    if (!leadId || readinessScore === undefined || !readinessTier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Update the lead record with assessment results
    const { error } = await supabase
      .from('leads')
      .update({
        readiness_score: readinessScore,
        readiness_tier: readinessTier,
        quiz_answers: quizAnswers,
        onboarding_status: 'assessed',
      })
      .eq('id', leadId)

    if (error) {
      console.error('[Leads/Assess] Update error:', error)
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      )
    }

    // ── Trigger partner + prospect notifications ──
    // Fetch the lead's full data to send notifications
    const { data: lead } = await supabase
      .from('leads')
      .select('name, email, referred_by')
      .eq('id', leadId)
      .single()

    if (lead) {
      // Fire notification asynchronously (don't block the response)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

      // Look up partner email from referral code
      let partnerEmail: string | null = null
      if (lead.referred_by) {
        try {
          const partner = await getPartnerByReferralCode(lead.referred_by)
          if (partner) partnerEmail = partner.email
        } catch (err) {
          console.error('[Leads/Assess] Partner lookup error:', err)
        }
      }

      const notifyPayload = {
        prospectName: lead.name,
        prospectEmail: lead.email,
        readinessScore,
        readinessTier,
        partnerEmail,
      }

      try {
        // Call our own notify endpoint
        fetch(`${siteUrl}/api/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notifyPayload),
        }).catch((err) => {
          console.error('[Leads/Assess] Notification fire-and-forget error:', err)
        })
      } catch (notifyError) {
        // Don't fail the assessment if notifications fail
        console.error('[Leads/Assess] Notification error (non-blocking):', notifyError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Leads/Assess] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
