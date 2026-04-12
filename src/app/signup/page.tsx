'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'
import Turnstile from '@/components/ui/Turnstile'
import { trackEvent, EVENTS } from '@/lib/analytics'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}

function SignupContent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const handleTurnstile = useCallback((token: string) => setTurnstileToken(token), [])
  const router = useRouter()
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  // Auto-redirect returning users who already completed assessment
  useEffect(() => {
    try {
      const stored = localStorage.getItem('autopilotroi-lead')
      if (stored) {
        const lead = JSON.parse(stored)
        // If they have a ref param, update it in storage
        if (ref && lead.ref !== ref) {
          lead.ref = ref
          localStorage.setItem('autopilotroi-lead', JSON.stringify(lead))
        }

        // Check if they already completed the quiz
        const quizResult = localStorage.getItem('autopilotroi-quiz-result')
        if (quizResult) {
          // Returning user with completed assessment → go to waiting room
          trackEvent(EVENTS.SIGNUP_RETURNING_USER)
          router.replace('/waiting-room')
          return
        }

        // They signed up but didn't finish the quiz → go to orientation
        if (lead.id) {
          setName(lead.name || '')
          setEmail(lead.email || '')
        }
      }
    } catch {}
    setChecking(false)
  }, [ref, router])

  // Show loading state while checking
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-[var(--text-muted)]">Checking your status...</p>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
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

      // Store lead info in localStorage for the quiz
      localStorage.setItem('autopilotroi-lead', JSON.stringify({
        id: data.leadId,
        name,
        email,
        ref,
      }))

      if (data.alreadyAssessed) {
        // They already took the quiz — send to waiting room
        router.push('/waiting-room')
      } else {
        // Send to readiness quiz
        router.push('/orientation')
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <Logo size={40} showText />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8">
          <h1 className="mb-2 text-center font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
            Start Here
          </h1>
          <p className="mb-8 text-center text-sm text-[var(--text-muted)]">
            Enter your info to begin the readiness assessment
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card-hover)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-[var(--text-muted)]"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Bot protection */}
            {TURNSTILE_SITE_KEY && (
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={handleTurnstile}
                onExpire={() => setTurnstileToken(null)}
                theme="dark"
              />
            )}

            <button
              type="submit"
              disabled={loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false)}
              className="w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Continue →'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition">
              Log in
            </Link>
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex justify-center gap-6 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No account needed yet
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Takes 2 minutes
          </span>
        </div>
      </motion.div>
    </div>
  )
}
