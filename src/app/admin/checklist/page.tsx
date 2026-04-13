'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE CHECKLIST — Pre-launch + Per-phase checklists
   Persistent via localStorage
   ═══════════════════════════════════════════════════════════════ */

interface CheckItem {
  id: string
  label: string
  detail?: string
}

interface CheckSection {
  id: string
  title: string
  phase: string
  icon: string
  items: CheckItem[]
}

const sections: CheckSection[] = [
  {
    id: 'critical',
    title: 'Critical — Before Go-Live',
    phase: 'Pre-Launch',
    icon: '🔴',
    items: [
      { id: 'env-turnstile-site', label: 'Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in Vercel', detail: 'dash.cloudflare.com → Turnstile' },
      { id: 'env-turnstile-secret', label: 'Set TURNSTILE_SECRET_KEY in Vercel', detail: 'Server-side secret from Cloudflare' },
      { id: 'env-cron-secret', label: 'Set CRON_SECRET in Vercel', detail: 'Random string for cron job auth' },
      { id: 'db-leads', label: 'Run 001_leads_table.sql migration', detail: 'Supabase → SQL Editor' },
      { id: 'db-partners', label: 'Run 002_partners_table.sql migration', detail: 'Creates partners table + lead columns' },
      { id: 'db-first-partner', label: 'Insert your partner record', detail: 'INSERT INTO partners with your email and referral code' },
      { id: 'dns-domain', label: 'Point autopilotroi.com to Vercel', detail: 'A/CNAME record in DNS' },
      { id: 'dns-verify', label: 'Verify domain in Vercel', detail: 'Vercel → Project → Settings → Domains' },
      { id: 'dns-resend', label: 'Add domain to Resend', detail: 'resend.com/domains → configure SPF/DKIM/DMARC' },
      { id: 'dns-plausible', label: 'Add domain to Plausible', detail: 'plausible.io → Add Site' },
      { id: 'dns-turnstile', label: 'Add domain to Turnstile allowed origins', detail: 'Cloudflare dashboard' },
      { id: 'email-test-prospect', label: 'Test prospect welcome email', detail: 'Submit test lead and check inbox' },
      { id: 'email-test-partner', label: 'Test partner notification email', detail: 'Verify score + tier shows correctly' },
      { id: 'email-unsubscribe', label: 'Verify unsubscribe link works', detail: 'Click unsubscribe in test email' },
      { id: 'thrivedesk-widget', label: 'Install ThriveDesk live chat widget', detail: 'Get embed script from ThriveDesk → Settings → Assistant → Installation' },
      { id: 'thrivedesk-env', label: 'Set NEXT_PUBLIC_THRIVEDESK_WIDGET_ID in Vercel', detail: 'Widget ID from ThriveDesk dashboard' },
    ],
  },
  {
    id: 'important',
    title: 'Important — Before Launch',
    phase: 'Pre-Launch',
    icon: '🟡',
    items: [
      { id: 'plausible-goals', label: 'Set up Plausible goals', detail: 'signup_submitted, quiz_completed, video_watched, cta_clicked' },
      { id: 'sentry-dsn', label: 'Configure Sentry DSN', detail: 'sentry.io → Project → Client Keys' },
      { id: 'og-test', label: 'Test OG image on opengraph.xyz', detail: 'Share card preview for social media' },
      { id: 'mobile-iphone', label: 'Test on iPhone Safari', detail: 'iOS 16+, hamburger menu, forms' },
      { id: 'mobile-android', label: 'Test on Android Chrome', detail: 'Touch targets, video modals' },
      { id: 'sitemap-verify', label: 'Visit /sitemap.xml — verify', detail: 'All public pages listed' },
      { id: 'robots-verify', label: 'Visit /robots.txt — verify', detail: 'Admin/API routes blocked' },
      { id: 'gsc-submit', label: 'Submit sitemap to Google Search Console', detail: 'google.com/webmasters' },
      { id: 'favicon-verify', label: 'Verify favicon + PWA manifest', detail: 'Browser tab + Add to Home Screen' },
      { id: 'loading-states', label: 'Verify skeleton loading states', detail: 'Navigate between pages, no blank flash' },
      { id: 'lighthouse', label: 'Run Lighthouse audit (target 90+)', detail: 'Chrome DevTools → Lighthouse' },
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2: GROWTH Features',
    phase: 'Phase 2',
    icon: '🟢',
    items: [
      { id: 'p2-social-proof', label: 'Add social proof / testimonials to homepage', detail: 'Testimonial carousel + activity counter' },
      { id: 'p2-exit-intent', label: 'Implement exit-intent popup', detail: 'Soft capture for leaving visitors' },
      { id: 'p2-referral-links', label: 'Build partner referral link generator', detail: 'Copy link, QR code, social share' },
      { id: 'p2-drip-emails', label: 'Implement 7-day drip email sequence', detail: 'Resend + cron for 24h/48h/72h/7d' },
      { id: 'p2-partner-dashboard', label: 'Build partner dashboard v1', detail: 'Lead list, scores, status tracking' },
      { id: 'p2-heatmaps', label: 'Integrate PostHog / Hotjar', detail: 'Session recording + heatmaps' },
      { id: 'p2-admin-pages', label: 'Admin roadmap, changelog, checklist pages', detail: 'Internal visibility tools' },
      { id: 'p2-personalized', label: 'Personalized onboarding paths by tier', detail: 'Different content for beginner/intermediate/advanced' },
    ],
  },
  {
    id: 'partner-import',
    title: 'Partner Import & Management',
    phase: 'Priority',
    icon: '🤝',
    items: [
      { id: 'pi-csv-import', label: 'Build CSV bulk partner import tool', detail: 'Admin → Partners → Import CSV with name, email, ref code, phone, tier' },
      { id: 'pi-manual-add', label: 'Build manual "Add Partner" form in Admin', detail: 'Single partner entry with all fields — name, email, ref code, phone, upline' },
      { id: 'pi-ref-code-migration', label: 'Migrate existing referral codes from Aurum', detail: 'Map current partner ref codes to new system so existing links keep working' },
      { id: 'pi-dedup', label: 'De-duplication check on import', detail: 'Prevent duplicate entries — match by email, warn on similar names' },
      { id: 'pi-role-assign', label: 'Auto-assign partner role on import', detail: 'Set role=partner in profiles table + create partner record' },
      { id: 'pi-welcome-email', label: 'Send welcome email to imported partners', detail: 'Option to send/skip welcome email with login credentials on import' },
      { id: 'pi-upline-mapping', label: 'Map upline/sponsor relationships', detail: 'CSV column for sponsor_ref_code → link to existing partner' },
      { id: 'pi-verify-data', label: 'Post-import data validation report', detail: 'Summary: X imported, Y skipped, Z errors — downloadable report' },
      { id: 'pi-partner-edit', label: 'Admin can edit any partner profile', detail: 'Admin → Partners → click partner → edit all fields inline' },
      { id: 'pi-partner-deactivate', label: 'Deactivate / reactivate partner accounts', detail: 'Soft delete — preserves data but blocks login' },
    ],
  },
  {
    id: 'phase3',
    title: 'Phase 3: SCALE Features',
    phase: 'Phase 3',
    icon: '🔵',
    items: [
      { id: 'p3-leaderboard', label: 'Build leaderboard + achievement badges', detail: 'Partner gamification system' },
      { id: 'p3-partner-reg', label: 'Partner self-registration flow', detail: 'Apply, auto-approve or queue' },
      { id: 'p3-sms', label: 'SMS notifications (Twilio)', detail: 'Instant alerts for high-score leads' },
      { id: 'p3-genealogy', label: 'Genealogy tree visualization', detail: 'Visual downline network' },
      { id: 'p3-cohort', label: 'Cohort analytics dashboard', detail: 'Retention by signup week' },
      { id: 'p3-push', label: 'PWA push notifications', detail: 'Web push for re-engagement' },
      { id: 'p3-chatbot', label: 'AI chatbot (FAQ + lead capture)', detail: 'Automated 24/7 prospect engagement' },
    ],
  },
  {
    id: 'post-launch',
    title: 'Post-Launch Operations',
    phase: 'Post-Launch',
    icon: '⚙️',
    items: [
      { id: 'pl-rate-limit-assess', label: 'Rate limit /api/leads/assess', detail: 'Prevent assessment spam' },
      { id: 'pl-rate-limit-notify', label: 'Rate limit /api/notify', detail: 'Prevent notification flooding' },
      { id: 'pl-rls', label: 'Supabase RLS for partner data', detail: 'Partner-scoped access policies' },
      { id: 'pl-audit-logs', label: 'Enable Supabase audit logs', detail: 'Track data access patterns' },
      { id: 'pl-rotate-keys', label: 'Rotate any exposed credentials', detail: 'Check git history for leaked keys' },
      { id: 'pl-backup', label: 'Enable database backups', detail: 'Supabase PITR or pg_dump cron' },
      { id: 'pl-content-editor', label: 'Set up Content Editor with Supabase', detail: 'Migrate from localStorage to cms_content table' },
      { id: 'pl-content-backup', label: 'Export initial content backup', detail: 'Admin → Content Editor → Export' },
    ],
  },
]

const STORAGE_KEY = 'autopilotroi-checklist'

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setChecked(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }, [])

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0)
  const completedItems = sections.reduce((s, sec) => s + sec.items.filter((i) => checked[i.id]).length, 0)
  const progressPercent = Math.round((completedItems / totalItems) * 100)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Launch Checklist
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Interactive checklist — progress is saved locally.
        </p>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">
            Overall Progress
          </span>
          <span className="text-sm text-white/50">
            {completedItems}/{totalItems} ({progressPercent}%)
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Sections */}
      {sections.map((section, sIdx) => {
        const sectionComplete = section.items.filter((i) => checked[i.id]).length
        const sectionTotal = section.items.length
        const sectionDone = sectionComplete === sectionTotal

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.05 }}
            className={`rounded-2xl border overflow-hidden transition-colors ${
              sectionDone
                ? 'border-emerald-400/20 bg-emerald-500/5'
                : 'border-[var(--border-primary)] bg-[var(--bg-card)]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <div>
                  <h2 className="font-[var(--font-sora)] text-base font-bold text-white">{section.title}</h2>
                  <span className="text-xs text-white/30">{section.phase}</span>
                </div>
              </div>
              <span className={`text-sm font-semibold ${sectionDone ? 'text-emerald-400' : 'text-white/40'}`}>
                {sectionComplete}/{sectionTotal}
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {section.items.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-5 w-5 rounded border-white/20 bg-white/5 accent-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium transition-colors ${
                      checked[item.id] ? 'text-white/30 line-through' : 'text-white'
                    }`}>
                      {item.label}
                    </div>
                    {item.detail && (
                      <div className="mt-0.5 text-xs text-white/30">{item.detail}</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
