'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const systemStats = [
  { label: 'Total Users', value: '142', change: '+12 this week', icon: '👥' },
  { label: 'Active Partners', value: '23', change: '+3 this month', icon: '🤝' },
  { label: 'Pending Prospects', value: '8', change: '5 unassigned', icon: '⏳' },
  { label: 'Completed Onboardings', value: '97', change: '68% conversion', icon: '✅' },
]

const recentActivity = [
  { action: 'New prospect signed up', user: 'alex@example.com', time: '2 min ago', type: 'signup' },
  { action: 'Readiness assessment completed', user: 'sarah@example.com', time: '15 min ago', type: 'assessment' },
  { action: 'Partner promoted', user: 'james@example.com', time: '1 hour ago', type: 'promotion' },
  { action: 'Onboarding completed', user: 'maria@example.com', time: '3 hours ago', type: 'complete' },
  { action: 'New prospect signed up', user: 'lisa@example.com', time: '5 hours ago', type: 'signup' },
]

const unassignedProspects = [
  { name: 'John Doe', email: 'john@example.com', score: 42, tier: 'intermediate', date: '2026-04-11' },
  { name: 'Emma Brown', email: 'emma@example.com', score: 18, tier: 'beginner', date: '2026-04-11' },
  { name: 'Mike Johnson', email: 'mike@example.com', score: 73, tier: 'advanced', date: '2026-04-10' },
]

const activityIcons: Record<string, string> = {
  signup: '🆕',
  assessment: '📋',
  promotion: '⬆️',
  complete: '✅',
}

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* System stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
          >
            <div className="text-2xl">{stat.icon}</div>
            <div className="mt-2 font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</div>
            <div className="mt-1 text-xs text-blue-400">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <div className="border-b border-[var(--border-primary)] px-6 py-4">
            <h3 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-[var(--border-primary)]">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <span className="text-lg">{activityIcons[item.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {item.action}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] truncate">
                    {item.user}
                  </div>
                </div>
                <div className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unassigned prospects */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] px-6 py-4">
            <h3 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
              ⚠️ Unassigned Prospects
            </h3>
            <Link
              href="/admin/prospects"
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-primary)]">
            {unassignedProspects.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {p.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{p.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {p.score}/100
                  </span>
                  <button className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/25">
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/partners"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-blue-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            🤝 Manage Partners
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Add, edit, and manage referral partners
          </p>
        </Link>
        <Link
          href="/admin/prospects"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-blue-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            👥 Prospect Queue
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            View, filter, and assign prospects
          </p>
        </Link>
        <Link
          href="/studio"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-blue-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            🎨 CMS Studio
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Edit homepage, blog, university content
          </p>
        </Link>
        <Link
          href="/admin/roadmap"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-emerald-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-emerald-400 transition">
            📊 Strategy & Roadmap
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Competitive analysis, cost savings, phase plan
          </p>
        </Link>
        <Link
          href="/admin/changelog"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-purple-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-purple-400 transition">
            📝 Changelog
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Complete history of everything built
          </p>
        </Link>
        <Link
          href="/admin/checklist"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-amber-500/30"
        >
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-amber-400 transition">
            ✅ Launch Checklist
          </h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Interactive pre-launch and phase checklists
          </p>
        </Link>
      </div>
    </div>
  )
}
