'use client'

import { SectionHeader, Card, StatusBadge } from '@/components/backend'

const entries = [
  {
    version: 'v2.4.0', date: 'April 22, 2026', type: 'Feature',
    changes: ['Added partner leaderboard with real-time rankings', 'New performance analytics dashboard', 'Referral link click tracking'],
  },
  {
    version: 'v2.3.1', date: 'April 18, 2026', type: 'Fix',
    changes: ['Fixed sidebar icon encoding issue in admin panel', 'Resolved CSS variable bleeding between frontend and backend', 'Patched mobile menu z-index conflict'],
  },
  {
    version: 'v2.3.0', date: 'April 15, 2026', type: 'Feature',
    changes: ['Frontend redesign — new "Institutional AI" design system', 'University page with module library', 'Calculator v3 with tier breakdown'],
  },
  {
    version: 'v2.2.0', date: 'April 10, 2026', type: 'Feature',
    changes: ['Partner onboarding wizard (4-step)', 'Readiness assessment with scoring engine', 'Welcome email automation'],
  },
  {
    version: 'v2.1.2', date: 'April 5, 2026', type: 'Fix',
    changes: ['Fixed Supabase auth session refresh', 'Corrected prospect assignment bug', 'Improved mobile nav performance'],
  },
  {
    version: 'v2.0.0', date: 'March 28, 2026', type: 'Major',
    changes: ['Full platform rebuild on Next.js 15', 'Supabase backend integration', 'Role-based access (admin / partner)', 'New admin shell with 13 management pages'],
  },
]

const typeTone: Record<string, 'green'|'blue'|'amber'|'purple'> = { Feature: 'blue', Fix: 'amber', Major: 'purple', Security: 'green' }

export default function ChangelogPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Changelog" subtitle="A history of every shipped feature and fix"
        actions={<button className="be-btn be-btn--primary">+ New Entry</button>} />

      <div className="space-y-4">
        {entries.map(entry => (
          <Card key={entry.version}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold font-mono" style={{ color: '#0f172a' }}>{entry.version}</h3>
                <StatusBadge tone={typeTone[entry.type]}>{entry.type}</StatusBadge>
              </div>
              <span className="text-sm shrink-0" style={{ color: 'rgba(15,23,42,0.50)' }}>{entry.date}</span>
            </div>
            <ul className="space-y-1.5">
              {entry.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#334155' }}>
                  <span style={{ color: '#1b61c9' }} aria-hidden>→</span>
                  {c}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
