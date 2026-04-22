'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { CheckCircleIcon } from '@/components/ui/Icons'
import { trackEvent, EVENTS } from '@/lib/analytics'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   SIGNUP — public lead capture (separate from /login).
   Sits OUTSIDE the (auth) layout so it can render its own logo
   and trust-points footer alongside the form.
   ═══════════════════════════════════════════════════════════════ */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const TRUST_POINTS = ['No credit card required', 'Free to get started', 'Takes 2 minutes'] as const

function LoadingShell() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#f8fafc' }}>
      <div
        className="h-8 w-8 animate-spin rounded-full"
        style={{ border: '2px solid #1b61c9', borderTopColor: 'transparent' }}
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
        const quizResult = localStorage.getItem('autopilotroi-quiz-result')
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ background: '#f8fafc' }}
    >
      <Link href="/" className="mb-8 block">
        <Logo size={38} showText textColorClass="text-[#181d26]" />
      </Link>

      <div className="w-full max-w-md">
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}
        >
          <h1
            className="text-2xl font-bold text-center mb-1"
            style={{ color: '#181d26', letterSpacing: '-0.02em' }}
          >
            Create Your Free Account
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: 'rgba(4,14,32,0.55)' }}>
            Start your readiness assessment — takes under 2 minutes
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="rounded-lg px-4 py-3 text-sm"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}
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
              {loading ? 'Saving…' : 'Continue →'}
            </FormButton>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>
              Log in
            </Link>
          </p>
        </div>

        <div
          className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
          style={{ color: 'rgba(4,14,32,0.5)' }}
        >
          {TRUST_POINTS.map(t => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span style={{ color: '#10b981' }} className="inline-flex">
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
