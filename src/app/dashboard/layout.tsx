'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarShell, { type SidebarLink } from '@/components/backend/SidebarShell'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import '@/styles/backend.css'

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotif, setShowNotif]   = useState(false)
  const toggle = useCallback(() => setMobileOpen(p => !p), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMobileOpen(false); setShowNotif(false) } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const notifications = [
    { id: 1, text: 'Sarah Chen completed assessment (Score: 28)', time: '2h ago', read: false },
    { id: 2, text: 'James Wilson moved to Invited stage',         time: '5h ago', read: false },
    { id: 3, text: 'New prospect from your referral link',        time: '1d ago', read: true  },
    { id: 4, text: 'Maria Garcia started onboarding',            time: '2d ago', read: true  },
  ]
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="be-shell min-h-screen flex" style={{ background: '#f8fafc' }}>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[14.5rem] shrink-0 flex-col"
        style={{ boxShadow: '2px 0 12px rgba(27,97,201,0.12)' }}>
        <SidebarShell pathname={pathname} links={sidebarLinks} brandLabel="Partner Hub" />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.22,1,0.36,1] }}
              className="fixed inset-y-0 left-0 z-50 w-[14.5rem] flex flex-col lg:hidden shadow-2xl">
              <SidebarShell pathname={pathname} links={sidebarLinks}
                brandLabel="Partner Hub" onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 lg:px-7"
          style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

          <div className="flex items-center gap-3">
            <button onClick={toggle} aria-label="Toggle menu"
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg"
              style={{ border: '1px solid #e2e8f0' }}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#334155" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-[1.0625rem] font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
                Partner Dashboard
              </h1>
              <p className="hidden sm:block text-xs" style={{ color: 'rgba(15,23,42,0.45)' }}>
                Track prospects, performance, and earnings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(p => !p)} title="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-base transition"
                style={{ border: '1px solid #e2e8f0' }}>
                🔔
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-xl overflow-hidden"
                  style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Notifications</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3"
                        style={{ borderBottom: '1px solid #f1f5f9', background: !n.read ? 'rgba(27,97,201,0.04)' : '#fff' }}>
                        <span className="mt-0.5 text-xs" aria-hidden>{n.read ? '⚪' : '🔵'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs leading-snug" style={{ color: '#0f172a' }}>{n.text}</p>
                          <p className="mt-0.5 text-[10px]" style={{ color: 'rgba(15,23,42,0.40)' }}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: 'rgba(27,97,201,0.09)', color: '#1b61c9' }}>
              Partner
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-7 overflow-x-hidden">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
