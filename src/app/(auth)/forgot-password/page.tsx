'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { FormField, FormInput, FormButton } from '@/components/backend'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (err) { setError(err.message) } else { setSent(true) }
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }, [email])

  if (sent) return (
    <div className="be-card be-card--padded text-center">
      <div className="mb-4 text-4xl">📬</div>
      <h1 className="text-xl font-bold" style={{ color: '#0f172a' }}>Check your inbox</h1>
      <p className="mt-2 text-sm" style={{ color: 'rgba(15,23,42,0.55)' }}>
        We sent a password reset link to <strong>{email}</strong>.
      </p>
      <Link href="/login" className="be-btn be-btn--ghost mt-6 inline-flex">← Back to login</Link>
    </div>
  )

  return (
    <div className="be-card be-card--padded">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>Reset password</h1>
        <p className="mt-1 text-sm" style={{ color: 'rgba(15,23,42,0.55)' }}>
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" htmlFor="forgot-email" required>
          <FormInput id="forgot-email" type="email" required value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </FormField>

        {error && (
          <div className="rounded-lg px-4 py-3 text-sm" role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <FormButton type="submit" variant="primary" loading={loading} className="w-full justify-center">
          Send Reset Link
        </FormButton>
      </form>

      <p className="mt-5 text-center text-sm" style={{ color: 'rgba(15,23,42,0.50)' }}>
        <Link href="/login" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>← Back to login</Link>
      </p>
    </div>
  )
}
