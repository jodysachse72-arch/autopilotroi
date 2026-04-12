import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

// Default "from" — uses Resend's onboarding domain until you add a custom one
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AutopilotROI <onboarding@resend.dev>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

// CAN-SPAM compliant footer
const EMAIL_FOOTER = `
  <div style="border-top: 1px solid #1e293b; margin-top: 32px; padding-top: 24px; text-align: center;">
    <p style="color: #475569; font-size: 12px; margin: 0 0 8px;">
      AutoPilot ROI · Independent Onboarding Platform
    </p>
    <p style="color: #475569; font-size: 11px; margin: 0 0 8px;">
      This is a one-time notification. You received this because you (or someone using your email) signed up at autopilotroi.com.
    </p>
    <p style="color: #475569; font-size: 11px; margin: 0;">
      <a href="${SITE_URL}/privacy" style="color: #60a5fa; text-decoration: underline;">Privacy Policy</a>
      &nbsp;·&nbsp;
      <a href="${SITE_URL}/terms" style="color: #60a5fa; text-decoration: underline;">Terms</a>
      &nbsp;·&nbsp;
      <a href="mailto:support@autopilotroi.com?subject=Unsubscribe" style="color: #60a5fa; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
`

interface NotifyPartnerProps {
  partnerEmail: string
  prospectName: string
  prospectEmail: string
  readinessScore: number
  readinessTier: string
}

export async function notifyPartnerNewProspect({
  partnerEmail,
  prospectName,
  prospectEmail,
  readinessScore,
  readinessTier,
}: NotifyPartnerProps) {
  const tierEmoji = readinessTier === 'beginner' ? '🌱' : readinessTier === 'intermediate' ? '⚡' : '🚀'
  const tierLabel = readinessTier.charAt(0).toUpperCase() + readinessTier.slice(1)

  const { data, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: partnerEmail,
    subject: `${tierEmoji} New Prospect: ${prospectName} (${tierLabel} — ${readinessScore}/100)`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a1628; color: #e2e8f0; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; color: #fff; margin: 0;">AutopilotROI</h1>
          <p style="color: #64748b; margin: 4px 0 0;">Partner Notification</p>
        </div>
        
        <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; color: #fff; margin: 0 0 16px;">New Prospect Assigned ${tierEmoji}</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Name</td>
              <td style="padding: 8px 0; color: #fff; font-weight: 600; text-align: right;">${prospectName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #60a5fa; text-align: right;">${prospectEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Readiness Score</td>
              <td style="padding: 8px 0; color: #fff; font-weight: 700; font-size: 18px; text-align: right;">${readinessScore}/100</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Tier</td>
              <td style="padding: 8px 0; text-align: right;">
                <span style="background: ${readinessTier === 'beginner' ? '#78350f' : readinessTier === 'intermediate' ? '#1e3a5f' : '#064e3b'}; color: ${readinessTier === 'beginner' ? '#fbbf24' : readinessTier === 'intermediate' ? '#60a5fa' : '#34d399'}; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 600;">
                  ${tierEmoji} ${tierLabel}
                </span>
              </td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'}/dashboard/prospects" 
             style="display: inline-block; background: linear-gradient(180deg, #3b82f6, #2563eb); color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Dashboard →
          </a>
        </div>
        
        <p style="color: #475569; font-size: 12px; text-align: center; margin-top: 32px;">
          AutoPilot ROI
        </p>
        ${EMAIL_FOOTER}
      </div>
    `,
    headers: {
      'List-Unsubscribe': '<mailto:support@autopilotroi.com?subject=Unsubscribe>',
    },
  })

  if (error) {
    console.error('[Resend] Failed to send partner notification:', error)
    return { success: false, error }
  }

  return { success: true, id: data?.id }
}

interface WelcomeProspectProps {
  prospectEmail: string
  prospectName: string
  readinessScore: number
  readinessTier: string
}

export async function sendProspectWelcome({
  prospectEmail,
  prospectName,
  readinessScore,
  readinessTier,
}: WelcomeProspectProps) {
  const tierEmoji = readinessTier === 'beginner' ? '🌱' : readinessTier === 'intermediate' ? '⚡' : '🚀'
  const tierLabel = readinessTier.charAt(0).toUpperCase() + readinessTier.slice(1)

  const { data, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: prospectEmail,
    subject: `Welcome to AutopilotROI! Your readiness score: ${readinessScore}/100`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a1628; color: #e2e8f0; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; color: #fff; margin: 0;">AutopilotROI</h1>
        </div>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <p style="font-size: 18px; color: #fff;">Hey ${prospectName} 👋</p>
          <p style="color: #94a3b8;">Your readiness assessment is complete!</p>
        </div>
        
        <div style="background: #1e293b; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 48px; font-weight: 700; color: #fff;">${readinessScore}</div>
          <div style="color: #64748b; margin-bottom: 12px;">out of 100</div>
          <span style="background: ${readinessTier === 'beginner' ? '#78350f' : readinessTier === 'intermediate' ? '#1e3a5f' : '#064e3b'}; color: ${readinessTier === 'beginner' ? '#fbbf24' : readinessTier === 'intermediate' ? '#60a5fa' : '#34d399'}; padding: 6px 16px; border-radius: 999px; font-size: 14px; font-weight: 600;">
            ${tierEmoji} ${tierLabel}
          </span>
        </div>
        
        <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #fff; margin: 0 0 8px;">What happens next?</h3>
          <p style="color: #94a3b8; margin: 0; line-height: 1.6;">
            Your referring partner has been notified and will reach out to guide you through the onboarding process. 
            In the meantime, explore Aurum University to get familiar with the ecosystem.
          </p>
        </div>
        
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'}/university" 
             style="display: inline-block; background: linear-gradient(180deg, #3b82f6, #2563eb); color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Explore University →
          </a>
        </div>
        
        <p style="color: #475569; font-size: 12px; text-align: center; margin-top: 32px;">
          AutoPilot ROI
        </p>
        ${EMAIL_FOOTER}
      </div>
    `,
    headers: {
      'List-Unsubscribe': '<mailto:support@autopilotroi.com?subject=Unsubscribe>',
    },
  })

  if (error) {
    console.error('[Resend] Failed to send welcome email:', error)
    return { success: false, error }
  }

  return { success: true, id: data?.id }
}
