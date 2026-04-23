'use client'

import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

/* ═══════════════════════════════════════════════════════════════
   BACKEND FORM PRIMITIVES
   FormField · FormInput · FormSelect · FormTextarea · FormButton
   CSS: src/styles/backend.css (.be-shell .be-input etc.)
   ═══════════════════════════════════════════════════════════════ */

/* ── FormField ─────────────────────────────────────────────────── */
export interface FormFieldProps {
  label?: string
  htmlFor?: string
  required?: boolean
  help?: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ label, htmlFor, required, help, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-0 ${className}`.trim()}>
      {label && (
        <label htmlFor={htmlFor} className="be-label">
          {label}
          {required && <span className="ml-0.5" style={{ color: '#dc2626' }} aria-hidden>*</span>}
        </label>
      )}
      {children}
      {help  && !error && <p className="be-help">{help}</p>}
      {error && <p className="be-error" role="alert">{error}</p>}
    </div>
  )
}

/* ── FormInput ─────────────────────────────────────────────────── */
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  hasError?: boolean
  className?: string
}

export function FormInput({ hasError, className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={hasError || undefined}
      className={`be-input ${className}`.trim()}
    />
  )
}

/* ── FormSelect ────────────────────────────────────────────────── */
type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
  hasError?: boolean
  className?: string
  children: ReactNode
}

export function FormSelect({ hasError, className = '', children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      aria-invalid={hasError || undefined}
      className={`be-select ${className}`.trim()}
    >
      {children}
    </select>
  )
}

/* ── FormTextarea ──────────────────────────────────────────────── */
type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  hasError?: boolean
  className?: string
}

export function FormTextarea({ hasError, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={hasError || undefined}
      className={`be-textarea ${className}`.trim()}
    />
  )
}

/* ── FormButton ────────────────────────────────────────────────── */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export interface FormButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: 'default' | 'sm'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  id?: string
}

const variantCls: Record<ButtonVariant, string> = {
  primary:   'be-btn be-btn--primary',
  secondary: 'be-btn be-btn--secondary',
  ghost:     'be-btn be-btn--ghost',
  danger:    'be-btn be-btn--danger',
}

export function FormButton({
  children, type = 'button', variant = 'ghost', size, loading, disabled, onClick, className = '', id,
}: FormButtonProps) {
  const cls = [variantCls[variant], size === 'sm' ? 'be-btn--sm' : '', className].filter(Boolean).join(' ')
  return (
    <button
      id={id}
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? (
        <>
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading…
        </>
      ) : children}
    </button>
  )
}
