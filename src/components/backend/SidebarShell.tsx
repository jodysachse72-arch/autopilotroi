'use client'

import Link from 'next/link'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — Shared sidebar for admin + dashboard.
   Single source of truth for the dark Airtable-blue rail.
   Hover/active styles live in globals.css under .be-sidebar-link
   so we never mutate inline style on mouse events.
   ═══════════════════════════════════════════════════════════════ */

export interface SidebarLink {
  id: string
  label: string
  href: string
  icon: string
  /** Active iff pathname === href (default: prefix match with boundary) */
  exact?: boolean
}

export interface SidebarShellProps {
  pathname: string
  links: readonly SidebarLink[]
  /** Sub-brand label e.g. "Admin Panel" or "Partner Hub" */
  brandLabel: string
  /** Optional dot-color shown next to brandLabel */
  brandAccent?: string
  /** Called when any link is clicked (used to close mobile drawer) */
  onClose?: () => void
}

function isActiveLink(pathname: string, link: SidebarLink): boolean {
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
      <div className="flex h-[4.8rem] shrink-0 items-center gap-3 px-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <LogoIcon size={30} />
          <div className="leading-none">
            <div className="font-bold text-white text-[1.1rem] tracking-tight">AutopilotROI</div>
            <div className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/55 flex items-center gap-1.5">
              {brandAccent && (
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: brandAccent }}
                  aria-hidden
                />
              )}
              {brandLabel}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {links.map((link) => {
          const active = isActiveLink(pathname, link)
          return (
            <Link
              key={link.href}
              id={link.id}
              href={link.href}
              onClick={onClose}
              data-active={active || undefined}
              className="be-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
            >
              <span className="text-base leading-none">{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <Link href="/" className="be-sidebar-back inline-flex items-center gap-1.5 text-sm font-medium">
          ← Back to site
        </Link>
      </div>
    </div>
  )
}
