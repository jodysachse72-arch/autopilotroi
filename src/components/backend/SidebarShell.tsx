'use client'

import Link from 'next/link'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — shared sidebar for admin + dashboard.
   Icons are emoji strings — no Lucide, no encoding issues.
   CSS lives in src/styles/backend.css under .be-shell .be-sidebar*.
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
  brandAccent?: string   // dot colour next to sub-brand, e.g. '#f87171'
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
    <div className="be-sidebar flex h-full flex-col">

      {/* ── Brand ── */}
      <div className="flex h-[4.5rem] shrink-0 items-center gap-3 px-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.22)' }}
          >
            <LogoIcon size={18} />
          </span>
          <div className="leading-none">
            <div className="text-[0.9375rem] font-bold text-white tracking-tight">AutopilotROI</div>
            <div className="mt-0.5 flex items-center gap-1.5"
              style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.60)' }}>
              {brandAccent && (
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: brandAccent }} aria-hidden />
              )}
              {brandLabel}
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        {links.map((link) => (
          <Link
            key={link.href}
            id={link.id}
            href={link.href}
            onClick={onClose}
            data-active={isActive(pathname, link) || undefined}
            className="be-sidebar-link"
          >
            <span className="shrink-0 text-[1.05rem] leading-none" aria-hidden>{link.icon}</span>
            <span className="flex-1 truncate">{link.label}</span>
            {link.badge !== undefined && link.badge > 0 && (
              <span
                className="shrink-0 rounded-full px-1.5 text-[10px] font-bold leading-5"
                style={{ background: 'rgba(255,255,255,0.20)', color: '#fff' }}
              >
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="shrink-0 px-2.5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <Link
          href="/"
          onClick={onClose}
          className="be-sidebar-link"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          <span className="shrink-0 text-base leading-none" aria-hidden>←</span>
          <span>Back to site</span>
        </Link>
      </div>
    </div>
  )
}
