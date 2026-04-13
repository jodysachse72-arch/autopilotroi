'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isConfigured) {
      // Demo mode — just pretend we sent it
      await new Promise((r) => setTimeout(r, 1200))
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

      if (resetError) {
        setError(resetError.message)
      } else {
        setSent(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 shadow-xl backdrop-blur-xl">
        {sent ? (
          /* ── Success State ── */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/20">
              <span className="text-3xl">✉️</span>
            </div>
            <h1 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
              Check Your Email
            </h1>
            <p className="mb-6 text-sm text-[var(--text-tertiary)] leading-relaxed">
              We sent a password reset link to{' '}
              <span className="font-medium text-blue-400">{email}</span>.
              Click the link in the email to set a new password.
            </p>
            <div className="space-y-3">
              <p className="text-xs text-[var(--text-muted)]">
                Didn&apos;t get it? Check your spam folder, or try again.
              </p>
              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
              >
                Send again
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border-primary)]">
              <Link
                href="/login"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                <span className="text-2xl">🔑</span>
              </div>
              <h1 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
                Reset Your Password
              </h1>
              <p className="text-sm text-[var(--text-tertiary)]">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
                >
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Remember your password?{' '}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Log In
              </Link>
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}
