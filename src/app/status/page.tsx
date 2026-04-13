'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   PLATFORM STATUS PAGE — Shareable summary for stakeholders
   ═══════════════════════════════════════════════════════════════ */

const BASE = 'https://autopilotroi-git-codex-mockup-homepage-autopilot-roi.vercel.app'

const credentials = [
  { role: 'Admin', email: 'admin@autopilotroi.com', password: 'Admin2026!', icon: '🛡️' },
  { role: 'Partner', email: 'partner@autopilotroi.com', password: 'Partner2026!', icon: '🤝' },
]

const publicPages = [
  { label: 'Homepage', path: '/', icon: '🏠' },
  { label: 'Products (Aurum Ecosystem)', path: '/products', icon: '💎' },
  { label: 'Profit Calculator', path: '/calculator', icon: '🧮' },
  { label: 'Trust Check (Evaluator)', path: '/evaluate', icon: '🔍' },
  { label: 'University (Video Library)', path: '/university', icon: '🎓' },
  { label: 'Media', path: '/media', icon: '📺' },
  { label: 'Blog', path: '/blog', icon: '📰' },
  { label: 'FAQs', path: '/faqs', icon: '❓' },
  { label: 'Resources', path: '/resources', icon: '📚' },
]

const onboardingPages = [
  { label: 'Signup (with referral)', path: '/signup?ref=jody', icon: '✍️' },
  { label: 'Waiting Room', path: '/waiting-room', icon: '⏳' },
  { label: 'Beginner Onboarding', path: '/onboarding?tier=beginner&ref=jody', icon: '🌱' },
  { label: 'Advanced Onboarding', path: '/onboarding?tier=advanced&ref=jody', icon: '🚀' },
]

const adminPages = [
  { label: 'Admin Dashboard', path: '/admin', icon: '📊' },
  { label: 'Strategy & Roadmap', path: '/admin/roadmap', icon: '🗺️' },
  { label: 'Changelog', path: '/admin/changelog', icon: '📝' },
  { label: 'Launch Checklist', path: '/admin/checklist', icon: '✅' },
  { label: 'Feature Flags', path: '/admin/features', icon: '🎛️' },
  { label: 'Content Editor (CMS)', path: '/admin/cms', icon: '✏️' },
  { label: 'Email Templates', path: '/admin/emails', icon: '✉️' },
  { label: 'Partner Management', path: '/admin/partners', icon: '🤝' },
  { label: 'Prospect Pipeline', path: '/admin/prospects', icon: '👥' },
  { label: 'Audit Log', path: '/admin/audit', icon: '📋' },
  { label: 'Platform Guide', path: '/admin/guide', icon: '📖' },
  { label: 'Integrations', path: '/admin/settings', icon: '⚙️' },
]

