/**
 * @/components/backend — Native admin component library
 *
 * Provides all UI primitives used by admin, dashboard, and auth pages.
 * Uses plain HTML with .adm-* CSS classes from src/app/admin/admin.css.
 * Zero shadcn dependencies. Zero Tailwind utilities.
 */

'use client'

import * as React from 'react'
import Link from 'next/link'

/* ─── Types ──────────────────────────────────────────────────────── */

export type StatusTone = 'green' | 'blue' | 'amber' | 'red' | 'gray' | 'purple' | 'neutral'

const toneToPill: Record<StatusTone, string> = {
  green:   'adm-pill--green',
  blue:    'adm-pill--blue',
  amber:   'adm-pill--amber',
  red:     'adm-pill--red',
  gray:    'adm-pill--gray',
  neutral: 'adm-pill--gray',
  purple:  'adm-pill--purple',
}

/* ─── SectionHeader ──────────────────────────────────────────────── */

export function SectionHeader({
  title,
  subtitle,
  actions,
  className = '',
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`adm-page-header ${className}`.trim()}>
      <div>
        <h1 className="adm-page-title">{title}</h1>
        {subtitle && <p className="adm-page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="adm-page-actions">{actions}</div>}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────────────── */

export function Card({
  children,
  className = '',
  padding = 'md',
}: {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'flush'
}) {
  const padStyle: Record<string, React.CSSProperties> = {
    flush: { padding: 0 },
    sm:    { padding: '12px' },
    md:    { padding: '20px' },
    lg:    { padding: '28px' },
  }
  return (
    <div
      className={`adm-card ${padding === 'flush' ? 'adm-card--flush' : ''} ${className}`.trim()}
      style={padStyle[padding]}
    >
      {children}
    </div>
  )
}

/* ─── StatCard ───────────────────────────────────────────────────── */

const toneIconBg: Record<StatusTone, string> = {
  green:   'rgba(22,163,74,0.10)',
  blue:    'rgba(27,97,201,0.10)',
  amber:   'rgba(202,138,4,0.10)',
  red:     'rgba(220,38,38,0.10)',
  gray:    'rgba(100,116,139,0.10)',
  neutral: 'rgba(100,116,139,0.10)',
  purple:  'rgba(124,58,237,0.10)',
}

const toneIconColor: Record<StatusTone, string> = {
  green:   '#16a34a',
  blue:    '#1b61c9',
  amber:   '#ca8a04',
  red:     '#dc2626',
  gray:    '#64748b',
  neutral: '#64748b',
  purple:  '#7c3aed',
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  tone = 'blue',
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  delta?: string
  tone?: StatusTone
  trend?: string
}) {
  return (
    <div className="adm-card">
      {icon && (
        <div
          className="adm-stat-icon"
          style={{ background: toneIconBg[tone], color: toneIconColor[tone] }}
        >
          {icon}
        </div>
      )}
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value">{value}</div>
      {delta && <div className="adm-stat-delta">{delta}</div>}
    </div>
  )
}

/* ─── StatusBadge ────────────────────────────────────────────────── */

export function StatusBadge({
  children,
  tone = 'gray',
}: {
  children: React.ReactNode
  tone?: StatusTone
}) {
  return (
    <span className={`adm-pill ${toneToPill[tone]}`}>
      {children}
    </span>
  )
}

/* ─── Toolbar ────────────────────────────────────────────────────── */

export function Toolbar({
  children,
  left,
  className = '',
}: {
  children?: React.ReactNode
  left?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`adm-toolbar ${className}`.trim()}>
      {left && <div className="adm-toolbar-left">{left}</div>}
      {children && <div className="adm-toolbar-right">{children}</div>}
    </div>
  )
}

/* ─── FilterPill ─────────────────────────────────────────────────── */

export function FilterPill({
  children,
  'data-active': dataActive,
  label,
  count,
  onClick,
  active,
  className = '',
}: {
  children?: React.ReactNode
  'data-active'?: string | boolean
  label?: string
  count?: number
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  const isActive =
    active === true ||
    dataActive === true ||
    dataActive === 'true'
  const displayText = children ?? label

  return (
    <button
      type="button"
      onClick={onClick}
      className={`adm-filter ${isActive ? 'adm-filter--active' : ''} ${className}`.trim()}
    >
      {displayText}
      {count !== undefined && (
        <span style={{ marginLeft: 4, opacity: 0.7 }}>({count})</span>
      )}
    </button>
  )
}

/* ─── EmptyState ─────────────────────────────────────────────────── */

export function EmptyState({
  title,
  message,
  description,
  icon,
  action,
}: {
  title: string
  message?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="adm-empty">
      {icon && <div className="adm-empty-icon">{icon}</div>}
      <div className="adm-empty-title">{title}</div>
      {(message || description) && (
        <p className="adm-empty-desc">{message ?? description}</p>
      )}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  )
}

/* ─── FormInput ──────────────────────────────────────────────────── */

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    hint?: string
    invalid?: boolean
  }
