'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarShell, { type SidebarLink } from '@/components/backend/SidebarShell'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import '@/styles/backend.css'

const sidebarLinks: SidebarLink[] = [
  { id: 'admin-dashboard',  label: 'Dashboard',       href: '/admin',            icon: '📊', exact: true },
  { id: 'admin-partners',   label: 'Partners',        href: '/admin/partners',   icon: '🤝' },
  { id: 'admin-prospects',  label: 'Prospects',       href: '/admin/prospects',  icon: '👥' },
  { id: 'admin-cms',        label: 'Content Editor',  href: '/admin/cms',        icon: '✏️' },
  { id: 'admin-emails',     label: 'Emails',          href: '/admin/emails',     icon: '✉️' },
  { id: 'admin-features',   label: 'Feature Flags',   href: '/admin/features',   icon: '🎛️' },
  { id: 'admin-roadmap',    label: 'Roadmap',         href: '/admin/roadmap',    icon: '🗺️' },
  { id: 'admin-changelog',  label: 'Changelog',       href: '/admin/changelog',  icon: '📝' },
  { id: 'admin-checklist',  label: 'Checklist',       href: '/admin/checklist',  icon: '✅' },
  { id: 'admin-guide',      label: 'Platform Guide',  href: '/admin/guide',      icon: '📖' },
  { id: 'admin-resources',  label: 'Resources',       href: '/admin/resources',  icon: '📚' },
  { id: 'admin-audit',      label: 'Audit Log',       href: '/admin/audit',      icon: '📋' },
  { id: 'admin-settings',   label: 'Integrations',    href: '/admin/settings',   icon: '⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggle = useCallback(() => setMobileOpen(p => !p), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <div className="be-shell min-h-screen flex" style={{ background: '#f8fafc' }}>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-[14.5rem] shrink-0 flex-col"
        style={{ boxShadow: '2px 0 12px rgba(27,97,201,0.12)' }}>
        <SidebarShell pathname={pathname} links={sidebarLinks} brandLabel="Admin" brandAccent="#f87171" />
      </aside>

      {/* ── Mobile drawer ── */}
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
                brandLabel="Admin" brandAccent="#f87171" onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 lg:px-7"
          style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button onClick={toggle} aria-label="Toggle menu"
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg transition"
              style={{ border: '1px solid #e2e8f0' }}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#334155" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-[1.0625rem] font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
                System Administration
              </h1>
              <p className="hidden sm:block text-xs" style={{ color: 'rgba(15,23,42,0.45)' }}>
                Manage partners, content, and platform settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition hover:bg-slate-50"
              style={{ border: '1px solid #e2e8f0', color: 'rgba(15,23,42,0.45)' }}
              title="Quick search (⌘K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="font-mono">⌘K</kbd>
            </button>

            <span className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626' }}>
              Admin
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-7 overflow-x-hidden">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
