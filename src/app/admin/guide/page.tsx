'use client'

import { useState } from 'react'
import { SectionHeader, Card } from '@/components/backend'

const sections = [
  { id: '1', title: 'Getting Started', icon: '🚀', content: 'AutopilotROI is an AI-powered partner onboarding platform. As an admin you can manage partners, review prospect assessments, configure content, and track platform performance from one central hub.' },
  { id: '2', title: 'Partner Management', icon: '🤝', content: 'Navigate to the Partners section to add, edit, and promote partner accounts. Each partner is assigned a tier (Bronze, Silver, Gold) based on their activity and performance score. You can reassign prospects between partners from the Prospect Queue.' },
  { id: '3', title: 'Prospect Queue', icon: '👥', content: 'All incoming prospects flow into the Prospect Queue. Unassigned prospects appear highlighted in red. Use the filter pills to sort by stage (Applied, Invited, Evaluating, Completed). Assign prospects to the right partner based on geography and fit.' },
  { id: '4', title: 'Readiness Assessment', icon: '📋', content: 'Prospects complete a 10-question readiness assessment. Scores are calculated out of 100. Scores ≥70 are qualified leads. Scores below 40 typically indicate the prospect needs more education before joining.' },
  { id: '5', title: 'Email Automation', icon: '✉️', content: 'All transactional emails are managed from the Emails section. Trigger conditions: Welcome (on signup), Assessment Reminder (48h after signup if incomplete), Invitation (when manually invited by partner), and Onboarding Complete (auto-triggered on completion).' },
  { id: '6', title: 'Content Management', icon: '✏️', content: 'The CMS Studio controls all site copy, University content, FAQ sections, and blog posts. Changes take effect immediately on publish. Use Draft status to stage content before publishing.' },
]

export default function GuidePage() {
  const [open, setOpen] = useState<string | null>('1')
  const toggle = (id: string) => setOpen(o => o === id ? null : id)

  return (
    <div className="space-y-5">
      <SectionHeader title="Platform Guide" subtitle="Everything you need to administer AutopilotROI" />
      <div className="space-y-2">
        {sections.map(s => (
          <Card key={s.id} padding="flush">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => toggle(s.id)}
              aria-expanded={open === s.id}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden>{s.icon}</span>
                <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>{s.title}</h3>
              </div>
              <span className="text-base shrink-0 transition-transform" style={{ transform: open === s.id ? 'rotate(90deg)' : 'rotate(0deg)', color: '#1b61c9' }}>›</span>
            </button>
            {open === s.id && (
              <div className="px-5 pb-5">
                <div className="h-px mb-4" style={{ background: '#e2e8f0' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{s.content}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
