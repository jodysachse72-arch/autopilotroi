'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  // ── Demo accounts always available (even when Supabase is configured) ──
  const DEMO_ACCOUNTS: Record<string, { password: string; role: string; name: string }> = {
    'admin@autopilotroi.com': { password: 'Admin2026!', role: 'admin', name: 'Admin User' },
    'partner@autopilotroi.com': { password: 'Partner2026!', role: 'partner', name: 'Demo Partner' },
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // ── Step 1: Try demo accounts first (always available) ──
    const demoAccount = DEMO_ACCOUNTS[email.toLowerCase()]
    if (demoAccount) {
      if (demoAccount.password !== password) {
        setError('Invalid password. Please try again.')
        setLoading(false)
        return
      }

      localStorage.setItem(
        'autopilotroi-demo-user',
        JSON.stringify({ email, role: demoAccount.role, name: demoAccount.name })
      )

      if (demoAccount.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
      return
    }

    // ── Step 2: Try Supabase auth (if configured) ──
    if (!isConfigured) {
      setError('No account found with that email. Try admin@autopilotroi.com or partner@autopilotroi.com')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        setError(loginError.message)
        setLoading(false)
        return
      }

      // Get user role for redirect
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin') {
          router.push('/admin')
        } else if (profile?.role === 'partner') {
          router.push('/dashboard')
        } else {
          router.push(redirect)
        }
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 shadow-xl backdrop-blur-xl">
        <h1 className="mb-2 text-center font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
          Welcome Back
        </h1>
        <p className="mb-8 text-center text-sm text-[var(--text-tertiary)]">
          Log in to your AutoPilot ROI account
        </p>

        <div className="mb-6 rounded-lg border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
            <strong className="text-blue-300">📋 Test Accounts</strong>
            <div className="mt-2 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between rounded bg-white/5 px-2 py-1">
                <span>🛡️ Admin</span>
                <span className="text-blue-300">admin@autopilotroi.com / Admin2026!</span>
              </div>
              <div className="flex items-center justify-between rounded bg-white/5 px-2 py-1">
                <span>🤝 Partner</span>
                <span className="text-blue-300">partner@autopilotroi.com / Partner2026!</span>
              </div>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Start Here
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
