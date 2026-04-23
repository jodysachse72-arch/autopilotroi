'use client'

import { useState } from 'react'
import { SectionHeader, Card } from '@/components/backend'

interface CheckItem { id: string; label: string; done: boolean }
interface CheckGroup { title: string; icon: string; items: CheckItem[] }

const initial: CheckGroup[] = [
  { title: 'Technical', icon: '⚙️', items: [
    { id:'t1', label: 'Supabase production project configured', done: true },
    { id:'t2', label: 'Environment variables set in Vercel',    done: true },
    { id:'t3', label: 'Custom domain connected',                done: true },
    { id:'t4', label: 'SSL certificate active',                 done: true },
    { id:'t5', label: 'Error monitoring (Sentry) configured',   done: false },
    { id:'t6', label: 'Uptime monitoring enabled',              done: false },
  ]},
  { title: 'Content', icon: '📝', items: [
    { id:'c1', label: 'Homepage hero copy finalized',   done: true  },
    { id:'c2', label: 'Privacy policy published',       done: true  },
    { id:'c3', label: 'Terms of service published',     done: true  },
    { id:'c4', label: 'FAQ page complete',              done: false },
    { id:'c5', label: 'Partner onboarding guide done',  done: false },
  ]},
  { title: 'Marketing', icon: '📣', items: [
    { id:'m1', label: 'Launch email drafted',         done: false },
    { id:'m2', label: 'Social media posts scheduled', done: false },
    { id:'m3', label: 'SEO meta tags verified',       done: true  },
    { id:'m4', label: 'Sitemap submitted to Google',  done: true  },
  ]},
  { title: 'Partner Readiness', icon: '🤝', items: [
    { id:'p1', label: 'All active partners notified',    done: false },
    { id:'p2', label: 'Demo accounts tested',            done: true  },
    { id:'p3', label: 'Partner training video recorded', done: false },
  ]},
]

export default function ChecklistPage() {
  const [groups, setGroups] = useState(initial)

  const toggle = (gIdx: number, iIdx: number) =>
    setGroups(gs => gs.map((g, gi) =>
      gi !== gIdx ? g : { ...g, items: g.items.map((item, ii) => ii !== iIdx ? item : { ...item, done: !item.done }) }
    ))

  const total = groups.flatMap(g => g.items).length
  const done  = groups.flatMap(g => g.items).filter(i => i.done).length
  const pct   = Math.round((done / total) * 100)

  return (
    <div className="space-y-5">
      <SectionHeader title="Launch Checklist" subtitle="Track every task before going live" />

      {/* Progress card */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>Overall Progress</p>
            <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{done} of {total} items complete</p>
          </div>
          <p className="text-3xl font-bold" style={{ color: pct === 100 ? '#059669' : '#1b61c9' }}>{pct}%</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: pct === 100 ? '#059669' : '#1b61c9' }} />
        </div>
      </Card>

      {/* Groups */}
      {groups.map((g, gi) => {
        const gDone = g.items.filter(i => i.done).length
        return (
          <Card key={g.title}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>{g.icon}</span>
                <h3 className="text-base font-bold" style={{ color: '#0f172a' }}>{g.title}</h3>
              </div>
              <span className="text-sm font-semibold" style={{ color: gDone === g.items.length ? '#059669' : 'rgba(15,23,42,0.50)' }}>
                {gDone}/{g.items.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {g.items.map((item, ii) => (
                <label key={item.id} className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={item.done} onChange={() => toggle(gi, ii)}
                    className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
                  <span className="text-sm" style={{ color: item.done ? 'rgba(15,23,42,0.45)' : '#334155', textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
