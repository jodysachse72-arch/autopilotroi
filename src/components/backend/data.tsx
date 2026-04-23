'use client'

import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND DATA PRIMITIVES
   DataTable · StatusBadge · FilterPill · Toolbar
   CSS: src/styles/backend.css (.be-shell .be-table* etc.)
   ═══════════════════════════════════════════════════════════════ */

/* ── DataTable ─────────────────────────────────────────────────── */
export interface DataColumn<T> {
  key: string
  header: ReactNode
  render?: (row: T, index: number) => ReactNode
  field?: keyof T
  width?: string
  align?: 'left' | 'right' | 'center'
  className?: string
}

export interface DataTableProps<T> {
  columns: ReadonlyArray<DataColumn<T>>
  rows: ReadonlyArray<T>
  rowKey: (row: T, index: number) => string
  onRowClick?: (row: T, index: number) => void
  emptyState?: ReactNode
  className?: string
  clickable?: boolean
}

export function DataTable<T>({ columns, rows, rowKey, onRowClick, emptyState, className = '', clickable }: DataTableProps<T>) {
  const isClickable = clickable || !!onRowClick
  return (
    <div className={`be-table-wrap ${className}`.trim()}>
      <div className="overflow-x-auto">
        <table className={`be-table${isClickable ? ' be-table--clickable' : ''}`}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{ width: col.width, textAlign: col.align }} className={col.className}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="be-empty">{emptyState ?? 'No records found.'}</td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={rowKey(row, i)} onClick={onRowClick ? () => onRowClick(row, i) : undefined}>
                  {columns.map(col => (
                    <td key={col.key} style={{ textAlign: col.align }} className={col.className}>
                      {col.render ? col.render(row, i) : col.field !== undefined ? (row[col.field] as ReactNode) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
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
  className?: string
}

export function FilterPill({ label, active, count, onClick, className = '' }: FilterPillProps) {
  return (
    <button
      type="button"
      className={`be-filter ${className}`.trim()}
      data-active={active ? 'true' : undefined}
      aria-pressed={active}
      onClick={onClick}
    >
      <span>{label}</span>
      {typeof count === 'number' && (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: active ? 'rgba(27,97,201,0.14)' : 'rgba(15,23,42,0.07)', color: active ? '#1b61c9' : 'rgba(15,23,42,0.55)' }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

/* ── StatusBadge ───────────────────────────────────────────────── */
export type StatusTone = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple'

export interface StatusBadgeProps {
  tone?: StatusTone
  children: ReactNode
  className?: string
}

const toneCls: Record<StatusTone, string> = {
  neutral: 'be-pill',
  blue:    'be-pill be-pill--blue',
  green:   'be-pill be-pill--green',
  amber:   'be-pill be-pill--amber',
  red:     'be-pill be-pill--red',
  purple:  'be-pill be-pill--purple',
}

export function StatusBadge({ tone = 'neutral', children, className = '' }: StatusBadgeProps) {
  return <span className={`${toneCls[tone]} ${className}`.trim()}>{children}</span>
}

/* ── Toolbar ───────────────────────────────────────────────────── */
export interface ToolbarProps {
  left?: ReactNode
  right?: ReactNode
  className?: string
}

export function Toolbar({ left, right, className = '' }: ToolbarProps) {
  return (
    <div className={`be-toolbar ${className}`.trim()}>
      <div className="flex items-center gap-2 flex-wrap">{left}</div>
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  )
}
