'use client'

import { useMemo, useState, useCallback } from 'react'
import {
  SectionHeader,
  DataTable,
  FilterPill,
  StatusBadge,
  FormButton,
  Toolbar,
  type DataColumn,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   PARTNER · PROSPECTS  (/dashboard/prospects)
   List of prospects from a partner's referral activity.
   Demo data only — replace with Supabase query.
   ═══════════════════════════════════════════════════════════════ */

type Tier   = 'beginner' | 'intermediate' | 'advanced'
type Status = 'new' | 'assessed' | 'invited' | 'onboarding' | 'active'

interface Prospect {
  id: string
  name: string
  email: string
  tier: Tier
  score: number
  status: Status
  date: string
}

const DEMO_PROSPECTS: Prospect[] = [
  { id: '1', name: 'Sarah Chen',     email: 'sarah@example.com',  tier: 'beginner',     score: 28, status: 'assessed',   date: '2026-04-10' },
  { id: '2', name: 'James Wilson',   email: 'james@example.com',  tier: 'intermediate', score: 55, status: 'invited',    date: '2026-04-09' },
  { id: '3', name: 'Maria Garcia',   email: 'maria@example.com',  tier: 'advanced',     score: 85, status: 'onboarding', date: '2026-04-08' },
  { id: '4', name: 'Alex Thompson',  email: 'alex@example.com',   tier: 'beginner',     score: 15, status: 'new',        date: '2026-04-11' },
  { id: '5', name: 'Lisa Park',      email: 'lisa@example.com',   tier: 'intermediate', score: 62, status: 'active',     date: '2026-04-07' },
]

const STATUS_FILTERS: ReadonlyArray<'all' | Status> = ['all', 'new', 'assessed', 'invited', 'onboarding', 'active']

const tierToneMap: Record<Tier, StatusTone> = {
  beginner:     'amber',
  intermediate: 'blue',
  advanced:     'green',
}

const statusToneMap: Record<Status, StatusTone> = {
  new:        'purple',
  assessed:   'amber',
  invited:    'blue',
  onboarding: 'blue',
  active:     'green',
}

export default function ProspectsPage() {
  const [filter, setFilter] = useState<'all' | Status>('all')

  const filtered = useMemo(
    () => filter === 'all' ? DEMO_PROSPECTS : DEMO_PROSPECTS.filter(p => p.status === filter),
    [filter],
  )

  const counts = useMemo(() => {
    const acc: Partial<Record<'all' | Status, number>> = { all: DEMO_PROSPECTS.length }
    for (const p of DEMO_PROSPECTS) acc[p.status] = (acc[p.status] ?? 0) + 1
    return acc
  }, [])

  const handleSendLink = useCallback((p: Prospect) => {
    // Demo only — wire up to email/Resend later
    console.log('Send link to', p.email)
  }, [])

  const columns: ReadonlyArray<DataColumn<Prospect>> = [
    {
      key: 'name',
      header: 'Name',
      render: (p) => (
        <div>
          <div className="font-medium text-[#181d26]">{p.name}</div>
          <div className="text-xs text-[rgba(4,14,32,0.45)]">{p.email}</div>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Readiness',
      render: (p) => (
        <StatusBadge tone={tierToneMap[p.tier]}>
          <span className="capitalize">{p.tier}</span>
        </StatusBadge>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      render: (p) => <span className="font-mono text-[#181d26]">{p.score}/100</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <StatusBadge tone={statusToneMap[p.status]}>
          <span className="capitalize">{p.status}</span>
        </StatusBadge>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (p) => <span className="text-[rgba(4,14,32,0.55)]">{p.date}</span>,
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (p) => (
        <FormButton variant="secondary" size="sm" onClick={() => handleSendLink(p)}>
          Send link
        </FormButton>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Prospects"
        subtitle={`${filtered.length} prospect${filtered.length !== 1 ? 's' : ''}${filter !== 'all' ? ` · filtered by "${filter}"` : ''}`}
      />

      <Toolbar
        left={
          <>
            {STATUS_FILTERS.map((s) => (
              <FilterPill
                key={s}
                label={s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                active={filter === s}
                count={counts[s]}
                onClick={() => setFilter(s)}
              />
            ))}
          </>
        }
      />

      <DataTable<Prospect>
        columns={columns}
        rows={filtered}
        rowKey={(p) => p.id}
        emptyState="No prospects match this filter."
      />
    </div>
  )
}
