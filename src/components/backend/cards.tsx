'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND CARD PRIMITIVES
   CSS lives in src/styles/backend.css (.be-shell .be-card etc.)
   ═══════════════════════════════════════════════════════════════ */

/* ── Card ──────────────────────────────────────────────────────── */
type Padding = 'default' | 'lg' | 'flush'

function paddingCls(p?: Padding) {
  if (p === 'lg')    return 'be-card be-card--padded'
  if (p === 'flush') return 'be-card be-card--flush'
  return 'be-card'
}

export interface CardProps {
  children: ReactNode
  padding?: Padding
  className?: string
  as?: 'div' | 'section' | 'article'
  id?: string
}

export function Card({ children, padding, className = '', as: Tag = 'div', id }: CardProps) {
  return (
    <Tag id={id} className={`${paddingCls(padding)} ${className}`.trim()}>
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
    <div className={`be-toolbar ${className}`.trim()}>
      <div>
        <h2 className="be-section-title">{title}</h2>
        {subtitle && <p className="be-section-sub">{subtitle}</p>}
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

const trendCls = (t?: StatTrend) =>
  t === 'up' ? 'be-stat-delta be-stat-delta--up' :
  t === 'down' ? 'be-stat-delta be-stat-delta--down' :
  'be-stat-delta be-stat-delta--flat'

const trendArrow = (t?: StatTrend) =>
  t === 'up' ? '↑' : t === 'down' ? '↓' : '·'

export function StatCard({ label, value, delta, trend, icon, href, className = '' }: StatCardProps) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="be-stat-label">{label}</span>
        {icon && <span className="text-xl leading-none opacity-80" aria-hidden>{icon}</span>}
      </div>
      <div className="be-stat-value">{value}</div>
      {delta && (
        <div className={trendCls(trend)}>
          <span aria-hidden>{trendArrow(trend)}</span>
          {delta}
        </div>
      )}
    </>
  )

  if (href) return (
    <Link href={href} className={`be-card be-card--interactive block ${className}`.trim()}>
      {inner}
    </Link>
  )
  return <div className={`be-card ${className}`.trim()}>{inner}</div>
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
  const content = (
    <>
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl"
          style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.12)' }}
          aria-hidden
        >{icon}</span>
        <h3 className="text-sm font-semibold leading-snug" style={{ color: '#0f172a' }}>{title}</h3>
      </div>
      <p className="mb-3 text-xs leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>{description}</p>
      <span className="text-xs font-semibold" style={{ color: '#1b61c9' }}>{cta} →</span>
    </>
  )

  if (external) return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`be-card be-card--interactive block ${className}`.trim()}>
      {content}
    </a>
  )
  return (
    <Link href={href} className={`be-card be-card--interactive block ${className}`.trim()}>
      {content}
    </Link>
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
    <div className={`be-empty flex flex-col items-center justify-center ${className}`.trim()}>
      {icon && <div className="mb-3 text-4xl" aria-hidden>{icon}</div>}
      <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{title}</p>
      {description && <p className="mt-1 max-w-xs text-xs" style={{ color: 'rgba(15,23,42,0.55)' }}>{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
