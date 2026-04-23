'use client'

import { useState } from 'react'
import { SectionHeader, DataTable, StatusBadge, FilterPill, Toolbar } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface Prospect { id: string; name: string; email: string; score: number; stage: string; date: string }

const MY_PROSPECTS: Prospect[] = [
  { id:'1', name:'Alex Turner',    email:'alex@email.com',    score:72, stage:'Invited',    date:'Apr 22' },
  { id:'2', name:'Priya Sharma',   email:'priya@email.com',   score:88, stage:'Completed',  date:'Apr 21' },
  { id:'3', name:'Tom Baker',      email:'tom@email.com',     score:45, stage:'Applied',    date:'Apr 20' },
  { id:'4', name:'Nina Patel',     email:'nina@email.com',    score:31, stage:'Evaluating', date:'Apr 19' },
  { id:'5', name:'Sam Rodriguez',  email:'sam@email.com',     score:60, stage:'Invited',    date:'Apr 18' },
  { id:'6', name:'Dana Kim',       email:'dana@email.com',    score:55, stage:'Evaluating', date:'Apr 17' },
]

const stageTone: Record<string, 'blue'|'amber'|'green'|'neutral'> = {
  Applied: 'neutral', Invited: 'blue', Evaluating: 'amber', Completed: 'green',
}

type StageFilter = 'All' | 'Applied' | 'Invited' | 'Evaluating' | 'Completed'

export default function DashboardProspectsPage() {
  const [filter, setFilter] = useState<StageFilter>('All')
  const rows = filter === 'All' ? MY_PROSPECTS : MY_PROSPECTS.filter(p => p.stage === filter)

  const columns: DataColumn<Prospect>[] = [
    { key: 'name',  header: 'Prospect', render: p => (
      <div>
        <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{p.name}</p>
        <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{p.email}</p>
      </div>
    )},
    { key: 'score', header: 'Score', render: p => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
          <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.score >= 70 ? '#059669' : p.score >= 40 ? '#d97706' : '#dc2626' }} />
        </div>
        <span className="text-xs font-semibold">{p.score}/100</span>
      </div>
    )},
    { key: 'stage', header: 'Stage',   render: p => <StatusBadge tone={stageTone[p.stage]}>{p.stage}</StatusBadge> },
    { key: 'date',  header: 'Date',    render: p => <span className="text-sm">{p.date}</span>, align: 'right' as const },
    { key: 'actions', header: '', align: 'right' as const, render: () => (
      <button className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border" style={{ borderColor: '#e2e8f0', color: '#334155', background: '#fff' }}>View</button>
    )},
  ]

  return (
    <div className="space-y-5">
      <SectionHeader title="My Prospects" subtitle={`${MY_PROSPECTS.length} prospects in your pipeline`}
        actions={<button className="inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ background: '#1b61c9' }}>+ Add Prospect</button>} />
      <Toolbar
        left={(['All','Applied','Invited','Evaluating','Completed'] as StageFilter[]).map(f => (
          <FilterPill key={f} label={f}
            count={f==='All' ? MY_PROSPECTS.length : MY_PROSPECTS.filter(p=>p.stage===f).length}
            active={filter===f} onClick={() => setFilter(f)} />
        ))}
      />
      <DataTable columns={columns} rows={rows} rowKey={r => r.id} />
    </div>
  )
}
