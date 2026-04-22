'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import GuidedTour from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import { PARTNER_TOUR } from '@/lib/tours'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarShell, type SidebarSection } from '@/components/backend'
import {
  LayoutDashboard, Users, TrendingUp, Trophy, Link2, Video, Library, Settings,
  Menu, Search, Bell, Compass, ChevronDown, LogOut, UserCircle2,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   PARTNER DASHBOARD SHELL — Lucide icons + premium app bar.
   ───────────────────────────────────────────── */

const sidebarSections: SidebarSection[] = [
  {
    label: 'Overview',
    links: [
      { id: 'nav-overview',    label: 'Overview',       href: '/dashboard',             icon: LayoutDashboard, exact: true },
      { id: 'nav-prospects',   label: 'Prospects',      href: '/dashboard/prospects',   icon: Users, badge: '7', badgeTone: 'blue' },
      { id: 'nav-performance', label: 'Performance',    href: '/dashboard/performance', icon: TrendingUp },
      { id: 'nav-leaderboard', label: 'Leaderboard',    href: '/dashboard/leaderboard', icon: Trophy },
    ],
  },
  {
    label: 'Growth',
    links: [
      { id: 'nav-links',       label: 'Referral Links', href: '/dashboard/links',       icon: Link2 },
      { id: 'nav-videos',      label: 'Partner Videos', href: '/dashboard/videos',      icon: Video },
      { id: 'nav-resources',   label: 'Resources',      href: '/dashboard/resources',   icon: Library },
    ],
  },
  {
    label: 'Account',
    links: [
      { id: 'nav-settings',    label: 'Settings',       href: '/dashboard/settings',    icon: Settings },
    ],
  },
]

interface Notification { id: number; text: string; time: string; read: boolean }

const NOTIFICATIONS: Notification[] = [
  { id: 1, text: 'Sarah Chen completed assessment (Score: 28)', time: '2h ago', read: false },
  { id: 2, text: 'James Wilson moved to Invited stage',         time: '5h ago', read: false },
  { id: 3, text: 'New prospect from your referral link',        time: '1d ago', read: true  },
  { id: 4, text: 'Maria Garcia started onboarding',             time: '2d ago', read: true  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showTour, setShowTour]                   = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [profileOpen, setProfileOpen]             = useState(false)
  const [mobileOpen, setMobileOpen]               = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef   = useRef<HTMLDivElement>(null)

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close drawers when route changes
  useEffect(() => { setMobileOpen(false); setProfileOpen(false); setShowNotifications(false) }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setProfileOpen(false); setShowNotifications(false) }
    }
    const click = (e: MouseEvent) => {
      const t = e.target as Node
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false)
      if (notifRef.current   && !notifRef.current.contains(t))   setShowNotifications(false)
    }
    window.addEventListener('keydown', handler)
    window.addEventListener('mousedown', click)
    return () => { window.removeEventListener('keydown', handler); window.removeEventListener('mousedown', click) }
  }, [])

  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])
  const openSearch = useCallback(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  }, [])

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f2f7' }}>
      <aside className="hidden lg:flex w-[15.5rem] flex-col shrink-0">
        <SidebarShell
          pathname={pathname}
          sections={sidebarSections}
          brandLabel="Partner Hub"
          brandAccent="#60a5fa"
        />
      </aside>

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
                sections={sidebarSections}
                brandLabel="Partner Hub"
                brandAccent="#60a5fa"
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="be-appbar sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={toggleMobile}
              className="be-appbar-iconbtn lg:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
            <h1 className="text-[0.95rem] font-semibold truncate" style={{ color: '#0b1220', letterSpacing: '-0.01em' }}>
              Partner Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={openSearch} className="be-appbar-search hidden md:flex" title="Quick search (Cmd+K)">
              <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="flex-1 text-left">Search prospects, links…</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 bg-white text-slate-500">⌘K</kbd>
            </button>

            <button onClick={openSearch} className="be-appbar-iconbtn md:hidden" aria-label="Search">
              <Search className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>

            <button
              onClick={() => setShowTour(true)}
              className="be-appbar-iconbtn hidden sm:inline-flex"
              title="Take a guided tour"
            >
              <Compass className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(o => !o)}
                className="be-appbar-iconbtn"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span
                    className="absolute right-[5px] top-[5px] flex h-[14px] min-w-[14px] items-center justify-center rounded-full text-[9px] font-bold text-white px-[3px]"
                    style={{ background: '#ef4444', boxShadow: '0 0 0 2px #fff' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-12 w-80 rounded-xl z-40 overflow-hidden"
                    style={{ background: '#fff', border: '1px solid #e6e8ec', boxShadow: '0 12px 32px rgba(15,23,42,0.12)' }}
                  >
                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #f0f2f7' }}>
                      <h3 className="text-sm font-semibold" style={{ color: '#0b1220' }}>Notifications</h3>
                      <span className="text-[10px] font-bold rounded-full px-2 py-0.5" style={{ background: 'rgba(59,130,246,0.10)', color: '#1b61c9' }}>{unreadCount} new</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {NOTIFICATIONS.map(n => (
                        <div key={n.id} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: '1px solid #f0f2f7', background: !n.read ? 'rgba(59,130,246,0.04)' : '#fff' }}>
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: !n.read ? '#3b82f6' : '#cbd5e1' }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs leading-snug" style={{ color: '#0b1220' }}>{n.text}</p>
                            <p className="mt-0.5 text-[10px]" style={{ color: 'rgba(4,14,32,0.45)' }}>{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full px-4 py-2.5 text-xs font-semibold hover:bg-slate-50" style={{ color: '#1b61c9' }}>
                      Mark all as read
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative ml-1" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="be-appbar-avatar"
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <span className="be-appbar-avatar__circle">DP</span>
                <span className="hidden sm:flex items-center gap-0.5 pr-1">
                  <span className="text-xs font-semibold" style={{ color: '#0b1220' }}>Partner</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-12 w-56 rounded-xl overflow-hidden z-40"
                    style={{ background: '#fff', border: '1px solid #e6e8ec', boxShadow: '0 12px 32px rgba(15,23,42,0.12)' }}
                  >
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid #f0f2f7' }}>
                      <div className="text-xs font-semibold" style={{ color: '#0b1220' }}>Demo Partner</div>
                      <div className="text-[11px] mt-0.5" style={{ color: 'rgba(4,14,32,0.5)' }}>partner@autopilotroi.com</div>
                    </div>
                    <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50" style={{ color: '#0b1220' }}>
                      <UserCircle2 className="h-4 w-4 opacity-60" strokeWidth={2} /> Profile
                    </button>
                    <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50" style={{ color: '#0b1220' }}>
                      <Settings className="h-4 w-4 opacity-60" strokeWidth={2} /> Settings
                    </button>
                    <div style={{ borderTop: '1px solid #f0f2f7' }}>
                      <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50" style={{ color: '#dc2626' }}>
                        <LogOut className="h-4 w-4" strokeWidth={2} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden" style={{ padding: 'clamp(1rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2.5rem) 3rem' }}>
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
