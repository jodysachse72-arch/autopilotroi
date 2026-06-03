'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  SectionHeader,
  Toolbar,
  FilterPill,
  StatusBadge,
  DataTable,
  EmptyState,
  Card,
  type DataColumn,
  type StatusTone,
} from '@/components/backend'

/* ─────────────────────────────────────────────────────────────────
   ADMIN — All Prospects
   Reads real leads from /api/admin/prospects (admin-gated).

   Column mapping from leads table:
     readiness_tier   → tier
     readiness_score  → score
     onboarding_status→ status
     referred_by      → referredBy (read-only — no Assign feature)
   ───────────────────────────────────────────────────────────────── */

type Tier   = 'beginner' | 'intermediate' | 'advanced'
type Status = 'new' | 'assessed' | 'invited' | 'onboarding' | 'active'

interface Prospect {
  id:         string
  name:       string
  email:      string
  tier:       Tier
  score:      number
  status:     Status
  referredBy: string | null   // referred_by — read-only
  date:       string
}

// ── Tone maps ──────────────────────────────────────────────────

const tierTone: Record<Tier, StatusTone> = {
  beginner:     'amber',
  intermediate: 'blue',
  advanced:     'green',
}

const statusTone: Record<Status, StatusTone> = {
  new:        'purple',
  assessed:   'amber',
  invited:    'blue',
  onboarding: 'blue',
  active:     'green',
}

// ── Helpers ────────────────────────────────────────────────────

const STATUS_FILTERS = ['all', 'new', 'assessed', 'invited', 'onboarding', 'active'] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

const REFERRAL_FILTERS = ['all', 'referred', 'organic'] as const
type ReferralFilter = (typeof REFERRAL_FILTERS)[number]

function scoreTone(score: number): StatusTone {
  if (score >= 60) return 'green'
  if (score >= 30) return 'amber'
  return 'red'
}

function normalizeTier(raw: string | null): Tier {
  if (raw === 'intermediate' || raw === 'advanced') return raw
  return 'beginner'
}

function normalizeStatus(raw: string | null): Status {
  if (raw === 'assessed' || raw === 'invited' || raw === 'onboarding' || raw === 'active') return raw
  return 'new'
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso.slice(0, 10)
  }
}

// ── Page ───────────────────────────────────────────────────────

export default function AdminProspectsPage() {
  const [prospects,      setProspects]      = useState<Prospect[]>([])
  const [loading,        setLoading]        = useState(true)
  const [error,          setError]          = useState('')
  const [statusFilter,   setStatusFilter]   = useState<StatusFilter>('all')
  const [referralFilter, setReferralFilter] = useState<ReferralFilter>('all')

  // ── Fetch real leads ─────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetch('/api/admin/prospects')
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const rows: Prospect[] = (data.prospects ?? []).map((p: {
          id: string
          name: string
          email: string
          tier: string | null
          score: number | null
          status: string | null
          referredBy: string | null
          date: string
        }) => ({
          id:         p.id,
          name:       p.name,
          email:      p.email,
          tier:       normalizeTier(p.tier),
          score:      p.score ?? 0,
          status:     normalizeStatus(p.status),
          referredBy: p.referredBy,
          date:       p.date,
        }))
        setProspects(rows)
        setLoading(false)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message || 'Failed to load prospects')
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  // ── Filters ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let rows = statusFilter === 'all'
      ? prospects
      : prospects.filter((p) => p.status === statusFilter)

    if (referralFilter === 'referred') rows = rows.filter((p) => !!p.referredBy)
    else if (referralFilter === 'organic') rows = rows.filter((p) => !p.referredBy)

    return rows
  }, [prospects, statusFilter, referralFilter])

  const statusCount = (s: StatusFilter) =>
    s === 'all' ? prospects.length : prospects.filter((p) => p.status === s).length

  const referralCount = (s: ReferralFilter) => {
    if (s === 'all') return prospects.length
    if (s === 'referred') return prospects.filter((p) => !!p.referredBy).length
    return prospects.filter((p) => !p.referredBy).length
  }

  // ── Table columns ────────────────────────────────────────────
  const columns: DataColumn<Prospect>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (p) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold" style={{ color: '#181d26' }}>{p.name}</span>
          <span className="text-xs" style={{ color: 'rgba(4,14,32,0.5)' }}>{p.email}</span>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (p) => (
        <StatusBadge tone={tierTone[p.tier]}>
          <span className="capitalize">{p.tier}</span>
        </StatusBadge>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      render: (p) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm" style={{ color: '#181d26' }}>{p.score}</span>
          <span
            className="inline-block h-1.5 w-12 rounded-full overflow-hidden"
            style={{ background: 'rgba(15,23,42,0.08)' }}
            aria-hidden
          >
            <span
              className="block h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.max(0, p.score))}%`,
                background:
                  scoreTone(p.score) === 'green' ? '#10b981'
                  : scoreTone(p.score) === 'amber' ? '#f59e0b'
                  : '#ef4444',
              }}
            />
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <StatusBadge tone={statusTone[p.status]}>
          <span className="capitalize">{p.status}</span>
        </StatusBadge>
      ),
    },
    {
      key: 'referredBy',
      header: 'Referred By',
      render: (p) =>
        p.referredBy ? (
          <span className="text-sm font-mono" style={{ color: 'rgba(4,14,32,0.7)' }}>
            {p.referredBy}
          </span>
        ) : (
          <span className="text-xs italic" style={{ color: 'rgba(4,14,32,0.35)' }}>organic</span>
        ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (p) => (
        <span className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          {formatDate(p.date)}
        </span>
      ),
    },
  ]

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="All Prospects"
        subtitle={
          loading
            ? 'Loading…'
            : error
            ? 'Error loading prospects'
            : `${filtered.length} of ${prospects.length} prospect${prospects.length === 1 ? '' : 's'} shown`
        }
      />

      {error && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#b91c1c' }}
          role="alert"
        >
          {error}
        </div>
      )}

      <Toolbar
        left={
          <>
            {STATUS_FILTERS.map((s) => (
              <FilterPill
                key={s}
                label={s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                count={statusCount(s)}
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
              />
            ))}
          </>
        }
        right={
          <>
            {REFERRAL_FILTERS.map((s) => (
              <FilterPill
                key={s}
                label={s === 'all' ? 'All' : s === 'referred' ? 'Referred' : 'Organic'}
                count={referralCount(s)}
                active={referralFilter === s}
                onClick={() => setReferralFilter(s)}
              />
            ))}
          </>
        }
      />

      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-16">
            <div
              className="h-8 w-8 animate-spin rounded-full"
              style={{ border: '2px solid #1b61c9', borderTopColor: 'transparent' }}
            />
          </div>
        </Card>
      ) : prospects.length === 0 && !error ? (
        <Card>
          <EmptyState
            icon="👥"
            title="No prospects yet"
            description="Leads will appear here once someone completes the readiness quiz."
          />
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DataTable
            columns={columns}
            rows={filtered}
            rowKey={(p) => p.id}
            emptyState="No prospects match your filters."
          />
        </motion.div>
      )}
    </div>
  )
}
