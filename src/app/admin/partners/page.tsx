'use client'

import { useState } from 'react'
import { SectionHeader, DataTable, StatusBadge, FilterPill, Toolbar, EmptyState } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface Partner {
  id: string; name: string; email: string; tier: string; prospects: number; score: number; status: 'active' | 'pending' | 'inactive'
}

const PARTNERS: Partner[] = [
  { id: '1', name: 'Marcus Johnson',  email: 'marcus@email.com',  tier: 'Gold',   prospects: 24, score: 92, status: 'active'   },
  { id: '2', name: 'Sarah Chen',      email: 'sarah@email.com',   tier: 'Silver', prospects: 11, score: 78, status: 'active'   },
  { id: '3', name: 'David Williams',  email: 'david@email.com',   tier: 'Bronze', prospects: 6,  score: 61, status: 'active'   },
  { id: '4', name: 'Jessica Martinez',email: 'jessica@email.com', tier: 'Gold',   prospects: 31, score: 95, status: 'active'   },
  { id: '5', name: 'Ryan Thompson',   email: 'ryan@email.com',    tier: 'Silver', prospects: 8,  score: 72, status: 'pending'  },
  { id: '6', name: 'Amanda Garcia',   email: 'amanda@email.com',  tier: 'Bronze', prospects: 3,  score: 55, status: 'pending'  },
  { id: '7', name: 'Kevin Lee',       email: 'kevin@email.com',   tier: 'Gold',   prospects: 19, score: 88, status: 'active'   },
  { id: '8', name: 'Lisa Davis',      email: 'lisa@email.com',    tier: 'Bronze', prospects: 1,  score: 40, status: 'inactive' },
]

const tierTone: Record<string, 'amber' | 'neutral' | 'blue'> = { Gold: 'amber', Silver: 'neutral', Bronze: 'blue' }
const statusTone: Record<string, 'green' | 'amber' | 'neutral'> = { active: 'green', pending: 'amber', inactive: 'neutral' }
type Filter = 'all' | 'active' | 'pending' | 'inactive'

export default function PartnersPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? PARTNERS : PARTNERS.filter(p => p.status === filter)

  const columns: DataColumn<Partner>[] = [
    { key: 'name',      header: 'Partner',     render: p => (
      <div>
        <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>{p.name}</div>
        <div className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{p.email}</div>
      </div>
    )},
    { key: 'tier',      header: 'Tier',        render: p => <StatusBadge tone={tierTone[p.tier]}>{p.tier}</StatusBadge> },
    { key: 'prospects', header: 'Prospects',   render: p => <span className="text-sm font-semibold">{p.prospects}</span>, align: 'right' },
    { key: 'score',     header: 'Score',       render: p => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
          <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.score >= 80 ? '#059669' : p.score >= 60 ? '#d97706' : '#dc2626' }} />
        </div>
        <span className="text-xs font-medium">{p.score}</span>
      </div>
    )},
    { key: 'status',    header: 'Status',      render: p => <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge> },
    { key: 'actions',   header: '',            render: () => (
      <div className="flex items-center gap-1.5">
        <button className="be-btn be-btn--sm be-btn--ghost">View</button>
        <button className="be-btn be-btn--sm be-btn--secondary">Edit</button>
      </div>
    ), align: 'right' },
  ]

  return (
    <div className="space-y-5">
      <SectionHeader title="Partners" subtitle={`${PARTNERS.length} total partners`}
        actions={<button className="be-btn be-btn--primary">+ Add Partner</button>} />

      <Toolbar
        left={
          <>
            {(['all','active','pending','inactive'] as Filter[]).map(f => (
              <FilterPill key={f} label={f.charAt(0).toUpperCase()+f.slice(1)}
                count={f === 'all' ? PARTNERS.length : PARTNERS.filter(p => p.status === f).length}
                active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </>
        }
        right={
          <input className="be-input" style={{ width: 200 }} placeholder="Search partners…" />
        }
      />

      <DataTable
        columns={columns} rows={filtered}
        rowKey={r => r.id}
        emptyState={<EmptyState icon="🤝" title="No partners found" description="Try adjusting the filters." />}
      />
    </div>
  )
}
