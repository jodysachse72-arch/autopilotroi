'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users, Handshake, Clock, CheckCircle2, UserPlus, ClipboardCheck,
  ArrowUp, Trophy, ArrowRight, AlertCircle, FileEdit, Map, FileText,
  CheckSquare, Activity, Inbox, Sparkles, TrendingUp, Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, SectionHeader, StatusBadge } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN DASHBOARD — F3 redesign.
   Activity timeline (real chronological feed), triage queue
   (actionable prospect cards), illustrated quick-action tiles.
   ═══════════════════════════════════════════════════════════════ */

interface SystemStat {
  label: string
  value: string
  delta: string
  trend: 'up' | 'flat' | 'down'
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const systemStats: SystemStat[] = [
  { label: 'Total Users',           value: '142', delta: '+12 this week',  trend: 'up',   icon: Users,         iconBg: 'rgba(59,130,246,0.10)',  iconColor: '#1b61c9' },
  { label: 'Active Partners',       value: '23',  delta: '+3 this month',  trend: 'up',   icon: Handshake,     iconBg: 'rgba(16,185,129,0.10)',  iconColor: '#059669' },
  { label: 'Pending Prospects',     value: '8',   delta: '5 unassigned',   trend: 'flat', icon: Clock,         iconBg: 'rgba(245,158,11,0.10)',  iconColor: '#d97706' },
  { label: 'Completed Onboardings', value: '97',  delta: '68% conversion', trend: 'up',   icon: CheckCircle2,  iconBg: 'rgba(124,58,237,0.10)',  iconColor: '#7c3aed' },
]

type ActivityType = 'signup' | 'assessment' | 'promotion' | 'complete'

interface ActivityItem {
  type: ActivityType
  action: string
  user: string
  time: string
  meta?: string
}

const recentActivity: ActivityItem[] = [
  { type: 'signup',     action: 'New prospect signed up',         user: 'alex@example.com',   time: '2m',   meta: 'via partner J. Wilson' },
  { type: 'assessment', action: 'Readiness assessment completed', user: 'sarah@example.com',  time: '15m',  meta: 'Score: 28/100 (Beginner)' },
  { type: 'promotion',  action: 'Promoted to Partner',            user: 'james@example.com',  time: '1h',   meta: 'Tier: Intermediate' },
  { type: 'complete',   action: 'Onboarding completed',           user: 'maria@example.com',  time: '3h',   meta: 'Account active' },
  { type: 'signup',     action: 'New prospect signed up',         user: 'lisa@example.com',   time: '5h',   meta: 'Direct (no referrer)' },
  { type: 'assessment', action: 'Readiness assessment completed', user: 'michael@example.com',time: '8h',   meta: 'Score: 91/100 (Advanced)' },
]

const activityMeta: Record<ActivityType, { icon: LucideIcon; bg: string; color: string }> = {
  signup:     { icon: UserPlus,       bg: 'rgba(59,130,246,0.10)',  color: '#1b61c9' },
  assessment: { icon: ClipboardCheck, bg: 'rgba(245,158,11,0.10)',  color: '#d97706' },
  promotion:  { icon: ArrowUp,        bg: 'rgba(124,58,237,0.10)',  color: '#7c3aed' },
  complete:   { icon: Trophy,         bg: 'rgba(16,185,129,0.10)',  color: '#059669' },
}

interface TriageProspect {
  name: string
  email: string
  score: number
  source: string
  waited: string
}

const unassignedProspects: TriageProspect[] = [
  { name: 'John Doe',     email: 'john@example.com',  score: 42, source: 'Cold link',       waited: '6h'  },
  { name: 'Emma Brown',   email: 'emma@example.com',  score: 18, source: 'Quiz',            waited: '1d'  },
  { name: 'Mike Johnson', email: 'mike@example.com',  score: 73, source: 'Hot link',        waited: '12h' },
]

function scoreTone(score: number): 'green' | 'amber' | 'red' {
  if (score >= 60) return 'green'
  if (score >= 30) return 'amber'
  return 'red'
}

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase()
}

interface QuickActionTile {
  href: string
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  iconBg: string
  iconColor: string
  cta: string
}

