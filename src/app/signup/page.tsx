'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { CheckCircleIcon } from '@/components/ui/Icons'
import { trackEvent, EVENTS } from '@/lib/analytics'
import { FormField, FormInput, FormButton } from '@/components/backend'
import { submitToThriveDesk } from '@/lib/integrations/thrivedesk'

/* ═══════════════════════════════════════════════════════════════
   SIGNUP — public lead capture (separate from /login).
   Sits OUTSIDE the (auth) layout so it can render its own logo
   and trust-points footer alongside the form.
   ═══════════════════════════════════════════════════════════════ */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const TRUST_POINTS = ['No credit card required', 'Free to get started', 'Takes 2 minutes'] as const

function LoadingShell() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #061238 0%, #0c1e4a 60%, #061238 100%)',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.15)',
          borderTopColor: '#60a5fa',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  )
}

function SignupContent() {
  const [name, setName]                     = useState('')
  const [email, setEmail]                   = useState('')
  const [error, setError]                   = useState('')
  const [loading, setLoading]               = useState(false)
  const [checking, setChecking]             = useState(true)
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
        if (ref && lead.ref !== ref) {
          lead.ref = ref
          localStorage.setItem('autopilotroi-lead', JSON.stringify(lead))
        }
        // Fix: read the key that /orientation actually writes (was 'autopilotroi-quiz-result')
        const quizResult = localStorage.getItem('autopilotroi-readiness')
        if (quizResult) {
          trackEvent(EVENTS.SIGNUP_RETURNING_USER)
          router.replace('/waiting-room')
          return
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (lead.id) { setName(lead.name || ''); setEmail(lead.email || '') }
      }
    } catch {}
    setChecking(false)
  }, [ref, router])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    trackEvent(EVENTS.SIGNUP_SUBMITTED)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, ref, turnstileToken }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }
      localStorage.setItem('autopilotroi-lead', JSON.stringify({ id: data.leadId, name, email, ref }))

      // ThriveDesk stub — fire-and-forget; never blocks the redirect
      submitToThriveDesk({ name, email, referralCode: ref ?? undefined })
        .catch(e => console.warn('[ThriveDesk] submit failed', e))

      router.push(data.alreadyAssessed ? '/waiting-room' : '/orientation')
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }, [name, email, ref, turnstileToken, router])

  if (checking) return <LoadingShell />

  const submitDisabled = loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false)

  return (
    /* Dark hero band — matches the /waiting-room hero pattern */
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--page-px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #061238 0%, #0c1e4a 60%, #061238 100%)',
      }}
    >
      {/* Ambient grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '28rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Logo size={38} showText textColorClass="text-white" />
          </Link>
        </div>

        {/* Step badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(96,165,250,0.30)',
            background: 'rgba(59,130,246,0.10)',
            padding: '0.375rem 1rem',
            fontSize: '0.6875rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#93c5fd',
          }}>
            <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
            Step 1 of 3
          </span>
        </div>

        {/* Premium form card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.28), 0 2px 12px rgba(0,0,0,0.16)',
        }}>
          <h1
            className="text-heading"
            style={{ color: 'var(--color-text)', textAlign: 'center', marginBottom: '0.5rem' }}
          >
            Create Your Free Account
          </h1>
          <p
            className="text-body"
            style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem' }}
          >
            Start your readiness assessment — takes under 2 minutes
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField label="Full Name" htmlFor="signup-name" required>
              <FormInput
                id="signup-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
            </FormField>

            <FormField label="Email Address" htmlFor="signup-email" required>
              <FormInput
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </FormField>

            {error && (
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-caption)',
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.25)',
                  color: 'var(--color-error)',
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            {TURNSTILE_SITE_KEY && (
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={handleTurnstile}
                onExpire={() => setTurnstileToken(null)}
                theme="light"
              />
            )}

            <FormButton
              type="submit"
              variant="primary"
              loading={loading}
              disabled={submitDisabled}
              className="w-full justify-center"
            >
              {loading ? 'Saving…' : 'Start your readiness assessment →'}
            </FormButton>
          </form>

          <p className="text-caption" style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link
              href="/login"
              style={{ fontWeight: 600, color: 'var(--color-accent)' }}
              className="hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Trust-point reassurance row */}
        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem 1.5rem',
        }}>
          {TRUST_POINTS.map(t => (
            <span
              key={t}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: 'var(--text-caption)',
                color: 'rgba(191,219,254,0.65)',
              }}
            >
              <span style={{ color: 'var(--color-success)', display: 'inline-flex' }}>
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
    <Suspense fallback={<LoadingShell />}>
      <SignupContent />
    </Suspense>
  )
}
