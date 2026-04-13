'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { InfoTip } from '@/components/ui/Tooltip'

/* ═══════════════════════════════════════════════════════════════
   PARTNER DASHBOARD v1 — Live lead tracking with pipeline
   Pulls from /api/dashboard/stats API (Supabase-backed)
   Falls back to demo data if API unavailable
   ═══════════════════════════════════════════════════════════════ */

interface Lead {
  id: string
  name: string
  email: string
  tier: string
  score: number
  status: string
  created_at: string
  drip_emails_sent?: string[]
}

interface DashboardStats {
  total: number
  assessed: number
  onboarding: number
  active: number
  avgScore: number
  thisWeek: number
  conversionRate: number
}

const demoLeads: Lead[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', tier: 'beginner', score: 28, status: 'assessed', created_at: '2026-04-10T14:30:00Z' },
  { id: '2', name: 'James Wilson', email: 'james@example.com', tier: 'intermediate', score: 55, status: 'invited', created_at: '2026-04-09T09:15:00Z' },
  { id: '3', name: 'Maria Garcia', email: 'maria@example.com', tier: 'advanced', score: 85, status: 'onboarding', created_at: '2026-04-08T11:00:00Z' },
  { id: '4', name: 'Alex Thompson', email: 'alex@example.com', tier: 'beginner', score: 15, status: 'new', created_at: '2026-04-11T16:45:00Z' },
  { id: '5', name: 'Lisa Park', email: 'lisa@example.com', tier: 'intermediate', score: 62, status: 'active', created_at: '2026-04-07T08:20:00Z' },
  { id: '6', name: 'Michael Brown', email: 'michael@example.com', tier: 'advanced', score: 91, status: 'active', created_at: '2026-04-06T10:00:00Z' },
  { id: '7', name: 'Emily Davis', email: 'emily@example.com', tier: 'beginner', score: 22, status: 'assessed', created_at: '2026-04-11T20:30:00Z' },
]

const statusOptions = ['all', 'new', 'assessed', 'invited', 'onboarding', 'active']

const tierBadge: Record<string, string> = {
  beginner: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  intermediate: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
  advanced: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
}

const statusBadge: Record<string, string> = {
  new: 'bg-purple-500/15 text-purple-300',
  assessed: 'bg-amber-500/15 text-amber-300',
  invited: 'bg-blue-500/15 text-blue-300',
  onboarding: 'bg-cyan-500/15 text-cyan-300',
  active: 'bg-emerald-500/15 text-emerald-300',
}

const statusFlow = ['new', 'assessed', 'invited', 'onboarding', 'active']

