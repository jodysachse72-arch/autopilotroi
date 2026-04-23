'use client'

import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND DATA PRIMITIVES
   - DataTable:   typed, headless table with column config
   - FilterPill:  active/inactive toggleable pill
   - StatusBadge: colored pill for state values
   - Toolbar:     flex row above tables/lists for filters + actions
   Visual styles live in globals.css under .be-table* / .be-filter / .be-pill.
   ═══════════════════════════════════════════════════════════════ */

/* ── DataTable ─────────────────────────────────────────────────── */
export interface DataColumn<T> {
  key: string
  header: ReactNode
  /** Cell renderer; defaults to row[key] if you set field instead */
  render?: (row: T, index: number) => ReactNode
  /** Shortcut for plain text cells */
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
  /** Apply hover-cursor styling to rows (use with onRowClick) */
  clickable?: boolean
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyState,
  className = '',
  clickable,
}: DataTableProps<T>) {
  const isClickable = clickable || !!onRowClick
  return (
    <div className={`be-table-wrap ${className}`.trim()}>
      <div className="overflow-x-auto">
        <table className={`be-table ${isClickable ? 'be-table--clickable' : ''}`.trim()}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    width: col.width,
                    textAlign: col.align,
                  }}
                  className={col.className}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="be-empty">
                  {emptyState ?? 'No records to display.'}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={rowKey(row, i)}
                  onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                >
                  {columns.map((col) => {
                    const content = col.render
                      ? col.render(row, i)
                      : col.field !== undefined
                        ? (row[col.field] as ReactNode)
                        : null
                    return (
                      <td
                        key={col.key}
                        style={{ textAlign: col.align }}
                        className={col.className}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Filter Pill (toggleable) ──────────────────────────────────── */
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
      data-active={active || undefined}
      aria-pressed={active}
      onClick={onClick}
    >
      <span>{label}</span>
      {typeof count === 'number' && (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
          style={{
            background: active ? 'rgba(27,97,201,0.15)' : 'rgba(15,23,42,0.06)',
            color: active ? '#1b61c9' : 'rgba(4,14,32,0.55)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

/* ── Status Badge ─────────────────────────────────────────────── */
export type StatusTone = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple'

export interface StatusBadgeProps {
  tone?: StatusTone
  children: ReactNode
  icon?: ReactNode
  className?: string
}

function pillToneClass(t: StatusTone | undefined): string {
  switch (t) {
    case 'blue':   return 'be-pill be-pill--blue'
    case 'green':  return 'be-pill be-pill--green'
    case 'amber':  return 'be-pill be-pill--amber'
    case 'red':    return 'be-pill be-pill--red'
    case 'purple': return 'be-pill be-pill--purple'
    default:       return 'be-pill'
  }
}

export function StatusBadge({ tone, children, icon, className = '' }: StatusBadgeProps) {
  return (
    <span className={`${pillToneClass(tone)} ${className}`.trim()}>
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  )
}

/* ── Toolbar (above lists / tables) ────────────────────────────── */
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