>(({ label, hint, invalid: _invalid, className = '', ...props }, ref) => (
  <div className="adm-form-group">
    {label && <label className="adm-label">{label}</label>}
    <input ref={ref} className={`adm-input ${className}`.trim()} {...props} />
    {hint && <p className="adm-help">{hint}</p>}
  </div>
))
FormInput.displayName = 'FormInput'

/* ─── FormTextarea ───────────────────────────────────────────────── */

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    hint?: string
  }
>(({ label, hint, className = '', ...props }, ref) => (
  <div className="adm-form-group">
    {label && <label className="adm-label">{label}</label>}
    <textarea ref={ref} className={`adm-textarea ${className}`.trim()} {...props} />
    {hint && <p className="adm-help">{hint}</p>}
  </div>
))
FormTextarea.displayName = 'FormTextarea'

/* ─── FormButton ─────────────────────────────────────────────────── */

export function FormButton({
  children,
  variant: v = 'default',
  size,
  onClick,
  type = 'button',
  disabled,
  loading,
  className = '',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'default'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (() => void) | (() => Promise<void>)
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  className?: string
}) {
  const variantClass =
    v === 'primary' || v === 'default' ? 'adm-btn--primary'
    : v === 'danger'  ? 'adm-btn--danger'
    : 'adm-btn--ghost'

  const sizeClass = size === 'sm' ? 'adm-btn--sm' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`adm-btn ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}

/* ─── DataTable ──────────────────────────────────────────────────── */

export interface DataColumn<T> {
  key: keyof T | string
  label?: string
  header?: string
  render?: (row: T) => React.ReactNode
  align?: 'left' | 'right' | 'center'
  width?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  keyField,
  rowKey,
  emptyMessage,
  emptyState,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: readonly DataColumn<any>[] | DataColumn<T>[]
  rows: T[] | readonly T[]
  keyField?: keyof T
  rowKey?: (row: T, idx: number) => string
  emptyMessage?: string
  emptyState?: string
}) {
  const emptyText = emptyMessage ?? emptyState ?? 'No data found.'

  if (rows.length === 0) {
    return <EmptyState title={emptyText} icon="📭" />
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectiveLabel = (col: DataColumn<any>) => col.label || col.header || String(col.key)
  const getKey = (row: T, idx: number): string => {
    if (rowKey) return rowKey(row, idx)
    if (keyField) return String(row[keyField])
    return String(idx)
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            {(columns as DataColumn<T>[]).map(col => (
              <th
                key={String(col.key)}
                style={{ width: col.width, textAlign: col.align }}
              >
                {effectiveLabel(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows as T[]).map((row, idx) => (
            <tr key={getKey(row, idx)}>
              {(columns as DataColumn<T>[]).map(col => (
                <td
                  key={String(col.key)}
                  style={{ textAlign: col.align }}
                >
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── FormField ──────────────────────────────────────────────────── */

export function FormField({
  label,
  hint,
  help,
  children,
  className = '',
  htmlFor: _htmlFor,
  required: _required,
}: {
  label?: string
  hint?: string
  help?: string
  children: React.ReactNode
  className?: string
  htmlFor?: string
  required?: boolean
}) {
  const note = hint ?? help
  return (
    <div className={`adm-form-group ${className}`.trim()}>
      {label && <label className="adm-label">{label}</label>}
      {children}
      {note && <p className="adm-help">{note}</p>}
    </div>
  )
}

/* ─── FormSelect ─────────────────────────────────────────────────── */

export function FormSelect({
  label,
  hint,
  options,
  children,
  value,
  onChange,
  placeholder,
  className = '',
}: {
  label?: string
  hint?: string
  options?: { value: string; label: string }[]
  children?: React.ReactNode
  value?: string
  id?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`adm-form-group ${className}`.trim()}>
      {label && <label className="adm-label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="adm-select"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
        {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <p className="adm-help">{hint}</p>}
    </div>
  )
}

/* ─── FormRow ────────────────────────────────────────────────────── */

export function FormRow({
  children,
  cols,
  className = '',
}: {
  children: React.ReactNode
  cols?: number
  className?: string
}) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: cols === 3 ? 'repeat(3,1fr)' : cols === 1 ? '1fr' : 'repeat(2,1fr)',
  }
  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  )
}

/* ─── ActionCard ─────────────────────────────────────────────────── */

export function ActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  badge,
  className = '',
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: string
  className?: string
}) {
  const inner = (
    <div
      className={`adm-card ${className}`.trim()}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: href || onClick ? 'pointer' : undefined }}
      onClick={!href ? onClick : undefined}
      role={!href && onClick ? 'button' : undefined}
    >
      {icon && <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</span>
          {badge && <span className="adm-pill adm-pill--blue" style={{ fontSize: 10 }}>{badge}</span>}
        </div>
        {description && (
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 3, lineHeight: 1.4 }}>
            {description}
          </p>
        )}
      </div>
    </div>
  )

  if (href) {
    return <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>
  }
  return inner
}

/* ─── PageContainer (layout wrapper used by some pages) ─────────── */

export function PageContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

/* ─── PageHeader (alias for SectionHeader) ───────────────────────── */

export const PageHeader = SectionHeader
