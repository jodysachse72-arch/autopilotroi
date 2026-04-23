/**
 * @/components/backend — Compatibility shim
 *
 * Re-exports shadcn/ui primitives under the legacy names used by all
 * admin, dashboard, and auth pages. This means we never have to rewrite
 * the complex business-logic pages — they just work with the new design
 * system automatically.
 *
 * The JSX in these pages renders with shadcn styling because the primitives
 * below map to shadcn components that are scoped inside .admin-shell /
 * .dashboard-shell / .auth-shell via globals.css.
 */

'use client'

import * as React from 'react'
import {
  Card as ShadCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

/* ─── Type exports ───────────────────────────────────────────────── */

export type StatusTone = 'green' | 'blue' | 'amber' | 'red' | 'gray' | 'purple' | 'neutral'

const toneClass: Record<StatusTone, string> = {
  green:   'bg-green-100 text-green-800',
  blue:    'bg-blue-100 text-blue-800',
  amber:   'bg-amber-100 text-amber-800',
  red:     'bg-red-100 text-red-800',
  gray:    'bg-gray-100 text-gray-700',
  neutral: 'bg-gray-100 text-gray-700',
  purple:  'bg-purple-100 text-purple-800',
}

/* ─── SectionHeader ──────────────────────────────────────────────── */

export function SectionHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-1', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────────────── */

export function Card({
  children,
  className,
  padding = 'md',
}: {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'flush'
}) {
  const padClass = {
    flush: 'p-0',
    sm:    'p-3',
    md:    'p-5',
    lg:    'p-6',
  }[padding]

  return (
    <ShadCard className={cn('', className)}>
      <CardContent className={padClass}>{children}</CardContent>
    </ShadCard>
  )
}

/* ─── StatCard ───────────────────────────────────────────────────── */

export function StatCard({
  label,
  value,
  icon,
  delta,
  tone = 'blue',
  trend: _trend,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  delta?: string
  tone?: StatusTone
  trend?: string  // accepted but not rendered
}) {
  return (
    <ShadCard>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          {icon && (
            <span className={cn('rounded-lg p-1.5 text-base', toneClass[tone] + '/20')}>
              {icon}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {delta && <div className="text-xs text-muted-foreground mt-1">{delta}</div>}
      </CardContent>
    </ShadCard>
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
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium', toneClass[tone])}>
      {children}
    </span>
  )
}

/* ─── Toolbar ────────────────────────────────────────────────────── */

export function Toolbar({ children, left, className }: { children?: React.ReactNode; left?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3 mb-4', className)}>
      {left && <div className="flex items-center gap-2">{left}</div>}
      {children}
    </div>
  )
}

/* ─── FilterPill ─────────────────────────────────────────────────── */

export function FilterPill({
  children,
  'data-active': active,
  label,
  count,
  onClick,
  className,
}: {
  children?: React.ReactNode
  'data-active'?: string | boolean
  label?: string
  count?: number
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  const isActive = active === 'true' || active === true || active === (true as unknown as string | boolean)
  const displayText = children ?? label
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className,
      )}
    >
      {displayText}
      {count !== undefined && (
        <span className="ml-1 rounded-full bg-current/10 px-1 text-[10px]">{count}</span>
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
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="font-semibold text-foreground">{title}</h3>
      {(message || description) && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{message ?? description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/* ─── FormInput ──────────────────────────────────────────────────── */

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; invalid?: boolean }
>(({ label, hint, invalid: _invalid, className, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <Input ref={ref} className={className} {...props} />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
))
FormInput.displayName = 'FormInput'

/* ─── FormTextarea ───────────────────────────────────────────────── */

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }
>(({ label, hint, className, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <Textarea ref={ref} className={className} {...props} />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
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
  className,
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
  const shadVariant = v === 'primary' ? 'default' : v === 'danger' ? 'destructive' : v === 'secondary' ? 'outline' : v as 'ghost' | 'default' | 'outline' | 'destructive'
  const shadSize   = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'
  return (
    <Button
      variant={shadVariant}
      size={shadSize}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={className}
    >
      {children}
    </Button>
  )
}

/* ─── DataTable ──────────────────────────────────────────────────── */

export interface DataColumn<T> {
  key: keyof T | string
  label?: string
  header?: string  // alias for label (legacy compat)
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
  emptyState?: string  // alias for emptyMessage
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
    <Table>
      <TableHeader>
        <TableRow>
          {(columns as DataColumn<T>[]).map(col => (
            <TableHead
              key={String(col.key)}
              style={{ width: col.width, textAlign: col.align }}
            >
              {effectiveLabel(col)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {(rows as T[]).map((row, idx) => (
          <TableRow key={getKey(row, idx)}>
            {(columns as DataColumn<T>[]).map(col => (
              <TableCell
                key={String(col.key)}
                style={{ textAlign: col.align }}
              >
                {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/* ─── FormField ──────────────────────────────────────────────────── */

export function FormField({
  label,
  hint,
  help,
  children,
  className,
  htmlFor: _htmlFor,
  required: _required,
}: {
  label?: string
  hint?: string
  help?: string  // alias for hint
  children: React.ReactNode
  className?: string
  htmlFor?: string
  required?: boolean
}) {
  const note = hint ?? help
  return (
    <div className={cn('space-y-1', className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      {children}
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
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
  className,
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
    <div className={cn('space-y-1', className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
        {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/* ─── FormRow ────────────────────────────────────────────────────── */

export function FormRow({ children, cols, className }: { children: React.ReactNode; cols?: number; className?: string }) {
  const gridClass = cols === 3 ? 'grid-cols-1 sm:grid-cols-3' : cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
  return (
    <div className={cn(`grid gap-4 ${gridClass}`, className)}>
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
  className,
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: string
  className?: string
}) {
  const content = (
    <ShadCard className={cn('cursor-pointer transition-shadow hover:shadow-md', className)}>
      <CardContent className="p-4 flex items-start gap-3">
        {icon && <div className="shrink-0 mt-0.5 text-2xl">{icon}</div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">{title}</h3>
            {badge && <Badge className="text-[10px]" variant="outline">{badge}</Badge>}
          </div>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </CardContent>
    </ShadCard>
  )
  if (href) {
    return <a href={href} className="block no-underline">{content}</a>
  }
  return <div onClick={onClick} role={onClick ? 'button' : undefined}>{content}</div>
}
