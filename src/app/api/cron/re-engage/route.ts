import { NextRequest, NextResponse } from 'next/server'
import { getStaleLeads, markLeadDripSent } from '@/lib/partners'
import { getDripTemplate, sendDripEmail } from '@/lib/drip-emails'

// Vercel Cron — runs daily at 9am UTC
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/re-engage", "schedule": "0 9 * * *" }] }

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron call
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find leads that completed assessment but haven't been contacted
    // We check at different intervals: 24h, 48h, 72h, 5d, 7d
    const staleLeads = await getStaleLeads(24)

    if (staleLeads.length === 0) {
      return NextResponse.json({ message: 'No leads need re-engagement', count: 0 })
    }

    let sent = 0
    let skipped = 0
    const errors: string[] = []

    for (const lead of staleLeads) {
      // Calculate hours since signup
      const hoursSinceSignup = Math.floor(
        (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60)
      )

      // Determine which email to send
      const templateKey = getDripTemplate(hoursSinceSignup)
      if (!templateKey) {
        skipped++
        continue
      }

      // Check if we already sent this template to this lead
      const alreadySent = lead.drip_emails_sent?.includes(templateKey)
      if (alreadySent) {
        skipped++
        continue
      }

      // Send the drip email
      const result = await sendDripEmail(templateKey, {
        name: lead.name,
        email: lead.email,
        score: lead.score,
        tier: lead.tier,
        referred_by: lead.referred_by,
      })

      if (result.success) {
        // Mark this template as sent for this lead
        await markLeadDripSent(lead.id, templateKey)
        sent++
        console.log(`[Cron] Sent ${templateKey} to ${lead.email}`)
      } else {
        errors.push(`${lead.email}: ${result.error}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${staleLeads.length} leads`,
      sent,
      skipped,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error('[Cron/Re-engage] Error:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
