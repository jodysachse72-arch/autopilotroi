'use client'

import { useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FormField, FormInput, FormButton } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE — premium auth form.
   Demo accounts short-circuit Supabase for easy testing.
   ═══════════════════════════════════════════════════════════════ */

interface DemoAccount { password: string; role: 'admin' | 'partner'; name: string }

const DEMO: Record<string, DemoAccount> = {
  'admin@autopilotroi.com':   { password: 'Admin2026!',   role: 'admin',   name: 'Admin User'   },
  'partner@autopilotroi.com': { password: 'Partner2026!', role: 'partner', name: 'Demo Partner'  },
}

function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') || '/'

  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const demo = DEMO[email.toLowerCase()]
    if (demo) {
      if (demo.password !== password) { setError('Invalid password. Please try again.'); setLoading(false); return }
      localStorage.setItem('autopilotroi-demo-user', JSON.stringify({ email, role: demo.role, name: demo.name }))
      router.push(demo.role === 'admin' ? '/admin' : '/dashboard')
      return
    }
    if (!isConfigured) { setError('No account found. Use a demo account above.'); setLoading(false); return }

    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) { setError(err.message); setLoading(false); return }
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role === 'admin') router.push('/admin')
        else if (profile?.role === 'partner') router.push('/dashboard')
        else router.push(redirect)
      }
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }, [email, password, isConfigured, redirect, router])

  return (
    <div className="be-card be-card--padded">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
          Welcome back
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'rgba(15,23,42,0.55)' }}>
          Sign in to your AutopilotROI account
        </p>
      </div>

      {/* Demo accounts */}
      <div className="mb-5 rounded-xl p-3.5" style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.14)' }}>
        <p className="mb-2.5 text-xs font-bold" style={{ color: '#1b61c9' }}>🧪 Test Accounts — click to fill</p>
        <div className="space-y-1.5">
          {[
            { label: '🛡️ Admin',   email: 'admin@autopilotroi.com',   pass: 'Admin2026!'   },
            { label: '🤝 Partner', email: 'partner@autopilotroi.com', pass: 'Partner2026!' },
          ].map(a => (
            <button key={a.label} type="button"
              onClick={() => { setEmail(a.email); setPassword(a.pass) }}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition hover:bg-blue-50"
              style={{ background: '#fff', border: '1px solid #e2e8f0' }}
              title="Click to fill credentials"
            >
              <span className="text-xs font-medium" style={{ color: '#0f172a' }}>{a.label}</span>
              <span className="text-[10px]" style={{ color: '#1b61c9', fontFamily: 'monospace' }}>
                {a.email}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" htmlFor="login-email" required>
          <FormInput id="login-email" type="email" required value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </FormField>

        <FormField label="Password" htmlFor="login-password" required>
          <FormInput id="login-password" type="password" required value={password}
            onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
        </FormField>

        {error && (
          <div className="rounded-lg px-4 py-3 text-sm" role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: '#1b61c9' }}>
            Forgot password?
          </Link>
        </div>

        <FormButton type="submit" variant="primary" loading={loading} className="w-full justify-center" id="login-submit">
          Sign In →
        </FormButton>
      </form>

      <p className="mt-5 text-center text-sm" style={{ color: 'rgba(15,23,42,0.50)' }}>
        Need access?{' '}
        <Link href="/signup" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>
          Apply as a Partner
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}
