import { NextRequest, NextResponse } from 'next/server'
import { notifyPartnerNewProspect, sendProspectWelcome } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      prospectName,
      prospectEmail,
      readinessScore,
      readinessTier,
      partnerEmail,
    } = body

    // Validate required fields
    if (!prospectEmail || !readinessScore || !readinessTier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('[Notifications] Resend not configured — skipping emails')
      return NextResponse.json({
        success: true,
        message: 'Notifications skipped (Resend not configured)',
      })
    }

    const results = []

    // Send welcome email to prospect
    const welcomeResult = await sendProspectWelcome({
      prospectEmail,
      prospectName: prospectName || 'there',
      readinessScore,
      readinessTier,
    })
    results.push({ type: 'prospect_welcome', ...welcomeResult })

    // Notify partner if we have their email
    if (partnerEmail) {
      const partnerResult = await notifyPartnerNewProspect({
        partnerEmail,
        prospectName: prospectName || 'New Prospect',
        prospectEmail,
        readinessScore,
        readinessTier,
      })
      results.push({ type: 'partner_notification', ...partnerResult })
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('[Notifications] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    )
  }
}
