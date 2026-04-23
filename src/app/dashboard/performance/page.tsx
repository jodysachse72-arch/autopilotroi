'use client'

import { SectionHeader, StatCard, Card } from '@/components/backend'

const stats = [
  { label: 'Conversion Rate',    value: '33%',   delta: '+5% vs last month', trend: 'up'   as const, icon: '📈' },
  { label: 'Avg. Score of Leads',value: '68',    delta: 'Above 60 threshold', trend: 'up'  as const, icon: '⭐' },
  { label: 'Time to Convert',    value: '14d',   delta: '−2 days improved',   trend: 'up'  as const, icon: '⏱️' },
  { label: 'Prospects This Month',value: '6',    delta: '+2 vs last month',   trend: 'up'  as const, icon: '👥' },
]

const funnel = [
  { stage: 'Applied',    count: 18, pct: 100 },
  { stage: 'Invited',    count: 12, pct: 67  },
  { stage: 'Evaluating', count: 9,  pct: 50  },
  { stage: 'Completed',  count: 6,  pct: 33  },
]

const monthly = [
  { month: 'Jan', prospects: 2, completed: 1 },
  { month: 'Feb', prospects: 3, completed: 1 },
  { month: 'Mar', prospects: 4, completed: 2 },
  { month: 'Apr', prospects: 6, completed: 2 },
]

export default function PerformancePage() {
  const maxPct = Math.max(...monthly.map(m => m.prospects))

  return (
    <div className="space-y-6">
      <SectionHeader title="Performance" subtitle="Your conversion funnel, trends, and key metrics" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">

        {/* Funnel */}
        <Card>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Conversion Funnel</h3>
          <div className="space-y-3">
            {funnel.map(stage => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: '#334155' }}>{stage.stage}</span>
                  <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{stage.count} <span className="text-xs font-normal" style={{ color: 'rgba(15,23,42,0.45)' }}>({stage.pct}%)</span></span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                  <div className="h-full rounded-full" style={{ width: `${stage.pct}%`, background: '#1b61c9' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly chart */}
        <Card>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Monthly Prospects</h3>
          <div className="flex items-end justify-around gap-3 h-36">
            {monthly.map(m => (
              <div key={m.month} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="flex items-end gap-1 w-full justify-center" style={{ height: '100px' }}>
                  <div className="w-4 rounded-t"
                    style={{ height: `${(m.prospects/maxPct)*100}%`, background: '#1b61c9', opacity: 0.9 }} title={`${m.prospects} prospects`} />
                  <div className="w-4 rounded-t"
                    style={{ height: `${(m.completed/maxPct)*100}%`, background: '#059669', opacity: 0.9 }} title={`${m.completed} completed`} />
                </div>
                <span className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(15,23,42,0.55)' }}>
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#1b61c9' }} />Prospects
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(15,23,42,0.55)' }}>
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#059669' }} />Completed
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
