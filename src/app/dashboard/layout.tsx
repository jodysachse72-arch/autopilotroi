'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'
import GuidedTour, { type TourStep } from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const notifications = [
    { id: 1, text: 'Sarah Chen completed assessment (Score: 28)', time: '2h ago', read: false },
    { id: 2, text: 'James Wilson moved to Invited stage', time: '5h ago', read: false },
    { id: 3, text: 'New prospect from your referral link', time: '1d ago', read: true },
    { id: 4, text: 'Maria Garcia started onboarding', time: '2d ago', read: true },
  ]
  const unreadCount = notifications.filter(n => !n.read).length

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  return (
    <div className="min-h-screen flex">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-card)]">
        <div className="flex h-[4.8rem] items-center px-6 border-b border-[var(--border-primary)]">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon size={32} />
            <span className="font-[var(--font-sora)] text-lg font-semibold">
              <span className="text-[var(--text-primary)]">Partner</span>
              <span className="text-blue-400"> Hub</span>
            </span>
          </Link>
        </div>

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

        <div className="border-t border-[var(--border-primary)] p-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
          >
            ← Back to site
          </Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-[var(--border-primary)] bg-[var(--bg-card)] lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5 border-b border-[var(--border-primary)]">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <LogoIcon size={28} />
                  <span className="font-[var(--font-sora)] text-base font-semibold">
                    <span className="text-[var(--text-primary)]">Partner</span>
                    <span className="text-blue-400"> Hub</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition ${
                        isActive
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="border-t border-[var(--border-primary)] p-4 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
                >
                  ← Back to site
                </Link>
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 sm:h-[4.8rem] items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              onClick={toggleMobile}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] text-[var(--text-secondary)]"
              aria-label="Toggle navigation"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:block">
              <h1 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
                Partner Dashboard
              </h1>
            </div>
            <div className="lg:hidden">
              <span className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-primary)]">
                Partner Hub
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cmd+K hint */}
            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
              }}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-2.5 py-1.5 text-[10px] text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
              title="Quick search (Cmd+K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <kbd className="font-mono">⌘K</kbd>
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-2xl z-50 overflow-hidden">
                  <div className="border-b border-[var(--border-primary)] px-4 py-3">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-[var(--border-primary)] last:border-0 ${!n.read ? 'bg-blue-500/5' : ''}`}>
                        <span className="mt-0.5 text-xs">{!n.read ? '🔵' : '⚪'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--text-secondary)]">{n.text}</p>
                          <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowTour(true)}
              className="hidden sm:block rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              title="Take a guided tour of the dashboard"
            >
              🗺️ Tour
            </button>
            <span id="partner-badge" className="rounded-full bg-blue-500/15 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-blue-400">
              Partner
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette />

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
