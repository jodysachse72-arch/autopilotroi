'use client'

import { useState } from 'react'
import { SectionHeader, Card, StatCard } from '@/components/backend'

const links = [
  { id: 'primary', label: 'Primary Referral',  url: 'https://autopilotroi.com/join?ref=PARTNER001', clicks: 142, signups: 18, converted: 6  },
  { id: 'social',  label: 'Social Media',      url: 'https://autopilotroi.com/join?ref=SOC001',     clicks: 89,  signups: 9,  converted: 3  },
  { id: 'email',   label: 'Email Campaign',    url: 'https://autopilotroi.com/join?ref=EMAIL001',   clicks: 67,  signups: 5,  converted: 2  },
]

export default function LinksPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const totalClicks  = links.reduce((a, l) => a + l.clicks, 0)
  const totalSignups = links.reduce((a, l) => a + l.signups, 0)
  const totalConv    = links.reduce((a, l) => a + l.converted, 0)

  return (
    <div className="space-y-5">
      <SectionHeader title="Referral Links" subtitle="Share these links to grow your prospect pipeline"
        actions={<button className="be-btn be-btn--primary">+ New Link</button>} />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Clicks"  value={totalClicks}  delta="All links"         trend="up"   icon="👆" />
        <StatCard label="Signups"       value={totalSignups} delta={`${Math.round(totalSignups/totalClicks*100)}% signup rate`} trend="up" icon="📝" />
        <StatCard label="Conversions"   value={totalConv}    delta={`${Math.round(totalConv/totalSignups*100)}% from signups`} trend="up" icon="✅" />
      </div>

      <div className="space-y-3">
        {links.map(link => (
          <Card key={link.id}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{link.label}</p>
                <p className="mt-1 text-xs font-mono break-all" style={{ color: 'rgba(15,23,42,0.55)' }}>{link.url}</p>
              </div>
              <button onClick={() => copy(link.id, link.url)}
                className={`be-btn be-btn--sm shrink-0 ${copied === link.id ? 'be-btn--primary' : 'be-btn--ghost'}`}>
                {copied === link.id ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Clicks',     value: link.clicks },
                { label: 'Signups',    value: link.signups },
                { label: 'Converted',  value: link.converted },
              ].map(stat => (
                <div key={stat.label} className="text-center rounded-lg py-3"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
