'use client'

import './admin.css'
import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, UserCircle, FileEdit, Mail, ToggleLeft,
  Map, ClipboardList, CheckSquare, BookOpen, FolderOpen,
  ClipboardCheck, Settings, Shield, Menu, ExternalLink, LogOut,
} from 'lucide-react'

const navItems = [
  { id: 'admin-dashboard',  label: 'Dashboard',       href: '/admin',             icon: LayoutDashboard, exact: true },
  { id: 'admin-partners',   label: 'Partners',        href: '/admin/partners',    icon: Users },
  { id: 'admin-prospects',  label: 'Prospects',       href: '/admin/prospects',   icon: UserCircle },
  { id: 'admin-cms',        label: 'Content Editor',  href: '/admin/cms',         icon: FileEdit },
  { id: 'admin-emails',     label: 'Emails',          href: '/admin/emails',      icon: Mail },
  { id: 'admin-features',   label: 'Feature Flags',   href: '/admin/features',    icon: ToggleLeft },
  { id: 'admin-roadmap',    label: 'Roadmap',         href: '/admin/roadmap',     icon: Map },
  { id: 'admin-changelog',  label: 'Changelog',       href: '/admin/changelog',   icon: ClipboardList },
  { id: 'admin-checklist',  label: 'Checklist',       href: '/admin/checklist',   icon: CheckSquare },
  { id: 'admin-guide',      label: 'Platform Guide',  href: '/admin/guide',       icon: BookOpen },
  { id: 'admin-resources',  label: 'Resources',       href: '/admin/resources',   icon: FolderOpen },
  { id: 'admin-audit',      label: 'Audit Log',       href: '/admin/audit',       icon: ClipboardCheck },
  { id: 'admin-settings',   label: 'Integrations',    href: '/admin/settings',    icon: Settings },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href)
}

function getPageTitle(pathname: string) {
  const item = navItems.find(n => isActive(pathname, n.href, n.exact))
  return item?.label ?? 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Close mobile nav on route change
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <div className="adm-shell">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="adm-sidebar-overlay adm-sidebar-overlay--visible"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
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
          onClick={() => router.push('/admin')}
        >
          <div className="adm-sidebar-brand-icon">
            <Shield size={16} />
          </div>
          <div className="adm-sidebar-brand-text">
            <span className="adm-sidebar-brand-name">AutopilotROI</span>
            <span className="adm-sidebar-brand-sub">Admin Panel</span>
          </div>
        </button>

        {/* Nav */}
        <div className="adm-sidebar-nav">
          <div className="adm-nav-section-label">Navigation</div>
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
            <div className="adm-sidebar-avatar">AD</div>
            <div className="adm-sidebar-user-info">
              <div className="adm-sidebar-user-name">Admin</div>
              <div className="adm-sidebar-user-email">admin@autopilotroi.com</div>
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
              System Administration — {getPageTitle(pathname)}
            </span>
          </div>
          <div className="adm-topbar-right">
            <span id="admin-badge" className="adm-topbar-badge adm-topbar-badge--admin">
              Admin
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
