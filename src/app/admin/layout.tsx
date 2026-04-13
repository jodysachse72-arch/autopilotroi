'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'
import GuidedTour, { type TourStep } from '@/components/ui/GuidedTour'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CommandPalette from '@/components/ui/CommandPalette'
import ThemeToggle from '@/components/ui/ThemeToggle'

const sidebarLinks = [
  { id: 'admin-dashboard', label: 'Dashboard', href: '/admin', icon: '📊' },
  { id: 'admin-partners', label: 'Partners', href: '/admin/partners', icon: '🤝' },
  { id: 'admin-prospects', label: 'Prospects', href: '/admin/prospects', icon: '👥' },
  { id: 'admin-strategy', label: 'Strategy Roadmap', href: '/admin/roadmap', icon: '🗺️' },
  { id: 'admin-changelog', label: 'Changelog', href: '/admin/changelog', icon: '📝' },
  { id: 'admin-checklist', label: 'Checklist', href: '/admin/checklist', icon: '✅' },
  { id: 'admin-features', label: 'Features', href: '/admin/features', icon: '🎛️' },
  { id: 'admin-guide', label: 'Guide', href: '/admin/guide', icon: '📖' },
  { id: 'admin-cms', label: 'CMS Studio', href: '/admin/cms', icon: '🎨' },
  { id: 'admin-emails', label: 'Emails', href: '/admin/emails', icon: '✉️' },
  { id: 'admin-audit', label: 'Audit Log', href: '/admin/audit', icon: '📋' },
  { id: 'admin-settings', label: 'Integrations', href: '/admin/settings', icon: '⚙️' },
]

/* ── Admin Panel Tour Steps ── */
const ADMIN_TOUR: TourStep[] = [
  {
    target: null,
    title: 'Welcome to the Admin Panel',
    content: 'This is the nerve center of AutopilotROI. From here you control every feature, manage partners, track prospects, and monitor system health.\n\nLet me show you around.',
    icon: '🛡️',
    position: 'center',
  },
  {
    target: '#admin-dashboard',
    title: 'Admin Dashboard',
    content: 'High-level overview of key metrics — total signups, active partners, conversion rates, and system health at a glance.',
    icon: '📊',
    position: 'right',
    actionHint: 'Start your day here to catch anything that needs attention',
  },
  {
    target: '#admin-partners',
    title: 'Partner Management',
    content: 'Add, edit, activate, or deactivate partners. Each partner gets a unique referral code. You can view their prospect pipeline and performance.',
    icon: '🤝',
    position: 'right',
    actionHint: 'This is where you onboard new team leaders',
  },
  {
    target: '#admin-prospects',
    title: 'Prospect Pipeline',
    content: 'Every person who enters the funnel appears here with their readiness score and tier (🌱 Guided, ⚡ Ready, 🚀 Advanced). Filter, search, and follow up.',
    icon: '👥',
    position: 'right',
  },
  {
    target: '#admin-features',
    title: 'Feature Flags (Kill Switches)',
    content: 'This is one of the most powerful tools. Turn any feature ON or OFF instantly — no code deploy needed.\n\nExit intent popups too aggressive? Turn them off. Want to test social proof? Toggle it on.\n\nEach flag has a tooltip explaining what it does and when to use it.',
    icon: '🎛️',
    position: 'right',
    actionHint: 'Every toggle takes effect immediately across the entire site',
  },
  {
    target: '#admin-strategy',
    title: 'Strategy Roadmap',
    content: 'See the competitive analysis, cost savings breakdown, and the full phase roadmap. Shows what\'s been built, what\'s next, and estimated costs.',
    icon: '🗺️',
    position: 'right',
  },
  {
    target: '#admin-changelog',
    title: 'Changelog',
    content: 'A living document of every feature, fix, and improvement that\'s been shipped. Organized by date with categorized entries (feature, fix, enhancement, security).',
    icon: '📝',
    position: 'right',
    actionHint: 'Share this with stakeholders to show progress',
  },
  {
    target: '#admin-checklist',
    title: 'Launch Checklist',
    content: 'Pre-launch readiness checklist. Go through each item before going live — DNS, SSL, Supabase, Sentry, analytics, legal pages, and more.',
    icon: '✅',
    position: 'right',
    actionHint: 'Check items off as you complete them',
  },
  {
    target: '#admin-guide',
    title: 'Platform Guide',
    content: 'Interactive documentation for non-technical users. Explains every feature in plain English with expandable sections. Share this with team members who need to understand the platform.',
    icon: '📖',
    position: 'right',
  },
  {
    target: '#admin-cms',
    title: 'CMS Studio (Sanity)',
    content: 'Opens the content management system where you can create blog posts, manage university videos, and edit page content — all without touching code.',
    icon: '🎨',
    position: 'right',
    actionHint: 'Opens in a new tab — that\'s normal',
  },
  {
    target: null,
    title: 'You\'re in Control',
    content: 'That\'s the full admin tour. Remember:\n\n• Feature Flags = instant ON/OFF for any feature\n• Checklist = make sure nothing is missed\n• Guide = share with anyone who needs to learn the platform\n\nYou can replay this tour anytime from the header. 🎯',
    icon: '🏆',
    position: 'center',
  },
]

export default function AdminLayout({
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
        <div className="flex h-[4.8rem] items-center px-6 border-b border-[var(--border-primary)]">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon size={32} />
            <span className="font-[var(--font-sora)] text-lg font-semibold">
              <span className="text-[var(--text-primary)]">Admin</span>
              <span className="text-red-400"> Panel</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                id={link.id}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-red-500/15 text-red-400'
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

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-[4.8rem] items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-6 lg:px-8">
          <div className="lg:hidden">
            <Link href="/admin" className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)]">
              Admin Panel
            </Link>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
              System Administration
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Cmd+K */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-2.5 py-1.5 text-[10px] text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
              title="Quick search (Cmd+K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <button
              onClick={() => setShowTour(true)}
              className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              title="Take a guided tour of the admin panel"
            >
              🗺️ Tour
            </button>
            <span id="admin-badge" className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
              Admin
            </span>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex lg:hidden overflow-x-auto border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 scrollbar-hide">
          {sidebarLinks.slice(0, 5).map((link) => {
            const isActive =
              link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition ${
                  isActive
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-[var(--text-muted)]'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <main className="flex-1 p-6 lg:p-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <CommandPalette />

      {/* Admin Tour */}
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
