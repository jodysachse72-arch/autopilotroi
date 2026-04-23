'use client'

import { SectionHeader, Card, StatusBadge } from '@/components/backend'

const phases = [
  {
    id: 1, title: 'Phase 1 — Foundation', status: 'Completed', completion: 100, icon: '✅',
    items: ['Partner onboarding flow', 'Readiness assessment', 'Admin dashboard', 'Email automation', 'Supabase integration'],
  },
  {
    id: 2, title: 'Phase 2 — Growth Engine', status: 'In Progress', completion: 65, icon: '🚀',
    items: ['Partner leaderboard ✅', 'Performance analytics ✅', 'Referral link system ✅', 'Commission tracking 🔄', 'AI prospect scoring 🔄', 'University modules 📋'],
  },
  {
    id: 3, title: 'Phase 3 — Scale', status: 'Planned', completion: 0, icon: '📋',
    items: ['Mobile app (PWA)', 'Multi-tier commissions', 'Advanced AI coaching', 'Partner certification program', 'White-label option'],
  },
  {
    id: 4, title: 'Phase 4 — Enterprise', status: 'Planned', completion: 0, icon: '🏢',
    items: ['Enterprise SSO', 'Custom API integrations', 'SLA dashboard', 'Advanced analytics suite', 'Dedicated account management'],
  },
]

const statusTone: Record<string, 'green'|'blue'|'neutral'> = { Completed: 'green', 'In Progress': 'blue', Planned: 'neutral' }

export default function RoadmapPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Strategy & Roadmap" subtitle="Platform phases, milestones, and goals" />
      <div className="space-y-4">
        {phases.map(phase => (
          <Card key={phase.id} padding="lg">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{phase.icon}</span>
                <div>
                  <h3 className="text-base font-bold" style={{ color: '#0f172a' }}>{phase.title}</h3>
                  <StatusBadge tone={statusTone[phase.status]} className="mt-1">{phase.status}</StatusBadge>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{phase.completion}%</p>
                <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>complete</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mb-4 h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${phase.completion}%`, background: phase.completion === 100 ? '#059669' : '#1b61c9' }} />
            </div>
            <ul className="space-y-1.5">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#334155' }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#1b61c9' }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
