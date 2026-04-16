'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   EMAIL TEMPLATE MANAGER
   
   Visual preview of all system email templates.
   Shows subject lines, triggers, and live HTML rendering
   with sample data. View-only with Copy HTML option.
   
   NOTE: The email HTML templates are intentionally dark — that is
   the actual email design sent to prospects/partners. The admin
   UI shell around them is light-mode design system.
   ═══════════════════════════════════════════════════════════════ */

const SITE_URL = 'https://autopilotroi.com'

const sampleLead = {
  name: 'Sarah Thompson',
  email: 'sarah@example.com',
  score: 78,
  tier: 'Intermediate',
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  type: 'transactional' | 'drip'
  trigger: string
  timing: string
  description: string
  html: string
}

// Email footer — dark because this is the actual email HTML
const FOOTER = `
  <div style="border-top: 1px solid #1e293b; margin-top: 32px; padding-top: 24px; text-align: center;">
    <p style="color: #475569; font-size: 11px; margin: 0;">
      <a href="${SITE_URL}/privacy" style="color: #60a5fa; text-decoration: underline;">Privacy</a>
      &nbsp;·&nbsp;
      <a href="mailto:support@autopilotroi.com?subject=Unsubscribe" style="color: #60a5fa; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
`

const templates: EmailTemplate[] = [
  {
    id: 'partner-notify',
    name: 'Partner Notification',
    subject: `⚡ New Prospect: ${sampleLead.name} (${sampleLead.tier} — ${sampleLead.score}/100)`,
    type: 'transactional',
    trigger: 'Prospect completes readiness assessment',
    timing: 'Immediate',
    description: 'Sent to the assigned partner when a new prospect finishes the readiness quiz. Includes prospect details, score, and tier.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a1628; color: #e2e8f0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 24px; color: #fff; margin: 0;">AutopilotROI</h1>
        <p style="color: #64748b; margin: 4px 0 0;">Partner Notification</p>
      </div>
      <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="font-size: 20px; color: #fff; margin: 0 0 16px;">New Prospect Assigned ⚡</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600; text-align: right;">${sampleLead.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #60a5fa; text-align: right;">${sampleLead.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Readiness Score</td><td style="padding: 8px 0; color: #fff; font-weight: 700; font-size: 18px; text-align: right;">${sampleLead.score}/100</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Tier</td><td style="padding: 8px 0; text-align: right;"><span style="background: #1e3a5f; color: #60a5fa; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 600;">⚡ ${sampleLead.tier}</span></td></tr>
        </table>
      </div>
      <div style="text-align: center;">
        <a href="${SITE_URL}/dashboard/prospects" style="display: inline-block; background: linear-gradient(180deg, #3b82f6, #2563eb); color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">View in Dashboard →</a>
      </div>
      ${FOOTER}
    </div>`,
  },
  {
    id: 'prospect-welcome',
    name: 'Prospect Welcome',
    subject: `Welcome to AutopilotROI! Your readiness score: ${sampleLead.score}/100`,
    type: 'transactional',
    trigger: 'Prospect completes readiness assessment',
    timing: 'Immediate',
    description: 'Welcome email sent to the prospect with their readiness score, tier, and next steps.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a1628; color: #e2e8f0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 24px; color: #fff; margin: 0;">AutopilotROI</h1>
      </div>
      <div style="text-align: center; margin-bottom: 24px;">
        <p style="font-size: 18px; color: #fff;">Hey ${sampleLead.name} 👋</p>
        <p style="color: #94a3b8;">Your readiness assessment is complete!</p>
      </div>
      <div style="background: #1e293b; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <div style="font-size: 48px; font-weight: 700; color: #fff;">${sampleLead.score}</div>
        <div style="color: #64748b; margin-bottom: 12px;">out of 100</div>
        <span style="background: #1e3a5f; color: #60a5fa; padding: 6px 16px; border-radius: 999px; font-size: 14px; font-weight: 600;">⚡ ${sampleLead.tier}</span>
      </div>
      <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h3 style="color: #fff; margin: 0 0 8px;">What happens next?</h3>
        <p style="color: #94a3b8; margin: 0; line-height: 1.6;">Your referring partner has been notified and will reach out to guide you through the onboarding process. In the meantime, explore Aurum University to get familiar with the ecosystem.</p>
      </div>
      <div style="text-align: center;">
        <a href="${SITE_URL}/university" style="display: inline-block; background: linear-gradient(180deg, #3b82f6, #2563eb); color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">Explore University →</a>
      </div>
      ${FOOTER}
    </div>`,
  },
  {
    id: 'drip-day1',
    name: 'Drip: Day 1',
    subject: 'Your partner is reviewing your profile',
    type: 'drip',
    trigger: '24 hours after signup, no partner contact',
    timing: 'Day 1 (24h)',
    description: 'First re-engagement nudge. Reassures the prospect their partner has been notified and links to University.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Great Start, ${sampleLead.name}!</h1>
      </div>
      <div style="padding: 30px;">
        <p style="line-height: 1.6; color: #94a3b8;">Your readiness assessment is complete and your assigned partner has been notified. They're reviewing your profile now.</p>
        <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="color: #64748b; font-size: 13px; margin: 0 0 4px;">Your Readiness Score</p>
          <p style="font-size: 36px; font-weight: bold; color: #60a5fa; margin: 0;">${sampleLead.score}/100</p>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${SITE_URL}/university" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Explore University →</a>
        </div>
        ${FOOTER}
      </div>
    </div>`,
  },
  {
    id: 'drip-day2',
    name: 'Drip: Day 2',
    subject: '3 videos to get you started (2 min each)',
    type: 'drip',
    trigger: '48 hours after signup',
    timing: 'Day 2 (48h)',
    description: 'Content-driven follow-up pointing to the 3 most important beginner videos.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Knowledge Is Power, ${sampleLead.name}</h1>
      </div>
      <div style="padding: 30px;">
        <p style="line-height: 1.6; color: #94a3b8;">Here are 3 short videos that most successful members watch before their first conversation:</p>
        <div style="margin: 24px 0;">
          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 12px;"><p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 How AI Trading Bots Actually Work</p><p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">2 min — Clear, no-jargon explanation</p></div>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 12px;"><p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 Understanding Risk vs. Reward</p><p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">2 min — What to expect realistically</p></div>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px;"><p style="margin: 0; font-weight: 600; color: #e2e8f0;">📺 Your First 30 Days: A Walkthrough</p><p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">3 min — Step-by-step getting started</p></div>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${SITE_URL}/university" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Watch Now →</a>
        </div>
        ${FOOTER}
      </div>
    </div>`,
  },
  {
    id: 'drip-day3',
    name: 'Drip: Day 3',
    subject: 'Quick question for you',
    type: 'drip',
    trigger: '72 hours after signup',
    timing: 'Day 3 (72h)',
    description: 'Conversational check-in with common questions to reduce anxiety and prompt a reply.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Hey ${sampleLead.name},</h1>
      </div>
      <div style="padding: 30px;">
        <p style="line-height: 1.6; color: #94a3b8;">I noticed you haven't connected with your partner yet. Totally fine — everyone moves at their own pace.</p>
        <p style="line-height: 1.6; color: #94a3b8;">Quick question: Is there anything specific you'd like to know before your call? Common questions include:</p>
        <ul style="color: #94a3b8; line-height: 2;"><li>How much do I need to get started?</li><li>What are the actual risks involved?</li><li>How does the partner referral system work?</li></ul>
        <p style="line-height: 1.6; color: #94a3b8;">Just reply to this email and we'll get you answers fast.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${SITE_URL}/faqs" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Browse FAQs →</a>
        </div>
        ${FOOTER}
      </div>
    </div>`,
  },
  {
    id: 'drip-day5',
    name: 'Drip: Day 5',
    subject: 'Others in your position are already seeing results',
    type: 'drip',
    trigger: '120 hours after signup',
    timing: 'Day 5 (120h)',
    description: 'Social proof nudge with a testimonial quote and progress indicator.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Don't Fall Behind, ${sampleLead.name}</h1>
      </div>
      <div style="padding: 30px;">
        <p style="line-height: 1.6; color: #94a3b8;">Since you took your assessment, 47 other people have already connected with their partner and started their onboarding.</p>
        <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">What other ${sampleLead.tier}-level members are saying:</p>
          <p style="font-style: italic; color: #e2e8f0; margin: 0;">"I was nervous too, but my partner made it so easy. Wish I'd started sooner."</p>
          <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">— Sarah K., Small Business Owner</p>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${SITE_URL}/waiting-room" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Continue Where You Left Off →</a>
        </div>
        ${FOOTER}
      </div>
    </div>`,
  },
  {
    id: 'drip-day7',
    name: 'Drip: Day 7 (Final)',
    subject: 'Last call: Your partner spot is being reassigned',
    type: 'drip',
    trigger: '168 hours after signup',
    timing: 'Day 7 (168h) — Final',
    description: 'Urgency-based final re-engagement with reassignment warning. No more emails after this.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7f1d1d, #0f172a); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Final Reminder, ${sampleLead.name}</h1>
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
    </div>`,
  },
]

export default function EmailsPage() {
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const previewEmail = templates.find(t => t.id === previewId)

  function copyHtml(id: string, html: string) {
    navigator.clipboard.writeText(html)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const transactional = templates.filter(t => t.type === 'transactional')
  const drip = templates.filter(t => t.type === 'drip')

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[#181d26] tracking-tight">
          Email Templates
        </h1>
        <p className="mt-2 text-[rgba(4,14,32,0.55)]">
          Preview all system emails. 2 transactional + 5 drip re-engagement emails in the automated sequence.
        </p>
      </motion.div>

      {/* Drip Sequence Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-[#e0e2e6] bg-white p-6"
      >
        <h2 className="mb-4 font-[var(--font-sora)] text-lg font-bold text-[#181d26]">
          📬 Drip Sequence Timeline
        </h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {[
            { day: 'Signup', color: 'bg-[#1b61c9]', label: 'Welcome + Partner Notify' },
            { day: 'Day 1', color: 'bg-blue-400', label: 'Profile review' },
            { day: 'Day 2', color: 'bg-blue-400', label: '3 videos' },
            { day: 'Day 3', color: 'bg-amber-400', label: 'Quick question' },
            { day: 'Day 5', color: 'bg-amber-500', label: 'Social proof' },
            { day: 'Day 7', color: 'bg-red-500', label: 'Final call' },
          ].map((step, i) => (
            <div key={step.day} className="flex items-center">
              <div className="flex flex-col items-center min-w-[100px]">
                <div className={`h-3 w-3 rounded-full ${step.color}`} />
                <div className="mt-1.5 text-xs font-bold text-[#181d26]">{step.day}</div>
                <div className="mt-0.5 text-[10px] text-[rgba(4,14,32,0.45)] text-center leading-tight">{step.label}</div>
              </div>
              {i < 5 && (
                <div className="h-0.5 w-8 bg-[#e0e2e6] -mt-5" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[rgba(4,14,32,0.45)]">
          ✅ CAN-SPAM compliant — all emails include unsubscribe links and List-Unsubscribe headers.
        </p>
      </motion.div>

      {/* Transactional Emails */}
      <div>
        <h2 className="mb-4 font-[var(--font-sora)] text-xl font-bold text-[#181d26]">
          ⚡ Transactional Emails
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {transactional.map((email, i) => (
            <EmailCard
              key={email.id}
              email={email}
              index={i}
              onPreview={() => setPreviewId(email.id)}
              onCopy={() => copyHtml(email.id, email.html)}
              isCopied={copiedId === email.id}
            />
          ))}
        </div>
      </div>

      {/* Drip Emails */}
      <div>
        <h2 className="mb-4 font-[var(--font-sora)] text-xl font-bold text-[#181d26]">
          💧 Drip Re-Engagement Sequence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drip.map((email, i) => (
            <EmailCard
              key={email.id}
              email={email}
              index={i}
              onPreview={() => setPreviewId(email.id)}
              onCopy={() => copyHtml(email.id, email.html)}
              isCopied={copiedId === email.id}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={() => setPreviewId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e0e2e6] bg-white shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-white border-b border-[#e0e2e6] px-5 py-4">
                <div>
                  <h3 className="text-sm font-bold text-[#181d26]">{previewEmail.name}</h3>
                  <p className="text-xs text-[rgba(4,14,32,0.45)] mt-0.5">Subject: {previewEmail.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyHtml(previewEmail.id, previewEmail.html)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      copiedId === previewEmail.id
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-[#f0f2f5] text-[rgba(4,14,32,0.55)] hover:bg-[#e8edf5]'
                    }`}
                  >
                    {copiedId === previewEmail.id ? '✓ Copied!' : '📋 Copy HTML'}
                  </button>
                  <button
                    onClick={() => setPreviewId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f2f5] text-[rgba(4,14,32,0.55)] hover:bg-[#e0e2e6] transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {/* Email render — on purpose dark bg, simulating inbox */}
              <div className="p-4 bg-[#f1f5f9] rounded-b-2xl">
                <p className="text-center text-[10px] text-[rgba(4,14,32,0.35)] mb-3 uppercase tracking-wider">Email Preview (actual dark email design)</p>
                <div dangerouslySetInnerHTML={{ __html: previewEmail.html }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Email Card Component ──
function EmailCard({
  email,
  index,
  onPreview,
  onCopy,
  isCopied,
}: {
  email: EmailTemplate
  index: number
  onPreview: () => void
  onCopy: () => void
  isCopied: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="rounded-2xl border border-[#e0e2e6] bg-white p-5 transition hover:border-[#1b61c9]/30 hover:shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            email.type === 'transactional'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}>
            {email.type}
          </span>
          <span className="text-[10px] font-medium text-[rgba(4,14,32,0.40)]">{email.timing}</span>
        </div>
      </div>

      <h3 className="text-sm font-bold text-[#181d26] mb-1">{email.name}</h3>
      <p className="text-xs text-[rgba(4,14,32,0.55)] mb-1">
        <strong className="text-[rgba(4,14,32,0.69)]">Subject:</strong> {email.subject}
      </p>
      <p className="text-xs text-[rgba(4,14,32,0.55)] mb-1">
        <strong className="text-[rgba(4,14,32,0.69)]">Trigger:</strong> {email.trigger}
      </p>
      <p className="text-xs leading-relaxed text-[rgba(4,14,32,0.45)] mb-4">
        {email.description}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPreview}
          className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-semibold text-[#1b61c9] hover:bg-blue-100 transition"
        >
          👁 Preview
        </button>
        <button
          onClick={onCopy}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            isCopied
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-[#f0f2f5] text-[rgba(4,14,32,0.55)] hover:bg-[#e8edf5]'
          }`}
        >
          {isCopied ? '✓ Copied' : '📋 HTML'}
        </button>
      </div>
    </motion.div>
  )
}
