'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { InfoTip } from '@/components/ui/tooltip'
import PartnerOnboardingWizard from '@/components/ui/PartnerOnboardingWizard'
import {
  StatCard,
  Card,
  ActionCard,
  SectionHeader,
  StatusBadge,
  FilterPill,
  FormInput,
  FormSelect,
  type StatusTone,
} from '@/components/backend'

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PARTNER DASHBOARD â€” Live lead tracking with pipeline.
   Refactored to use backend primitives + canonical CSS tokens.
   Falls back to demo data when /api/dashboard/leads is unavailable.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

interface Lead {
  id: string
  name: string
  email: string
  tier: 'beginner' | 'intermediate' | 'advanced'
  score: number
  status: 'new' | 'assessed' | 'invited' | 'onboarding' | 'active'
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
  { id: '1', name: 'Sarah Chen',     email: 'sarah@example.com',   tier: 'beginner',     score: 28, status: 'assessed',   created_at: '2026-04-10T14:30:00Z' },
  { id: '2', name: 'James Wilson',   email: 'james@example.com',   tier: 'intermediate', score: 55, status: 'invited',    created_at: '2026-04-09T09:15:00Z' },
  { id: '3', name: 'Maria Garcia',   email: 'maria@example.com',   tier: 'advanced',     score: 85, status: 'onboarding', created_at: '2026-04-08T11:00:00Z' },
  { id: '4', name: 'Alex Thompson',  email: 'alex@example.com',    tier: 'beginner',     score: 15, status: 'new',        created_at: '2026-04-11T16:45:00Z' },
  { id: '5', name: 'Lisa Park',      email: 'lisa@example.com',    tier: 'intermediate', score: 62, status: 'active',     created_at: '2026-04-07T08:20:00Z' },
  { id: '6', name: 'Michael Brown',  email: 'michael@example.com', tier: 'advanced',     score: 91, status: 'active',     created_at: '2026-04-06T10:00:00Z' },
  { id: '7', name: 'Emily Davis',    email: 'emily@example.com',   tier: 'beginner',     score: 22, status: 'assessed',   created_at: '2026-04-11T20:30:00Z' },
]

const STATUS_FILTERS = ['all', 'new', 'assessed', 'invited', 'onboarding', 'active'] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]
const STATUS_FLOW: Lead['status'][] = ['new', 'assessed', 'invited', 'onboarding', 'active']

const tierTone: Record<Lead['tier'], StatusTone> = {
  beginner:     'amber',
  intermediate: 'blue',
  advanced:     'green',
}

const statusTone: Record<Lead['status'], StatusTone> = {
  new:        'purple',
  assessed:   'amber',
  invited:    'blue',
  onboarding: 'blue',
  active:     'green',
}

const funnelColor: Record<Lead['status'], string> = {
  new:        '#a78bfa',
  assessed:   '#fbbf24',
  invited:    '#60a5fa',
  onboarding: '#22d3ee',
  active:     '#34d399',
}