const quickActions: QuickActionTile[] = [
  {
    href: '/admin/partners',
    title: 'Manage Partners',
    description: 'Add, edit, and manage referral partners.',
    icon: Handshake,
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    iconBg: '#1b61c9',
    iconColor: '#fff',
    cta: 'Open partners',
  },
  {
    href: '/admin/prospects',
    title: 'Prospect Queue',
    description: 'View, filter, and assign incoming prospects.',
    icon: Inbox,
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    iconBg: '#d97706',
    iconColor: '#fff',
    cta: 'Open queue',
  },
  {
    href: '/admin/cms',
    title: 'Content Editor',
    description: 'Edit homepage, blog, and university content.',
    icon: FileEdit,
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    iconBg: '#7c3aed',
    iconColor: '#fff',
    cta: 'Open editor',
  },
  {
    href: '/admin/roadmap',
    title: 'Strategy & Roadmap',
    description: 'Competitive analysis, cost savings, phase plan.',
    icon: Map,
    gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    iconBg: '#059669',
    iconColor: '#fff',
    cta: 'See roadmap',
  },
  {
    href: '/admin/changelog',
    title: 'Changelog',
    description: 'Complete history of everything built.',
    icon: FileText,
    gradient: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
    iconBg: '#e11d48',
    iconColor: '#fff',
    cta: 'See changes',
  },
  {
    href: '/admin/checklist',
    title: 'Launch Checklist',
    description: 'Interactive pre-launch and phase checklists.',
    icon: CheckSquare,
    gradient: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
    iconBg: '#0891b2',
    iconColor: '#fff',
    cta: 'Open checklist',
  },
]

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* System health banner — brand blue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="be-card relative overflow-hidden"
        style={{
          background: 'linear-gradient(120deg, #1550aa 0%, #1b61c9 55%, #2d7ff9 100%)',
          border: 'none',
          color: '#fff',
          padding: '14px 20px',
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }}
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.70)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              All systems operational
            </div>
            <h2 className="text-[1.125rem] font-bold tracking-tight truncate">
              System Overview
            </h2>
          </div>
          <Link
            href="/admin/prospects"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition hover:opacity-90"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <Inbox className="h-3.5 w-3.5" strokeWidth={2.4} />
            Triage queue
          </Link>
        </div>
      </motion.div>


      {/* System stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {systemStats.map((stat, i) => {
          const Icon = stat.icon
          const trendColor = stat.trend === 'up' ? '#16a34a' : stat.trend === 'down' ? '#dc2626' : '#64748b'
          const trendArrow = stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '·'
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="be-card be-card--padded relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: stat.iconBg, color: stat.iconColor }}
                  aria-hidden
                >
                  <Icon className="h-[19px] w-[19px]" strokeWidth={2.2} />
                </span>
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: 'rgba(4,14,32,0.55)' }}>
                  {stat.label}
                </div>
                <div className="mt-1 text-[1.7rem] font-bold leading-none tracking-tight" style={{ color: '#0b1220' }}>
                  {stat.value}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: trendColor }}>
                  <span aria-hidden>{trendArrow}</span> {stat.delta}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Two-column: Activity timeline + Triage queue */}
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Activity timeline */}
        <Card padding="flush" className="lg:col-span-3">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(27,97,201,0.10)', color: '#1b61c9' }}>
                <Activity className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: '#0b1220' }}>Activity Timeline</h3>
                <p className="text-[11px]" style={{ color: 'rgba(4,14,32,0.55)' }}>Last 24 hours · across all partners</p>
              </div>
            </div>
            <Link href="/admin/audit" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-blue)' }}>
              Audit log
              <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="px-5 pb-5">
            <div className="relative pl-[38px]">
              {/* Solid timeline rail */}
              <div
                className="absolute left-[19px] top-4 bottom-4 w-[2px] rounded-full"
                style={{ background: 'var(--color-border, #e6e8ec)' }}
                aria-hidden
              />
              <ul className="space-y-3">
                {recentActivity.map((item, i) => {
                  const meta = activityMeta[item.type]
                  const Icon = meta.icon
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      className="relative flex items-start gap-3"
                    >
                      <span
                        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ background: meta.bg, color: meta.color, boxShadow: '0 0 0 3px #fff' }}
                        aria-hidden
                      >
                        <Icon className="h-[16px] w-[16px]" strokeWidth={2.4} />
                      </span>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold leading-snug" style={{ color: '#0b1220' }}>
                              {item.action}
                            </p>
                            <p className="mt-0.5 text-[11.5px] truncate" style={{ color: 'rgba(4,14,32,0.55)' }}>
                              {item.user}
                              {item.meta && <span className="opacity-70"> · {item.meta}</span>}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono shrink-0" style={{ color: 'rgba(4,14,32,0.45)' }}>
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Card>

        {/* Triage queue */}
        <Card padding="flush" className="lg:col-span-2">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626' }}>
                <AlertCircle className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: '#0b1220' }}>Triage Queue</h3>
                <p className="text-[11px]" style={{ color: 'rgba(4,14,32,0.55)' }}>{unassignedProspects.length} unassigned</p>
              </div>
            </div>
            <Link href="/admin/prospects" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-blue)' }}>
              View all
              <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
            </Link>
          </div>
          <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {unassignedProspects.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="px-5 py-3 transition hover:bg-slate-50/60"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', color: '#3730a3' }}
                    aria-hidden
                  >
                    {initials(p.name)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate" style={{ color: '#0b1220' }}>{p.name}</p>
                      <StatusBadge tone={scoreTone(p.score)}>{p.score}/100</StatusBadge>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(4,14,32,0.55)' }}>
                      <span className="truncate">{p.source}</span>
                      <span style={{ color: 'rgba(4,14,32,0.3)' }}>•</span>
                      <span className="font-mono shrink-0">waited {p.waited}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition hover:opacity-90"
                      style={{ background: '#1b61c9', color: '#fff' }}
                    >
                      <UserPlus className="h-3 w-3" strokeWidth={2.5} />
                      Assign
                    </button>
                    <button
                      type="button"
                      className="text-[11px] font-medium transition hover:opacity-60"
                      style={{ color: 'rgba(4,14,32,0.45)' }}
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Illustrated quick action tiles */}
      <div>
        <SectionHeader
          title="Quick actions"
          subtitle="Most-used admin tools"
        />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((tile, i) => {
            const Icon = tile.icon
            return (
              <motion.div
                key={tile.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={tile.href}
                  className="be-card be-card--interactive block relative overflow-hidden group"
                >
                  {/* Decorative gradient corner — softened */}
                  <div
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: tile.gradient, opacity: 0.45 }}
                    aria-hidden
                  />
                  <div className="relative">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: tile.iconBg, color: tile.iconColor, boxShadow: `0 6px 14px ${tile.iconBg}33` }}
                      aria-hidden
                    >
                      <Icon className="h-[20px] w-[20px]" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-3 text-[14px] font-bold" style={{ color: '#0b1220' }}>
                      {tile.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: 'rgba(4,14,32,0.6)' }}>
                      {tile.description}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold" style={{ color: 'var(--color-blue)' }}>
                      {tile.cta}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Insight strip — weekly highlights */}
      <div>
        <SectionHeader title="This week" subtitle="Performance highlights" />
        <div className="grid gap-4 sm:grid-cols-3">
        <div className="be-card be-card--padded flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(16,185,129,0.10)', color: '#059669' }}>
            <TrendingUp className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.55)' }}>This week</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: '#0b1220' }}>Conversion up 12%</div>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'rgba(4,14,32,0.55)' }}>vs. previous 7-day average</p>
          </div>
        </div>
        <div className="be-card be-card--padded flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(245,158,11,0.10)', color: '#d97706' }}>
            <Zap className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.55)' }}>Top partner</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: '#0b1220' }}>James Wilson · 14 leads</div>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'rgba(4,14,32,0.55)' }}>Send a thank-you note?</p>
          </div>
        </div>
        <div className="be-card be-card--padded flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(124,58,237,0.10)', color: '#7c3aed' }}>
            <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.55)' }}>Next launch</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: '#0b1220' }}>Aurum University 2.0</div>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'rgba(4,14,32,0.55)' }}>Targeted for May 15</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
