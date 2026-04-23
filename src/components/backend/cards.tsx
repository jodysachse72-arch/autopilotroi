'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND CARD PRIMITIVES
   - Card:        plain content surface (default padding)
   - StatCard:    label + big number + optional delta
   - ActionCard:  clickable card that links somewhere with an icon
   Visual styles live in globals.css under .be-card / .be-stat-*
   so we never duplicate the visual contract across pages.
   ═══════════════════════════════════════════════════════════════ */

type Padding = 'default' | 'lg' | 'flush'

function paddingClass(p: Padding | undefined): string {
  if (p === 'lg') return 'be-card be-card--padded'
  if (p === 'flush') return 'be-card be-card--flush'
  return 'be-card'
}

export interface CardProps {
  children: ReactNode
  /** "default" = 1.25rem, "lg" = 1.5rem, "flush" = 0 */
  padding?: Padding
  className?: string
  as?: 'div' | 'section' | 'article'
  id?: string
}

export function Card({ children, padding, className = '', as: Tag = 'div', id }: CardProps) {
  return (
    <Tag id={id} className={`${paddingClass(padding)} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

/* ── Section header — matches Card width ──────────────────────── */
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

/* ── StatCard — label + value + optional delta ─────────────────── */
export type StatTrend = 'up' | 'down' | 'flat'

export interface StatCardProps {
  label: string
  value: ReactNode
  delta?: string
  trend?: StatTrend
  icon?: ReactNode
  /** Optional href makes the entire card clickable */
  href?: string
  className?: string
}

function trendClass(t: StatTrend | undefined): string {
  if (t === 'up') return 'be-stat-delta be-stat-delta--up'
  if (t === 'down') return 'be-stat-delta be-stat-delta--down'
  return 'be-stat-delta be-stat-delta--flat'
}

function trendArrow(t: StatTrend | undefined): string {
  if (t === 'up') return '↑'
  if (t === 'down') return '↓'
  return '·'
}

export function StatCard({ label, value, delta, trend, icon, href, className = '' }: StatCardProps) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="be-stat-label">{label}</span>
        {icon && <span className="text-base leading-none opacity-70" aria-hidden>{icon}</span>}
      </div>
      <div className="be-stat-value">{value}</div>
      {delta && (
        <div className={trendClass(trend)}>
          <span aria-hidden>{trendArrow(trend)}</span>
          {delta}
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`be-card be-card--interactive block ${className}`.trim()}
      >
        {inner}
      </Link>
    )
  }
  return <div className={`be-card ${className}`.trim()}>{inner}</div>
}

/* ── ActionCard — icon + title + description, clickable ────────── */
export interface ActionCardProps {
  href: string
  title: string
  description: string
  icon: ReactNode
  cta?: string
  external?: boolean
  className?: string
}

export function ActionCard({
  href,
  title,
  description,
  icon,
  cta = 'Open',
  external,
  className = '',
}: ActionCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl leading-none" aria-hidden>{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text, #181d26)' }}>
          {title}
        </h3>
      </div>
      <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.6)' }}>
        {description}
      </p>
      <span className="text-xs font-semibold" style={{ color: 'var(--color-blue, #1b61c9)' }}>
        {cta} →
      </span>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`be-card be-card--interactive block ${className}`.trim()}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={`be-card be-card--interactive block ${className}`.trim()}>
      {content}
    </Link>
  )
}

/* ── EmptyState — for tables, lists, empty dashboards ──────────── */
export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`be-empty flex flex-col items-center justify-center text-center ${className}`.trim()}>
      {icon && <div className="text-3xl mb-2" aria-hidden>{icon}</div>}
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text, #181d26)' }}>
        {title}
      </p>
      {description && (
        <p className="mt-1 text-xs max-w-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          {description}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
