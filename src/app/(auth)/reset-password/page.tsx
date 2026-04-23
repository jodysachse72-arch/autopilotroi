'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PasswordStrengthMeter from '@/components/ui/PasswordStrengthMeter'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   RESET PASSWORD — completes the email-link flow.
   Validates session token, then accepts new password.
   ═══════════════════════════════════════════════════════════════ */

export default function ResetPasswordPage() {
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]                 = useState(false)
  const [error, setError]                     = useState('')
  const [success, setSuccess]                 = useState(false)
  const [sessionReady, setSessionReady]       = useState(false)
  const router = useRouter()

  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  useEffect(() => {
    async function exchangeToken() {
      if (!isConfigured) { setSessionReady(true); return }
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !data.session) setError('Invalid or expired reset link. Please request a new one.')
        else setSessionReady(true)
      } catch {
        setError('Something went wrong. Please try requesting a new reset link.')
      }
    }
    exchangeToken()
  }, [isConfigured])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    setLoading(true)
    if (!isConfigured) {
      await new Promise(r => setTimeout(r, 1200))
      setSuccess(true)
      setLoading(false)
      setTimeout(() => router.push('/login'), 3000)
      return
    }
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) setError(updateError.message)
      else { setSuccess(true); setTimeout(() => router.push('/login'), 3000) }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [password, confirmPassword, isConfigured, router])

  const passwordsMatchHint = (() => {
    if (!password || !confirmPassword) return null
    if (password !== confirmPassword) return { text: 'Passwords do not match', color: '#dc2626' }
    if (password.length >= 8) return { text: '✓ Passwords match', color: '#059669' }
    return null
  })()

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}
      >
        {success ? (
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              ✅
            </div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26' }}>Password Updated</h1>
            <p className="text-sm mb-5" style={{ color: 'rgba(4,14,32,0.55)' }}>
              Your password has been reset successfully. Redirecting to login…
            </p>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: '#e0e2e6' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#059669' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
          </div>
        ) : error && !sessionReady ? (
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
            >
              ⚠️
            </div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26' }}>Link Expired</h1>
            <p className="text-sm mb-6" style={{ color: 'rgba(4,14,32,0.55)' }}>{error}</p>
            <Link
              href="/forgot-password"
              className="inline-block rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
              style={{ background: '#1b61c9' }}
            >
              Request New Link
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.15)' }}
              >
                🔐
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#181d26' }}>Set New Password</h1>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
                Choose a strong password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="New Password" htmlFor="new-password" required>
                <FormInput
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
                <PasswordStrengthMeter password={password} />
              </FormField>

              <FormField label="Confirm New Password" htmlFor="confirm-password" required>
                <FormInput
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  invalid={!!password && !!confirmPassword && password !== confirmPassword}
                />
                {passwordsMatchHint && (
                  <p className="mt-1.5 text-xs" style={{ color: passwordsMatchHint.color }}>
                    {passwordsMatchHint.text}
                  </p>
                )}
              </FormField>

              {error && sessionReady && (
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
                disabled={!password || !confirmPassword}
                className="w-full justify-center"
              >
                {loading ? 'Updating…' : 'Update Password'}
              </FormButton>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
