'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PasswordStrengthMeter from '@/components/ui/PasswordStrengthMeter'

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '10px', border: '1.5px solid #e0e2e6',
  padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#181d26',
  background: '#fff', outline: 'none', transition: 'border-color 0.15s',
}

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
      } catch { setError('Something went wrong. Please try requesting a new reset link.') }
    }
    exchangeToken()
  }, [isConfigured])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    setLoading(true)
    if (!isConfigured) { await new Promise(r => setTimeout(r, 1200)); setSuccess(true); setLoading(false); setTimeout(() => router.push('/login'), 3000); return }
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) setError(updateError.message); else { setSuccess(true); setTimeout(() => router.push('/login'), 3000) }
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}>
        {success ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>✅</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26' }}>Password Updated</h1>
            <p className="text-sm mb-5" style={{ color: 'rgba(4,14,32,0.55)' }}>Your password has been reset successfully. Redirecting to login…</p>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: '#e0e2e6' }}>
              <motion.div className="h-full rounded-full" style={{ background: '#059669' }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} />
            </div>
          </div>
        ) : error && !sessionReady ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>⚠️</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26' }}>Link Expired</h1>
            <p className="text-sm mb-6" style={{ color: 'rgba(4,14,32,0.55)' }}>{error}</p>
            <Link href="/forgot-password" className="inline-block rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ background: '#1b61c9' }}>
              Request New Link
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl" style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.15)' }}>🔐</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#181d26' }}>Set New Password</h1>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>Choose a strong password for your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-semibold mb-1.5" style={{ color: '#181d26' }}>New Password</label>
                <input id="new-password" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 characters" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1b61c9')} onBlur={e => (e.target.style.borderColor = '#e0e2e6')} />
                <PasswordStrengthMeter password={password} />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold mb-1.5" style={{ color: '#181d26' }}>Confirm New Password</label>
                <input id="confirm-password" type="password" required minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1b61c9')} onBlur={e => (e.target.style.borderColor = '#e0e2e6')} />
                {password && confirmPassword && password !== confirmPassword && <p className="mt-1.5 text-xs" style={{ color: '#dc2626' }}>Passwords do not match</p>}
                {password && password.length >= 8 && confirmPassword === password && <p className="mt-1.5 text-xs" style={{ color: '#059669' }}>✓ Passwords match</p>}
              </div>

              {error && sessionReady && <div className="rounded-lg px-4 py-3 text-sm" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>}

              <button type="submit" disabled={loading || !password || !confirmPassword}
                className="w-full rounded-xl py-3.5 font-bold text-white transition disabled:opacity-50"
                style={{ background: '#1b61c9' }}
                onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}>
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
