'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import GuidedTour from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import { PARTNER_TOUR } from '@/lib/tours'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarShell, type SidebarLink } from '@/components/backend'

/* ─────────────────────────────────────────────
   PARTNER DASHBOARD SHELL — uses shared SidebarShell.
   ───────────────────────────────────────────── */

const sidebarLinks: SidebarLink[] = [
  { id: 'nav-overview',    label: 'Overview',       href: '/dashboard',              icon: '📊', exact: true },
  { id: 'nav-prospects',   label: 'Prospects',      href: '/dashboard/prospects',    icon: '👥' },
  { id: 'nav-performance', label: 'Performance',    href: '/dashboard/performance',  icon: '📈' },
  { id: 'nav-leaderboard', label: 'Leaderboard',    href: '/dashboard/leaderboard',  icon: '🏆' },
  { id: 'nav-links',       label: 'Referral Links', href: '/dashboard/links',        icon: '🔗' },
  { id: 'nav-videos',      label: 'Partner Videos', href: '/dashboard/videos',       icon: '🎬' },
  { id: 'nav-resources',   label: 'Resources',      href: '/dashboard/resources',    icon: '📚' },
  { id: 'nav-settings',    label: 'Settings',       href: '/dashboard/settings',     icon: '⚙️' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close drawer when route changes (URL is the external source)
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  return (
    <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-60 flex-col shrink-0 shadow-[2px_0_12px_rgba(27,97,201,0.15)]">
        <SidebarShell
          pathname={pathname}
          links={sidebarLinks}
          brandLabel="Partner Hub"
        />
      </aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden shadow-2xl"
            >
              <SidebarShell
                pathname={pathname}
                links={sidebarLinks}
                brandLabel="Partner Hub"
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex h-[4.8rem] shrink-0 items-center justify-between px-5 lg:px-8"
          style={{ background: '#ffffff', borderBottom: '1px solid #e0e2e6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobile}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg"
              style={{ border: '1px solid #e0e2e6' }}
              aria-label="Toggle navigation"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
              Partner Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Search shortcut */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition"
              style={{ border: '1px solid #e0e2e6', color: 'rgba(4,14,32,0.45)' }}
              title="Quick search (Cmd+K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <kbd className="font-mono">⌘K</kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg transition"
                style={{ border: '1px solid #e0e2e6', color: '#181d26' }}
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
                <div
                  className="absolute right-0 top-12 w-80 rounded-xl z-50 overflow-hidden"
                  style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid #e0e2e6' }}>
                    <h3 className="text-sm font-bold" style={{ color: '#181d26' }}>Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: '1px solid #f0f2f7', background: !n.read ? 'rgba(27,97,201,0.04)' : '#fff' }}>
                        <span className="mt-0.5 text-xs">{!n.read ? '🔵' : '⚪'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs" style={{ color: '#181d26' }}>{n.text}</p>
                          <p className="mt-0.5 text-[10px]" style={{ color: 'rgba(4,14,32,0.4)' }}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tour */}
            <button
              onClick={() => setShowTour(true)}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition"
              style={{ border: '1px solid #e0e2e6', color: '#1b61c9' }}
              title="Take a guided tour"
            >
              🗺️ Tour
            </button>

            {/* Badge */}
            <span
              id="partner-badge"
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: 'rgba(27,97,201,0.10)', color: '#1b61c9' }}
            >
              Partner
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <CommandPalette />
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
