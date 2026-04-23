'use client'

import { useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FormField, FormInput, FormButton } from '@/components/backend'

function ResetForm() {
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)
  const router       = useRouter()
  const searchParams = useSearchParams()
  const code         = searchParams.get('code')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      if (code) await supabase.auth.exchangeCodeForSession(code)
      const { error: err } = await supabase.auth.updateUser({ password })
      if (err) { setError(err.message) } else { setSuccess(true); setTimeout(() => router.push('/login'), 2500) }
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }, [password, confirm, code, router])

  if (success) return (
    <div className="be-card be-card--padded text-center">
      <div className="mb-4 text-4xl">✅</div>
      <h1 className="text-xl font-bold" style={{ color: '#0f172a' }}>Password updated!</h1>
      <p className="mt-2 text-sm" style={{ color: 'rgba(15,23,42,0.55)' }}>Redirecting you to login…</p>
    </div>
  )

  return (
    <div className="be-card be-card--padded">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>New password</h1>
        <p className="mt-1 text-sm" style={{ color: 'rgba(15,23,42,0.55)' }}>Choose a strong password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="New Password" htmlFor="new-password" required>
          <FormInput id="new-password" type="password" required minLength={8} value={password}
            onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" />
        </FormField>
        <FormField label="Confirm Password" htmlFor="confirm-password" required>
          <FormInput id="confirm-password" type="password" required value={confirm}
            onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" autoComplete="new-password" />
        </FormField>

        {error && (
          <div className="rounded-lg px-4 py-3 text-sm" role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <FormButton type="submit" variant="primary" loading={loading} className="w-full justify-center">
          Update Password
        </FormButton>
      </form>

      <p className="mt-5 text-center text-sm">
        <Link href="/login" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>← Back to login</Link>
      </p>
    </div>
  )
}

export default function ResetPasswordPage() {
  return <Suspense><ResetForm /></Suspense>
}
