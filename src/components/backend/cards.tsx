'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND CARD PRIMITIVES
   Uses CSS vars (--bg-card, --border-primary etc.) defined in
   globals.css under .be-shell scope.
   Direct Tailwind classes matching the old working deployment.
   ═══════════════════════════════════════════════════════════════ */

/* ── Card ──────────────────────────────────────────────────────── */
export interface CardProps {
  children: ReactNode
  padding?: 'default' | 'lg' | 'flush'
  className?: string
  as?: 'div' | 'section' | 'article'
  id?: string
}

export function Card({ children, padding = 'default', className = '', as: Tag = 'div', id }: CardProps) {
  const p = padding === 'lg' ? 'p-6' : padding === 'flush' ? 'p-0' : 'p-5'
  return (
    <Tag
      id={id}
      className={`rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] ${p} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}

/* ── SectionHeader ─────────────────────────────────────────────── */
export interface SectionHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function SectionHeader({ title, subtitle, actions, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 flex-wrap ${className}`.trim()}>
      <div>
        <h2 className="text-[1.0625rem] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}

/* ── StatCard ──────────────────────────────────────────────────── */
export type StatTrend = 'up' | 'down' | 'flat'

export interface StatCardProps {
  label: string
  value: ReactNode
  delta?: string
  trend?: StatTrend
  icon?: string   // emoji
  href?: string
  className?: string
}

const trendColor = (t?: StatTrend) =>
  t === 'up' ? '#059669' : t === 'down' ? '#dc2626' : 'var(--text-muted)'

const trendArrow = (t?: StatTrend) =>
  t === 'up' ? '↑ ' : t === 'down' ? '↓ ' : ''

export function StatCard({ label, value, delta, trend, icon, href, className = '' }: StatCardProps) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        {icon && <span className="text-xl leading-none opacity-75" aria-hidden>{icon}</span>}
      </div>
      <div className="text-[1.875rem] font-extrabold leading-none tracking-tight mb-1.5"
        style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      {delta && (
        <div className="text-xs font-semibold" style={{ color: trendColor(trend) }}>
          {trendArrow(trend)}{delta}
        </div>
      )}
    </>
  )

  const cls = `rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 ${className}`.trim()

  if (href) return <Link href={href} className={cls + ' block hover:bg-[var(--bg-card-hover)] transition-colors'}>{inner}</Link>
  return <div className={cls}>{inner}</div>
}

/* ── ActionCard ────────────────────────────────────────────────── */
export interface ActionCardProps {
  href: string
  title: string
  description: string
  icon: string     // emoji
  cta?: string
  external?: boolean
  className?: string
}

export function ActionCard({ href, title, description, icon, cta = 'Open', external, className = '' }: ActionCardProps) {
  const cls = `group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 block hover:bg-[var(--bg-card-hover)] transition-colors ${className}`.trim()
  const content = (
    <>
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl"
          style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.12)' }}
          aria-hidden
        >{icon}</span>
        <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      <p className="mb-3 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{description}</p>
      <span className="text-xs font-semibold" style={{ color: '#1b61c9' }}>{cta} →</span>
    </>
  )

  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
  return <Link href={href} className={cls}>{content}</Link>
}

/* ── StatusBadge ───────────────────────────────────────────────── */
type BadgeTone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'neutral'

const toneStyles: Record<BadgeTone, { background: string; color: string }> = {
  blue:    { background: 'rgba(27,97,201,0.10)',  color: '#1b61c9' },
  green:   { background: 'rgba(5,150,105,0.10)',  color: '#059669' },
  amber:   { background: 'rgba(217,119,6,0.12)',  color: '#b45309' },
  red:     { background: 'rgba(220,38,38,0.10)',  color: '#dc2626' },
  purple:  { background: 'rgba(124,58,237,0.10)', color: '#7c3aed' },
  neutral: { background: 'rgba(15,23,42,0.07)',   color: 'rgba(15,23,42,0.55)' },
}

export interface StatusBadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

export function StatusBadge({ tone = 'neutral', children, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wide ${className}`.trim()}
      style={toneStyles[tone]}
    >
      {children}
    </span>
  )
}

/* ── EmptyState ────────────────────────────────────────────────── */
export interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`py-16 flex flex-col items-center justify-center text-center ${className}`.trim()}>
      {icon && <div className="mb-3 text-4xl" aria-hidden>{icon}</div>}
      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</p>
      {description && <p className="mt-1 max-w-xs text-xs" style={{ color: 'var(--text-muted)' }}>{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
