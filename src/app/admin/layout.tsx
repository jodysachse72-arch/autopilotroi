'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Partners', href: '/admin/partners', icon: '🤝' },
  { label: 'Prospects', href: '/admin/prospects', icon: '👥' },
  { label: 'Strategy', href: '/admin/roadmap', icon: '🗺️' },
  { label: 'Changelog', href: '/admin/changelog', icon: '📝' },
  { label: 'Checklist', href: '/admin/checklist', icon: '✅' },
  { label: 'Features', href: '/admin/features', icon: '🎛️' },
  { label: 'Guide', href: '/admin/guide', icon: '📖' },
  { label: 'CMS Studio', href: '/studio', icon: '🎨' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[var(--border-primary)] bg-[var(--bg-card)]">
        <div className="flex h-[4.8rem] items-center px-6 border-b border-[var(--border-primary)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
              <span className="text-sm">🛡️</span>
            </div>
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

        <div className="border-t border-[var(--border-primary)] p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
          >
            ← Back to site
          </Link>
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
          <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
            Admin
          </span>
        </header>

        {/* Mobile nav */}
        <nav className="flex lg:hidden overflow-x-auto border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 scrollbar-hide">
          {sidebarLinks.slice(0, 4).map((link) => {
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

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
