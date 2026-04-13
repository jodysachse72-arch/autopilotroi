import { NextRequest, NextResponse } from 'next/server'

/* ═══════════════════════════════════════════════════════════════
   PARTNER WELCOME EMAIL — Sends when a new partner is added
   POST /api/partner/welcome
   Body: { name, email, refCode }
   ═══════════════════════════════════════════════════════════════ */

export async function POST(req: NextRequest) {
  try {
    const { name, email, refCode } = await req.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Check if Resend is configured
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!apiKey || apiKey === 'placeholder') {
      return NextResponse.json({
        success: true,
        demo: true,
        message: `[DEMO] Would send welcome email to ${email}`,
      })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'}/login`
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'}/dashboard`

    const { data, error } = await resend.emails.send({
      from: fromEmail || 'AutopilotROI <onboarding@autopilotroi.com>',
      to: email,
      subject: `Welcome to AutopilotROI, ${name}! 🎉`,
      html: `
        <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a1628; color: #e2e8f0; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #3b82f6; margin: 0; font-size: 28px;">Welcome to AutopilotROI</h1>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>

          <p style="font-size: 15px; line-height: 1.6; color: #94a3b8;">
            You've been added as a partner on AutopilotROI. Here's everything you need to get started:
          </p>

          <div style="background: #111d36; border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Your Referral Code</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #3b82f6; font-family: monospace;">${refCode || 'PARTNER-XXX'}</p>
          </div>

          <h2 style="font-size: 18px; color: #e2e8f0; margin-top: 24px;">Quick Start Steps</h2>
          <ol style="font-size: 14px; line-height: 2; color: #94a3b8; padding-left: 20px;">
            <li><a href="${loginUrl}" style="color: #3b82f6; text-decoration: none;">Log in to your account</a></li>
            <li>Set up your profile in Dashboard → Settings</li>
            <li>Generate your referral links in Dashboard → Referral Links</li>
            <li>Watch the partner training videos</li>
            <li>Share your link and start building!</li>
          </ol>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${dashboardUrl}" style="background: linear-gradient(180deg, #3b82f6, #2563eb); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; display: inline-block;">
              Go to Your Dashboard →
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
          <p style="font-size: 12px; color: #475569; text-align: center;">
            AutopilotROI — AI-Powered Finance Onboarding
          </p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