const partnerPages = [
  { label: 'Dashboard Overview', path: '/dashboard', icon: '📊' },
  { label: 'Referral Links + QR Codes', path: '/dashboard/links', icon: '🔗' },
  { label: 'Performance Analytics', path: '/dashboard/performance', icon: '📈' },
  { label: 'Leaderboard', path: '/dashboard/leaderboard', icon: '🏆' },
  { label: 'Partner Videos', path: '/dashboard/videos', icon: '🎬' },
  { label: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
]

const features = [
  {
    category: 'Core Platform',
    icon: '🏗️',
    items: [
      'Full onboarding funnel: Signup → Quiz → Tier Assignment → Waiting Room → Onboarding Guide',
      'Beginner path: 8-step accordion with VPN, Trust Wallet, Aurum signup, 2FA, funding',
      'Advanced path: Grouped checklist for experienced users',
      '2FA required before funding (enforced in UI)',
      'Referral code tracking throughout entire journey',
      'Returning user detection (auto-redirect to waiting room)',
    ],
  },
  {
    category: 'Revenue & Conversion',
    icon: '💰',
    items: [
      'Profit Calculator — 8 Aurum tiers with compound interest toggle',
      'Trust Check — 5-question evaluator that self-scores Aurum transparently',
      'Exit-intent popup — catches leaving visitors with micro-signup',
      'Social proof — testimonial carousel + live activity counter',
      '7-day drip email sequence — 5 automated follow-ups with escalating urgency',
    ],
  },
  {
    category: 'Partner System',
    icon: '🤝',
    items: [
      'Dashboard with lead tracking, pipeline funnel, search/filter/sort',
      'Referral link generator with Hot/Cold/Page-specific links + QR codes',
      'Performance analytics with weekly trends and conversion metrics',
      'Gamified leaderboard with tier badges (Diamond → Bronze) and achievements',
      'Partner onboarding wizard (3-step welcome card)',
      'Partner welcome email API',
    ],
  },
  {
    category: 'Admin Tools',
    icon: '🛡️',
    items: [
      '15 feature flags — toggle any feature ON/OFF instantly, no deploy needed',
      'Content Editor — edit blog, homepage, FAQs, videos in-app (replaced Sanity)',
      'Email template manager — preview all 7 system emails with live rendering',
      'Integration vault — Vercel, Supabase, Resend, Plausible, Sentry, Turnstile, ThriveDesk',
      'Partner management, audit log, launch checklist, roadmap, changelog',
      'Interactive guided tour for new admins + searchable platform guide',
    ],
  },
  {
    category: 'Design & UX',
    icon: '🎨',
    items: [
      'Dark fintech aesthetic with light mode support',
      'Animated glassmorphism components (Framer Motion)',
      'Custom typography (Sora + Manrope)',
      'Fully mobile-responsive — hamburger drawer nav on all dashboards',
      'Smart FAQ chatbot (zero-cost, local matching)',
      'Custom 404 page, skeleton loading states, micro-animations',
    ],
  },
  {
    category: 'Security & Compliance',
    icon: '🔒',
    items: [
      'Bot protection (Cloudflare Turnstile)',
      'Rate limiting (5 req/min/IP on signup)',
      'CSP + HSTS + X-Frame-Options headers',
      'CAN-SPAM compliant emails with unsubscribe',
      'Terms of Service, Privacy Policy, Risk Disclaimer',
    ],
  },
]

const techStack = [
  { name: 'Next.js 15', desc: 'App Router framework', icon: '⚡' },
  { name: 'TypeScript', desc: 'Type-safe codebase', icon: '📘' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', icon: '🎨' },
  { name: 'Framer Motion', desc: 'Animations & transitions', icon: '✨' },
  { name: 'Supabase', desc: 'PostgreSQL + Auth + RLS', icon: '🗄️' },
  { name: 'Resend', desc: 'Transactional email', icon: '📧' },
  { name: 'Plausible', desc: 'Privacy-friendly analytics', icon: '📊' },
  { name: 'Sentry', desc: 'Error monitoring', icon: '🐛' },
  { name: 'Cloudflare Turnstile', desc: 'Bot protection', icon: '🛡️' },
  { name: 'Vercel', desc: 'Auto-deploy from GitHub', icon: '▲' },
  { name: 'Google Gemini', desc: 'AI development agent', icon: '🤖' },
]

const phases = [
  { name: 'Phase 1: LAUNCH', status: 'Complete', color: 'emerald', items: 'Core funnel, security, analytics, legal, email, admin' },
  { name: 'Phase 2: GROWTH', status: 'Complete', color: 'emerald', items: 'Partner dashboard, drip emails, social proof, feature flags' },
  { name: 'Phase 3: SCALE', status: 'In Progress', color: 'blue', items: 'Leaderboard ✅ Calculator ✅ Evaluator ✅ CMS ✅ Onboarding ✅ Mobile ✅ SMS 🔜 Genealogy 🔜' },
  { name: 'Phase 4: MOAT', status: 'Planned', color: 'purple', items: 'AI personalization, CRM, i18n, white-label funnels, API' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/60 hover:bg-white/20 hover:text-white transition"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function PageLink({ label, path, icon }: { label: string; path: string; icon: string }) {
  return (
    <a
      href={`${BASE}${path}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.06] hover:border-white/15"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-white/80 group-hover:text-white transition">{label}</span>
      <span className="ml-auto text-xs text-white/20 group-hover:text-white/50 transition">↗</span>
    </a>
  )
}

function Section({ title, icon, children, delay = 0 }: { title: string; icon: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8"
    >
      <h2 className="flex items-center gap-3 font-[var(--font-sora)] text-xl sm:text-2xl font-bold text-white mb-6">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#06122f]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#06122f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-white/50 text-sm hover:text-white transition">
            ← Back to site
          </Link>
          <span className="rounded-full bg-blue-500/15 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-300">
            Status Report
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16 space-y-8 sm:space-y-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="font-[var(--font-sora)] text-3xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              AutopilotROI
            </span>
          </h1>
          <h2 className="mt-2 text-lg sm:text-2xl font-semibold text-white/80">
            Platform Status & Feature Overview
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-xl mx-auto">
            April 13, 2026 — Phase 1 & 2 Complete, Phase 3 In Progress
          </p>
        </motion.div>

        {/* Credentials */}
        <Section title="Demo Login Credentials" icon="🔑" delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {credentials.map((c) => (
              <div key={c.role} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{c.icon}</span>
                  <span className="font-bold text-white text-lg">{c.role}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="text-white/40 w-20">Email:</span>
                    <code className="text-cyan-300 font-mono text-sm">{c.email}</code>
                    <CopyButton text={c.email} />
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-white/40 w-20">Password:</span>
                    <code className="text-cyan-300 font-mono text-sm">{c.password}</code>
                    <CopyButton text={c.password} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a
            href={`${BASE}/login`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:shadow-blue-600/35"
          >
            Open Login Page →
          </a>
        </Section>

        {/* Pages */}
        <Section title="Pages to Review" icon="📍" delay={0.15}>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/30 mb-3">Public-Facing</h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {publicPages.map((p) => <PageLink key={p.path} {...p} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/30 mb-3">Onboarding Flow</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {onboardingPages.map((p) => <PageLink key={p.path} {...p} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400/60 mb-3">
                🛡️ Admin Panel <span className="text-white/20 font-normal">(login as admin first)</span>
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {adminPages.map((p) => <PageLink key={p.path} {...p} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400/60 mb-3">
                🤝 Partner Dashboard <span className="text-white/20 font-normal">(login as partner first)</span>
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {partnerPages.map((p) => <PageLink key={p.path} {...p} />)}
              </div>
            </div>
          </div>
        </Section>

        {/* Features */}
        <Section title="What's Built — Features" icon="✅" delay={0.2}>
          <div className="space-y-6">
            {features.map((group) => (
              <div key={group.category}>
                <h3 className="flex items-center gap-2 text-base font-bold text-white/80 mb-3">
                  <span>{group.icon}</span>
                  {group.category}
                </h3>
                <ul className="space-y-1.5 ml-7">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section title="Tech Stack" icon="🔧" delay={0.25}>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {techStack.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <div className="text-2xl mb-1.5">{t.icon}</div>
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-white/30 mt-0.5">{t.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Roadmap */}
        <Section title="Roadmap" icon="📈" delay={0.3}>
          <div className="space-y-4">
            {phases.map((p) => (
              <div key={p.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-bold text-white text-base">{p.name}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    p.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' :
                    p.color === 'blue' ? 'bg-blue-500/15 text-blue-400' :
                    'bg-purple-500/15 text-purple-400'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-white/40">{p.items}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Cost */}
        <Section title="Cost Comparison" icon="💵" delay={0.35}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
              <div className="text-sm text-red-300/60 uppercase tracking-wider font-bold mb-2">Traditional Dev Team</div>
              <div className="font-[var(--font-sora)] text-3xl sm:text-4xl font-black text-red-400">$100K – $150K+</div>
              <div className="mt-2 text-xs text-white/30">3-4 developers × 4-6 months</div>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
              <div className="text-sm text-emerald-300/60 uppercase tracking-wider font-bold mb-2">Antigravity AI + Jody</div>
              <div className="font-[var(--font-sora)] text-3xl sm:text-4xl font-black text-emerald-400">$0 Labor</div>
              <div className="mt-2 text-xs text-white/30">API costs only • 4 days of building</div>
            </div>
          </div>
          <a
            href={`${BASE}/admin/roadmap`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300 transition"
          >
            View full cost breakdown on the Roadmap page →
          </a>
        </Section>

        {/* Next Steps */}
        <Section title="Next Steps" icon="🎯" delay={0.4}>
          <div className="space-y-3">
            {[
              { num: 1, label: 'Supabase cloud sync', desc: 'Wire Content Editor to Supabase for persistent storage' },
              { num: 2, label: 'Partner import', desc: 'CSV bulk import for existing partner roster' },
              { num: 3, label: 'SMS notifications', desc: 'Twilio integration for prospect alerts' },
              { num: 4, label: 'Genealogy tree', desc: 'Visual 3-deep downline tree for partners' },
              { num: 5, label: 'Production domain', desc: 'Point autopilotroi.com + configure DNS/SSL' },
            ].map((s) => (
              <div key={s.num} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-400">
                  {s.num}
                </span>
                <div>
                  <div className="font-bold text-white text-sm">{s.label}</div>
                  <div className="text-sm text-white/40">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-white/20">
            AutopilotROI Platform Status • Generated April 13, 2026 • Built by Antigravity AI
          </p>
        </div>
      </div>
    </div>
  )
}
