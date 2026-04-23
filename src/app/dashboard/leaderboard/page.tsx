'use client'

import { SectionHeader, DataTable, StatusBadge, Card } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface LeaderEntry { rank: number; name: string; prospects: number; completed: number; conversion: string; commission: string; tier: string }

const LEADERS: LeaderEntry[] = [
  { rank: 1, name: 'Jessica Martinez', prospects: 31, completed: 20, conversion: '65%', commission: '$8,000', tier: 'Gold'   },
  { rank: 2, name: 'Marcus Johnson',   prospects: 24, completed: 14, conversion: '58%', commission: '$5,600', tier: 'Gold'   },
  { rank: 3, name: 'Kevin Lee',        prospects: 19, completed: 10, conversion: '53%', commission: '$4,000', tier: 'Gold'   },
  { rank: 4, name: 'Sarah Chen',       prospects: 11, completed: 6,  conversion: '55%', commission: '$2,400', tier: 'Silver' },
  { rank: 5, name: 'David Williams',   prospects: 6,  completed: 3,  conversion: '50%', commission: '$1,200', tier: 'Bronze' },
  { rank: 6, name: 'Ryan Thompson',    prospects: 4,  completed: 1,  conversion: '25%', commission: '$400',   tier: 'Bronze' },
]

const tierTone: Record<string, 'amber'|'neutral'|'blue'> = { Gold: 'amber', Silver: 'neutral', Bronze: 'blue' }
const rankMedal = (r: number) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `${r}`

const columns: DataColumn<LeaderEntry>[] = [
  { key: 'rank',       header: 'Rank',       render: e => <span className="text-base">{rankMedal(e.rank)}</span>, align: 'center', width: '60px' },
  { key: 'name',       header: 'Partner',    render: e => <span className="text-sm font-semibold" style={{ color: '#0f172a' }}>{e.name}</span> },
  { key: 'tier',       header: 'Tier',       render: e => <StatusBadge tone={tierTone[e.tier]}>{e.tier}</StatusBadge> },
  { key: 'prospects',  header: 'Prospects',  render: e => <span className="text-sm font-semibold">{e.prospects}</span>, align: 'right' },
  { key: 'completed',  header: 'Completed',  render: e => <span className="text-sm font-semibold">{e.completed}</span>, align: 'right' },
  { key: 'conversion', header: 'Conv. Rate', render: e => <span className="text-sm font-semibold">{e.conversion}</span>, align: 'right' },
  { key: 'commission', header: 'Commission', render: e => <span className="text-sm font-bold" style={{ color: '#059669' }}>{e.commission}</span>, align: 'right' },
]

export default function LeaderboardPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Leaderboard" subtitle="Partner rankings by performance and commission" />

      {/* Top 3 podium */}
      <div className="grid gap-4 grid-cols-3">
        {LEADERS.slice(0, 3).map(l => (
          <Card key={l.rank} className="text-center">
            <div className="text-3xl mb-2" aria-hidden>{rankMedal(l.rank)}</div>
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{l.name.split(' ')[0]}</p>
            <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{l.name.split(' ')[1]}</p>
            <p className="mt-2 text-lg font-bold" style={{ color: '#059669' }}>{l.commission}</p>
            <p className="text-xs" style={{ color: 'rgba(15,23,42,0.45)' }}>{l.conversion} conv.</p>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} rows={LEADERS} rowKey={r => String(r.rank)} />
    </div>
  )
}
