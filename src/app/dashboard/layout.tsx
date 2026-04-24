'use client'

import '../admin/admin.css'
import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, Trophy, TrendingUp, Link2,
  FolderOpen, PlayCircle, Settings, Menu, ExternalLink, LogOut, Briefcase,
} from 'lucide-react'

const navItems = [
  { id: 'dash-home',        label: 'Dashboard',     href: '/dashboard',             icon: LayoutDashboard, exact: true },
  { id: 'dash-prospects',   label: 'My Prospects',  href: '/dashboard/prospects',   icon: Users },
  { id: 'dash-leaderboard', label: 'Leaderboard',   href: '/dashboard/leaderboard', icon: Trophy },
  { id: 'dash-performance', label: 'Performance',   href: '/dashboard/performance', icon: TrendingUp },
  { id: 'dash-links',       label: 'My Links',      href: '/dashboard/links',       icon: Link2 },
  { id: 'dash-resources',   label: 'Resources',     href: '/dashboard/resources',   icon: FolderOpen },
  { id: 'dash-videos',      label: 'Videos',        href: '/dashboard/videos',      icon: PlayCircle },
  { id: 'dash-settings',    label: 'Settings',      href: '/dashboard/settings',    icon: Settings },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href)
}

function getPageTitle(pathname: string) {
  const item = navItems.find(n => isActive(pathname, n.href, n.exact))
  return item?.label ?? 'Dashboard'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <div className="adm-shell">

      {mobileOpen && (
        <div
          className="adm-sidebar-overlay adm-sidebar-overlay--visible"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={[
          'adm-sidebar',
          collapsed ? 'adm-sidebar--collapsed' : '',
          mobileOpen ? 'adm-sidebar--mobile-open' : '',
        ].filter(Boolean).join(' ')}
      >
        {/* Brand */}
        <button
          type="button"
          className="adm-sidebar-brand"
          onClick={() => router.push('/dashboard')}
        >
          <div className="adm-sidebar-brand-icon">
            <Briefcase size={16} />
          </div>
          <div className="adm-sidebar-brand-text">
            <span className="adm-sidebar-brand-name">AutopilotROI</span>
            <span className="adm-sidebar-brand-sub">Partner Portal</span>
          </div>
        </button>

        {/* Nav */}
        <div className="adm-sidebar-nav">
          <div className="adm-nav-section-label">Partner Tools</div>
          {navItems.map((item) => {
            const active = isActive(pathname, item.href, item.exact)
            return (
              <Link
                key={item.id}
                href={item.href}
                id={item.id}
                className={`adm-nav-link${active ? ' adm-nav-link--active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="adm-nav-link-icon">
                  <item.icon size={17} />
                </span>
                <span className="adm-nav-label">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="adm-sidebar-footer">
          <Link href="/" target="_blank" className="adm-nav-link" title={collapsed ? 'View Site' : undefined}>
            <span className="adm-nav-link-icon"><ExternalLink size={16} /></span>
            <span className="adm-nav-label">View Site</span>
          </Link>
          <Link href="/login" className="adm-nav-link" title={collapsed ? 'Sign out' : undefined}>
            <span className="adm-nav-link-icon"><LogOut size={16} /></span>
            <span className="adm-nav-label">Sign out</span>
          </Link>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 2px' }} />
          <div className="adm-sidebar-user">
            <div className="adm-sidebar-avatar" style={{ background: '#0891b2' }}>PT</div>
            <div className="adm-sidebar-user-info">
              <div className="adm-sidebar-user-name">Partner</div>
              <div className="adm-sidebar-user-email">partner@example.com</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className={`adm-main${collapsed ? ' adm-main--collapsed' : ''}`}>
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              type="button"
              className="adm-collapse-btn adm-desktop-only"
              onClick={() => setCollapsed(c => !c)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu size={16} />
            </button>
            <button
              type="button"
              className="adm-collapse-btn adm-mobile-only"
              onClick={() => setMobileOpen(o => !o)}
              title="Toggle menu"
              aria-label="Toggle menu"
            >
              <Menu size={16} />
            </button>
            <span className="adm-topbar-title">
              {getPageTitle(pathname)}
            </span>
          </div>
          <div className="adm-topbar-right">
            <span className="adm-topbar-badge adm-topbar-badge--partner">
              Partner
            </span>
          </div>
        </header>

        <main className="adm-content">
          {children}
        </main>
      </div>
    </div>
  )
}
