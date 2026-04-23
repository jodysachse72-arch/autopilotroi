'use client'

import { useState } from 'react'
import { SectionHeader, Card, StatusBadge } from '@/components/backend'

interface Flag { id: string; name: string; description: string; env: 'All'|'Production'|'Staging'; enabled: boolean }

const initial: Flag[] = [
  { id:'1', name:'partner_dashboard_v2',   description:'New partner dashboard with performance charts.',    env:'Staging',    enabled: true  },
  { id:'2', name:'university_modules',     description:'Enable the full University module library.',         env:'All',        enabled: true  },
  { id:'3', name:'calculator_v3',          description:'Updated ROI calculator with tier breakdown.',         env:'Production', enabled: true  },
  { id:'4', name:'leaderboard',            description:'Partner leaderboard and ranking system.',            env:'All',        enabled: true  },
  { id:'5', name:'ai_prospect_scoring',    description:'AI-powered automated prospect scoring pipeline.',   env:'Staging',    enabled: false },
  { id:'6', name:'commission_tracking',    description:'Real-time commission and earnings dashboard.',       env:'Staging',    enabled: false },
  { id:'7', name:'referral_link_gen_v2',   description:'Second-generation referral link generator.',         env:'Staging',    enabled: false },
  { id:'8', name:'maintenance_mode',       description:'Show maintenance page to unauthenticated visitors.', env:'All',        enabled: false },
]

const envTone: Record<string, 'neutral'|'amber'|'blue'> = { All: 'neutral', Production: 'amber', Staging: 'blue' }

export default function FeaturesPage() {
  const [flags, setFlags] = useState(initial)

  const toggle = (id: string) =>
    setFlags(fs => fs.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))

  return (
    <div className="space-y-5">
      <SectionHeader title="Feature Flags" subtitle="Control feature rollout across environments" />

      <div className="space-y-3">
        {flags.map(f => (
          <Card key={f.id}>
            <div className="flex items-center gap-4">
              <label className="be-toggle shrink-0" aria-label={`Toggle ${f.name}`}>
                <input type="checkbox" checked={f.enabled} onChange={() => toggle(f.id)} />
                <div className="be-toggle-track" />
              </label>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono font-semibold" style={{ color: '#0f172a' }}>{f.name}</p>
                <p className="text-xs" style={{ color: 'rgba(15,23,42,0.55)' }}>{f.description}</p>
              </div>
              <StatusBadge tone={envTone[f.env]}>{f.env}</StatusBadge>
              <StatusBadge tone={f.enabled ? 'green' : 'neutral'}>{f.enabled ? 'On' : 'Off'}</StatusBadge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
