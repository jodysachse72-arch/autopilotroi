'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Prospects', href: '/dashboard/prospects', icon: '👥' },
  { label: 'Performance', href: '/dashboard/performance', icon: '📈' },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: '🏆' },
  { label: 'Referral Links', href: '/dashboard/links', icon: '🔗' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-card)]">
        {/* Logo area */}
        <div className="flex h-[4.8rem] items-center px-6 border-b border-[var(--border-primary)]">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon size={32} />
            <span className="font-[var(--font-sora)] text-lg font-semibold">
              <span className="text-[var(--text-primary)]">Partner</span>
              <span className="text-blue-400"> Hub</span>
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
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

        {/* Back to site */}
        <div className="border-t border-[var(--border-primary)] p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-[4.8rem] items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-6 lg:px-8">
          <div className="lg:hidden">
            <Link href="/" className="font-[var(--font-sora)] font-semibold text-[var(--text-primary)]">
              Partner Hub
            </Link>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-[var(--font-sora)] text-lg font-semibold text-[var(--text-primary)]">
              Partner Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
              Partner
            </span>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex lg:hidden overflow-x-auto border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 scrollbar-hide">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition ${
                  isActive
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
