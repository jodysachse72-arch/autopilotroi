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

  // TODO(drip): parked — drip sequence requires drip_emails_sent + last_seen_at
  // columns on leads. getStaleLeads() returns [] until those columns are added.
  // Early-return so the cron neither errors nor sends emails while parked.
  return NextResponse.json({ ok: true, parked: true, sent: 0, skipped: 0 })

  // ── Dead code below — preserved for when drip is un-parked ──────────────
  // eslint-disable-next-line no-unreachable
  try {
    const staleLeads = await getStaleLeads(24)

    if (staleLeads.length === 0) {
      return NextResponse.json({ message: 'No leads need re-engagement', count: 0 })
    }

    let sent = 0
    let skipped = 0
    const errors: string[] = []

    for (const lead of staleLeads) {
      const hoursSinceSignup = Math.floor(
        (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60)
      )

      const templateKey = getDripTemplate(hoursSinceSignup)
      if (!templateKey) { skipped++; continue }

      const alreadySent = lead.drip_emails_sent?.includes(templateKey)
      if (alreadySent) { skipped++; continue }

      const result = await sendDripEmail(templateKey!, {
        name:       lead.name,
        email:      lead.email,
        score:      lead.readiness_score,   // real column name
        tier:       lead.readiness_tier,    // real column name
        referred_by: lead.referred_by,
      })

      if (result.success) {
        await markLeadDripSent(lead.id, templateKey!)
        sent++
        console.log(`[Cron] Sent ${templateKey!} to ${lead.email}`)
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
