'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { CheckCircleIcon } from '@/components/ui/Icons'
import { trackEvent, EVENTS } from '@/lib/analytics'

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
        background: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-accent)',
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--page-px)',
        background: 'var(--color-bg)',
      }}
    >

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '28rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Logo size={38} showText />
          </Link>
        </div>

        {/* Step badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            borderRadius: '9999px',
            border: '1px solid var(--color-accent-light)',
            background: 'var(--color-accent-light)',
            padding: '0.375rem 1rem',
            fontSize: '0.6875rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-accent)',
          }}>
            <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
            Step 1 of 3
          </span>
        </div>

        {/* Premium form card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: 'var(--shadow-card)',
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

          {/* Scoped styles: ::placeholder + :focus can't be set inline */}
          <style>{`
            #signup-name, #signup-email {
              outline: none;
              transition: border-color 150ms ease, box-shadow 150ms ease;
            }
            #signup-name:focus, #signup-email:focus {
              border-color: var(--color-accent);
              box-shadow: 0 0 0 3px rgba(27,97,201,0.12);
            }
            #signup-name::placeholder, #signup-email::placeholder {
              color: var(--color-text-muted);
            }
            #signup-submit:not(:disabled):hover {
              background: var(--color-accent-hover) !important;
            }
          `}</style>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Full Name{' '}
                <span style={{ color: 'var(--color-error)' }} aria-hidden>*</span>
              </label>
              <input
                id="signup-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="signup-email"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Email Address{' '}
                <span style={{ color: 'var(--color-error)' }} aria-hidden>*</span>
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

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

            {/* Submit button — mirrors hero-btn-primary shape, accent fill for white-card context */}
            <button
              id="signup-submit"
              type="submit"
              disabled={submitDisabled}
              aria-busy={loading || undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.875rem 1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                color: '#ffffff',
                background: 'var(--color-accent)',
                border: 'none',
                borderRadius: 'var(--radius-btn)',
                cursor: submitDisabled ? 'not-allowed' : 'pointer',
                opacity: submitDisabled ? 0.6 : 1,
                transition: 'background 150ms ease, opacity 150ms ease',
              }}
            >
              {loading && (
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#ffffff',
                    animation: 'spin 0.75s linear infinite',
                    flexShrink: 0,
                  }}
                />
              )}
              {loading ? 'Saving…' : 'Start your readiness assessment →'}
            </button>
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
                color: 'var(--color-text-muted)',
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
