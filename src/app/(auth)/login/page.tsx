'use client'

import { useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   LOGIN — email + password via Supabase Auth.
   Role-based redirect: admin → /admin, partner → /dashboard.
   ═══════════════════════════════════════════════════════════════ */

function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [remember, setRemember] = useState(true)
  const router       = useRouter()
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

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role === 'admin') router.push('/admin')
        else if (profile?.role === 'partner') router.push('/dashboard')
        else router.push(redirect)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, password, redirect, router])

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
