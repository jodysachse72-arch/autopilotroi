'use client'

import Link from 'next/link'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — shared sidebar for admin + dashboard.
   ALL styling via backend.css .be-sidebar / .be-sidebar-link.
   No Tailwind padding/color classes that might fail to generate.
   ═══════════════════════════════════════════════════════════════ */

export interface SidebarLink {
  id: string
  label: string
  href: string
  icon: string        // emoji — e.g. '📊'
  exact?: boolean
  badge?: number
}

export interface SidebarShellProps {
  pathname: string
  links: readonly SidebarLink[]
  brandLabel: string
  brandAccent?: string
  onClose?: () => void
}

function isActive(pathname: string, link: SidebarLink): boolean {
  if (link.exact) return pathname === link.href
  return pathname === link.href || pathname.startsWith(link.href + '/')
}

export default function SidebarShell({
  pathname,
  links,
  brandLabel,
  brandAccent,
  onClose,
}: SidebarShellProps) {
  return (
    <div className="be-sidebar" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>

      {/* ── Brand ── */}
      <div style={{
        display: 'flex', height: '4.8rem', flexShrink: 0, alignItems: 'center',
        gap: '0.75rem', padding: '0 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.10)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }} onClick={onClose}>
          <LogoIcon size={28} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>AutopilotROI</div>
            <div style={{
              marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)'
            }}>
              {brandAccent && (
                <span style={{ display: 'inline-block', height: '0.375rem', width: '0.375rem', borderRadius: '50%', background: brandAccent }} aria-hidden />
              )}
              {brandLabel}
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            id={link.id}
            href={link.href}
            onClick={onClose}
            data-active={isActive(pathname, link) ? "true" : undefined}
            className="be-sidebar-link"
          >
            <span style={{ flexShrink: 0, fontSize: '1rem', lineHeight: 1 }} aria-hidden>{link.icon}</span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.label}</span>
            {link.badge !== undefined && link.badge > 0 && (
              <span style={{
                flexShrink: 0, borderRadius: '9999px', padding: '0 0.375rem',
                fontSize: '0.625rem', fontWeight: 700, lineHeight: '1.25rem',
                background: 'rgba(255,255,255,0.20)', color: '#fff'
              }}>
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ flexShrink: 0, padding: '0.75rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <Link
          href="/"
          onClick={onClose}
          className="be-sidebar-link"
          style={{ color: 'rgba(255,255,255,0.50)' }}
        >
          <span style={{ flexShrink: 0, fontSize: '0.875rem', lineHeight: 1 }} aria-hidden>←</span>
          <span>Back to site</span>
        </Link>
      </div>
    </div>
  )
}
