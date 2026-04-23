'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND CARD PRIMITIVES
   All styling is handled by backend.css (.be-shell scope).
   JSX uses .be-* class names — NO Tailwind padding/bg classes.
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
  const mod = padding === 'lg' ? 'be-card be-card--padded' : padding === 'flush' ? 'be-card be-card--flush' : 'be-card'
  return (
    <Tag id={id} className={`${mod}${className ? ' ' + className : ''}`}>
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
    <div className={`be-toolbar${className ? ' ' + className : ''}`}>
      <div>
        <h2 className="be-section-title">{title}</h2>
        {subtitle && <p className="be-section-sub">{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>{actions}</div>}
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
  icon?: string
  href?: string
  className?: string
}

export function StatCard({ label, value, delta, trend, icon, href, className = '' }: StatCardProps) {
  const deltaCls = trend === 'up' ? 'be-stat-delta be-stat-delta--up' :
                   trend === 'down' ? 'be-stat-delta be-stat-delta--down' :
                   'be-stat-delta be-stat-delta--flat'
  const arrow = trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : ''

  const inner = (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span className="be-stat-label">{label}</span>
        {icon && <span style={{ fontSize: '1.25rem', lineHeight: 1, opacity: 0.75 }} aria-hidden>{icon}</span>}
      </div>
      <div className="be-stat-value">{value}</div>
      {delta && <div className={deltaCls}>{arrow}{delta}</div>}
    </>
  )

  if (href) return (
    <Link href={href} className={`be-card be-card--interactive${className ? ' ' + className : ''}`} style={{ display: 'block' }}>
      {inner}
    </Link>
  )
  return <div className={`be-card${className ? ' ' + className : ''}`}>{inner}</div>
}

/* ── ActionCard ────────────────────────────────────────────────── */
export interface ActionCardProps {
  href: string
  title: string
  description: string
  icon: string
  cta?: string
  external?: boolean
  className?: string
}

export function ActionCard({ href, title, description, icon, cta = 'Open', external, className = '' }: ActionCardProps) {
  const cls = `be-card be-card--interactive${className ? ' ' + className : ''}`
  const content = (
    <>
      <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <span style={{
          display: 'flex', height: '2.25rem', width: '2.25rem', flexShrink: 0,
          alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', fontSize: '1.25rem',
          background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.12)'
        }} aria-hidden>{icon}</span>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{title}</h3>
      </div>
      <p style={{ marginBottom: '0.75rem', fontSize: '0.78125rem', lineHeight: 1.6, color: 'rgba(15,23,42,0.55)', marginTop: 0 }}>{description}</p>
      <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: '#1b61c9' }}>{cta} →</span>
    </>
  )

  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={{ display: 'block', textDecoration: 'none' }}>{content}</a>
  return <Link href={href} className={cls} style={{ display: 'block', textDecoration: 'none' }}>{content}</Link>
}

/* ── StatusBadge ───────────────────────────────────────────────── */
type BadgeTone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'neutral'

const toneMap: Record<BadgeTone, string> = {
  blue:    'be-pill be-pill--blue',
  green:   'be-pill be-pill--green',
  amber:   'be-pill be-pill--amber',
  red:     'be-pill be-pill--red',
  purple:  'be-pill be-pill--purple',
  neutral: 'be-pill',
}

export interface StatusBadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

export function StatusBadge({ tone = 'neutral', children, className = '' }: StatusBadgeProps) {
  return (
    <span className={`${toneMap[tone]}${className ? ' ' + className : ''}`}>{children}</span>
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
    <div className={`be-empty${className ? ' ' + className : ''}`}>
      {icon && <div style={{ marginBottom: '0.75rem', fontSize: '2.25rem' }} aria-hidden>{icon}</div>}
      <p style={{ fontWeight: 600, color: '#0f172a', margin: '0 0 0.25rem' }}>{title}</p>
      {description && <p style={{ fontSize: '0.78125rem', color: 'rgba(15,23,42,0.55)', maxWidth: '18rem', margin: '0 auto' }}>{description}</p>}
      {action && <div style={{ marginTop: '1rem' }}>{action}</div>}
    </div>
  )
}
