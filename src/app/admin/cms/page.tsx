'use client'

import { SectionHeader, Card, StatusBadge } from '@/components/backend'

const sections = [
  { id: '1', title: 'Homepage Hero',          lastEdited: '2h ago',  status: 'Published', icon: '🏠' },
  { id: '2', title: 'About / Our Story',       lastEdited: '1d ago',  status: 'Published', icon: '📖' },
  { id: '3', title: 'Pricing & Plans',         lastEdited: '3d ago',  status: 'Published', icon: '💰' },
  { id: '4', title: 'University — Overview',   lastEdited: '5d ago',  status: 'Published', icon: '🎓' },
  { id: '5', title: 'University — Modules',    lastEdited: '5d ago',  status: 'Draft',     icon: '📚' },
  { id: '6', title: 'Partner Tools',           lastEdited: '1w ago',  status: 'Published', icon: '🔧' },
  { id: '7', title: 'FAQ',                     lastEdited: '2w ago',  status: 'Published', icon: '❓' },
  { id: '8', title: 'Blog — Launch Post',      lastEdited: '2w ago',  status: 'Draft',     icon: '✍️' },
  { id: '9', title: 'Disclaimer / Legal',      lastEdited: '1mo ago', status: 'Published', icon: '⚖️' },
]

const statusTone: Record<string, 'green' | 'amber'> = { Published: 'green', Draft: 'amber' }

export default function CmsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Content Editor" subtitle="Manage all published and draft site content"
        actions={<button className="be-btn be-btn--primary">+ New Section</button>} />

      <div className="space-y-3">
        {sections.map(s => (
          <Card key={s.id}>
            <div className="flex items-center gap-4">
              <span className="text-2xl leading-none shrink-0" aria-hidden>{s.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{s.title}</p>
                <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>Last edited {s.lastEdited}</p>
              </div>
              <StatusBadge tone={statusTone[s.status]}>{s.status}</StatusBadge>
              <div className="flex gap-1.5 shrink-0">
                <button className="be-btn be-btn--sm be-btn--ghost">Preview</button>
                <button className="be-btn be-btn--sm be-btn--secondary">Edit</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
