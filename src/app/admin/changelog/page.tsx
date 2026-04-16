'use client'

import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   CHANGELOG — Everything built, tracked by date and phase
   ═══════════════════════════════════════════════════════════════ */

interface ChangeEntry {
  date: string
  phase: string
  items: {
    title: string
    description: string
    type: 'feature' | 'fix' | 'improvement' | 'security' | 'infrastructure' | 'design'
    files?: string[]
  }[]
}

const changelog: ChangeEntry[] = [
  {
    date: '2026-04-13',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'Mobile-Responsive Admin & Partner Dashboards', description: 'Replaced truncated horizontal mobile nav with full slide-out drawer on both Admin and Partner layouts. Added hamburger button, backdrop overlay, Escape-to-close, auto-close on navigation. Compact mobile headers. All 12 admin pages + 8 partner pages now accessible on any screen size.', type: 'feature', files: ['src/app/admin/layout.tsx', 'src/app/dashboard/layout.tsx'] },
      { title: 'Mobile Card View for Leads Table', description: 'Partner dashboard leads table now shows as card-style layout on mobile instead of a 7-column table. Search and sort controls stack vertically. Full-width inputs on small screens.', type: 'improvement', files: ['src/app/dashboard/page.tsx'] },
      { title: 'Leaderboard Mobile Responsive', description: 'Top-3 podium stacks single-column on mobile (was hard grid-cols-3). Fixed hardcoded white text to use theme CSS variables.', type: 'fix', files: ['src/app/dashboard/leaderboard/page.tsx'] },
      { title: 'Admin Quick Links Grid', description: 'Quick links now go 1-col mobile → 2-col tablet → 3-col desktop instead of hard 3-col.', type: 'improvement', files: ['src/app/admin/page.tsx'] },
      { title: 'Onboarding Rewrite — Accordion UI', description: 'Replaced wizard-style stepper with clean accordion-based layout grouped into 3 phases: Preparation → Account Setup → Go Live. 8 steps in correct order with 2FA required before funding. Advanced path is a grouped checklist. Progress persists to localStorage.', type: 'feature', files: ['src/app/onboarding/page.tsx'] },
      { title: 'Onboarding Typography Overhaul', description: "Bumped all text sizes for readability: titles 3xl→4xl, body sm→base, numbered steps larger, container widened from max-w-3xl to max-w-4xl.", type: 'design', files: ['src/app/onboarding/page.tsx'] },
      { title: 'Dead Video Sweep — 12 IDs Replaced', description: 'Replaced all 12 dead YouTube video IDs across Waiting Room, Onboarding, and Setup pages with verified-live alternatives from Aurum channel.', type: 'fix', files: ['src/app/onboarding/page.tsx', 'src/app/waiting-room/page.tsx'] },
    ],
  },
  {
    date: '2026-04-13',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'User Avatar Dropdown Menu', description: 'Replaced flat avatar+name+logout layout with a single clickable avatar that opens an animated dropdown. Shows user name, role badge, quick links, and Log Out.', type: 'improvement', files: ['src/components/layout/Navbar.tsx'] },
      { title: 'Forgot / Reset Password Flow', description: 'Two new auth pages: /forgot-password and /reset-password with token exchange, password form, and auto-redirect.', type: 'feature', files: ['src/app/(auth)/forgot-password/page.tsx', 'src/app/(auth)/reset-password/page.tsx'] },
      { title: 'Announcement Banner — Fully Functional', description: 'Rebuilt from stub into a working gradient banner at the top of every page. Message is stored in localStorage, editable from Admin → Features. Controlled by feature flag toggle. Dismissable with × button.', type: 'feature', files: ['src/components/layout/AnnouncementBanner.tsx'] },
      { title: 'Partner Import & Management Checklist', description: 'Added 10-item checklist section (🤝 Priority) covering CSV import, manual add, ref code migration, dedup, role assignment, welcome emails, upline mapping, validation reports, admin edit, and deactivation.', type: 'feature', files: ['src/app/admin/checklist/page.tsx'] },
      { title: 'Toast Notification System', description: 'Reusable useToast() hook with floating toasts — supports success, error, and info types with auto-dismiss animation.', type: 'feature', files: ['src/components/ui/Toast.tsx'] },
      { title: 'Password Strength Meter', description: 'Visual 3-bar indicator (weak/medium/strong) with improvement hints.', type: 'feature', files: ['src/components/ui/PasswordStrengthMeter.tsx'] },
      { title: 'Breadcrumb Navigation', description: 'Auto-generating breadcrumbs from route path. Added to both dashboard and admin layouts.', type: 'feature', files: ['src/components/ui/Breadcrumbs.tsx'] },
      { title: 'Command Palette (Cmd+K)', description: 'Keyboard-activated search across all pages. Fuzzy filtering, arrow-key navigation, category badges.', type: 'feature', files: ['src/components/ui/CommandPalette.tsx'] },
      { title: 'Partner Onboarding Wizard', description: '3-step welcome card for new partners: Set Up Profile → Share First Link → Watch Training.', type: 'feature', files: ['src/components/ui/PartnerOnboardingWizard.tsx'] },
      { title: 'Admin Audit Log', description: 'New /admin/audit page with filterable event timeline, search, category badges.', type: 'feature', files: ['src/app/admin/audit/page.tsx'] },
      { title: 'Replaced Sanity CMS with In-App Content Editor', description: 'Removed sanity packages (~140MB). Built full in-app Content Editor with 4 tabs, 50-step undo, Export/Import.', type: 'feature', files: ['src/lib/content-store.ts', 'src/app/admin/cms/page.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'Profit Calculator', description: 'Full-featured interactive ROI calculator at /calculator with 8 Aurum investment tiers, compound interest toggle, real-time profit visualization.', type: 'feature', files: ['src/app/calculator/page.tsx'] },
      { title: 'Homepage Below-the-Fold Overhaul', description: 'Replaced static metrics with large animated gradient-text numbers. Added SVG media logos. Replaced 3 abstract feature cards with 6-product ecosystem showcase.', type: 'design', files: ['src/app/page.tsx'] },
      { title: 'YouTube Video System Rebuild', description: 'ROOT CAUSE: 14 of 16 video IDs were DEAD on YouTube. Scraped Aurum University channel, verified 24 live videos. Rebuilt YouTubeThumbnail component.', type: 'fix', files: ['src/components/UniversityContent.tsx', 'src/components/ui/YouTubeThumbnail.tsx'] },
      { title: 'Admin: System Integrations (Settings)', description: 'Credential vault with editable fields for all 7 platform services. Shows required env vars, saves to localStorage.', type: 'feature', files: ['src/app/admin/settings/page.tsx'] },
      { title: 'Admin: Email Template Manager', description: 'Visual preview of all 7 system emails. Drip sequence timeline, live HTML rendering, Copy HTML functionality.', type: 'feature', files: ['src/app/admin/emails/page.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'Trust Check — Opportunity Evaluator', description: 'Free 5-question tool at /evaluate. Weighted scoring (0-50), pattern detection, transparent Aurum self-evaluation.', type: 'feature', files: ['src/app/evaluate/page.tsx'] },
      { title: 'Tooltip system', description: 'Reusable Tooltip and InfoTip components with auto-positioning and viewport clamping.', type: 'feature', files: ['src/components/ui/Tooltip.tsx'] },
      { title: 'Partner Leaderboard', description: 'Gamified ranking system with podium visualization, tier badges, achievement system, and streak tracking.', type: 'feature', files: ['src/app/dashboard/leaderboard/page.tsx'] },
      { title: 'Smart FAQ Bot', description: 'Local knowledge-base chatbot with 13 Q&A pairs, fuzzy keyword matching, floating chat UI. Zero API cost.', type: 'feature', files: ['src/components/ui/SmartFaqBot.tsx'] },
      { title: 'Admin Guide', description: 'In-app searchable knowledge base with 13 articles — written for non-technical admins.', type: 'feature', files: ['src/app/admin/guide/page.tsx'] },
      { title: 'Enhanced feature flag system', description: 'Expanded from 7 to 15 toggles across 6 categories. Every flag has rich documentation: What It Does, Why It Matters, When To Turn On/Off.', type: 'improvement', files: ['src/lib/feature-flags.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 2: GROWTH',
    items: [
      { title: 'Partner Dashboard v1', description: 'Full pipeline dashboard with stats cards, funnel visualization, searchable/filterable/sortable lead table, drip tracking, and quick actions.', type: 'feature', files: ['src/app/dashboard/page.tsx'] },
      { title: 'Personalized onboarding paths', description: 'Tier-specific recommended next steps (beginner/intermediate/advanced) auto-shown in waiting room based on readiness score.', type: 'feature', files: ['src/components/sections/PersonalizedPath.tsx'] },
      { title: 'Partner performance analytics', description: 'Weekly lead chart, top referral sources, conversion metrics, and gamified partner milestones.', type: 'feature', files: ['src/app/dashboard/performance/page.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 2: GROWTH',
    items: [
      { title: 'Feature toggle system', description: 'React Context-based feature flags with localStorage persistence. Toggle exit intent, social proof, maintenance mode, and more.', type: 'feature', files: ['src/lib/feature-flags.tsx'] },
      { title: '7-day drip email sequence', description: 'Five automated email templates (day 1/2/3/5/7) with escalating urgency. Wired into cron endpoint with duplicate prevention.', type: 'feature', files: ['src/lib/drip-emails.ts'] },
      { title: 'Maintenance mode page', description: 'Animated gear icon, amber status indicator, estimated duration, and contact info at /maintenance.', type: 'feature', files: ['src/app/maintenance/page.tsx'] },
      { title: 'Custom 404 page', description: 'Glitching 404 text, random witty messages, robot emoji, fake terminal output, and Easter egg energy.', type: 'design', files: ['src/app/not-found.tsx'] },
      { title: 'Content Security Policy headers', description: 'Production-grade CSP, HSTS, X-Frame-Options, and clickjacking protection in next.config.ts.', type: 'security', files: ['next.config.ts'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Rate limiting middleware', description: 'In-memory sliding window rate limiter — 5 req/min/IP on signup endpoint.', type: 'security', files: ['src/lib/rate-limit.ts'] },
      { title: 'OG meta + social preview cards', description: 'Full OpenGraph and Twitter Card metadata with auto-generated OG image.', type: 'improvement', files: ['src/app/layout.tsx'] },
      { title: 'Partner referral lookup system', description: 'Database-backed partner lookup — maps referral codes to partner emails for real notifications.', type: 'feature', files: ['src/lib/partners.ts'] },
      { title: 'Sentry error monitoring', description: 'Client + server Sentry initialization — activates when DSN is configured.', type: 'infrastructure', files: ['sentry.client.config.ts'] },
      { title: 'Sitemap + robots.txt', description: 'Dynamic sitemap.xml with all public pages and robots.txt blocking admin/API/onboarding routes.', type: 'improvement', files: ['src/app/sitemap.ts', 'src/app/robots.ts'] },
      { title: 'Skeleton loading states', description: 'Shimmer skeleton components for media, university, products, and resources pages.', type: 'design', files: ['src/components/ui/Skeletons.tsx'] },
    ],
  },
  {
    date: '2026-04-11',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Bot protection (Cloudflare Turnstile)', description: 'Invisible CAPTCHA on signup form with server-side verification.', type: 'security', files: ['src/app/signup/page.tsx'] },
      { title: 'Plausible Analytics integration', description: 'Privacy-friendly analytics with custom funnel events.', type: 'feature', files: ['src/app/layout.tsx', 'src/lib/analytics.ts'] },
      { title: 'Legal pages created', description: 'Full Terms of Service, Privacy Policy, and Risk Disclaimer pages.', type: 'feature', files: ['src/app/terms/page.tsx', 'src/app/privacy/page.tsx', 'src/app/disclaimer/page.tsx'] },
      { title: 'Footer rebuilt for compliance', description: '3-column footer with legal links, risk disclaimer, and persistent CTA.', type: 'design', files: ['src/components/layout/Footer.tsx'] },
      { title: 'Mobile responsive overhaul', description: 'Hamburger menu, responsive grids, and touch-optimized interactions across all pages.', type: 'design' },
    ],
  },
  {
    date: '2026-04-10',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Initial site build', description: 'Next.js 15 App Router with Tailwind CSS, Framer Motion, and Supabase.', type: 'infrastructure' },
      { title: 'Onboarding funnel (Signup → Quiz → Waiting Room)', description: 'Multi-step flow with referral code tracking and localStorage persistence.', type: 'feature' },
      { title: 'Readiness assessment quiz', description: 'Interactive quiz scoring leads into beginner/intermediate/advanced tiers.', type: 'feature' },
      { title: 'Email system (Resend)', description: 'Partner notification + prospect welcome email with rich HTML templates.', type: 'feature' },
      { title: 'Admin dashboard', description: 'System stats, activity feed, and prospect management interface.', type: 'feature' },
    ],
  },
]

const typeConfig: Record<string, { label: string; bg: string; text: string }> = {
  feature: { label: '✨ Feature', bg: 'bg-blue-100', text: 'text-blue-700' },
  fix: { label: '🐛 Fix', bg: 'bg-amber-100', text: 'text-amber-700' },
  improvement: { label: '⚡ Improvement', bg: 'bg-cyan-100', text: 'text-cyan-700' },
  security: { label: '🔒 Security', bg: 'bg-red-100', text: 'text-red-700' },
  infrastructure: { label: '🏗️ Infrastructure', bg: 'bg-purple-100', text: 'text-purple-700' },
  design: { label: '🎨 Design', bg: 'bg-pink-100', text: 'text-pink-700' },
}

export default function ChangelogPage() {
  const totalFeatures = changelog.reduce((s, e) => s + e.items.length, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[#181d26]">
          Changelog
        </h1>
        <p className="mt-2 text-[rgba(4,14,32,0.55)]">
          {totalFeatures} features, fixes, and improvements shipped. Updated every session.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-10 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-[#e0e2e6]">
        {changelog.map((entry, eIdx) => (
          <motion.div
            key={`${entry.date}-${eIdx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: eIdx * 0.06 }}
          >
            {/* Date marker */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#1b61c9] ring-4 ring-[#f8fafc]" />
              <h2 className="font-[var(--font-sora)] text-xl font-bold text-[#181d26]">{entry.date}</h2>
              <span className="rounded-full bg-[#e8edf5] px-3 py-1 text-xs text-[#1b61c9] font-medium">{entry.phase}</span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {entry.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#e0e2e6] bg-white px-5 py-4 hover:border-[#1b61c9]/30 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeConfig[item.type].bg} ${typeConfig[item.type].text}`}>
                      {typeConfig[item.type].label}
                    </span>
                    <span className="text-sm font-semibold text-[#181d26]">{item.title}</span>
                  </div>
                  <p className="text-sm text-[rgba(4,14,32,0.55)]">{item.description}</p>
                  {item.files && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.files.map((f) => (
                        <code key={f} className="rounded bg-[#f0f2f5] px-2 py-0.5 text-xs text-[rgba(4,14,32,0.55)]">
                          {f}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
