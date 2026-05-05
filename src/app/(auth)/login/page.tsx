'use client'

import { useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   LOGIN — uses backend form primitives + real Supabase auth.
   ═══════════════════════════════════════════════════════════════ */



const TEST_ACCOUNTS = [
  { icon: '🛡️', label: 'Admin',   cred: 'admin@autopilotroi.com / Admin2026!' },
  { icon: '🤝', label: 'Partner', cred: 'partner@autopilotroi.com / Partner2026!' },
] as const

function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [remember, setRemember] = useState(true)
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') || '/'

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) {
        setError(loginError.message)
        setLoading(false)
        return
      }

      // Determine where to redirect
      const { data: { user } } = await supabase.auth.getUser()
      let destination = redirect
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role === 'admin') destination = redirect !== '/' ? redirect : '/admin'
        else if (profile?.role === 'partner') destination = redirect !== '/' ? redirect : '/dashboard'
      }

      // Full page reload so middleware picks up the new auth cookies
      window.location.href = destination
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, password, redirect])

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}
      >
        <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
          Welcome Back
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: 'rgba(4,14,32,0.5)' }}>
          Log in to your AutopilotROI account
        </p>

        <div
          className="mb-6 rounded-xl p-4"
          style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.15)' }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: '#1b61c9' }}>📋 Test Accounts</p>
          <div className="space-y-1.5">
            {TEST_ACCOUNTS.map(a => (
              <button
                key={a.label}
                type="button"
                onClick={() => {
                  const [demoEmail, demoPass] = a.cred.split(' / ')
                  setEmail(demoEmail)
                  setPassword(demoPass)
                }}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition hover:shadow-sm"
                style={{ background: '#fff', border: '1px solid #e0e2e6' }}
                title="Click to fill credentials"
              >
                <span className="font-medium" style={{ color: '#181d26' }}>{a.icon} {a.label}</span>
                <span style={{ color: '#1b61c9', fontFamily: 'monospace' }}>{a.cred}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Email Address" htmlFor="email" required>
            <FormInput
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </FormField>

          <FormField label="Password" htmlFor="login-password" required>
            <FormInput
              id="login-password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 rounded accent-blue-600"
              />
              <span className="text-xs" style={{ color: 'rgba(4,14,32,0.5)' }}>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: '#1b61c9' }}>
              Forgot password?
            </Link>
          </div>

          <FormButton
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full justify-center"
          >
            {loading ? 'Logging in…' : 'Log In →'}
          </FormButton>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>
            Start Here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
