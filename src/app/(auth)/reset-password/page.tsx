'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PasswordStrengthMeter from '@/components/ui/PasswordStrengthMeter'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const router = useRouter()

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  // Supabase sends the user here with a session token in the URL hash
  // We need to exchange it for a session
  useEffect(() => {
    async function exchangeToken() {
      if (!isConfigured) {
        setSessionReady(true)
        return
      }

      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        // Supabase automatically picks up the token from the URL hash
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          setError('Invalid or expired reset link. Please request a new one.')
          return
        }

        if (data.session) {
          setSessionReady(true)
        } else {
          setError('Invalid or expired reset link. Please request a new one.')
        }
      } catch {
        setError('Something went wrong. Please try requesting a new reset link.')
      }
    }

    exchangeToken()
  }, [isConfigured])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    if (!isConfigured) {
      // Demo mode
      await new Promise((r) => setTimeout(r, 1200))
      setSuccess(true)
      setLoading(false)
      setTimeout(() => router.push('/login'), 3000)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) {
        setError(updateError.message)
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 3000)
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
        {success ? (
          /* ── Success State ── */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/20">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
              Password Updated
            </h1>
            <p className="mb-4 text-sm text-[var(--text-tertiary)]">
              Your password has been reset successfully. Redirecting to login...
            </p>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
          </div>
        ) : error && !sessionReady ? (
          /* ── Invalid Link State ── */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-400/20">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
              Link Expired
            </h1>
            <p className="mb-6 text-sm text-[var(--text-tertiary)]">
              {error}
            </p>
            <Link
              href="/forgot-password"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Request New Link
            </Link>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                <span className="text-2xl">🔐</span>
              </div>
              <h1 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
                Set New Password
              </h1>
              <p className="text-sm text-[var(--text-tertiary)]">
                Choose a strong password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
                <PasswordStrengthMeter password={password} />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400">Passwords do not match</p>
                )}
                {password && password.length >= 8 && confirmPassword === password && (
                  <p className="mt-1.5 text-xs text-emerald-400">✓ Passwords match</p>
                )}
              </div>

              {error && sessionReady && (
                <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className="w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  )
}
