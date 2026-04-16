'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { trackEvent, EVENTS } from '@/lib/analytics'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '10px', border: '1.5px solid #e0e2e6',
  padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#181d26',
  background: '#fff', outline: 'none', transition: 'border-color 0.15s',
}

function SignupContent() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const handleTurnstile = useCallback((token: string) => setTurnstileToken(token), [])
  const router       = useRouter()
  const searchParams = useSearchParams()
  const ref          = searchParams.get('ref')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('autopilotroi-lead')
      if (stored) {
        const lead = JSON.parse(stored)
        if (ref && lead.ref !== ref) { lead.ref = ref; localStorage.setItem('autopilotroi-lead', JSON.stringify(lead)) }
        const quizResult = localStorage.getItem('autopilotroi-quiz-result')
        if (quizResult) { trackEvent(EVENTS.SIGNUP_RETURNING_USER); router.replace('/waiting-room'); return }
        if (lead.id) { setName(lead.name || ''); setEmail(lead.email || '') }
      }
    } catch {}
    setChecking(false)
  }, [ref, router])

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    trackEvent(EVENTS.SIGNUP_SUBMITTED)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, ref, turnstileToken }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      localStorage.setItem('autopilotroi-lead', JSON.stringify({ id: data.leadId, name, email, ref }))
      router.push(data.alreadyAssessed ? '/waiting-room' : '/orientation')
    } catch { setError('Network error. Please try again.'); setLoading(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#f8fafc' }}>
      <Link href="/" className="mb-8 block">
        <Logo size={38} showText textColorClass="text-[#181d26]" />
      </Link>

      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}>
          <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
            Create Your Free Account
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: 'rgba(4,14,32,0.5)' }}>
            Start your readiness assessment — takes under 2 minutes
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-semibold mb-1.5" style={{ color: '#181d26' }}>Full Name</label>
              <input id="signup-name" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1b61c9')} onBlur={e => (e.target.style.borderColor = '#e0e2e6')} />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold mb-1.5" style={{ color: '#181d26' }}>Email Address</label>
              <input id="signup-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1b61c9')} onBlur={e => (e.target.style.borderColor = '#e0e2e6')} />
            </div>

            {error && (
              <div className="rounded-lg px-4 py-3 text-sm" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
            )}

            {TURNSTILE_SITE_KEY && (
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={handleTurnstile} onExpire={() => setTurnstileToken(null)} theme="light" />
            )}

            <button type="submit" disabled={loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false)}
              className="w-full rounded-xl py-3.5 font-bold text-white transition disabled:opacity-60"
              style={{ background: '#1b61c9', fontSize: '0.95rem' }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}
            >
              {loading ? 'Saving…' : 'Continue →'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: '#1b61c9' }}>Log in</Link>
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-5 flex justify-center gap-6 text-xs" style={{ color: 'rgba(4,14,32,0.45)' }}>
          {['No credit card required', 'Free to get started', 'Takes 2 minutes'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <svg className="h-3 w-3" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>}><SignupContent /></Suspense>
}
