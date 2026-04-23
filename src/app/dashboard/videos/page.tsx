'use client'

import { SectionHeader, Card, StatusBadge } from '@/components/backend'

const videos = [
  { id:'1', title:'Welcome to AutopilotROI',           duration:'4:22', category:'Onboarding',   thumbnail:'🎬', status:'New'     },
  { id:'2', title:'How the Partner Program Works',     duration:'8:15', category:'Overview',     thumbnail:'🤝', status:''        },
  { id:'3', title:'Talking to Prospects — Scripts',    duration:'12:40',category:'Sales',         thumbnail:'💬', status:''        },
  { id:'4', title:'Understanding the ROI Calculator',  duration:'6:55', category:'Tools',         thumbnail:'🧮', status:''        },
  { id:'5', title:'Your First 30 Days Action Plan',    duration:'9:12', category:'Strategy',      thumbnail:'📅', status:''        },
  { id:'6', title:'Objection Handling Masterclass',    duration:'18:30',category:'Sales',         thumbnail:'🛡️', status:'Popular' },
  { id:'7', title:'Leveraging the University Content', duration:'7:44', category:'Tools',         thumbnail:'🎓', status:''        },
  { id:'8', title:'Advanced Partner Strategies Q&A',   duration:'22:18',category:'Advanced',      thumbnail:'🚀', status:'Popular' },
]

const categoryTone: Record<string, 'blue'|'green'|'amber'|'purple'|'neutral'> = {
  Onboarding: 'blue', Overview: 'neutral', Sales: 'green', Tools: 'amber', Strategy: 'blue', Advanced: 'purple',
}

export default function VideosPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Partner Videos" subtitle={`${videos.length} training videos in your library`} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map(v => (
          <Card key={v.id} className="be-card--interactive group cursor-pointer">
            {/* Thumbnail */}
            <div className="mb-3 flex h-28 items-center justify-center rounded-lg"
              style={{ background: 'linear-gradient(135deg, #1b61c9 0%, #1d65ce 100%)' }}>
              <span className="text-5xl" aria-hidden>{v.thumbnail}</span>
            </div>
            {/* Meta */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-semibold leading-snug" style={{ color: '#0f172a' }}>{v.title}</h3>
              {v.status && <StatusBadge tone={v.status === 'New' ? 'blue' : 'green'} className="shrink-0">{v.status}</StatusBadge>}
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge tone={categoryTone[v.category]}>{v.category}</StatusBadge>
              <span className="text-xs font-mono" style={{ color: 'rgba(15,23,42,0.50)' }}>{v.duration}</span>
            </div>
            <button className="be-btn be-btn--sm be-btn--primary mt-3 w-full justify-center">▶ Watch</button>
          </Card>
        ))}
      </div>
    </div>
  )
}
