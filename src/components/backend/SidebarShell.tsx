'use client'

import Link from 'next/link'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — shared sidebar for admin + dashboard.
   Matches the exact structure of the working qokp83snq deployment:
   - <aside> has no background (transparent)
   - Inner <div> has background: #1b61c9
   - Shadow is on the <aside> via inline style
   - Nav links use direct Tailwind classes + hover/active states
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
    <div className="flex h-full flex-col" style={{ background: '#1b61c9' }}>

      {/* ── Brand ── */}
      <div className="flex h-[4.8rem] shrink-0 items-center gap-3 px-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <LogoIcon size={28} />
          <div className="leading-none">
            <div className="text-[0.9375rem] font-bold text-white tracking-tight">AutopilotROI</div>
            <div className="mt-0.5 flex items-center gap-1.5"
              style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.58)' }}>
              {brandAccent && (
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: brandAccent }} aria-hidden />
              )}
              {brandLabel}
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {links.map((link) => {
          const active = isActive(pathname, link)
          return (
            <Link
              key={link.href}
              id={link.id}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
              style={{
                color: active ? '#fff' : 'rgba(255,255,255,0.68)',
                background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                fontWeight: active ? 600 : 500,
                boxShadow: active ? 'inset 3px 0 0 rgba(255,255,255,0.60)' : 'none',
              }}
            >
              <span className="shrink-0 text-[1rem] leading-none" aria-hidden>{link.icon}</span>
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
          )
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="shrink-0 px-2 py-3 border-t border-white/10">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
          style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}
        >
          <span className="shrink-0 text-base leading-none" aria-hidden>←</span>
          <span>Back to site</span>
        </Link>
      </div>
    </div>
  )
}
