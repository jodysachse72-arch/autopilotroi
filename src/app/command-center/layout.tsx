'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarShell, type SidebarLink } from '@/components/backend'

/* ─────────────────────────────────────────────────────────────────
   COMMAND CENTER SHELL
   Gated to partner + admin. Uses the shared SidebarShell so the
   dark sidebar rail is identical to Partner Hub / Admin Panel.
   Two sections: Start Here (index) + Resource Library.
   ───────────────────────────────────────────────────────────────── */

const sidebarLinks: SidebarLink[] = [
  {
    id:    'cc-start',
    label: 'Start Here',
    href:  '/command-center',
    icon:  '🚀',
    exact: true,
  },
  {
    id:    'cc-resources',
    label: 'Resource Library',
    href:  '/command-center/resources',
    icon:  '📚',
  },
]

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close drawer on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  // Derive page title from pathname
  const pageTitle =
    pathname === '/command-center'              ? 'Start Here'
    : pathname.startsWith('/command-center/resources') ? 'Resource Library'
    : 'Command Center'

  return (
    <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-60 flex-col shrink-0 shadow-[2px_0_12px_rgba(16,185,129,0.12)]">
        <SidebarShell
          pathname={pathname}
          links={sidebarLinks}
          brandLabel="Command Center"
          brandAccent="#10b981"
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
                brandLabel="Command Center"
                brandAccent="#10b981"
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
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e0e2e6',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
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

            <div className="flex items-center gap-2">
              {/* Green accent dot */}
              <span
                className="hidden sm:inline-block h-2 w-2 rounded-full"
                style={{ background: '#10b981' }}
                aria-hidden
              />
              <h1 className="text-lg font-bold" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Right: partner badge */}
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: 'rgba(16,185,129,0.10)', color: '#059669' }}
          >
            Partner
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
