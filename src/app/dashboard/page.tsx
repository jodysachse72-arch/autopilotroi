'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Target, TrendingUp, CheckCircle2, Link2, Video, Settings,
  Flame, AlarmClock, Mail, ArrowRight, Sparkles, BarChart3,
  Trophy, Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { InfoTip } from '@/components/ui/Tooltip'
import PartnerOnboardingWizard from '@/components/ui/PartnerOnboardingWizard'
import {
  Card, ActionCard, SectionHeader, StatusBadge, FilterPill,
  FormInput, FormSelect, type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   PARTNER DASHBOARD — Live lead tracking with pipeline.
   F2 REDESIGN: sparkline KPIs, real funnel viz, attention widget,
   polished leads table with avatars.
   ═══════════════════════════════════════════════════════════════ */

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

const STATUS_LABELS: Record<Lead['status'], string> = {
  new: 'New',
  assessed: 'Assessed',
  invited: 'Invited',
  onboarding: 'Onboarding',
  active: 'Active',
}

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

const tierAvatarColor: Record<Lead['tier'], { bg: string; fg: string }> = {
  beginner:     { bg: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)', fg: '#78350f' },
  intermediate: { bg: 'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 100%)', fg: '#1e3a8a' },
  advanced:     { bg: 'linear-gradient(135deg, #bbf7d0 0%, #34d399 100%)', fg: '#065f46' },
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

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (24 * 60 * 60 * 1000))
}

function scoreBarColor(score: number): string {
  if (score >= 70) return '#10b981'
  if (score >= 40) return '#3b82f6'
  return '#f59e0b'
}

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase()
}

/* ── Sparkline mini-chart ───────────────────────────────────── */
interface SparklineProps {
  data: readonly number[]
  color: string
  height?: number
  width?: number
}

