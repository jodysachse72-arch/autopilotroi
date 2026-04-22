'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import GuidedTour from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import { ADMIN_TOUR } from '@/lib/tours'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarShell, type SidebarSection } from '@/components/backend'
import {
  LayoutDashboard, Handshake, Users, FileEdit, Mail, ToggleLeft,
  Map, FileText, CheckSquare, BookOpen, Library, ScrollText, Settings,
  Menu, Search, Bell, Compass, ChevronDown, LogOut, UserCircle2, Shield,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   ADMIN SHELL — Lucide icons + premium app bar.
   Sidebar grouped into Workspace / Strategy / System.
   ───────────────────────────────────────────── */

const sidebarSections: SidebarSection[] = [
  {
    label: 'Workspace',
    links: [
      { id: 'admin-dashboard', label: 'Dashboard',      href: '/admin',           icon: LayoutDashboard, exact: true },
      { id: 'admin-partners',  label: 'Partners',       href: '/admin/partners',  icon: Handshake },
      { id: 'admin-prospects', label: 'Prospects',      href: '/admin/prospects', icon: Users, badge: '3', badgeTone: 'red' },
      { id: 'admin-cms',       label: 'Content Editor', href: '/admin/cms',       icon: FileEdit },
      { id: 'admin-emails',    label: 'Emails',         href: '/admin/emails',    icon: Mail },
    ],
  },
  {
    label: 'Strategy',
    links: [
      { id: 'admin-features',  label: 'Feature Flags',  href: '/admin/features',  icon: ToggleLeft },
      { id: 'admin-strategy',  label: 'Roadmap',        href: '/admin/roadmap',   icon: Map },
      { id: 'admin-changelog', label: 'Changelog',      href: '/admin/changelog', icon: FileText },
      { id: 'admin-checklist', label: 'Checklist',      href: '/admin/checklist', icon: CheckSquare },
      { id: 'admin-guide',     label: 'Platform Guide', href: '/admin/guide',     icon: BookOpen },
    ],
  },
  {
    label: 'System',
    links: [
      { id: 'admin-resources', label: 'Resources',      href: '/admin/resources', icon: Library },
      { id: 'admin-audit',     label: 'Audit Log',      href: '/admin/audit',     icon: ScrollText },
      { id: 'admin-settings',  label: 'Integrations',   href: '/admin/settings',  icon: Settings },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showTour, setShowTour] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close drawer when route changes
  useEffect(() => { setMobileOpen(false); setProfileOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMobileOpen(false); setProfileOpen(false) } }
    const click = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
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
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[15.5rem] flex-col shrink-0">
        <SidebarShell
          pathname={pathname}
          sections={sidebarSections}
          brandLabel="Admin Panel"
          brandAccent="#f87171"
        />
      </aside>

      {/* Mobile Drawer */}
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
                brandLabel="Admin Panel"
                brandAccent="#f87171"
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
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
              System Administration
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={openSearch} className="be-appbar-search hidden md:flex" title="Quick search (Cmd+K)">
              <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="flex-1 text-left">Search anything…</span>
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

            <button className="be-appbar-iconbtn relative" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
              <span className="absolute right-[7px] top-[7px] h-2 w-2 rounded-full" style={{ background: '#ef4444', boxShadow: '0 0 0 2px #fff' }} />
            </button>

            <div className="relative ml-1" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="be-appbar-avatar"
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <span className="be-appbar-avatar__circle">
                  <Shield className="h-[14px] w-[14px]" strokeWidth={2.5} />
                </span>
                <span className="hidden sm:flex items-center gap-0.5 pr-1">
                  <span className="text-xs font-semibold" style={{ color: '#0b1220' }}>Admin</span>
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
                      <div className="text-xs font-semibold" style={{ color: '#0b1220' }}>Admin User</div>
                      <div className="text-[11px] mt-0.5" style={{ color: 'rgba(4,14,32,0.5)' }}>admin@autopilotroi.com</div>
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
        tourId="admin-panel"
        steps={ADMIN_TOUR}
        autoStart={true}
        forceShow={showTour}
        onComplete={() => setShowTour(false)}
      />
    </div>
  )
}
