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
    date: '2026-04-12',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'Profit Calculator', description: 'Full-featured interactive ROI calculator at /calculator with 8 Aurum investment tiers (Basic 10.5% through Ultimate 16.62%), auto-detect from investment amount, compound interest toggle, real-time profit visualization, tier comparison grid, and investment breakdown panel. Added to main nav.', type: 'feature', files: ['src/app/calculator/page.tsx'] },
      { title: 'Homepage Below-the-Fold Overhaul', description: 'Replaced static metrics with large animated gradient-text numbers. Added SVG media logos (Forbes, Cointelegraph, Benzinga, Bitcoin.com, GlobeNewswire, Hackernoon). Replaced 3 abstract feature cards with 6-product ecosystem showcase (EX-AI Bot, Zeus Bot, NeoBank, Crypto Card, Exchange, RWA Gold). Added calculator teaser CTA banner.', type: 'design', files: ['src/app/page.tsx'] },
      { title: 'YouTube Video System Rebuild', description: 'ROOT CAUSE: 14 of 16 video IDs were DEAD on YouTube (deleted/private). Scraped Aurum University channel, verified 24 live videos via oembed API. Replaced all dead IDs in University (24 videos) and Media (9 videos) pages. Rebuilt YouTubeThumbnail component to dead-simple <img> tag — the old fallback chain was solving the wrong problem.', type: 'fix', files: ['src/components/UniversityContent.tsx', 'src/app/media/page.tsx', 'src/components/ui/YouTubeThumbnail.tsx'] },
      { title: 'Calculator UI Fixes', description: 'Fixed white-on-white dropdown text in dark mode by adding explicit option element styling. Fixed compound interest toggle alignment by switching from absolute positioning to inline-flex centering.', type: 'fix', files: ['src/app/calculator/page.tsx'] },
      { title: 'Hero Button Swap', description: 'Changed primary CTA from "Watch Overview" to "Start Here" (links to /signup with ShimmerButton effect). Changed secondary from "How It Works" to "Watch Overview" (opens video modal).', type: 'improvement', files: ['src/app/page.tsx'] },
      { title: 'Admin: System Integrations (Settings)', description: 'Credential vault with editable fields for all 7 platform services (Vercel, Supabase, Resend, Sanity, Plausible, Sentry, Turnstile). Shows required env vars, saves to localStorage, copy-to-clipboard for Vercel setup, connection status badges, dashboard links.', type: 'feature', files: ['src/app/admin/settings/page.tsx'] },
      { title: 'Admin: Email Template Manager', description: 'Visual preview of all 7 system emails (2 transactional + 5 drip). Drip sequence timeline visualization, live HTML rendering with sample data, Copy HTML functionality, CAN-SPAM compliance status.', type: 'feature', files: ['src/app/admin/emails/page.tsx'] },
      { title: 'Admin: CMS Video Fix + In-Place Player', description: 'Replaced dead Sanity tutorial video with verified-live alternative. Replaced external tab links with click-to-play inline iframe embeds.', type: 'fix', files: ['src/app/admin/cms/page.tsx'] },
      { title: 'Admin Nav Update', description: 'Added "Emails" nav item. Renamed "Settings" to "Integrations". Calculator added to main public nav.', type: 'improvement', files: ['src/app/admin/layout.tsx', 'src/components/layout/Navbar.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 3: SCALE',
    items: [
      { title: 'Trust Check — Opportunity Evaluator', description: 'Free 5-question tool at /evaluate that helps users evaluate any crypto/AI/income opportunity using the same due diligence framework AutopilotROI used to choose Aurum. Weighted scoring (0-50), pattern detection, transparent Aurum self-evaluation, shareable results. Added to main nav.', type: 'feature', files: ['src/app/evaluate/page.tsx'] },
      { title: 'Tooltip system', description: 'Reusable Tooltip and InfoTip components with auto-positioning, viewport clamping, and title+detail support. Added to dashboard stats, pipeline funnel, and onboarding steps', type: 'feature', files: ['src/components/ui/Tooltip.tsx'] },
      { title: 'Visual step-by-step guides', description: 'Interactive slideshow component replacing bullet-point instructions. VPN (5 slides), Trust Wallet (5 slides), Funding (4 slides), 2FA (5 slides) — with tips, warnings, and video slots', type: 'feature', files: ['src/components/ui/StepByStepGuide.tsx', 'src/app/onboarding/page.tsx'] },
      { title: 'Dashboard tooltips', description: 'Added contextual help to all 4 stat cards and pipeline funnel heading — explains each metric in plain English for non-tech partners', type: 'improvement', files: ['src/app/dashboard/page.tsx'] },
      { title: 'Partner Leaderboard', description: 'Gamified ranking system with podium visualization, tier badges (Diamond/Platinum/Gold/Silver/Bronze), achievement system, and streak tracking', type: 'feature', files: ['src/app/dashboard/leaderboard/page.tsx'] },
      { title: 'Smart FAQ Bot', description: 'Local knowledge-base chatbot with 13 Q&A pairs, fuzzy keyword matching, floating chat UI, and quick suggestions. Zero API cost — no ChatGPT needed', type: 'feature', files: ['src/components/ui/SmartFaqBot.tsx'] },
      { title: 'Admin Guide', description: 'In-app searchable knowledge base with 13 articles covering platform operations, troubleshooting, and daily routines — written for non-technical admins', type: 'feature', files: ['src/app/admin/guide/page.tsx'] },
      { title: 'Enhanced feature flag system', description: 'Expanded from 7 to 15 toggles across 6 categories. Every flag now has rich documentation: What It Does, Why It Matters, When To Turn On/Off, risk level, and phase tag', type: 'improvement', files: ['src/lib/feature-flags.tsx', 'src/app/admin/features/page.tsx'] },
      { title: 'Developer documentation (DOCS.md)', description: 'Comprehensive technical docs covering architecture, project structure, database schema, environment variables, deployment, and security headers', type: 'infrastructure', files: ['DOCS.md'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 2: GROWTH',
    items: [
      { title: 'Partner Dashboard v1', description: 'Full pipeline dashboard with stats cards, funnel visualization, searchable/filterable/sortable lead table, drip tracking, and quick actions', type: 'feature', files: ['src/app/dashboard/page.tsx'] },
      { title: 'Personalized onboarding paths', description: 'Tier-specific recommended next steps (beginner/intermediate/advanced) auto-shown in waiting room based on readiness score', type: 'feature', files: ['src/components/sections/PersonalizedPath.tsx', 'src/app/waiting-room/page.tsx'] },
      { title: 'Partner performance analytics', description: 'Weekly lead chart, top referral sources, conversion metrics, and gamified partner milestones at /dashboard/performance', type: 'feature', files: ['src/app/dashboard/performance/page.tsx'] },
      { title: 'Dashboard leads API', description: 'Live Supabase-backed API endpoint for partner dashboard with graceful demo fallback', type: 'feature', files: ['src/app/api/dashboard/leads/route.ts'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 2: GROWTH',
    items: [
      { title: 'Feature toggle system', description: 'React Context-based feature flags with localStorage persistence. Toggle exit intent, social proof, maintenance mode, and more from /admin/features', type: 'feature', files: ['src/lib/feature-flags.tsx', 'src/app/admin/features/page.tsx'] },
      { title: '7-day drip email sequence', description: 'Five automated email templates (day 1/2/3/5/7) with escalating urgency. Wired into cron endpoint with duplicate prevention', type: 'feature', files: ['src/lib/drip-emails.ts', 'src/app/api/cron/re-engage/route.ts'] },
      { title: 'Maintenance mode page', description: 'Animated gear icon, amber status indicator, estimated duration, and contact info at /maintenance', type: 'feature', files: ['src/app/maintenance/page.tsx'] },
      { title: 'Custom 404 page', description: 'Glitching 404 text, random witty messages, robot emoji, fake terminal output, and Easter egg energy', type: 'design', files: ['src/app/not-found.tsx'] },
      { title: 'Admin feature toggles page', description: 'Visual toggle switches organized by category (Conversion, Marketing, Analytics, System) with danger indicators', type: 'feature', files: ['src/app/admin/features/page.tsx'] },
      { title: 'Roadmap cost branding update', description: 'Changed "$0" to "Antigravity + Google Ultra + Jody = Priceless" in strategy dashboard', type: 'improvement', files: ['src/app/admin/roadmap/page.tsx'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 2: GROWTH',
    items: [
      { title: 'Admin Strategy & Roadmap page', description: 'Full competitive analysis, phase roadmap, and cost comparison (Dev Team vs Antigravity AI) — available at /admin/roadmap', type: 'feature' },
      { title: 'Admin Changelog page', description: 'Living changelog of every feature, fix, and improvement built — available at /admin/changelog', type: 'feature' },
      { title: 'Admin Launch Checklist page', description: 'Interactive pre-launch and per-phase checklists with persistent progress — available at /admin/checklist', type: 'feature' },
      { title: 'Social proof section', description: 'Testimonial carousel + live activity counter added to homepage for trust building', type: 'feature' },
      { title: 'Exit-intent popup', description: 'Captures leaving visitors with a soft ask — email-only micro-signup', type: 'feature' },
      { title: 'Partner referral link generator', description: 'One-click copy, QR code generation, and social share buttons for partner referral links', type: 'feature' },
      { title: 'Content Security Policy headers', description: 'Production-grade CSP, HSTS, X-Frame-Options, and clickjacking protection in next.config.ts', type: 'security', files: ['next.config.ts'] },
      { title: 'A/B testing utility', description: 'Cookie-based experiment bucketing with Plausible analytics integration', type: 'feature', files: ['src/lib/experiments.ts'] },
      { title: 'YouTube video completion tracking', description: '25/50/75/100% milestone tracking via YouTube IFrame API with Plausible events', type: 'feature', files: ['src/components/ui/YouTubeTrackedPlayer.tsx'] },
      { title: 'Admin partner management overhaul', description: 'Full CRUD for partners — add, list, activate/deactivate with API backend', type: 'feature', files: ['src/app/admin/partners/page.tsx', 'src/app/api/admin/partners/route.ts'] },
      { title: 'Staging environment template', description: 'Separate .env.staging.example with Turnstile test keys and isolated Supabase guidance', type: 'infrastructure', files: ['.env.staging.example'] },
    ],
  },
  {
    date: '2026-04-12',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Rate limiting middleware', description: 'In-memory sliding window rate limiter — 5 req/min/IP on signup endpoint', type: 'security', files: ['src/lib/rate-limit.ts', 'src/app/api/leads/route.ts'] },
      { title: 'OG meta + social preview cards', description: 'Full OpenGraph and Twitter Card metadata with auto-generated OG image', type: 'improvement', files: ['src/app/layout.tsx', 'public/og-image.png'] },
      { title: 'Partner referral lookup system', description: 'Database-backed partner lookup — maps referral codes to partner emails for real notifications', type: 'feature', files: ['src/lib/partners.ts', 'supabase/migrations/002_partners_table.sql'] },
      { title: 'Waiting room analytics', description: 'Added video watch tracking, page view events, and YouTubeThumbnail consistency', type: 'improvement', files: ['src/app/waiting-room/page.tsx'] },
      { title: 'Sentry error monitoring', description: 'Client + server Sentry initialization — activates when DSN is configured', type: 'infrastructure', files: ['sentry.client.config.ts', 'sentry.server.config.ts'] },
      { title: 'Sitemap + robots.txt', description: 'Dynamic sitemap.xml with all public pages and robots.txt blocking admin/API/onboarding routes', type: 'improvement', files: ['src/app/sitemap.ts', 'src/app/robots.ts'] },
      { title: 'PWA manifest + favicon suite', description: 'Web app manifest, SVG favicon, 192px + 512px PNG icons, Apple Touch icon', type: 'feature', files: ['src/app/manifest.ts', 'src/app/icon.svg'] },
      { title: 'Skeleton loading states', description: 'Shimmer skeleton components for media, university, products, and resources pages', type: 'design', files: ['src/components/ui/Skeletons.tsx'] },
      { title: 'CAN-SPAM email compliance', description: 'Added unsubscribe links, List-Unsubscribe headers, and Privacy/Terms links to all email templates', type: 'security', files: ['src/lib/email.ts'] },
      { title: 'Re-engagement cron endpoint', description: 'Vercel Cron-ready endpoint at /api/cron/re-engage — finds leads inactive 48+ hours', type: 'feature', files: ['src/app/api/cron/re-engage/route.ts', 'vercel.json'] },
    ],
  },
  {
    date: '2026-04-11',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Bot protection (Cloudflare Turnstile)', description: 'Invisible CAPTCHA on signup form with server-side verification', type: 'security', files: ['src/app/signup/page.tsx', 'src/app/api/leads/route.ts'] },
      { title: 'Plausible Analytics integration', description: 'Privacy-friendly analytics with custom funnel events — fails silently without key', type: 'feature', files: ['src/app/layout.tsx', 'src/lib/analytics.ts'] },
      { title: 'Returning user auto-redirect', description: 'Leads with completed assessments auto-redirect from /signup to /waiting-room', type: 'feature', files: ['src/app/signup/page.tsx'] },
      { title: 'Post-assessment notification wiring', description: 'Assessment completion triggers async /api/notify for partner + prospect emails', type: 'feature', files: ['src/app/api/leads/assess/route.ts'] },
      { title: 'Legal pages created', description: 'Full Terms of Service, Privacy Policy, and Risk Disclaimer pages', type: 'feature', files: ['src/app/terms/page.tsx', 'src/app/privacy/page.tsx', 'src/app/disclaimer/page.tsx'] },
      { title: 'Footer rebuilt for compliance', description: '3-column footer with legal links, risk disclaimer, and persistent CTA', type: 'design', files: ['src/components/layout/Footer.tsx'] },
      { title: 'YouTube thumbnail fallback component', description: 'Robust hqdefault → 0.jpg fallback chain for reliable video thumbnails', type: 'fix', files: ['src/components/ui/YouTubeThumbnail.tsx'] },
      { title: 'Products page redesign', description: 'High-tech fintech panel design replacing icon-based layout', type: 'design' },
      { title: 'Homepage hero video integration', description: 'Embedded hero video with modern screen wrap and play button overlay', type: 'design' },
      { title: 'Mobile responsive overhaul', description: 'Hamburger menu, responsive grids, and touch-optimized interactions across all pages', type: 'design' },
      { title: 'University + Media page video fixes', description: 'Fixed video thumbnail loading with consistent fallback behavior', type: 'fix' },
      { title: 'Summary page fintech upgrade', description: 'Redesigned with high-tech AI finance imagery and better information architecture', type: 'design' },
      { title: 'Resources page beautification', description: 'Upgraded visual design to match site-wide premium fintech aesthetic', type: 'design' },
    ],
  },
  {
    date: '2026-04-10',
    phase: 'Phase 1: LAUNCH',
    items: [
      { title: 'Initial site build', description: 'Next.js 15 App Router with Tailwind CSS, Framer Motion, Supabase, and Sanity CMS', type: 'infrastructure' },
      { title: 'Onboarding funnel (Signup → Quiz → Waiting Room)', description: 'Multi-step flow with referral code tracking and localStorage persistence', type: 'feature' },
      { title: 'Readiness assessment quiz', description: 'Interactive quiz scoring leads into beginner/intermediate/advanced tiers', type: 'feature' },
      { title: 'Email system (Resend)', description: 'Partner notification + prospect welcome email with rich HTML templates', type: 'feature' },
      { title: 'Admin dashboard', description: 'System stats, activity feed, and prospect management interface', type: 'feature' },
      { title: 'Dark fintech design system', description: 'Custom CSS variables, Sora + Manrope typography, glassmorphism components', type: 'design' },
    ],
  },
]

const typeConfig: Record<string, { label: string; bg: string; text: string }> = {
  feature: { label: '✨ Feature', bg: 'bg-blue-500/15', text: 'text-blue-400' },
  fix: { label: '🐛 Fix', bg: 'bg-amber-500/15', text: 'text-amber-400' },
  improvement: { label: '⚡ Improvement', bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  security: { label: '🔒 Security', bg: 'bg-red-500/15', text: 'text-red-400' },
  infrastructure: { label: '🏗️ Infrastructure', bg: 'bg-purple-500/15', text: 'text-purple-400' },
  design: { label: '🎨 Design', bg: 'bg-pink-500/15', text: 'text-pink-400' },
}

export default function ChangelogPage() {
  const totalFeatures = changelog.reduce((s, e) => s + e.items.length, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Changelog
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          {totalFeatures} features, fixes, and improvements shipped. Updated every session.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-10 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
        {changelog.map((entry, eIdx) => (
          <motion.div
            key={`${entry.date}-${eIdx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: eIdx * 0.1 }}
          >
            {/* Date marker */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-[#06122f]" />
              <h2 className="font-[var(--font-sora)] text-xl font-bold text-white">{entry.date}</h2>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">{entry.phase}</span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {entry.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeConfig[item.type].bg} ${typeConfig[item.type].text}`}>
                      {typeConfig[item.type].label}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-white/50">{item.description}</p>
                  {item.files && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.files.map((f) => (
                        <code key={f} className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/30">
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
