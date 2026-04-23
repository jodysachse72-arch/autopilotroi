'use client'

import { SectionHeader, ActionCard } from '@/components/backend'

const partnerResources = [
  { href: '/dashboard/videos',                    icon: '🎬', title: 'Training Videos',     description: 'Watch training videos to master the partner program.' },
  { href: '/dashboard/links',                     icon: '🔗', title: 'Referral Links',      description: 'Generate and track your personal referral links.' },
  { href: '/dashboard/performance',               icon: '📈', title: 'Analytics',           description: 'Track your conversions, scores, and commission.' },
  { href: 'https://autopilotroi.com/university',  icon: '🎓', title: 'University',          description: 'AI onboarding education library — free for partners.', external: true },
  { href: 'https://autopilotroi.com/calculator',  icon: '🧮', title: 'ROI Calculator',      description: 'Share this tool with prospects to show their potential ROI.', external: true },
  { href: 'https://autopilotroi.com',             icon: '🌐', title: 'Marketing Site',      description: 'The public-facing site your prospects will visit.', external: true },
  { href: '/dashboard/settings',                  icon: '⚙️', title: 'Account Settings',    description: 'Update your profile, password, and notifications.' },
]

export default function DashboardResourcesPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Resources" subtitle="Tools, links, and materials to grow your partnership" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnerResources.map(r => <ActionCard key={r.title} cta="Open →" {...r} />)}
      </div>
    </div>
  )
}
