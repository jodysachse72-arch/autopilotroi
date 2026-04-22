'use client'

import { motion } from 'framer-motion'
import {
  SectionHeader,
  Card,
  StatCard,
  StatusBadge,
  DataTable,
  type DataColumn,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   COST ANALYSIS — Dev Team vs Antigravity AI
   Shows phase roadmap, item-level cost comparison, and a
   competitive scorecard across UX/perf categories.
   ═══════════════════════════════════════════════════════════════ */

type PhaseStatus = 'complete' | 'active' | 'planned'

interface PhaseItem {
  feature: string
  devHours: number
  devRate: number
  aiHours: number
}

interface Phase {
  id: string
  name: string
  status: PhaseStatus
  items: PhaseItem[]
}

const phases: Phase[] = [
  {
    id: 'phase1',
    name: 'Phase 1: LAUNCH',
    status: 'complete',
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
    status: 'complete',
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
    status: 'active',
    items: [
      { feature: 'Leaderboard + achievement badges', devHours: 24, devRate: 150, aiHours: 2 },
      { feature: 'AI chatbot (FAQ + lead capture)', devHours: 40, devRate: 175, aiHours: 4 },
      { feature: 'Trust Check — Opportunity Evaluator', devHours: 24, devRate: 150, aiHours: 2 },
      { feature: 'Content Editor (replaced Sanity CMS)', devHours: 32, devRate: 175, aiHours: 3 },
      { feature: 'Profit Calculator (8 Aurum tiers)', devHours: 20, devRate: 150, aiHours: 2 },
      { feature: 'Beginner/Advanced onboarding (accordion)', devHours: 32, devRate: 150, aiHours: 3 },
      { feature: 'Mobile-responsive admin + partner dashboards', devHours: 16, devRate: 125, aiHours: 1.5 },
      { feature: 'Admin guide + platform documentation', devHours: 16, devRate: 125, aiHours: 1 },
      { feature: 'Partner self-registration flow', devHours: 16, devRate: 150, aiHours: 1.5 },
      { feature: 'SMS notifications (Twilio)', devHours: 12, devRate: 150, aiHours: 1 },
      { feature: 'Genealogy tree visualization', devHours: 32, devRate: 175, aiHours: 3 },
      { feature: 'Cohort analytics dashboard', devHours: 20, devRate: 175, aiHours: 2 },
      { feature: 'Push notifications (PWA)', devHours: 16, devRate: 150, aiHours: 1.5 },
    ],
  },
  {
    id: 'phase4',
    name: 'Phase 4: MOAT',
    status: 'planned',
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

interface ScoreEntry {
  category: string
  current: number
  max: number
  grade: string
}

const scorecard: ScoreEntry[] = [
  { category: 'Hero Clarity',        current: 7, max: 10, grade: 'B'  },
  { category: 'Visual Hierarchy',    current: 6, max: 10, grade: 'C+' },
  { category: 'Typography',          current: 7, max: 10, grade: 'B'  },
  { category: 'Color System',        current: 7, max: 10, grade: 'B'  },
  { category: 'Social Proof',        current: 7, max: 10, grade: 'B'  },
  { category: 'Motion & Animation',  current: 8, max: 10, grade: 'A-' },
  { category: 'Trust & Credibility', current: 7, max: 10, grade: 'B'  },
  { category: 'CTA Strategy',        current: 6, max: 10, grade: 'C+' },
  { category: 'Mobile',              current: 8, max: 10, grade: 'A-' },
  { category: 'Performance',         current: 6, max: 10, grade: 'C+' },
  { category: 'Content Depth',       current: 7, max: 10, grade: 'B'  },
  { category: 'Infrastructure',      current: 8, max: 10, grade: 'A-' },
]

const AI_COST_PER_HOUR = 0 // Antigravity included in subscription

const statusToneMap: Record<PhaseStatus, StatusTone> = {
  complete: 'blue',
  active:   'green',
  planned:  'neutral',
}

const statusLabelMap: Record<PhaseStatus, string> = {
  complete: '✅ Complete',
  active:   '🔨 In Progress',
  planned:  '📋 Planned',
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return '#059669' // emerald
  if (grade.startsWith('B')) return '#1b61c9'
  if (grade.startsWith('C')) return '#b45309' // amber
  return '#b91c1c'
}

interface PhaseItemRow extends PhaseItem {
  devCost: number
  saved: number
}

const phaseColumns: ReadonlyArray<DataColumn<PhaseItemRow>> = [
  {
    key: 'feature',
    header: 'Feature',
    render: (row) => <span style={{ color: 'rgba(4,14,32,0.69)' }}>{row.feature}</span>,
  },
  {
    key: 'devHours',
    header: 'Dev Hours',
    align: 'right',
    render: (row) => <span style={{ color: 'rgba(4,14,32,0.45)' }}>{row.devHours}h</span>,
  },
  {
    key: 'devRate',
    header: 'Dev Rate',
    align: 'right',
    render: (row) => <span style={{ color: 'rgba(4,14,32,0.45)' }}>${row.devRate}/h</span>,
  },
  {
    key: 'devCost',
    header: 'Dev Cost',
    align: 'right',
    render: (row) => <span style={{ color: '#dc2626' }}>{formatCurrency(row.devCost)}</span>,
  },
  {
    key: 'aiHours',
    header: 'Our Time',
    align: 'right',
    render: (row) => <span style={{ color: '#059669' }}>{row.aiHours}h</span>,
  },
  {
    key: 'saved',
    header: 'You Saved',
    align: 'right',
    render: (row) => (
      <span className="font-semibold" style={{ color: '#1b61c9' }}>
        {formatCurrency(row.saved)}
      </span>
    ),
  },
]

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
  const fasterPct = grandDevHours > 0
    ? Math.round(((grandDevHours - grandAiHours) / grandDevHours) * 100)
    : 0

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <SectionHeader
        title="AutopilotROI Strategy Roadmap"
        subtitle="Competitive positioning, phase roadmap, and cost analysis vs. traditional dev teams."
      />

      {/* ── Grand Total Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(120deg, rgba(16,185,129,0.08), rgba(27,97,201,0.08))',
          border: '1px solid rgba(16,185,129,0.25)',
        }}
      >
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full" style={{ background: 'rgba(16,185,129,0.18)', filter: 'blur(48px)' }} />
        <div className="relative grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Dev Team Cost" value={formatCurrency(grandDevTotal)} delta={`${grandDevHours} hours`} trend="down" />
          <StatCard
            label="Our Cost"
            value="Priceless"
            delta="Antigravity + Google Ultra + Jody"
            trend="up"
          />
          <StatCard label="Total Savings" value={formatCurrency(grandSavings)} delta="100% saved" trend="up" />
          <StatCard
            label="Time Saved"
            value={`${Math.round(grandDevHours / 8)} → ${Math.round(grandAiHours / 8)} days`}
            delta={`${fasterPct}% faster`}
            trend="up"
          />
        </div>
      </motion.div>

      {/* ── Competitive Scorecard ── */}
      <Card padding="flush">
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #e0e2e6' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#181d26', fontFamily: 'var(--font-sora)' }}>
            Competitive Scorecard
          </h2>
          <p className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
            vs. best-in-class crypto onboarding funnels (2026)
          </p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {scorecard.map((s) => {
            const color = gradeColor(s.grade)
            const pct = (s.current / s.max) * 100
            return (
              <div
                key={s.category}
                className="rounded-xl p-4"
                style={{ background: '#ffffff', border: '1px solid #e0e2e6' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#181d26' }}>{s.category}</span>
                  <span className="text-sm font-bold" style={{ color }}>{s.grade}</span>
                </div>
                <div className="h-2 w-full rounded-full" style={{ background: '#f0f2f5' }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <div className="mt-1 text-xs" style={{ color: 'rgba(4,14,32,0.45)' }}>
                  {s.current}/{s.max} features
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ── Phase Breakdown ── */}
      {allPhases.map((phase, phaseIdx) => {
        const rows: PhaseItemRow[] = phase.items.map((item) => {
          const devCost = item.devHours * item.devRate
          const aiCost = item.aiHours * AI_COST_PER_HOUR
          return { ...item, devCost, saved: devCost - aiCost }
        })

        return (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(phaseIdx * 0.05, 0.2) }}
          >
            <Card padding="flush">
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                style={{ borderBottom: '1px solid #e0e2e6', background: '#f8fafc' }}
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold" style={{ color: '#181d26', fontFamily: 'var(--font-sora)' }}>
                    {phase.name}
                  </h2>
                  <StatusBadge tone={statusToneMap[phase.status]}>
                    {statusLabelMap[phase.status]}
                  </StatusBadge>
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span style={{ color: 'rgba(4,14,32,0.45)' }}>
                    Dev: <span className="font-semibold" style={{ color: '#dc2626' }}>{formatCurrency(phase.devTotal)}</span>
                  </span>
                  <span style={{ color: 'rgba(4,14,32,0.45)' }}>
                    Our: <span className="font-semibold italic" style={{ color: '#059669' }}>Priceless</span>
                  </span>
                  <span style={{ color: 'rgba(4,14,32,0.45)' }}>
                    Saved: <span className="font-semibold" style={{ color: '#1b61c9' }}>{formatCurrency(phase.savings)}</span>
                  </span>
                </div>
              </div>

              <DataTable
                columns={phaseColumns}
                rows={rows}
                rowKey={(_r, i) => `${phase.id}-${i}`}
              />
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
