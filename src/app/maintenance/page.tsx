'use client'

import { motion } from 'framer-motion'

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Animated background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-cyan-500/8 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* Animated gear icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-card)]"
        >
          <svg className="h-12 w-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)]"
        >
          We&apos;re Upgrading
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-[var(--text-muted)]"
        >
          AutopilotROI is currently undergoing scheduled maintenance. We&apos;re making things even better for you.
        </motion.p>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-5 py-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
          </span>
          <span className="text-sm text-amber-300/80">Maintenance in progress — back shortly</span>
        </motion.div>

        {/* Estimated time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-6 py-4">
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Expected Duration</div>
            <div className="text-lg font-semibold text-[var(--text-primary)]">Less than 30 minutes</div>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            Need urgent help? Email{' '}
            <a href="mailto:support@autopilotroi.com" className="text-blue-400 hover:text-blue-300 transition">
              support@autopilotroi.com
            </a>
          </p>
        </motion.div>

        {/* Decorative dots */}
        <div className="mt-12 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="h-2 w-2 rounded-full bg-blue-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
