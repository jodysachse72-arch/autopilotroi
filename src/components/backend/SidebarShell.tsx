'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — Shared sidebar for admin + dashboard.
   Blue brand rail (#1b61c9) matching the original design.
   Hover/active styles defined inline for clarity.
   ═══════════════════════════════════════════════════════════════ */

export interface SidebarSection {
  label?: string
  links: readonly SidebarLink[]
}

export interface SidebarLink {
  id: string
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
  badge?: string
  badgeTone?: 'neutral' | 'red' | 'blue' | 'green'
}

export interface SidebarShellProps {
  pathname: string
  links?: readonly SidebarLink[]
  sections?: readonly SidebarSection[]
  brandLabel: string
  brandAccent?: string
  onClose?: () => void
}

function isActiveLink(pathname: string, link: SidebarLink): boolean {
  if (link.exact) return pathname === link.href
  return pathname === link.href || pathname.startsWith(link.href + '/')
}

const BADGE_TONES: Record<NonNullable<SidebarLink['badgeTone']>, { bg: string; color: string }> = {
  neutral: { bg: 'rgba(255,255,255,0.18)', color: '#ffffff' },
  red:     { bg: 'rgba(254,202,202,0.25)', color: '#fecaca' },
  blue:    { bg: 'rgba(191,219,254,0.25)', color: '#bfdbfe' },
  green:   { bg: 'rgba(167,243,208,0.25)', color: '#a7f3d0' },
}

function LinkItem({
  link,
  active,
  onClose,
}: { link: SidebarLink; active: boolean; onClose?: () => void }) {
  const Icon = link.icon
  const tone = BADGE_TONES[link.badgeTone ?? 'neutral']
  return (
    <Link
      id={link.id}
      href={link.href}
      onClick={onClose}
      className="be-sidebar-link group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
      data-active={active || undefined}
    >
      <Icon className="be-sidebar-link__icon h-[17px] w-[17px] shrink-0" strokeWidth={1.9} />
      <span className="flex-1 truncate">{link.label}</span>
      {link.badge && (
        <span
          className="rounded-full px-1.5 py-[1px] text-[10px] font-bold leading-none"
          style={{ background: tone.bg, color: tone.color }}
        >
          {link.badge}
        </span>
      )}
    </Link>
  )
}

export default function SidebarShell({
  pathname,
  links,
  sections,
  brandLabel,
  brandAccent,
  onClose,
}: SidebarShellProps) {
  const allSections: readonly SidebarSection[] = sections
    ? sections
    : links
      ? [{ links }]
      : []

  return (
    <div className="be-sidebar flex h-full flex-col">
      {/* ── Brand ── */}
      <div className="flex h-[4.5rem] shrink-0 items-center gap-3 px-5 border-b border-white/[0.12]">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.22)' }}
          >
            <LogoIcon size={20} />
          </span>
          <div className="leading-none">
            <div className="font-bold text-white text-[1rem] tracking-tight">AutopilotROI</div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {brandAccent && (
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: brandAccent, boxShadow: `0 0 6px ${brandAccent}` }}
                  aria-hidden
                />
              )}
              {brandLabel}
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {allSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'mt-5' : ''}>
            {section.label && (
              <div
                className="px-3 pb-1.5 pt-1 text-[0.6rem] font-bold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {section.label}
              </div>
            )}
            <div className="space-y-[1px]">
              {section.links.map((link) => (
                <LinkItem
                  key={link.href}
                  link={link}
                  active={isActiveLink(pathname, link)}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="shrink-0 border-t border-white/[0.12] p-3">
        <Link
          href="/"
          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition"
          style={{ color: 'rgba(255,255,255,0.60)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'
            ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)'
          }}
        >
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">←</span> Back to site
          </span>
          <ChevronRight className="h-3.5 w-3.5 opacity-40" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}
