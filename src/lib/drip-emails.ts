import { Resend } from 'resend'

/* ═══════════════════════════════════════════════════════════════
   DRIP EMAIL SEQUENCE
   7-day automated re-engagement campaign
   Called from /api/cron/re-engage
   ═══════════════════════════════════════════════════════════════ */

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AutopilotROI <onboarding@resend.dev>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

const FOOTER = `
  <div style="border-top: 1px solid #1e293b; margin-top: 32px; padding-top: 24px; text-align: center;">
    <p style="color: #475569; font-size: 11px; margin: 0;">
      <a href="${SITE_URL}/privacy" style="color: #60a5fa; text-decoration: underline;">Privacy</a>
      &nbsp;·&nbsp;
      <a href="mailto:support@autopilotroi.com?subject=Unsubscribe" style="color: #60a5fa; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
`

interface DripLead {
  name: string
  email: string
  score?: number
  tier?: string
  referred_by?: string
}

// ── Template definitions ──

const templates: Record<string, { subject: string; html: (lead: DripLead) => string }> = {
  day1: {
    subject: 'Your partner is reviewing your profile',
    html: (lead) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Great Start, ${lead.name}!</h1>
        </div>
        <div style="padding: 30px;">
          <p style="line-height: 1.6; color: #94a3b8;">Your readiness assessment is complete and your assigned partner has been notified. They're reviewing your profile now.</p>
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 4px;">Your Readiness Score</p>
            <p style="font-size: 36px; font-weight: bold; color: #60a5fa; margin: 0;">${lead.score || '--'}/100</p>
            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Tier: ${lead.tier || 'Assessment Complete'}</p>
          </div>
          <p style="line-height: 1.6; color: #94a3b8;">While you wait, explore the resources we've prepared for you:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/university" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Explore University →</a>
          </div>
          ${FOOTER}
        </div>
      </div>
    `,
  },

  day2: {
    subject: '3 videos to get you started (2 min each)',
    html: (lead) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Knowledge Is Power, ${lead.name}</h1>
        </div>
        <div style="padding: 30px;">
          <p style="line-height: 1.6; color: #94a3b8;">While we connect you with your partner, here are 3 short videos that most successful members watch before their first conversation:</p>
          <div style="margin: 24px 0;">
            <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
              <p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 How AI Trading Bots Actually Work</p>
              <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">2 min — Clear, no-jargon explanation</p>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
              <p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 Understanding Risk vs. Reward</p>
              <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">2 min — What to expect realistically</p>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 Your First 30 Days: A Walkthrough</p>
              <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">3 min — Step-by-step getting started</p>
            </div>
          </div>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/university" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Watch Now →</a>
          </div>
          ${FOOTER}
        </div>
      </div>
    `,
  },

  day3: {
    subject: 'Quick question for you',
    html: (lead) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Hey ${lead.name},</h1>
        </div>
        <div style="padding: 30px;">
          <p style="line-height: 1.6; color: #94a3b8;">I noticed you haven't connected with your partner yet. Totally fine — everyone moves at their own pace.</p>
          <p style="line-height: 1.6; color: #94a3b8;">Quick question: Is there anything specific you'd like to know before your call? Common questions include:</p>
          <ul style="color: #94a3b8; line-height: 2;">
            <li>How much do I need to get started?</li>
            <li>What are the actual risks involved?</li>
            <li>How does the partner referral system work?</li>
          </ul>
          <p style="line-height: 1.6; color: #94a3b8;">Just reply to this email and we'll get you answers fast.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/faqs" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Browse FAQs →</a>
          </div>
          ${FOOTER}
        </div>
      </div>
    `,
  },

  day5: {
    subject: 'Others in your position are already seeing results',
    html: (lead) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Don't Fall Behind, ${lead.name}</h1>
        </div>
        <div style="padding: 30px;">
          <p style="line-height: 1.6; color: #94a3b8;">Since you took your assessment, 47 other people have already connected with their partner and started their onboarding.</p>
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">What other ${lead.tier || 'Beginner'}-level members are saying:</p>
            <p style="font-style: italic; color: #e2e8f0; margin: 0;">"I was nervous too, but my partner made it so easy. Wish I'd started sooner."</p>
            <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">— Sarah K., Small Business Owner</p>
          </div>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/waiting-room" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Continue Where You Left Off →</a>
          </div>
          ${FOOTER}
        </div>
      </div>
    `,
  },

  day7: {
    subject: 'Last call: Your partner spot is being reassigned',
    html: (lead) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7f1d1d, #0f172a); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Final Reminder, ${lead.name}</h1>
        </div>
        <div style="padding: 30px;">
          <p style="line-height: 1.6; color: #94a3b8;">It's been a week since your assessment. Your assigned partner has been waiting to connect, but we'll need to reassign your spot if we don't hear back.</p>
          <p style="line-height: 1.6; color: #94a3b8;">No pressure at all — if now isn't the right time, that's completely okay. But if you're still interested, this is the easiest way to get started:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/waiting-room" style="display: inline-block; background: #ef4444; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Keep My Spot →</a>
          </div>
          <p style="line-height: 1.6; color: #64748b; font-size: 13px; text-align: center;">After this, we won't email you again unless you reach out.</p>
          ${FOOTER}
        </div>
      </div>
    `,
  },
}

/**
 * Determine which drip email to send based on hours since signup.
 */
export function getDripTemplate(hoursSinceSignup: number): string | null {
  if (hoursSinceSignup >= 168) return 'day7'  // 7 days
  if (hoursSinceSignup >= 120) return 'day5'  // 5 days
  if (hoursSinceSignup >= 72) return 'day3'   // 3 days
  if (hoursSinceSignup >= 48) return 'day2'   // 2 days
  if (hoursSinceSignup >= 24) return 'day1'   // 1 day
  return null
}

/**
 * Send a drip email to a lead.
 */
export async function sendDripEmail(
  templateKey: string,
  lead: DripLead
): Promise<{ success: boolean; error?: string }> {
  const template = templates[templateKey]
  if (!template) return { success: false, error: `Unknown template: ${templateKey}` }

  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject: template.subject,
      html: template.html(lead),
      headers: {
        'List-Unsubscribe': `<mailto:support@autopilotroi.com?subject=Unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    })
    return { success: true }
  } catch (error) {
    console.error(`[Drip] Failed to send ${templateKey} to ${lead.email}:`, error)
    return { success: false, error: String(error) }
  }
}
