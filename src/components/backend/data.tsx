'use client'

import { useState, type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND DATA PRIMITIVES
   Uses CSS vars + direct Tailwind classes matching old deployment.
   ═══════════════════════════════════════════════════════════════ */

/* ── DataTable ─────────────────────────────────────────────────── */
export interface DataColumn<T> {
  key: string
  field?: string   // alias for key — backward compat
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
  emptyState?: ReactNode   // backward compat
}

export function DataTable<T>({ columns, rows, rowKey, onRowClick, emptyMessage = 'No data yet.' }: DataTableProps<T>) {
  const align = (a?: string) =>
    a === 'center' ? 'text-center' : a === 'right' ? 'text-right' : 'text-left'

  return (
    <div className="rounded-2xl border border-[var(--border-primary)] overflow-hidden bg-[var(--bg-card)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-secondary)]" style={{ background: '#f8fafc' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 ${align(col.align)} text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap`}
                  style={{ color: 'var(--text-muted)', width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-14 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : rows.map(row => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-[var(--border-secondary)] last:border-0 transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[var(--bg-card-hover)]' : ''
                }`}
              >
                {columns.map(col => (
                  <td key={col.key} className={`px-4 py-3.5 ${align(col.align)} text-sm`}
                    style={{ color: 'var(--text-secondary)' }}>
                    {col.render(row)}
                  </td>
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
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all"
      style={{
        background: active ? 'rgba(27,97,201,0.10)' : '#f1f5f9',
        color: active ? '#1b61c9' : 'rgba(15,23,42,0.60)',
        border: active ? '1px solid rgba(27,97,201,0.22)' : '1px solid #e2e8f0',
        fontWeight: active ? 600 : 500,
      }}
    >
      {label}
      {count !== undefined && (
        <span
          className="rounded-full px-1.5 text-[10px] font-bold leading-5"
          style={{
            background: active ? 'rgba(27,97,201,0.15)' : 'rgba(0,0,0,0.08)',
            color: active ? '#1b61c9' : 'var(--text-muted)',
          }}
        >
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
    <div className={`flex items-center justify-between gap-4 flex-wrap ${className}`.trim()}>
      {left && <div className="flex items-center gap-2 flex-wrap">{left}</div>}
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  )
}
