'use client'

import { type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND DATA PRIMITIVES
   Styling via backend.css .be-* classes — no Tailwind padding/bg.
   ═══════════════════════════════════════════════════════════════ */

/* ── DataTable ─────────────────────────────────────────────────── */
export interface DataColumn<T> {
  key: string
  field?: string   // unused — kept for backward compat
  header: string
  render: (row: T) => ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
}

export interface DataTableProps<T> {
  columns: DataColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  emptyMessage?: string
  emptyState?: ReactNode   // backward compat alias
}

export function DataTable<T>({
  columns, rows, rowKey, onRowClick, emptyMessage = 'No data yet.', emptyState
}: DataTableProps<T>) {
  const alignStyle = (a?: string): React.CSSProperties =>
    ({ textAlign: a === 'center' ? 'center' : a === 'right' ? 'right' : 'left' })

  return (
    <div className="be-table-wrap">
      <div style={{ overflowX: 'auto' }}>
        <table className="be-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{ ...alignStyle(col.align), width: col.width }}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3.5rem 1.5rem', textAlign: 'center', color: 'rgba(15,23,42,0.45)', fontSize: '0.875rem' }}>
                  {emptyState ?? emptyMessage}
                </td>
              </tr>
            ) : rows.map(row => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'be-table--clickable' : undefined}
                style={{ cursor: onRowClick ? 'pointer' : undefined }}
              >
                {columns.map(col => (
                  <td key={col.key} style={alignStyle(col.align)}>{col.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── FilterPill ────────────────────────────────────────────────── */
export interface FilterPillProps {
  label: string
  active?: boolean
  count?: number
  onClick?: () => void
}

export function FilterPill({ label, active, count, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className="be-filter"
      data-active={active || undefined}
    >
      {label}
      {count !== undefined && (
        <span style={{
          background: active ? 'rgba(27,97,201,0.15)' : 'rgba(0,0,0,0.08)',
          color: active ? '#1b61c9' : 'rgba(15,23,42,0.55)',
          borderRadius: '9999px',
          padding: '0 0.375rem',
          fontSize: '0.625rem',
          fontWeight: 700,
          lineHeight: '1.25rem',
        }}>
          {count}
        </span>
      )}
    </button>
  )
}

/* ── Toolbar ───────────────────────────────────────────────────── */
export interface ToolbarProps {
  left?: ReactNode
  right?: ReactNode
  className?: string
}

export function Toolbar({ left, right, className = '' }: ToolbarProps) {
  return (
    <div className={`be-toolbar${className ? ' ' + className : ''}`}>
      {left && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>{left}</div>}
      {right && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>{right}</div>}
    </div>
  )
}
