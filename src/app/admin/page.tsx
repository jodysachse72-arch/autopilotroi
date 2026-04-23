'use client'

import Link from 'next/link'
import { StatCard, SectionHeader, ActionCard, Card } from '@/components/backend'
import { StatusBadge } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN DASHBOARD — at-a-glance overview
   ═══════════════════════════════════════════════════════════════ */

const stats = [
  { label: 'Total Users',          value: '142', delta: '+12 this week',  trend: 'up'   as const, icon: '👥' },
  { label: 'Active Partners',      value: '23',  delta: '+3 this month',  trend: 'up'   as const, icon: '🤝' },
  { label: 'Pending Prospects',    value: '8',   delta: '5 unassigned',   trend: 'flat' as const, icon: '⏳' },
  { label: 'Completed Onboardings',value: '97',  delta: '68% conversion', trend: 'up'   as const, icon: '✅' },
]

const activity = [
  { icon: '🆕', action: 'New prospect signed up',          user: 'alex@example.com',   time: '2m ago' },
  { icon: '📋', action: 'Readiness assessment completed',  user: 'sarah@example.com',  time: '15m ago' },
  { icon: '⬆️', action: 'Partner promoted to Active',      user: 'james@example.com',  time: '1h ago' },
  { icon: '🎓', action: 'Onboarding completed',            user: 'maria@example.com',  time: '3h ago' },
  { icon: '🆕', action: 'New prospect signed up',          user: 'lisa@example.com',   time: '5h ago' },
]

const unassigned = [
  { name: 'John Doe',     email: 'john@example.com',  score: 42 },
  { name: 'Emma Brown',   email: 'emma@example.com',  score: 18 },
  { name: 'Mike Johnson', email: 'mike@example.com',  score: 73 },
]

const quickActions = [
  { href: '/admin/partners',  icon: '🤝', title: 'Manage Partners',  description: 'Add, edit, and manage active partner accounts.', cta: 'Open partners' },
  { href: '/admin/prospects', icon: '👥', title: 'Prospect Queue',   description: 'Filter, triage, and assign incoming prospects.', cta: 'Open queue' },
  { href: '/admin/cms',       icon: '✏️', title: 'CMS Studio',       description: 'Edit homepage, blog, and university content.', cta: 'Open studio' },
  { href: '/admin/roadmap',   icon: '🗺️', title: 'Strategy & Roadmap',description: 'Track phases, milestones, and platform goals.', cta: 'View roadmap' },
  { href: '/admin/changelog', icon: '📝', title: 'Changelog',        description: 'Document every feature and bug fix shipped.', cta: 'View changes' },
  { href: '/admin/checklist', icon: '✅', title: 'Launch Checklist', description: 'Interactive pre-launch and go-live phase checklists.', cta: 'Open checklist' },
]

function scoreColor(s: number) {
  if (s >= 60) return 'green'
  if (s >= 30) return 'amber'
  return 'red'
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} trend={s.trend} icon={s.icon} />
        ))}
      </div>

      {/* Activity + Unassigned */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* Recent Activity */}
        <Card padding="flush">
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #e2e8f0' }}>
            <h2 className="be-section-title" style={{ fontSize: '0.9375rem' }}>
              Recent Activity
            </h2>
            <Link href="/admin/audit" className="text-xs font-semibold" style={{ color: '#1b61c9' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className="mt-0.5 text-base leading-none shrink-0" aria-hidden>{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: '#0f172a' }}>{a.action}</p>
                  <p className="text-xs truncate" style={{ color: 'rgba(15,23,42,0.50)' }}>{a.user}</p>
                </div>
                <span className="shrink-0 text-xs" style={{ color: 'rgba(15,23,42,0.40)' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Unassigned Prospects */}
        <Card padding="flush">
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #e2e8f0' }}>
            <h2 className="text-sm font-bold" style={{ color: '#0f172a' }}>
              ⚠️ Unassigned Prospects
            </h2>
            <Link href="/admin/prospects" className="text-xs font-semibold" style={{ color: '#1b61c9' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
            {unassigned.map(p => (
              <div key={p.email} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#0f172a' }}>{p.name}</p>
                  <p className="text-xs truncate" style={{ color: 'rgba(15,23,42,0.50)' }}>{p.email}</p>
                </div>
                <StatusBadge tone={scoreColor(p.score)}>{p.score}/100</StatusBadge>
                <Link href="/admin/prospects"
                  className="be-btn be-btn--sm be-btn--primary shrink-0">
                  Assign
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Quick Actions" subtitle="Jump to the most-used admin tools" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {quickActions.map(a => (
          <ActionCard key={a.href} {...a} />
        ))}
      </div>
    </div>
  )
}
