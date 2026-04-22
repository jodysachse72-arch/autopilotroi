'use client'

import { motion } from 'framer-motion'
import { useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════
   MAINTENANCE — soft outage page with status, ETA, contact.
   Stays self-contained: no nav, no auth checks, no API calls.
   ═══════════════════════════════════════════════════════════════ */

export default function MaintenancePage() {
  const handleRefresh = useCallback(() => {
    if (typeof window !== 'undefined') window.location.reload()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
      <div className="mx-auto max-w-lg px-6 text-center">
        {/* Spinning gear */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
          style={{ background: '#fff', border: '2px solid #e0e2e6', boxShadow: '0 4px 20px rgba(27,97,201,0.12)' }}
        >
          <svg className="h-12 w-12" style={{ color: '#1b61c9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
          We&apos;re Upgrading
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-lg mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
          AutopilotROI is currently undergoing scheduled maintenance. We&apos;re making things even better for you.
        </motion.p>

        {/* Status pill */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-8"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#f59e0b' }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: '#f59e0b' }} />
          </span>
          <span className="text-sm font-medium" style={{ color: '#d97706' }}>Maintenance in progress — back shortly</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="rounded-xl p-5 mb-6" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <div className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: 'rgba(4,14,32,0.4)' }}>Expected Duration</div>
          <div className="text-lg font-bold" style={{ color: '#181d26' }}>Less than 30 minutes</div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: '#1b61c9' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-3M20 15a8 8 0 01-14 3" />
            </svg>
            Try Again
          </button>
          <a
            href="https://status.autopilotroi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            style={{ background: '#fff', border: '1px solid #e0e2e6', color: '#181d26' }}
          >
            View Status Page
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>

        <p className="text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>
          Need urgent help?{' '}
          <a href="mailto:support@autopilotroi.com" className="font-semibold hover:underline" style={{ color: '#1b61c9' }}>
            support@autopilotroi.com
          </a>
        </p>

        {/* Pulsing dots */}
        <div className="mt-10 flex justify-center gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="h-2 w-2 rounded-full" style={{ background: '#1b61c9' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
