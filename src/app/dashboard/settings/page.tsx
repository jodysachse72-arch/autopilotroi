'use client'

import { useState } from 'react'
import { SectionHeader, Card, FormField, FormInput, FormButton } from '@/components/backend'

export default function DashboardSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: 'Demo Partner', email: 'partner@autopilotroi.com', phone: '', bio: '' })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const field = (key: keyof typeof profile) => ({
    value: profile[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setProfile(p => ({ ...p, [key]: e.target.value })),
  })

  return (
    <div className="space-y-5">
      <SectionHeader title="Account Settings" subtitle="Manage your profile and preferences" />

      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <Card>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Profile</h3>
          <div className="space-y-4">
            <FormField label="Full Name" htmlFor="s-name" required>
              <FormInput id="s-name" type="text" required {...field('name')} />
            </FormField>
            <FormField label="Email" htmlFor="s-email" required>
              <FormInput id="s-email" type="email" required {...field('email')} />
            </FormField>
            <FormField label="Phone" htmlFor="s-phone">
              <FormInput id="s-phone" type="tel" placeholder="+1 (555) 000-0000" {...field('phone')} />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Notifications</h3>
          <div className="space-y-3">
            {[
              { id: 'n1', label: 'New prospect assigned',         on: true  },
              { id: 'n2', label: 'Assessment completed',          on: true  },
              { id: 'n3', label: 'Weekly performance digest',     on: true  },
              { id: 'n4', label: 'Commission payment received',   on: true  },
              { id: 'n5', label: 'Platform announcements',        on: false },
            ].map(n => (
              <label key={n.id} className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-sm" style={{ color: '#334155' }}>{n.label}</span>
                <label className="be-toggle" aria-label={n.label}>
                  <input type="checkbox" defaultChecked={n.on} />
                  <div className="be-toggle-track" />
                </label>
              </label>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <FormButton type="submit" variant="primary" id="settings-save">
            {saved ? '✅ Saved!' : 'Save Changes'}
          </FormButton>
          <FormButton type="button" variant="ghost" onClick={() => {}}>Cancel</FormButton>
        </div>
      </form>
    </div>
  )
}
