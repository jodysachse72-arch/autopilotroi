'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'
import GuidedTour, { type TourStep } from '@/components/ui/GuidedTour'

const sidebarLinks = [
  { id: 'nav-overview', label: 'Overview', href: '/dashboard', icon: '📊' },
  { id: 'nav-prospects', label: 'Prospects', href: '/dashboard/prospects', icon: '👥' },
  { id: 'nav-performance', label: 'Performance', href: '/dashboard/performance', icon: '📈' },
  { id: 'nav-leaderboard', label: 'Leaderboard', href: '/dashboard/leaderboard', icon: '🏆' },
  { id: 'nav-links', label: 'Referral Links', href: '/dashboard/links', icon: '🔗' },
  { id: 'nav-videos', label: 'Partner Videos', href: '/dashboard/videos', icon: '🎬' },
  { id: 'nav-resources', label: 'Resources', href: '/resources', icon: '📚' },
  { id: 'nav-settings', label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]

/* ── Partner Dashboard Tour Steps ── */
const PARTNER_TOUR: TourStep[] = [
  {
    target: null,
    title: 'Welcome to Partner Hub',
    content: 'This is your command center for tracking referrals, monitoring performance, and growing your team.\n\nLet\'s take a quick look around — it\'ll take less than 60 seconds.',
    icon: '🚀',
    position: 'center',
  },
  {
    target: '#nav-overview',
    title: 'Dashboard Overview',
    content: 'Your home base. See total prospects, conversion rates, and recent activity at a glance.',
    icon: '📊',
    position: 'right',
    actionHint: 'This is where you\'ll spend most of your time',
  },
  {
    target: '#nav-prospects',
    title: 'Your Prospects',
    content: 'Everyone who signed up through your referral link appears here. Track their readiness score, tier, and onboarding status.',
    icon: '👥',
    position: 'right',
    actionHint: 'Follow up with prospects who scored high on readiness',
  },
  {
    target: '#nav-performance',
    title: 'Performance Analytics',
    content: 'Deep-dive into your referral performance — click-through rates, conversion funnels, and which content drives the most signups.',
    icon: '📈',
    position: 'right',
  },
  {
    target: '#nav-leaderboard',
    title: 'Team Leaderboard',
    content: 'See how you rank among other partners. Top performers get featured prominently and earn bonus rewards.',
    icon: '🏆',
    position: 'right',
    actionHint: 'Gamification drives healthy competition',
  },
  {
    target: '#nav-links',
    title: 'Your Referral Links',
    content: 'Generate Hot, Cold, and page-specific referral links. Each link is tracked — share them on social media, email, or direct messages.',
    icon: '🔗',
    position: 'right',
    actionHint: 'Pro tip: Use Cold links for outreach and Hot links for ready prospects',
  },
  {
    target: '#nav-videos',
    title: 'Partner Videos',
    content: 'Training videos covering sales techniques, product knowledge, and social media strategy. New content added regularly.',
    icon: '🎬',
    position: 'right',
  },
  {
    target: '#nav-resources',
    title: 'Gated Resources',
    content: 'Access marketing materials, downloadable guides, and partner-exclusive content.',
    icon: '📚',
    position: 'right',
  },
  {
    target: '#nav-settings',
    title: 'Profile Settings',
    content: 'Update your profile, social links, notification preferences, and security settings.',
    icon: '⚙️',
    position: 'right',
  },
  {
    target: '#partner-badge',
    title: 'Your Role Badge',
    content: 'This badge shows your current role and access level. As you grow, you\'ll unlock additional features and tools.',
    icon: '🏅',
    position: 'bottom',
  },
  {
    target: null,
    title: 'You\'re All Set!',
    content: 'That\'s the full tour. You can replay this anytime from the dashboard header.\n\nNow go share your referral link and start building! 💪',
    icon: '🎯',
    position: 'center',
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [showTour, setShowTour] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-card)]">
        {/* Logo area */}
        <div className="flex h-[4.8rem] items-center px-6 border-b border-[var(--border-primary)]">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon size={32} />
            <span className="font-[var(--font-sora)] text-lg font-semibold">
              <span className="text-[var(--text-primary)]">Partner</span>
              <span className="text-blue-400"> Hub</span>
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                id={link.id}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Back to site */}
        <div className="border-t border-[var(--border-primary)] p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-[4.8rem] items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-6 lg:px-8">
          <div className="lg:hidden">
            <Link href="/" className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)]">
              Partner Hub
            </Link>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
              Partner Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTour(true)}
              className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              title="Take a guided tour of the dashboard"
            >
              🗺️ Tour
            </button>
            <span id="partner-badge" className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
              Partner
            </span>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex lg:hidden overflow-x-auto border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 scrollbar-hide">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition ${
                  isActive
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>

      {/* Partner Tour */}
      <GuidedTour
        tourId="partner-dashboard"
        steps={PARTNER_TOUR}
        autoStart={true}
        forceShow={showTour}
        onComplete={() => setShowTour(false)}
      />
    </div>
  )
}
