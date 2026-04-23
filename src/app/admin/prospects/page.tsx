'use client'

import { useState } from 'react'
import { SectionHeader, DataTable, StatusBadge, FilterPill, Toolbar, EmptyState } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface Prospect { id: string; name: string; email: string; score: number; stage: string; partner: string; date: string }

const PROSPECTS: Prospect[] = [
  { id:'1', name:'Alex Turner',   email:'alex@email.com',   score:72, stage:'Invited',    partner:'Marcus J.',  date:'Apr 22' },
  { id:'2', name:'Priya Sharma',  email:'priya@email.com',  score:88, stage:'Completed',  partner:'Sarah C.',   date:'Apr 21' },
  { id:'3', name:'Tom Baker',     email:'tom@email.com',    score:45, stage:'Applied',    partner:'Unassigned', date:'Apr 21' },
  { id:'4', name:'Nina Patel',    email:'nina@email.com',   score:31, stage:'Applied',    partner:'Unassigned', date:'Apr 20' },
  { id:'5', name:'Sam Rodriguez', email:'sam@email.com',    score:60, stage:'Evaluating', partner:'David W.',   date:'Apr 19' },
  { id:'6', name:'Chloe Wright',  email:'chloe@email.com',  score:92, stage:'Completed',  partner:'Jessica M.', date:'Apr 18' },
  { id:'7', name:'Ben Foster',    email:'ben@email.com',    score:22, stage:'Applied',    partner:'Unassigned', date:'Apr 18' },
  { id:'8', name:'Dana Kim',      email:'dana@email.com',   score:55, stage:'Invited',    partner:'Kevin L.',   date:'Apr 17' },
]

const stageTone: Record<string, 'blue'|'amber'|'green'|'neutral'> = {
  Applied: 'neutral', Invited: 'blue', Evaluating: 'amber', Completed: 'green',
}
type StageFilter = 'All' | 'Applied' | 'Invited' | 'Evaluating' | 'Completed'

export default function ProspectsPage() {
  const [filter, setFilter] = useState<StageFilter>('All')
  const rows = filter === 'All' ? PROSPECTS : PROSPECTS.filter(p => p.stage === filter)

  const columns: DataColumn<Prospect>[] = [
    { key: 'name',    header: 'Prospect', render: p => (
      <div>
        <div className="text-sm font-semibold" style={{ color: '#0f172a' }}>{p.name}</div>
        <div className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{p.email}</div>
      </div>
    )},
    { key: 'score',   header: 'Score', render: p => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
          <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.score >= 70 ? '#059669' : p.score >= 40 ? '#d97706' : '#dc2626' }} />
        </div>
        <span className="text-xs font-semibold">{p.score}/100</span>
      </div>
    )},
    { key: 'stage',   header: 'Stage',   render: p => <StatusBadge tone={stageTone[p.stage]}>{p.stage}</StatusBadge> },
    { key: 'partner', header: 'Partner', render: p => (
      <span className={`text-sm ${p.partner === 'Unassigned' ? 'italic' : ''}`}
        style={{ color: p.partner === 'Unassigned' ? '#dc2626' : '#334155' }}>{p.partner}</span>
    )},
    { key: 'date',    header: 'Date',    render: p => <span className="text-sm">{p.date}</span>, align: 'right' as const },
    { key: 'actions', header: '',        align: 'right' as const, render: p => (
      <div className="flex gap-1.5">
        <button className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border transition-colors" style={{ borderColor: '#e2e8f0', color: '#334155', background: '#fff' }}>View</button>
        {p.partner === 'Unassigned' && <button className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold text-white" style={{ background: '#1b61c9' }}>Assign</button>}
      </div>
    )},
  ]

  return (
    <div className="space-y-5">
      <SectionHeader title="Prospect Queue" subtitle={`${PROSPECTS.length} total · ${PROSPECTS.filter(p=>p.partner==='Unassigned').length} unassigned`}
        actions={<button className="be-btn be-btn--ghost">Export CSV</button>} />
      <Toolbar
        left={(['All','Applied','Invited','Evaluating','Completed'] as StageFilter[]).map(f => (
          <FilterPill key={f} label={f}
            count={f==='All' ? PROSPECTS.length : PROSPECTS.filter(p=>p.stage===f).length}
            active={filter===f} onClick={() => setFilter(f)} />
        ))}
        right={<input className="block rounded-xl border px-3.5 py-2 text-sm" style={{ width: 200, borderColor: 'var(--border-primary)' }} placeholder="Search…" />}
      />
      <DataTable columns={columns} rows={rows} rowKey={r=>r.id} />
    </div>
  )
}
