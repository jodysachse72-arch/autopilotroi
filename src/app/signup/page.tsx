'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { CheckCircleIcon } from '@/components/ui/Icons'
import { trackEvent, EVENTS } from '@/lib/analytics'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '10px',
  border: '1.5px solid var(--color-border)',
  padding: '0.75rem 1rem',
  fontSize: '0.95rem',
  color: '#181d26',
  background: '#fff',
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: 'var(--font-body)',
}

const TRUST_POINTS = ['No credit card required', 'Free to get started', 'Takes 2 minutes']

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (lead.id) { setName(lead.name || ''); setEmail(lead.email || '') }
      }
    } catch {}
    setChecking(false)
  }, [ref, router])

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} />
    </div>
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    trackEvent(EVENTS.SIGNUP_SUBMITTED)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, ref, turnstileToken }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      localStorage.setItem('autopilotroi-lead', JSON.stringify({ id: data.leadId, name, email, ref }))
      router.push(data.alreadyAssessed ? '/waiting-room' : '/orientation')
    } catch { setError('Network error. Please try again.'); setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      background: '#f8fafc',
    }}>
      <Link href="/" style={{ marginBottom: '2rem', display: 'block' }}>
        <Logo size={38} showText textColorClass="text-[#181d26]" />
      </Link>

      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <div style={{
          borderRadius: '1.25rem',
          padding: '2.5rem',
          background: '#fff',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 24px rgba(27,97,201,0.08)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            textAlign: 'center',
            color: '#181d26',
            letterSpacing: '-0.02em',
            marginBottom: '0.25rem',
          }}>
            Create Your Free Account
          </h1>
          <p style={{
            fontSize: '0.875rem',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'rgba(4,14,32,0.55)',
          }}>
            Start your readiness assessment \u2014 takes under 2 minutes
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="signup-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem', color: '#181d26', fontFamily: 'var(--font-display)' }}>
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1b61c9')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>
            <div>
              <label htmlFor="signup-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem', color: '#181d26', fontFamily: 'var(--font-display)' }}>
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1b61c9')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>

            {error && (
              <div style={{
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
              }}>
                {error}
              </div>
            )}

            {TURNSTILE_SITE_KEY && (
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={handleTurnstile} onExpire={() => setTurnstileToken(null)} theme="light" />
            )}

            <button
              type="submit"
              disabled={loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false)}
              style={{
                width: '100%',
                borderRadius: '0.75rem',
                padding: '0.875rem 1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: '#fff',
                background: '#1b61c9',
                fontSize: '0.95rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false) ? 0.6 : 1,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}
            >
              {loading ? 'Saving\u2026' : 'Continue \u2192'}
            </button>
          </form>

          <p style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'rgba(4,14,32,0.55)',
          }}>
            Already have an account?{' '}
            <Link href="/login" style={{ fontWeight: 600, color: '#1b61c9', textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>

        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          fontSize: '0.75rem',
          color: 'rgba(4,14,32,0.5)',
          flexWrap: 'wrap',
        }}>
          {TRUST_POINTS.map(t => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ color: '#10b981', display: 'inline-flex' }}>
                <CheckCircleIcon className="w-3.5 h-3.5" />
              </span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} /></div>}>
      <SignupContent />
    </Suspense>
  )
}
