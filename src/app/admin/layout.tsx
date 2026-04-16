'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'
import GuidedTour, { type TourStep } from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   ADMIN SIDEBAR — Airtable Blue design
   Blue sidebar (#1b61c9), white content area
   Red accent for admin-exclusive items
   ───────────────────────────────────────────── */

const sidebarLinks = [
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
  { id: 'admin-audit',      label: 'Audit Log',       href: '/admin/audit',       icon: '📋' },
  { id: 'admin-settings',   label: 'Integrations',    href: '/admin/settings',    icon: '⚙️' },
]

const ADMIN_TOUR: TourStep[] = [
  { target: null, title: 'Welcome to Admin Panel', content: 'This is the nerve center of AutopilotROI. From here you control every feature, manage partners, track prospects, and monitor system health.', icon: '🛡️', position: 'center' },
  { target: '#admin-dashboard',  title: 'Admin Dashboard',      content: 'High-level overview — total signups, active partners, conversion rates, and system health.', icon: '📊', position: 'right', actionHint: 'Start your day here' },
  { target: '#admin-partners',   title: 'Partner Management',   content: 'Add, edit, activate, or deactivate partners. Each gets a unique referral code.', icon: '🤝', position: 'right', actionHint: 'Onboard new team leaders here' },
  { target: '#admin-prospects',  title: 'Prospect Pipeline',    content: 'Every person who enters the funnel with readiness score and tier (🌱 Guided, ⚡ Ready, 🚀 Advanced).', icon: '👥', position: 'right' },
  { target: '#admin-features',   title: 'Feature Flags',        content: 'Turn any feature ON or OFF instantly — no code deploy needed. Each flag has a tooltip explaining its purpose.', icon: '🎛️', position: 'right', actionHint: 'Every toggle takes effect immediately across the site' },
  { target: '#admin-strategy',   title: 'Strategy Roadmap',     content: 'See the competitive analysis, cost breakdown, and full phase roadmap.', icon: '🗺️', position: 'right' },
  { target: '#admin-changelog',  title: 'Changelog',            content: 'A living document of every feature, fix, and improvement shipped — organized by date.', icon: '📝', position: 'right', actionHint: 'Share this with stakeholders to show progress' },
  { target: '#admin-checklist',  title: 'Launch Checklist',     content: 'Pre-launch readiness checklist. Go through each item before going live.', icon: '✅', position: 'right' },
  { target: '#admin-guide',      title: 'Platform Guide',       content: 'Interactive documentation for non-technical users. Share with team members who need to understand the platform.', icon: '📖', position: 'right' },
  { target: '#admin-cms',        title: 'Content Editor',       content: 'Edit all website content — headlines, blog posts, FAQs, and videos. Changes are instant.', icon: '✏️', position: 'right' },
  { target: null, title: 'You\'re in Control', content: 'That\'s the full admin tour.\n\n• Feature Flags = instant ON/OFF\n• Checklist = miss nothing\n• Guide = share with the team\n\nYou can replay this tour anytime. 🎯', icon: '🏆', position: 'center' },
]

function SidebarLink({ link, isActive, onClick }: { link: typeof sidebarLinks[0]; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      id={link.id}
      href={link.href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
      style={{
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
        background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
        fontWeight: isActive ? 600 : 400,
      }}
      onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' } }}
      onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' } }}
    >
      <span className="text-base leading-none">{link.icon}</span>
      {link.label}
    </Link>
  )
}

function SidebarShell({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col" style={{ background: '#1b61c9' }}>
      {/* Logo */}
      <div className="flex h-[4.8rem] shrink-0 items-center gap-3 px-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <LogoIcon size={30} />
          <div className="leading-none">
            <div className="font-bold text-white text-[1.1rem] tracking-tight">AutopilotROI</div>
            <div className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/55 flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
              Admin Panel
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {sidebarLinks.map(link => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href)
          return <SidebarLink key={link.href} link={link} isActive={isActive} onClick={onClose} />
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          ← Back to site
        </Link>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showTour, setShowTour] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <SidebarShell pathname={pathname} />
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
              <SidebarShell pathname={pathname} onClose={() => setMobileOpen(false)} />
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
