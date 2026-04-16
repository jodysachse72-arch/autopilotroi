'use client'

import { useState } from 'react'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '10px', border: '1.5px solid #e0e2e6',
  padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#181d26',
  background: '#fff', outline: 'none', transition: 'border-color 0.15s',
}

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    if (!isConfigured) { await new Promise(r => setTimeout(r, 1200)); setSent(true); setLoading(false); return }
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
      if (resetError) setError(resetError.message); else setSent(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}>
        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>✉️</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>Check Your Email</h1>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>
              We sent a password reset link to <strong style={{ color: '#1b61c9' }}>{email}</strong>. Click the link in the email to set a new password.
            </p>
            <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.4)' }}>Didn&apos;t get it? Check your spam folder, or try again.</p>
            <button onClick={() => { setSent(false); setEmail('') }} className="text-sm font-semibold" style={{ color: '#1b61c9' }}>Send again</button>
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e0e2e6' }}>
              <Link href="/login" className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>← Back to Login</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl" style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.15)' }}>🔑</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>Reset Your Password</h1>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>Enter your email and we&apos;ll send you a reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-semibold mb-1.5" style={{ color: '#181d26' }}>Email Address</label>
                <input id="reset-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1b61c9')} onBlur={e => (e.target.style.borderColor = '#e0e2e6')} />
              </div>

              {error && <div className="rounded-lg px-4 py-3 text-sm" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>}

              <button type="submit" disabled={loading || !email}
                className="w-full rounded-xl py-3.5 font-bold text-white transition disabled:opacity-50"
                style={{ background: '#1b61c9' }}
                onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
              Remember your password?{' '}<Link href="/login" className="font-semibold" style={{ color: '#1b61c9' }}>Log In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
