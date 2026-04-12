'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

/* ═══════════════════════════════════════════════════════════════
   EXIT-INTENT POPUP
   Triggers when user moves cursor toward browser chrome (desktop)
   or after 30s of inactivity (mobile).
   Shows once per session. Saves email to /api/leads.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'autopilotroi-exit-shown'

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const show = useCallback(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY)
    // Don't show if already shown, on admin pages, or user already signed up
    if (alreadyShown) return
    if (window.location.pathname.startsWith('/admin')) return
    if (window.location.pathname === '/waiting-room') return
    if (localStorage.getItem('autopilotroi-lead-id')) return

    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(true)
    trackEvent('exit_intent_shown')
  }, [])

  useEffect(() => {
    // Desktop: detect mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) show()
    }

    // Mobile: show after 45 seconds of page time (reduced aggression)
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) show()
    }, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(mobileTimer)
    }
  }, [show])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || loading) return

    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Exit Intent Lead', email, ref: '' }),
      })
      trackEvent('exit_intent_converted', { email })
      setSubmitted(true)
    } catch {
      // Silently fail — don't block the user
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
              {/* Close */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                {submitted ? (
                  /* Success state */
                  <div className="text-center py-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                      <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-[var(--font-sora)] text-xl font-bold text-white">You&apos;re In!</h3>
                    <p className="mt-2 text-sm text-white/50">
                      Check your inbox — we&apos;ll send you everything you need to get started.
                    </p>
                    <button
                      onClick={() => setVisible(false)}
                      className="mt-6 rounded-xl bg-white/5 px-6 py-2.5 text-sm text-white hover:bg-white/10 transition"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  /* Capture form */
                  <>
                    <div className="mb-6 text-center">
                      <span className="inline-block text-4xl mb-3">⚡</span>
                      <h3 className="font-[var(--font-sora)] text-xl font-bold text-white">
                        Wait — Don&apos;t Leave Empty-Handed
                      </h3>
                      <p className="mt-2 text-sm text-white/50">
                        Get a personalized readiness report and see how AI-managed finance can work for your goals. Takes 2 minutes.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-blue-500 transition"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white transition hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50"
                      >
                        {loading ? 'Submitting...' : 'Get My Free Readiness Report →'}
                      </button>
                    </form>

                    <p className="mt-4 text-center text-xs text-white/20">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
