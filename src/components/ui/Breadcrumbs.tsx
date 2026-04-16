'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ═══════════════════════════════════════════════════════════════
   BREADCRUMB NAVIGATION — Auto-generates from route path
   Usage: <Breadcrumbs />
   ═══════════════════════════════════════════════════════════════ */

const labels: Record<string, string> = {
  dashboard: 'Partner Dashboard',
  admin: 'Admin Panel',
  prospects: 'Prospects',
  performance: 'Performance',
  leaderboard: 'Leaderboard',
  links: 'Referral Links',
  videos: 'Partner Videos',
  settings: 'Settings',
  partners: 'Partners',
  roadmap: 'Strategy Roadmap',
  changelog: 'Changelog',
  checklist: 'Checklist',
  features: 'Feature Toggles',
  guide: 'Guide',
  cms: 'CMS Studio',
  emails: 'Emails',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) return null

  const crumbs = segments.map((seg, i) => ({
    label: labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
    href: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }))

  return (
    <nav className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'rgba(4,14,32,0.45)' }} aria-label="Breadcrumb">
      <Link href="/" className="transition hover:text-[#1b61c9]">Home</Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <span style={{ color: '#e0e2e6' }}>/</span>
          {crumb.isLast ? (
            <span className="font-medium" style={{ color: 'rgba(4,14,32,0.69)' }}>{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="transition hover:text-[#1b61c9]">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