function computeStats(leads: Lead[]): DashboardStats {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const active = leads.filter(l => l.status === 'active').length
  const total = leads.length
  return {
    total,
    assessed:       leads.filter(l => l.status === 'assessed').length,
    onboarding:     leads.filter(l => l.status === 'onboarding').length,
    active,
    avgScore:       total > 0 ? Math.round(leads.reduce((s, l) => s + l.score, 0) / total) : 0,
    thisWeek:       leads.filter(l => new Date(l.created_at) >= weekAgo).length,
    conversionRate: total > 0 ? Math.round((active / total) * 100) : 0,
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function scoreBarColor(score: number): string {
  if (score >= 70) return '#10b981'
  if (score >= 40) return '#3b82f6'
  return '#f59e0b'
}

export default function DashboardOverview() {
  const [leads, setLeads] = useState<Lead[]>(demoLeads)
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')
  const [isLive, setIsLive] = useState(false)

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
      // demo mode
    }
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch from external API on mount; setState inside fetchLeads is the fetch callback
  useEffect(() => { fetchLeads() }, [fetchLeads])

  const stats = computeStats(leads)

  let filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))
  }
  filtered = [...filtered].sort((a, b) =>
    sortBy === 'date'
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : b.score - a.score
  )

  function copyLink() {
    const link = `${window.location.origin}/signup?ref=partner`
    navigator.clipboard.writeText(link)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PartnerOnboardingWizard />

      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card padding="lg" className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
            style={{ background: 'rgba(27,97,201,0.06)', filter: 'blur(48px)' }}
            aria-hidden
          />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)', letterSpacing: '-0.015em' }}>
                Welcome back, Partner ðŸ‘‹
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-text-weak)' }}>
                {isLive
                  ? 'ðŸŸ¢ Connected to live data'
                  : 'ðŸŸ¡ Showing demo data â€” configure Supabase for live tracking'}
              </p>
            </div>
            <Link href="/dashboard/links" className="be-btn be-btn--primary">
              ðŸ”— Generate Link
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Leads',  value: String(stats.total),                       delta: `+${stats.thisWeek} this week`,    trend: 'up'   as const, icon: 'ðŸ‘¥', tip: 'Everyone who has filled out the signup form, whether or not they finished the quiz.' },
          { label: 'Avg Score',    value: `${stats.avgScore}/100`,                   delta: 'readiness score',                  trend: 'flat' as const, icon: 'ðŸ“Š', tip: 'The average readiness score across all your leads. Higher = more experienced with crypto.' },
          { label: 'In Pipeline',  value: String(stats.assessed + stats.onboarding), delta: 'assessed + onboarding',            trend: 'flat' as const, icon: 'ðŸŽ¯', tip: 'Leads who completed the quiz but haven\'t finished setting up their account yet. These need attention.' },
          { label: 'Conversion',   value: `${stats.conversionRate}%`,                delta: `${stats.active} active members`,    trend: 'up'   as const, icon: 'âœ…', tip: 'Percentage of leads that completed onboarding and are now active. Industry average is 10-20%.' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <StatCard
              label={
                <span className="inline-flex items-center gap-1.5">
                  {stat.label}
                  <InfoTip content={stat.tip} />
                </span> as unknown as string
              }
              value={stat.value}
              delta={stat.delta}
              trend={stat.trend}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Pipeline funnel */}
      <Card padding="lg">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="be-section-title">Pipeline Funnel</h3>
          <InfoTip
            content="Shows where your leads are in the journey."
            detail="New â†’ Assessed (took the quiz) â†’ Invited (you reached out) â†’ Onboarding (setting up) â†’ Active (using the platform). Ideally, most leads move right."
          />
        </div>
        <div className="flex items-end gap-2">
          {STATUS_FLOW.map((s) => {
            const count = leads.filter(l => l.status === s).length
            const maxCount = Math.max(...STATUS_FLOW.map(s2 => leads.filter(l => l.status === s2).length), 1)
            const heightPct = Math.max((count / maxCount) * 100, 8)
            return (
              <div key={s} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{count}</span>
                <div className="w-full relative" style={{ height: '80px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 w-full rounded-t-lg"
                    style={{ background: funnelColor[s], opacity: 0.85 }}
                  />
                </div>
                <span className="text-xs capitalize" style={{ color: 'var(--color-text-weak)' }}>{s}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Leads table */}
      <Card padding="flush">
        <div className="px-5 pt-5">
          <SectionHeader
            title="All Leads"
            actions={
              <>
                <FormInput
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Searchâ€¦"
                  className="!w-44"
                />
                <FormSelect
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                  className="!w-auto"
                >
                  <option value="date">Newest</option>
                  <option value="score">Top Score</option>
                </FormSelect>
              </>
            }
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {STATUS_FILTERS.map((s) => {
            const count = s === 'all' ? leads.length : leads.filter(l => l.status === s).length
            return (
              <FilterPill
                key={s}
                label={s.charAt(0).toUpperCase() + s.slice(1)}
                count={count}
                active={filter === s}
                onClick={() => setFilter(s)}
              />
            )
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto" style={{ borderTop: '1px solid var(--color-border)' }}>
          <table className="be-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tier</th>
                <th>Score</th>
                <th>Status</th>
                <th>Drips</th>
                <th>When</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="be-empty">No leads match your filters</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td>
                      <div className="font-medium" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-weak)' }}>{p.email}</div>
                    </td>
                    <td>
                      <StatusBadge tone={tierTone[p.tier]}>{p.tier}</StatusBadge>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full" style={{ background: 'rgba(15,23,42,0.08)' }}>
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${p.score}%`, background: scoreBarColor(p.score) }}
                          />
                        </div>
                        <span className="font-mono text-xs" style={{ color: 'var(--color-text)' }}>{p.score}</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>
                        {p.drip_emails_sent?.length || 0}/5
                      </span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>
                        {timeAgo(p.created_at)}
                      </span>
                    </td>
                    <td>
                      <button type="button" onClick={copyLink} className="be-btn be-btn--secondary be-btn--sm">
                        Send Link
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y" style={{ borderColor: 'var(--color-border)', borderTop: '1px solid var(--color-border)' }}>
          {filtered.length === 0 ? (
            <div className="be-empty">No leads match your filters</div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-weak)' }}>{p.email}</div>
                  </div>
                  <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <StatusBadge tone={tierTone[p.tier]}>{p.tier}</StatusBadge>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full" style={{ background: 'rgba(15,23,42,0.08)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${p.score}%`, background: scoreBarColor(p.score) }} />
                    </div>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-text)' }}>{p.score}</span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>{timeAgo(p.created_at)}</span>
                </div>
                <button type="button" onClick={copyLink} className="be-btn be-btn--secondary w-full">
                  Send Link
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>
            Showing {filtered.length} of {leads.length} leads
          </span>
          <Link href="/dashboard/prospects" className="text-xs font-semibold" style={{ color: 'var(--color-blue)' }}>
            View full list â†’
          </Link>
        </div>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="be-section-title mb-3">Quick actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard href="/dashboard/links"    icon="ðŸ”—" title="Referral Links"  description="Generate hot, cold, and page-specific links with QR codes." />
          <ActionCard href="/dashboard/videos"   icon="ðŸŽ¬" title="Partner Videos"  description="Sales training, product deep dives, and social media strategy." />
          <ActionCard href="/dashboard/settings" icon="âš™ï¸" title="Profile Settings" description="Update your profile, social links, and notification preferences." />
        </div>
      </div>
    </div>
  )
}



