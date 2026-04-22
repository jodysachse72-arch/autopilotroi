'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   FORGOT PASSWORD — sends reset link via Supabase.
   Falls back to a simulated 1.2s delay when env not configured.
   ═══════════════════════════════════════════════════════════════ */

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isConfigured) {
      await new Promise(r => setTimeout(r, 1200))
      setSent(true)
      setLoading(false)
      return
    }
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) setError(resetError.message)
      else setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, isConfigured])

  const resetForm = useCallback(() => {
    setSent(false)
    setEmail('')
  }, [])

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}
      >
        {sent ? (
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              ✉️
            </div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
              Check Your Email
            </h1>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>
              We sent a password reset link to{' '}
              <strong style={{ color: '#1b61c9' }}>{email}</strong>. Click the link in the email to set a new password.
            </p>
            <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.4)' }}>
              Didn&apos;t get it? Check your spam folder, or try again.
            </p>
            <button onClick={resetForm} className="text-sm font-semibold hover:underline" style={{ color: '#1b61c9' }}>
              Send again
            </button>
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e0e2e6' }}>
              <Link href="/login" className="text-sm hover:underline" style={{ color: 'rgba(4,14,32,0.5)' }}>
                ← Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.15)' }}
              >
                🔑
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                Reset Your Password
              </h1>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Email Address" htmlFor="reset-email" required>
                <FormInput
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </FormField>

              {error && (
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}
                  role="alert"
                >
                  {error}
                </div>
              )}

              <FormButton
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!email}
                className="w-full justify-center"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </FormButton>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
              Remember your password?{' '}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>
                Log In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
