'use client'

import { motion } from 'framer-motion'
import {
  StatCard,
  Card,
  ActionCard,
  SectionHeader,
  StatusBadge,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN DASHBOARD — at-a-glance overview.
   Refactored onto backend primitives so style lives in CSS, not
   inline classes against non-existent CSS variables.
   ═══════════════════════════════════════════════════════════════ */

const systemStats = [
  { label: 'Total Users',            value: '142', delta: '+12 this week',  trend: 'up' as const,   icon: '👥' },
  { label: 'Active Partners',        value: '23',  delta: '+3 this month',  trend: 'up' as const,   icon: '🤝' },
  { label: 'Pending Prospects',      value: '8',   delta: '5 unassigned',   trend: 'flat' as const, icon: '⏳' },
  { label: 'Completed Onboardings',  value: '97',  delta: '68% conversion', trend: 'up' as const,   icon: '✅' },
]

const recentActivity = [
  { action: 'New prospect signed up',          user: 'alex@example.com',   time: '2 min ago',  type: 'signup'     as const },
  { action: 'Readiness assessment completed',  user: 'sarah@example.com',  time: '15 min ago', type: 'assessment' as const },
  { action: 'Partner promoted',                user: 'james@example.com',  time: '1 hour ago', type: 'promotion'  as const },
  { action: 'Onboarding completed',            user: 'maria@example.com',  time: '3 hours ago',type: 'complete'   as const },
  { action: 'New prospect signed up',          user: 'lisa@example.com',   time: '5 hours ago',type: 'signup'     as const },
]

const unassignedProspects = [
  { name: 'John Doe',     email: 'john@example.com',  score: 42 },
  { name: 'Emma Brown',   email: 'emma@example.com',  score: 18 },
  { name: 'Mike Johnson', email: 'mike@example.com',  score: 73 },
]

type ActivityType = 'signup' | 'assessment' | 'promotion' | 'complete'
const activityIcons: Record<ActivityType, string> = {
  signup:     '🆕',
  assessment: '📋',
  promotion:  '⬆️',
  complete:   '✅',
}

function scoreTone(score: number): 'green' | 'amber' | 'red' {
  if (score >= 60) return 'green'
  if (score >= 30) return 'amber'
  return 'red'
}

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* System stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              trend={stat.trend}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Two-column: Recent activity + Unassigned prospects */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card padding="flush">
          <SectionHeader
            title="Recent Activity"
            className="px-5 pt-5 mb-0"
          />
          <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3">
                <span className="text-base leading-none" aria-hidden>
                  {activityIcons[item.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {item.action}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-weak)' }}>
                    {item.user}
                  </p>
                </div>
                <span className="text-xs whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="flush">
          <SectionHeader
            title="⚠️ Unassigned Prospects"
            actions={
              <a
                href="/admin/prospects"
                className="text-xs font-semibold"
                style={{ color: 'var(--color-blue)' }}
              >
                View all →
              </a>
            }
            className="px-5 pt-5 mb-0"
          />
          <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {unassignedProspects.map((p, i) => (
              <li key={i} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                    {p.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-weak)' }}>
                    {p.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge tone={scoreTone(p.score)}>{p.score}/100</StatusBadge>
                  <button
                    type="button"
                    className="be-btn be-btn--secondary be-btn--sm"
                  >
                    Assign
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="be-section-title mb-3">Quick actions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            href="/admin/partners"
            icon="🤝"
            title="Manage Partners"
            description="Add, edit, and manage referral partners."
            cta="Open partners"
          />
          <ActionCard
            href="/admin/prospects"
            icon="👥"
            title="Prospect Queue"
            description="View, filter, and assign prospects."
            cta="Open queue"
          />
          <ActionCard
            href="/studio"
            icon="🎨"
            title="CMS Studio"
            description="Edit homepage, blog, and university content."
            cta="Open studio"
          />
          <ActionCard
            href="/admin/roadmap"
            icon="🗺️"
            title="Strategy & Roadmap"
            description="Competitive analysis, cost savings, phase plan."
            cta="See roadmap"
          />
          <ActionCard
            href="/admin/changelog"
            icon="📝"
            title="Changelog"
            description="Complete history of everything built."
            cta="See changes"
          />
          <ActionCard
            href="/admin/checklist"
            icon="✅"
            title="Launch Checklist"
            description="Interactive pre-launch and phase checklists."
            cta="Open checklist"
          />
        </div>
      </div>
    </div>
  )
}
