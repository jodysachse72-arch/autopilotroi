'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SectionHeader,
  Toolbar,
  FilterPill,
  StatusBadge,
  DataTable,
  FormButton,
  type DataColumn,
  type StatusTone,
} from '@/components/backend'

/* ─────────────────────────────────────────────
   ADMIN — All Prospects
   Refactored to use backend primitives.
   ───────────────────────────────────────────── */

type Tier = 'beginner' | 'intermediate' | 'advanced'
type Status = 'new' | 'assessed' | 'invited' | 'onboarding' | 'active'

interface Prospect {
  id: string
  name: string
  email: string
  tier: Tier
  score: number
  status: Status
  assignedTo: string | null
  date: string
}

const allProspects: Prospect[] = [
  { id: '1', name: 'Alex Thompson', email: 'alex@example.com',  tier: 'beginner',     score: 15, status: 'new',        assignedTo: null,            date: '2026-04-11' },
  { id: '2', name: 'Sarah Chen',    email: 'sarah@example.com', tier: 'beginner',     score: 28, status: 'assessed',   assignedTo: 'Barry Goss',    date: '2026-04-10' },
  { id: '3', name: 'James Wilson',  email: 'james@example.com', tier: 'intermediate', score: 55, status: 'invited',    assignedTo: 'Barry Goss',    date: '2026-04-09' },
  { id: '4', name: 'Maria Garcia',  email: 'maria@example.com', tier: 'advanced',     score: 85, status: 'onboarding', assignedTo: 'Demo Partner',  date: '2026-04-08' },
  { id: '5', name: 'John Doe',      email: 'john@example.com',  tier: 'intermediate', score: 42, status: 'new',        assignedTo: null,            date: '2026-04-11' },
  { id: '6', name: 'Emma Brown',    email: 'emma@example.com',  tier: 'beginner',     score: 18, status: 'new',        assignedTo: null,            date: '2026-04-11' },
  { id: '7', name: 'Mike Johnson',  email: 'mike@example.com',  tier: 'advanced',     score: 73, status: 'assessed',   assignedTo: null,            date: '2026-04-10' },
  { id: '8', name: 'Lisa Park',     email: 'lisa@example.com',  tier: 'intermediate', score: 62, status: 'active',     assignedTo: 'Jane Smith',    date: '2026-04-07' },
]

const tierTone: Record<Tier, StatusTone> = {
  beginner: 'amber',
  intermediate: 'blue',
  advanced: 'green',
}

const statusTone: Record<Status, StatusTone> = {
  new: 'purple',
  assessed: 'amber',
  invited: 'blue',
  onboarding: 'blue',
  active: 'green',
}

const STATUS_FILTERS = ['all', 'new', 'assessed', 'invited', 'onboarding', 'active'] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

const ASSIGN_FILTERS = ['all', 'unassigned', 'assigned'] as const
type AssignFilter = (typeof ASSIGN_FILTERS)[number]

function scoreTone(score: number): StatusTone {
  if (score >= 60) return 'green'
  if (score >= 30) return 'amber'
  return 'red'
}

export default function AdminProspectsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [assignFilter, setAssignFilter] = useState<AssignFilter>('all')

  const filtered = useMemo(() => {
    let rows = statusFilter === 'all' ? allProspects : allProspects.filter((p) => p.status === statusFilter)
    if (assignFilter === 'unassigned') rows = rows.filter((p) => !p.assignedTo)
    else if (assignFilter === 'assigned') rows = rows.filter((p) => !!p.assignedTo)
    return rows
  }, [statusFilter, assignFilter])

  const statusCount = (s: StatusFilter) =>
    s === 'all' ? allProspects.length : allProspects.filter((p) => p.status === s).length

  const assignCount = (s: AssignFilter) => {
    if (s === 'all') return allProspects.length
    if (s === 'unassigned') return allProspects.filter((p) => !p.assignedTo).length
    return allProspects.filter((p) => !!p.assignedTo).length
  }

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
                  scoreTone(p.score) === 'green'
                    ? '#10b981'
                    : scoreTone(p.score) === 'amber'
                      ? '#f59e0b'
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
      key: 'assigned',
      header: 'Assigned To',
      render: (p) =>
        p.assignedTo ? (
          <span className="text-sm" style={{ color: 'rgba(4,14,32,0.7)' }}>{p.assignedTo}</span>
        ) : (
          <StatusBadge tone="amber" icon="⚠️">Unassigned</StatusBadge>
        ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (p) => (
        <span className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>{p.date}</span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (p) => (
        <FormButton variant={p.assignedTo ? 'ghost' : 'primary'} size="sm">
          {p.assignedTo ? 'View' : 'Assign'}
        </FormButton>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="All Prospects"
        subtitle={`${filtered.length} of ${allProspects.length} prospects shown`}
      />

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
            {ASSIGN_FILTERS.map((s) => (
              <FilterPill
                key={s}
                label={s === 'all' ? 'All' : s === 'unassigned' ? 'Unassigned' : 'Assigned'}
                count={assignCount(s)}
                active={assignFilter === s}
                onClick={() => setAssignFilter(s)}
              />
            ))}
          </>
        }
      />

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
    </div>
  )
}
