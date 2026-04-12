'use client'

import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   COST ANALYSIS — Dev Team vs Antigravity AI
   ═══════════════════════════════════════════════════════════════ */

const phases = [
  {
    id: 'phase1',
    name: 'Phase 1: LAUNCH',
    status: 'complete' as const,
    color: 'blue',
    items: [
      { feature: 'Core onboarding flow + readiness quiz', devHours: 40, devRate: 150, aiHours: 3 },
      { feature: 'Bot protection (Turnstile)', devHours: 8, devRate: 150, aiHours: 0.5 },
      { feature: 'Rate limiting API middleware', devHours: 6, devRate: 150, aiHours: 0.3 },
      { feature: 'Email notifications (Resend)', devHours: 12, devRate: 150, aiHours: 0.5 },
      { feature: 'Partner lookup + referral system', devHours: 16, devRate: 150, aiHours: 0.5 },
      { feature: 'Legal pages (Terms/Privacy/Disclaimer)', devHours: 8, devRate: 100, aiHours: 0.3 },
      { feature: 'SEO (sitemap, robots.txt, OG images)', devHours: 6, devRate: 150, aiHours: 0.3 },
      { feature: 'Security headers (CSP, HSTS)', devHours: 4, devRate: 175, aiHours: 0.2 },
      { feature: 'Analytics (Plausible + event tracking)', devHours: 8, devRate: 150, aiHours: 0.3 },
      { feature: 'Error monitoring (Sentry setup)', devHours: 4, devRate: 150, aiHours: 0.2 },
      { feature: 'PWA manifest + favicon suite', devHours: 4, devRate: 100, aiHours: 0.2 },
      { feature: 'Skeleton loading states', devHours: 6, devRate: 150, aiHours: 0.3 },
      { feature: 'CAN-SPAM email compliance', devHours: 3, devRate: 100, aiHours: 0.2 },
      { feature: 'Admin partner management (CRUD)', devHours: 16, devRate: 150, aiHours: 0.5 },
      { feature: 'A/B testing utility', devHours: 8, devRate: 175, aiHours: 0.3 },
      { feature: 'Video completion tracking (YT API)', devHours: 12, devRate: 175, aiHours: 0.5 },
      { feature: 'Homepage + product pages (design)', devHours: 40, devRate: 125, aiHours: 4 },
      { feature: 'Mobile responsive + hamburger menu', devHours: 12, devRate: 125, aiHours: 1 },
      { feature: 'Re-engagement cron endpoint', devHours: 8, devRate: 150, aiHours: 0.3 },
      { feature: 'Database schema + migrations', devHours: 6, devRate: 175, aiHours: 0.3 },
      { feature: 'Staging environment config', devHours: 4, devRate: 150, aiHours: 0.1 },
    ],
  },
  {
    id: 'phase2',
    name: 'Phase 2: GROWTH',
    status: 'active' as const,
    color: 'emerald',
    items: [
      { feature: 'Social proof / testimonial section', devHours: 12, devRate: 125, aiHours: 1 },
      { feature: 'Partner referral link generator + QR', devHours: 16, devRate: 150, aiHours: 1 },
      { feature: 'Exit-intent popup component', devHours: 8, devRate: 125, aiHours: 0.5 },
      { feature: '7-day drip email sequence', devHours: 20, devRate: 150, aiHours: 2 },
      { feature: 'Partner dashboard v1 (lead tracking)', devHours: 32, devRate: 150, aiHours: 3 },
      { feature: 'Heatmaps integration (PostHog)', devHours: 4, devRate: 150, aiHours: 0.3 },
      { feature: 'Admin roadmap/changelog pages', devHours: 16, devRate: 125, aiHours: 1 },
      { feature: 'Personalized onboarding paths', devHours: 24, devRate: 150, aiHours: 2 },
    ],
  },
  {
    id: 'phase3',
    name: 'Phase 3: SCALE',
    status: 'planned' as const,
    color: 'amber',
    items: [
      { feature: 'Leaderboard + achievement badges', devHours: 24, devRate: 150, aiHours: 2 },
      { feature: 'Partner self-registration flow', devHours: 16, devRate: 150, aiHours: 1.5 },
      { feature: 'SMS notifications (Twilio)', devHours: 12, devRate: 150, aiHours: 1 },
      { feature: 'Genealogy tree visualization', devHours: 32, devRate: 175, aiHours: 3 },
      { feature: 'Cohort analytics dashboard', devHours: 20, devRate: 175, aiHours: 2 },
      { feature: 'Push notifications (PWA)', devHours: 16, devRate: 150, aiHours: 1.5 },
      { feature: 'AI chatbot (FAQ + lead capture)', devHours: 40, devRate: 175, aiHours: 4 },
    ],
  },
  {
    id: 'phase4',
    name: 'Phase 4: MOAT',
    status: 'planned' as const,
    color: 'purple',
    items: [
      { feature: 'AI-personalized onboarding engine', devHours: 60, devRate: 200, aiHours: 6 },
      { feature: 'Video completion-based scoring', devHours: 20, devRate: 175, aiHours: 2 },
      { feature: 'Partner CRM (notes, calls, tasks)', devHours: 40, devRate: 150, aiHours: 4 },
      { feature: 'Multi-language support (i18n)', devHours: 32, devRate: 150, aiHours: 3 },
      { feature: 'White-label partner funnels', devHours: 48, devRate: 175, aiHours: 5 },
      { feature: 'External API for partner tools', devHours: 24, devRate: 200, aiHours: 2 },
    ],
  },
]