function computeStats(leads: Lead[]): DashboardStats {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const active = leads.filter((l) => l.status === 'active').length
  const total = leads.length

  return {
    total,
    assessed: leads.filter((l) => l.status === 'assessed').length,
    onboarding: leads.filter((l) => l.status === 'onboarding').length,
    active,
    avgScore: total > 0 ? Math.round(leads.reduce((s, l) => s + l.score, 0) / total) : 0,
    thisWeek: leads.filter((l) => new Date(l.created_at) >= weekAgo).length,
    conversionRate: total > 0 ? Math.round((active / total) * 100) : 0,
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function DashboardOverview() {
  const [leads, setLeads] = useState<Lead[]>(demoLeads)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')
  const [isLive, setIsLive] = useState(false)

  // Try to fetch live data from API
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/leads')
      if (res.ok) {
        const data = await res.json()
        if (data.leads?.length > 0) {
          setLeads(data.leads)
          setIsLive(true)
        }
      }
    } catch {
      // Use demo data
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const stats = computeStats(leads)

  // Filter + search + sort
  let filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))
  }
  filtered = [...filtered].sort((a, b) =>
    sortBy === 'date'
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : b.score - a.score
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
              Welcome back, Partner 👋
            </h2>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              {isLive ? '🟢 Connected to live data' : '🟡 Showing demo data — configure Supabase for live tracking'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/links"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              🔗 Generate Link
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Leads', value: stats.total, icon: '👥', change: `+${stats.thisWeek} this week`, tip: 'Everyone who has filled out the signup form, whether or not they finished the quiz.' },
          { label: 'Avg Score', value: `${stats.avgScore}/100`, icon: '📊', change: 'readiness score', tip: 'The average readiness score across all your leads. Higher = more experienced with crypto.' },
          { label: 'In Pipeline', value: stats.assessed + stats.onboarding, icon: '🎯', change: 'assessed + onboarding', tip: 'Leads who completed the quiz but haven\'t finished setting up their account yet. These need attention.' },
          { label: 'Conversion', value: `${stats.conversionRate}%`, icon: '✅', change: `${stats.active} active members`, tip: 'Percentage of leads that completed onboarding and are now active. Industry average is 10-20%.' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="mt-2 font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              {stat.label}
              {stat.tip && <InfoTip content={stat.tip} />}
            </div>
            <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline Funnel */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
        <h3 className="flex items-center gap-2 font-[var(--font-sora)] text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          Pipeline Funnel
          <InfoTip content="Shows where your leads are in the journey." detail="New → Assessed (took the quiz) → Invited (you reached out) → Onboarding (setting up) → Active (using the platform). Ideally, most leads move right." />
        </h3>
        <div className="flex items-end gap-2">
          {statusFlow.map((s) => {
            const count = leads.filter((l) => l.status === s).length
            const maxCount = Math.max(...statusFlow.map((s2) => leads.filter((l) => l.status === s2).length), 1)
            const height = Math.max((count / maxCount) * 100, 8)
            return (
              <div key={s} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-[var(--text-primary)]">{count}</span>
                <div className="w-full relative" style={{ height: '80px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`absolute bottom-0 w-full rounded-t-lg ${
                      s === 'active' ? 'bg-emerald-500/40' :
                      s === 'onboarding' ? 'bg-cyan-500/40' :
                      s === 'invited' ? 'bg-blue-500/40' :
                      s === 'assessed' ? 'bg-amber-500/40' : 'bg-purple-500/40'
                    }`}
                  />
                </div>
                <span className="text-xs text-[var(--text-muted)] capitalize">{s}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leads table with search + sort + filter */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-[var(--border-primary)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
            All Leads
          </h3>
          <div className="flex items-center gap-3">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-9 w-40 rounded-lg border border-[var(--border-primary)] bg-transparent px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500"
            />
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
              className="h-9 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] px-2 text-sm text-[var(--text-secondary)] outline-none"
            >
              <option value="date">Newest</option>
              <option value="score">Top Score</option>
            </select>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto border-b border-[var(--border-primary)] px-6 py-3 scrollbar-hide">
          {statusOptions.map((s) => {
            const count = s === 'all' ? leads.length : leads.filter((l) => l.status === s).length
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                  filter === s
                    ? 'bg-blue-600 text-white'
                    : 'border border-[var(--border-primary)] bg-transparent text-[var(--text-secondary)]'
                }`}
              >
                {s} ({count})
              </button>
            )
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)] text-left text-[var(--text-muted)]">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Readiness</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Drips Sent</th>
                <th className="px-6 py-3 font-medium">When</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No leads match your filters
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[var(--border-primary)] transition hover:bg-[var(--bg-card-hover)]"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{p.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${tierBadge[p.tier] || tierBadge.beginner}`}>
                        {p.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-white/5">
                          <div
                            className={`h-1.5 rounded-full ${p.score >= 70 ? 'bg-emerald-400' : p.score >= 40 ? 'bg-blue-400' : 'bg-amber-400'}`}
                            style={{ width: `${p.score}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-[var(--text-primary)]">{p.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[p.status] || ''}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[var(--text-muted)]">
                        {p.drip_emails_sent?.length || 0}/5
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[var(--text-muted)]">
                      {timeAgo(p.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}/signup?ref=partner`
                            navigator.clipboard.writeText(link)
                          }}
                          className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/25"
                        >
                          Send Link
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-primary)] px-6 py-3">
          <span className="text-xs text-[var(--text-muted)]">
            Showing {filtered.length} of {leads.length} leads
          </span>
          <Link href="/dashboard/prospects" className="text-xs text-blue-400 hover:text-blue-300 transition">
            View full list →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/dashboard/links"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 transition hover:border-blue-500/30"
        >
          <div className="text-2xl mb-2">🔗</div>
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            Referral Links
          </h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Generate hot, cold, and page-specific links with QR codes.
          </p>
        </Link>
        <Link
          href="/dashboard/videos"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 transition hover:border-blue-500/30"
        >
          <div className="text-2xl mb-2">🎬</div>
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            Partner Videos
          </h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Sales training, product deep dives, and social media strategy.
          </p>
        </Link>
        <Link
          href="/resources"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 transition hover:border-blue-500/30"
        >
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            Resources
          </h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Downloadable guides, marketing materials, and partner assets.
          </p>
        </Link>
        <Link
          href="/dashboard/settings"
          className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 transition hover:border-blue-500/30"
        >
          <div className="text-2xl mb-2">⚙️</div>
          <h3 className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition">
            Profile Settings
          </h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Update your profile, social links, and notification preferences.
          </p>
        </Link>
      </div>
    </div>
  )
}
