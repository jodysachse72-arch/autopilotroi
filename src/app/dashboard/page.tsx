'use client'

import Link from 'next/link'
import { StatCard, SectionHeader, ActionCard, Card } from '@/components/backend'
import { StatusBadge } from '@/components/backend'

const stats = [
  { label: 'My Prospects',     value: '18',    delta: '+3 this week',  trend: 'up'   as const, icon: '👥' },
  { label: 'Qualified Leads',  value: '9',     delta: '50% qualified', trend: 'up'   as const, icon: '⭐' },
  { label: 'Completed',        value: '6',     delta: '33% converted', trend: 'up'   as const, icon: '✅' },
  { label: 'Est. Commission',  value: '$2,400',delta: 'This quarter',  trend: 'flat' as const, icon: '💰' },
]

const activity = [
  { icon: '📋', name: 'Alex Turner',    action: 'Completed assessment',    score: 72, time: '2h ago',  stage: 'Invited'    as const },
  { icon: '🆕', name: 'Priya Sharma',   action: 'Applied via referral link', score: 88, time: '5h ago', stage: 'Applied'    as const },
  { icon: '🎓', name: 'Tom Baker',      action: 'Completed onboarding',    score: 91, time: '1d ago',  stage: 'Completed'  as const },
  { icon: '👀', name: 'Nina Patel',     action: 'Viewing evaluation',       score: 45, time: '2d ago',  stage: 'Evaluating' as const },
]

const stageTone: Record<string, 'blue'|'amber'|'green'|'neutral'> = {
  Applied: 'neutral', Invited: 'blue', Evaluating: 'amber', Completed: 'green',
}

const quickActions = [
  { href: '/dashboard/prospects',   icon: '👥', title: 'My Prospects',    description: 'View, filter, and manage your assigned prospects.', cta: 'Open' },
  { href: '/dashboard/performance', icon: '📈', title: 'Performance',     description: 'Conversion rates, trends, and your key metrics.',  cta: 'Open' },
  { href: '/dashboard/links',       icon: '🔗', title: 'Referral Links',  description: 'Generate and track your personal referral links.', cta: 'Open' },
  { href: '/dashboard/leaderboard', icon: '🏆', title: 'Leaderboard',     description: 'See your ranking among all active partners.',      cta: 'Open' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
            Welcome back, Partner 👋
          </h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Here&apos;s what&apos;s happening with your partner account today.
          </p>
        </div>
        <Link href="/dashboard/prospects" className="be-btn be-btn--primary hidden sm:flex">
          + Add Prospect
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Activity + Commission */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card padding="flush">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
            <h3 className="text-sm font-bold" style={{ color: '#0f172a' }}>Recent Activity</h3>
            <Link href="/dashboard/prospects" className="text-xs font-semibold" style={{ color: '#1b61c9' }}>View all →</Link>
          </div>
          <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-base shrink-0" aria-hidden>{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#0f172a' }}>{a.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{a.action}</p>
                </div>
                <StatusBadge tone={stageTone[a.stage]}>{a.stage}</StatusBadge>
                <span className="text-xs shrink-0" style={{ color: 'rgba(15,23,42,0.40)' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Commission card */}
        <Card>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>💰 Commission Summary</h3>
          <div className="space-y-3">
            {[
              { label: 'Q2 2026 (current)', value: '$2,400', note: 'Estimated' },
              { label: 'Q1 2026',            value: '$3,150', note: 'Paid' },
              { label: 'Q4 2025',            value: '$2,800', note: 'Paid' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#0f172a' }}>{row.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{row.note}</p>
                </div>
                <p className="text-base font-bold" style={{ color: '#0f172a' }}>{row.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(27,97,201,0.06)', border: '1px solid rgba(27,97,201,0.12)' }}>
            <p className="text-xs" style={{ color: '#1b61c9' }}>💡 Refer 2 more qualified leads this month to unlock Gold tier status and a 25% commission boost.</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Quick Actions" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickActions.map(a => <ActionCard key={a.href} {...a} />)}
      </div>
    </div>
  )
}