function Sparkline({ data, color, height = 30, width = 72 }: SparklineProps) {
  if (data.length < 2) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - 6) - 3
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const areaPoints = `0,${height} ${points} ${width},${height}`
  const lastY = height - ((data[data.length - 1] - min) / range) * (height - 6) - 3
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-${color.replace('#', '')})`} />
      <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={lastY} r="2.4" fill={color} stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

/* ── Sparkline KPI card ──────────────────────────────────────── */
interface SparkStatProps {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'flat'
  icon: LucideIcon
  iconBg: string
  iconColor: string
  spark: readonly number[]
  sparkColor: string
  tip: string
}

function SparkStat({ label, value, delta, trend, icon: Icon, iconBg, iconColor, spark, sparkColor, tip }: SparkStatProps) {
  const trendColor = trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#64748b'
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '·'
  return (
    <div className="be-card be-card--padded relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: iconBg, color: iconColor }}
            aria-hidden
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: 'rgba(4,14,32,0.55)' }}>
            {label}
            <InfoTip content={tip} />
          </span>
        </div>
        <Sparkline data={spark} color={sparkColor} />
      </div>
      <div className="mt-3 text-[1.6rem] font-bold leading-none tracking-tight" style={{ color: '#0b1220' }}>
        {value}
      </div>
      <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: trendColor }}>
        <span aria-hidden>{trendArrow}</span> {delta}
      </div>
    </div>
  )
}

/* ── Funnel chart — real tapered visualization ─────────────── */
interface FunnelProps {
  segments: { status: Lead['status']; count: number }[]
}

function Funnel({ segments }: FunnelProps) {
  const max = Math.max(...segments.map(s => s.count), 1)
  const widthPct = (n: number) => Math.max((n / max) * 100, 14)
  return (
    <div className="space-y-2.5">
      {segments.map((seg, i) => {
        const w = widthPct(seg.count)
        const conversionFromPrev = i === 0 || segments[i - 1].count === 0
          ? null
          : Math.min(100, Math.round((seg.count / segments[i - 1].count) * 100))
        return (
          <div key={seg.status} className="flex items-center gap-3">
            <div className="w-24 shrink-0 text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.55)' }}>
                {STATUS_LABELS[seg.status]}
              </div>
              {conversionFromPrev !== null && (
                <div className="text-[10px] mt-0.5" style={{ color: 'rgba(4,14,32,0.4)' }}>
                  {conversionFromPrev}% retained
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${w}%` }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-10 rounded-lg flex items-center px-3 relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${funnelColor[seg.status]} 0%, ${funnelColor[seg.status]}cc 100%)`,
                  boxShadow: `0 2px 6px ${funnelColor[seg.status]}33, inset 0 1px 0 rgba(255,255,255,0.25)`,
                }}
              >
                <span className="text-sm font-bold text-white drop-shadow-sm">
                  {seg.count}
                </span>
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Attention insight item ──────────────────────────────────── */
interface AttentionItem {
  id: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  detail: string
  cta: string
  href: string
}

function buildAttentionItems(leads: Lead[]): AttentionItem[] {
  const items: AttentionItem[] = []

  const hotUninvited = leads.filter(l => l.score >= 70 && (l.status === 'new' || l.status === 'assessed'))
  if (hotUninvited.length > 0) {
    items.push({
      id: 'hot',
      icon: Flame,
      iconBg: 'rgba(239,68,68,0.10)',
      iconColor: '#dc2626',
      title: `${hotUninvited.length} hot lead${hotUninvited.length > 1 ? 's' : ''} ready to invite`,
      detail: `Top scorer: ${hotUninvited.sort((a, b) => b.score - a.score)[0].name} (${hotUninvited[0].score}/100). Reach out within 24h for best conversion.`,
      cta: 'Send invites',
      href: '/dashboard/prospects',
    })
  }

  const stale = leads.filter(l =>
    (l.status === 'assessed' || l.status === 'invited') && daysSince(l.created_at) >= 5
  )
  if (stale.length > 0) {
    items.push({
      id: 'stale',
      icon: AlarmClock,
      iconBg: 'rgba(245,158,11,0.10)',
      iconColor: '#d97706',
      title: `${stale.length} lead${stale.length > 1 ? 's are' : ' is'} going cold`,
      detail: `Stuck in pipeline for ${daysSince(stale[0].created_at)}+ days. A friendly check-in can re-engage ${stale.length > 1 ? 'them' : 'this lead'}.`,
      cta: 'Send follow-up',
      href: '/dashboard/emails',
    })
  }

  const onboarding = leads.filter(l => l.status === 'onboarding')
  if (onboarding.length > 0) {
    items.push({
      id: 'onboarding',
      icon: Sparkles,
      iconBg: 'rgba(34,211,238,0.12)',
      iconColor: '#0891b2',
      title: `${onboarding.length} ${onboarding.length > 1 ? 'partners are' : 'partner is'} setting up`,
      detail: `${onboarding[0].name} is mid-onboarding. Offer help to get them across the finish line.`,
      cta: 'Send resources',
      href: '/dashboard/library',
    })
  }

  if (items.length === 0) {
    items.push({
      id: 'all-clear',
      icon: CheckCircle2,
      iconBg: 'rgba(16,185,129,0.10)',
      iconColor: '#059669',
      title: 'You\'re all caught up',
      detail: 'No urgent items in your pipeline right now. Time to drum up new leads!',
      cta: 'Generate links',
      href: '/dashboard/links',
    })
  }

  return items.slice(0, 3)
}

/* ── Generate varied sparkline shapes per metric ── */
function genSpark(
  seed: number,
  peak: number,
  shape: 'rise' | 'flat' | 'zigzag' | 'dip-rise' = 'rise',
  len = 14
): number[] {
  const data: number[] = []
  switch (shape) {
    case 'rise': {
      let v = peak * 0.3
      for (let i = 0; i < len; i++) {
        v = Math.max(0, v + peak * 0.05 + Math.sin(seed + i * 1.3) * peak * 0.1)
        data.push(Math.round(v))
      }
      break
    }
    case 'flat': {
      for (let i = 0; i < len; i++) {
        data.push(Math.max(0, Math.round(peak * 0.85 + Math.sin(seed + i * 2.1) * peak * 0.12)))
      }
      break
    }
    case 'zigzag': {
      for (let i = 0; i < len; i++) {
        data.push(Math.max(0, Math.round(peak * 0.6 + Math.sin(seed + i * 1.9) * peak * 0.3)))
      }
      break
    }
    case 'dip-rise': {
      for (let i = 0; i < len; i++) {
        const t = i / (len - 1)
        const v = peak * 0.5 + Math.sin(t * Math.PI) * peak * -0.22 + t * peak * 0.4
        data.push(Math.max(0, Math.round(v + Math.sin(seed + i * 1.5) * peak * 0.07)))
      }
      break
    }
  }
  data[data.length - 1] = peak
  return data
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
  const attention = useMemo(() => buildAttentionItems(leads), [leads])
  const funnelSegments = useMemo(
    () => STATUS_FLOW.map(s => ({ status: s, count: leads.filter(l => l.status === s).length })),
    [leads]
  )

  const sparkData = useMemo(() => ({
    total:      genSpark(1, Math.max(stats.total, 1),                          'rise'),
    avgScore:   genSpark(2, Math.max(stats.avgScore, 1),                       'flat'),
    pipeline:   genSpark(3, Math.max(stats.assessed + stats.onboarding, 1),   'zigzag'),
    conversion: genSpark(4, Math.max(stats.conversionRate, 1),                'dip-rise'),
  }), [stats.total, stats.avgScore, stats.assessed, stats.onboarding, stats.conversionRate])

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

      {/* Welcome banner — brand blue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
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
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 70%)', filter: 'blur(18px)' }}
            aria-hidden
          />
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="inline-flex items-center gap-1.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.70)' }}>
                <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-300' : 'bg-amber-300'}`} />
                {isLive ? 'Live' : 'Demo'}
              </div>
              <h2 className="text-[1.125rem] font-bold tracking-tight truncate">
                Welcome back, Partner
              </h2>
            </div>
            <Link
              href="/dashboard/links"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <Link2 className="h-3.5 w-3.5" strokeWidth={2.4} />
              Generate referral link
            </Link>
          </div>
        </div>
      </motion.div>


      {/* Sparkline KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Total Leads',
            value: String(stats.total),
            delta: `+${stats.thisWeek} this week`,
            trend: (stats.thisWeek > 0 ? 'up' : 'flat') as 'up' | 'flat' | 'down',
            icon: Users,
            iconBg: 'rgba(59,130,246,0.10)',
            iconColor: '#1b61c9',
            spark: sparkData.total,
            sparkColor: '#1b61c9',
            tip: 'Everyone who has filled out the signup form, whether or not they finished the quiz.',
          },
          {
            label: 'Avg Score',
            value: `${stats.avgScore}`,
            delta: 'readiness / 100',
            trend: 'flat' as const,
            icon: BarChart3,
            iconBg: 'rgba(124,58,237,0.10)',
            iconColor: '#7c3aed',
            spark: sparkData.avgScore,
            sparkColor: '#7c3aed',
            tip: 'The average readiness score across all your leads. Higher = more experienced with crypto.',
          },
          {
            label: 'In Pipeline',
            value: String(stats.assessed + stats.onboarding),
            delta: 'assessed + onboarding',
            trend: 'flat' as const,
            icon: Target,
            iconBg: 'rgba(245,158,11,0.10)',
            iconColor: '#d97706',
            spark: sparkData.pipeline,
            sparkColor: '#d97706',
            tip: "Leads who completed the quiz but haven't finished setting up their account yet.",
          },
          {
            label: 'Conversion',
            value: `${stats.conversionRate}%`,
            delta: `${stats.active} active`,
            trend: (stats.conversionRate >= 15 ? 'up' : 'flat') as 'up' | 'flat' | 'down',
            icon: TrendingUp,
            iconBg: 'rgba(16,185,129,0.10)',
            iconColor: '#059669',
            spark: sparkData.conversion,
            sparkColor: '#059669',
            tip: 'Percentage of leads that completed onboarding and are now active. Industry average is 10-20%.',
          },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <SparkStat {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Two-column: Funnel + Needs Attention */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Funnel */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(27,97,201,0.10)', color: '#1b61c9' }}>
                <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: '#0b1220' }}>Pipeline Funnel</h3>
                <p className="text-[11px]" style={{ color: 'rgba(4,14,32,0.55)' }}>Where your leads are in the journey</p>
              </div>
              <InfoTip
                content="Lead lifecycle from signup to active member."
                detail="Each stage shows count and retention from the prior stage. Drop-offs reveal where you're losing people."
              />
            </div>
          </div>
          <Funnel segments={funnelSegments} />
        </Card>

        {/* Needs your attention */}
        <Card padding="lg">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626' }}>
              <Zap className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#0b1220' }}>Needs your attention</h3>
              <p className="text-[11px]" style={{ color: 'rgba(4,14,32,0.55)' }}>Today&apos;s high-leverage actions</p>
            </div>
          </div>
          <div className="space-y-3">
            {attention.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                  className="rounded-lg p-3 transition hover:bg-slate-50"
                  style={{ border: '1px solid var(--color-border, #e6e8ec)' }}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: item.iconBg, color: item.iconColor }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold leading-snug" style={{ color: '#0b1220' }}>
                        {item.title}
                      </div>
                      <p className="mt-1 text-[11.5px] leading-relaxed" style={{ color: 'rgba(4,14,32,0.6)' }}>
                        {item.detail}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold"
                        style={{ color: item.iconColor }}
                      >
                        {item.cta}
                        <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Card>
      </div>

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
                  placeholder="Search…"
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
                <th>Lead</th>
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
                filtered.map((p) => {
                  const av = tierAvatarColor[p.tier]
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                            style={{ background: av.bg, color: av.fg }}
                            aria-hidden
                          >
                            {initials(p.name)}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                            <div className="text-[11px] leading-tight" style={{ color: 'var(--color-text-weak)' }}>{p.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <StatusBadge tone={tierTone[p.tier]}>{p.tier}</StatusBadge>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full" style={{ background: 'rgba(15,23,42,0.08)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${p.score}%` }}
                              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                              className="h-1.5 rounded-full"
                              style={{ background: scoreBarColor(p.score) }}
                            />
                          </div>
                          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{p.score}</span>
                        </div>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: funnelColor[p.status] }} />
                          <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
                        </span>
                      </td>
                      <td>
                        <div className="inline-flex items-center gap-1">
                          {[0, 1, 2, 3, 4].map(i => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: i < (p.drip_emails_sent?.length || 0) ? '#22c55e' : 'rgba(15,23,42,0.12)' }}
                            />
                          ))}
                          <span className="ml-1 text-[10px] font-mono" style={{ color: 'var(--color-text-weak)' }}>
                            {p.drip_emails_sent?.length || 0}/5
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>
                          {timeAgo(p.created_at)}
                        </span>
                      </td>
                      <td>
                        <button type="button" onClick={copyLink} className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition hover:bg-slate-50" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                          <Mail className="h-3 w-3" strokeWidth={2.4} />
                          Send
                        </button>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y" style={{ borderColor: 'var(--color-border)', borderTop: '1px solid var(--color-border)' }}>
          {filtered.length === 0 ? (
            <div className="be-empty">No leads match your filters</div>
          ) : (
            filtered.map((p) => {
              const av = tierAvatarColor[p.tier]
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                      style={{ background: av.bg, color: av.fg }}
                      aria-hidden
                    >
                      {initials(p.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                        <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
                      </div>
                      <div className="text-xs truncate" style={{ color: 'var(--color-text-weak)' }}>{p.email}</div>
                    </div>
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
                  <button type="button" onClick={copyLink} className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <Mail className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Send Link
                  </button>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-xs" style={{ color: 'var(--color-text-weak)' }}>
            Showing {filtered.length} of {leads.length} leads
          </span>
          <Link href="/dashboard/prospects" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-blue)' }}>
            View full list
            <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
          </Link>
        </div>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="be-section-title mb-3">Quick actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard href="/dashboard/links"     icon={<Link2 className="h-5 w-5" strokeWidth={2.2} />}    title="Referral Links"   description="Generate hot, cold, and page-specific links with QR codes." />
          <ActionCard href="/dashboard/leaderboard" icon={<Trophy className="h-5 w-5" strokeWidth={2.2} />} title="Leaderboard"     description="See where you rank against other partners this month." />
          <ActionCard href="/dashboard/videos"    icon={<Video className="h-5 w-5" strokeWidth={2.2} />}    title="Partner Videos"   description="Sales training, product deep dives, and social media strategy." />
          <ActionCard href="/dashboard/settings"  icon={<Settings className="h-5 w-5" strokeWidth={2.2} />} title="Profile Settings" description="Update your profile, social links, and notification preferences." />
        </div>
      </div>
    </div>
  )
}
