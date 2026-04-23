'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import GuidedTour from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import { ADMIN_TOUR } from '@/lib/tours'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarShell, type SidebarLink } from '@/components/backend'

/* ─────────────────────────────────────────────
   ADMIN SHELL — uses shared SidebarShell.
   Red dot accent next to "Admin Panel" sub-brand.
   ───────────────────────────────────────────── */

const sidebarLinks: SidebarLink[] = [
  { id: 'admin-dashboard',  label: 'Dashboard',       href: '/admin',             icon: '📊', exact: true },
  { id: 'admin-partners',   label: 'Partners',        href: '/admin/partners',    icon: '🤝' },
  { id: 'admin-prospects',  label: 'Prospects',       href: '/admin/prospects',   icon: '👥' },
  { id: 'admin-cms',        label: 'Content Editor',  href: '/admin/cms',         icon: '✏️' },
  { id: 'admin-emails',     label: 'Emails',          href: '/admin/emails',      icon: '✉️' },
  { id: 'admin-features',   label: 'Feature Flags',   href: '/admin/features',    icon: '🎛️' },
  { id: 'admin-strategy',   label: 'Roadmap',         href: '/admin/roadmap',     icon: '🗺️' },
  { id: 'admin-changelog',  label: 'Changelog',       href: '/admin/changelog',   icon: '📝' },
  { id: 'admin-checklist',  label: 'Checklist',       href: '/admin/checklist',   icon: '✅' },
  { id: 'admin-guide',      label: 'Platform Guide',  href: '/admin/guide',       icon: '📖' },
  { id: 'admin-resources',  label: 'Resources',       href: '/admin/resources',   icon: '📚' },
  { id: 'admin-audit',      label: 'Audit Log',       href: '/admin/audit',       icon: '📋' },
  { id: 'admin-settings',   label: 'Integrations',    href: '/admin/settings',    icon: '⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showTour, setShowTour] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          brandLabel="Admin Panel"
          brandAccent="#f87171"
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
                brandLabel="Admin Panel"
                brandAccent="#f87171"
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
              System Administration
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition"
              style={{ border: '1px solid #e0e2e6', color: 'rgba(4,14,32,0.45)' }}
              title="Quick search (Cmd+K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <kbd className="font-mono">⌘K</kbd>
            </button>

            <button
              onClick={() => setShowTour(true)}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition"
              style={{ border: '1px solid #e0e2e6', color: '#1b61c9' }}
              title="Take a guided tour"
            >
              🗺️ Tour
            </button>

            <span
              id="admin-badge"
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626' }}
            >
              Admin
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
        tourId="admin-panel"
        steps={ADMIN_TOUR}
        autoStart={true}
        forceShow={showTour}
        onComplete={() => setShowTour(false)}
      />
    </div>
  )
}