const scorecard = [
  { category: 'Trust', current: 1, max: 5, grade: 'D' },
  { category: 'Conversion', current: 3.5, max: 7, grade: 'C+' },
  { category: 'Partner Tools', current: 1.5, max: 6, grade: 'D' },
  { category: 'Retention', current: 1, max: 5, grade: 'D' },
  { category: 'Analytics', current: 1, max: 4, grade: 'D' },
  { category: 'Infrastructure', current: 5, max: 6, grade: 'A-' },
]

const AI_COST_PER_HOUR = 0 // Antigravity included in subscription

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function RoadmapPage() {
  const allPhases = phases.map((phase) => {
    const devTotal = phase.items.reduce((s, i) => s + i.devHours * i.devRate, 0)
    const devHoursTotal = phase.items.reduce((s, i) => s + i.devHours, 0)
    const aiHoursTotal = phase.items.reduce((s, i) => s + i.aiHours, 0)
    const aiTotal = aiHoursTotal * AI_COST_PER_HOUR
    const savings = devTotal - aiTotal
    return { ...phase, devTotal, devHoursTotal, aiHoursTotal, aiTotal, savings }
  })

  const grandDevTotal = allPhases.reduce((s, p) => s + p.devTotal, 0)
  const grandAiTotal = allPhases.reduce((s, p) => s + p.aiTotal, 0)
  const grandSavings = grandDevTotal - grandAiTotal
  const grandDevHours = allPhases.reduce((s, p) => s + p.devHoursTotal, 0)
  const grandAiHours = allPhases.reduce((s, p) => s + p.aiHoursTotal, 0)

  const statusColors = {
    complete: 'bg-blue-500/15 text-blue-400 border-blue-400/30',
    active: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30',
    planned: 'bg-white/5 text-white/40 border-white/10',
  }

  const statusLabels = { complete: '✅ Complete', active: '🔨 In Progress', planned: '📋 Planned' }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Strategy & Roadmap
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Competitive positioning, phase roadmap, and cost analysis vs. traditional dev teams.
        </p>
      </div>

      {/* Grand Total Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative grid gap-6 sm:grid-cols-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-300/60">Dev Team Cost</div>
            <div className="mt-1 font-[var(--font-sora)] text-3xl font-bold text-white">{formatCurrency(grandDevTotal)}</div>
            <div className="text-sm text-white/40">{grandDevHours} hours</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-300/60">Our Cost</div>
            <div className="mt-1 font-[var(--font-sora)] text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Antigravity + Google Ultra + Jody</div>
            <div className="text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">= Priceless</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-300/60">Total Savings</div>
            <div className="mt-1 font-[var(--font-sora)] text-3xl font-bold text-emerald-400">{formatCurrency(grandSavings)}</div>
            <div className="text-sm text-emerald-300/60">100% saved</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-300/60">Time Saved</div>
            <div className="mt-1 font-[var(--font-sora)] text-3xl font-bold text-amber-400">{Math.round(grandDevHours / 8)}→{Math.round(grandAiHours / 8)} days</div>
            <div className="text-sm text-amber-300/60">{Math.round(((grandDevHours - grandAiHours) / grandDevHours) * 100)}% faster</div>
          </div>
        </div>
      </motion.div>

      {/* Competitive Scorecard */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <div className="border-b border-[var(--border-primary)] px-6 py-4">
          <h2 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
            Competitive Scorecard
          </h2>
          <p className="text-sm text-[var(--text-muted)]">vs. best-in-class crypto onboarding funnels (2026)</p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {scorecard.map((s) => (
            <div key={s.category} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{s.category}</span>
                <span className={`text-sm font-bold ${
                  s.grade.startsWith('A') ? 'text-emerald-400' :
                  s.grade.startsWith('B') ? 'text-blue-400' :
                  s.grade.startsWith('C') ? 'text-amber-400' : 'text-red-400'
                }`}>{s.grade}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/5">
                <div
                  className={`h-2 rounded-full transition-all ${
                    s.grade.startsWith('A') ? 'bg-emerald-400' :
                    s.grade.startsWith('B') ? 'bg-blue-400' :
                    s.grade.startsWith('C') ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${(s.current / s.max) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-white/30">{s.current}/{s.max} features</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Breakdown */}
      {allPhases.map((phase, phaseIdx) => (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: phaseIdx * 0.1 }}
          className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
        >
          {/* Phase Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-primary)] px-6 py-4 gap-3">
            <div className="flex items-center gap-3">
              <h2 className="font-[var(--font-sora)] text-lg font-bold text-white">{phase.name}</h2>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[phase.status]}`}>
                {statusLabels[phase.status]}
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-white/40">Dev: <span className="text-red-400 font-semibold">{formatCurrency(phase.devTotal)}</span></span>
              <span className="text-white/40">Our: <span className="text-emerald-400 font-semibold italic">Priceless</span></span>
              <span className="text-white/40">Saved: <span className="text-blue-400 font-semibold">{formatCurrency(phase.savings)}</span></span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-white/30">
                  <th className="px-6 py-3">Feature</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Dev Hours</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Dev Rate</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Dev Cost</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Our Time</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">You Saved</th>
                </tr>
              </thead>
              <tbody>
                {phase.items.map((item, i) => {
                  const devCost = item.devHours * item.devRate
                  const aiCost = item.aiHours * AI_COST_PER_HOUR
                  return (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-white/80">{item.feature}</td>
                      <td className="px-4 py-3 text-right text-white/40">{item.devHours}h</td>
                      <td className="px-4 py-3 text-right text-white/40">${item.devRate}/h</td>
                      <td className="px-4 py-3 text-right text-red-400/80">{formatCurrency(devCost)}</td>
                      <td className="px-4 py-3 text-right text-emerald-400/80">{item.aiHours}h</td>
                      <td className="px-4 py-3 text-right font-semibold text-blue-400">{formatCurrency(devCost - aiCost)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
