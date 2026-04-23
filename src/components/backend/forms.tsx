'use client'

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND FORM PRIMITIVES
   Uses CSS vars + direct Tailwind classes matching old deployment.
   ═══════════════════════════════════════════════════════════════ */

/* ── FormField ─────────────────────────────────────────────────── */
export interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  help?: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ label, htmlFor, required, help, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`.trim()}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {help && !error && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{help}</p>}
    </div>
  )
}

/* ── Shared input style ────────────────────────────────────────── */
const inputBase = [
  'block w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all',
  'outline-none focus:ring-2',
].join(' ')

const inputStyle = {
  borderColor: 'var(--border-primary)',
  color: 'var(--text-primary)',
  background: '#fff',
}

/* ── FormInput ─────────────────────────────────────────────────── */
export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & { error?: boolean }

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <input
      {...props}
      aria-invalid={error || undefined}
      className={`${inputBase} ${error ? 'border-red-400 focus:ring-red-200' : 'focus:ring-blue-200'} ${className}`.trim()}
      style={{ ...inputStyle, borderColor: error ? '#f87171' : 'var(--border-primary)' }}
    />
  )
}

/* ── FormSelect ────────────────────────────────────────────────── */
export type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }

export function FormSelect({ error, className = '', children, ...props }: FormSelectProps) {
  return (
    <select
      {...props}
      aria-invalid={error || undefined}
      className={`${inputBase} ${error ? 'border-red-400 focus:ring-red-200' : 'focus:ring-blue-200'} pr-9 ${className}`.trim()}
      style={{ ...inputStyle, borderColor: error ? '#f87171' : 'var(--border-primary)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23334155' d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem',
        appearance: 'none',
      }}
    >
      {children}
    </select>
  )
}

/* ── FormTextarea ──────────────────────────────────────────────── */
export type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }

export function FormTextarea({ error, className = '', ...props }: FormTextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={error || undefined}
      className={`${inputBase} min-h-[6rem] resize-y ${error ? 'border-red-400 focus:ring-red-200' : 'focus:ring-blue-200'} ${className}`.trim()}
      style={{ ...inputStyle, borderColor: error ? '#f87171' : 'var(--border-primary)' }}
    />
  )
}

/* ── FormButton ────────────────────────────────────────────────── */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const btnBase = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'

const btnVariantStyles: Record<BtnVariant, React.CSSProperties> = {
  primary:   { background: 'linear-gradient(135deg,#1b61c9,#2563eb)', color: '#fff', boxShadow: '0 1px 4px rgba(27,97,201,0.25)' },
  secondary: { background: '#fff', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' },
  ghost:     { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' },
  danger:    { background: '#fff', color: '#dc2626', border: '1px solid #fecaca' },
}

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: 'sm' | 'md'
  loading?: boolean
}

export function FormButton({ variant = 'primary', size = 'md', loading, className = '', children, disabled, ...props }: FormButtonProps) {
  const padding = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${btnBase} ${padding} ${className}`.trim()}
      style={btnVariantStyles[variant]}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
