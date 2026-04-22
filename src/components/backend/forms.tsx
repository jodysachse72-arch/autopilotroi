'use client'

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND FORM PRIMITIVES
   - FormField:   label + control + help/error
   - FormInput:   <input>
   - FormSelect:  <select>
   - FormTextarea:<textarea>
   - FormButton:  variant-aware button
   Visual styles live in globals.css under .be-input / .be-btn.
   ═══════════════════════════════════════════════════════════════ */

export interface FormFieldProps {
  label: string
  htmlFor?: string
  help?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  help,
  error,
  required,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="be-label">
        {label}
        {required && <span style={{ color: '#dc2626' }} aria-hidden> *</span>}
      </label>
      {children}
      {error ? (
        <p className="be-error" role="alert">{error}</p>
      ) : help ? (
        <p className="be-help">{help}</p>
      ) : null}
    </div>
  )
}

/* ── Bare inputs that already have backend styling ─────────────── */
export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}
export function FormInput({ className = '', invalid, ...rest }: FormInputProps) {
  return (
    <input
      className={`be-input ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean
}
export function FormSelect({ className = '', invalid, children, ...rest }: FormSelectProps) {
  return (
    <select
      className={`be-select ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </select>
  )
}

export type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}
export function FormTextarea({ className = '', invalid, ...rest }: FormTextareaProps) {
  return (
    <textarea
      className={`be-textarea ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

/* ── Form button (variant-aware) ───────────────────────────────── */
export type FormButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type FormButtonSize = 'md' | 'sm'

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FormButtonVariant
  size?: FormButtonSize
  loading?: boolean
}

function variantClass(v: FormButtonVariant | undefined): string {
  switch (v) {
    case 'secondary': return 'be-btn be-btn--secondary'
    case 'ghost':     return 'be-btn be-btn--ghost'
    case 'danger':    return 'be-btn be-btn--danger'
    default:          return 'be-btn be-btn--primary'
  }
}

export function FormButton({
  variant = 'primary',
  size = 'md',
  loading,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: FormButtonProps) {
  const sizeCls = size === 'sm' ? 'be-btn--sm' : ''
  return (
    <button
      type={type}
      className={`${variantClass(variant)} ${sizeCls} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="inline-block h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin"
        />
      )}
      {children}
    </button>
  )
}

/* ── Form row helper for side-by-side fields ───────────────────── */
export interface FormRowProps {
  children: ReactNode
  cols?: 2 | 3
  className?: string
}
export function FormRow({ children, cols = 2, className = '' }: FormRowProps) {
  const grid = cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  return <div className={`grid gap-4 ${grid} ${className}`.trim()}>{children}</div>
}
