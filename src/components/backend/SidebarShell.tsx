'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   SIDEBARSHELL — Shared sidebar for admin + dashboard.
   Premium slate gradient rail with Lucide icons + active accent bar.
   Hover/active styles in globals.css under .be-sidebar-link
   ═══════════════════════════════════════════════════════════════ */

export interface SidebarSection {
  /** Optional uppercase section header rendered above its links */
  label?: string
  links: readonly SidebarLink[]
}

export interface SidebarLink {
  id: string
  label: string
  href: string
  icon: LucideIcon
  /** Active iff pathname === href (default: prefix match with boundary) */
  exact?: boolean
  /** Optional small badge text shown on the right (e.g. "3", "New") */
  badge?: string
  /** Tone for the badge — default "neutral" */
  badgeTone?: 'neutral' | 'red' | 'blue' | 'green'
}

export interface SidebarShellProps {
  pathname: string
  /** Either a flat list of links or grouped sections */
  links?: readonly SidebarLink[]
  sections?: readonly SidebarSection[]
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

const BADGE_TONES: Record<NonNullable<SidebarLink['badgeTone']>, { bg: string; color: string }> = {
  neutral: { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' },
  red:     { bg: 'rgba(239,68,68,0.18)',   color: '#fca5a5' },
  blue:    { bg: 'rgba(59,130,246,0.22)',  color: '#93c5fd' },
  green:   { bg: 'rgba(34,197,94,0.18)',   color: '#86efac' },
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
      key={link.href}
      id={link.id}
      href={link.href}
      onClick={onClose}
      data-active={active || undefined}
      className="be-sidebar-link group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[0.875rem]"
    >
      {/* Left accent rail when active */}
      <span
        aria-hidden
        className="be-sidebar-link__accent"
      />
      <Icon className="be-sidebar-link__icon h-[18px] w-[18px] shrink-0" strokeWidth={2} />
      <span className="flex-1 truncate">{link.label}</span>
      {link.badge && (
        <span
          className="rounded-md px-1.5 py-[2px] text-[10px] font-bold leading-none"
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
  // Normalize to sections
  const allSections: readonly SidebarSection[] = sections
    ? sections
    : links
      ? [{ links }]
      : []

  return (
    <div className="be-sidebar flex h-full flex-col">
      {/* ── Brand ── */}
      <div className="flex h-[4.8rem] shrink-0 items-center gap-3 px-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5 group/brand" onClick={onClose}>
          <span className="be-sidebar-logo flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <LogoIcon size={22} />
          </span>
          <div className="leading-none">
            <div className="font-bold text-white text-[1.05rem] tracking-tight">AutopilotROI</div>
            <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/60 flex items-center gap-1.5">
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
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {allSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'mt-5' : ''}>
            {section.label && (
              <div className="px-3 pb-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/40">
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

      {/* ── Footer (back to site) ── */}
      <div className="shrink-0 border-t border-white/[0.06] p-3">
        <Link
          href="/"
          className="be-sidebar-back flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
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
