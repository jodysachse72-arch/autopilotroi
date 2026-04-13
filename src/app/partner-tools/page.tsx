'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function PartnerToolsPage() {
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://autopilotroi.com'
  const referralUrl = code.trim() ? `${baseUrl}/join?ref=${encodeURIComponent(code.trim())}` : ''

  function handleCopy() {
    if (!referralUrl) return
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            🔗 Partner Tools
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-[var(--font-sora)] text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
            Referral Link Generator
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-4 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
            Enter your Aurum backoffice referral code to generate your personalized
            onboarding URL. Share it with prospects — they&apos;ll be attributed to you automatically.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-10">
        {/* Generator Card */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="rounded-[2rem] border border-[var(--border-secondary)] bg-[var(--bg-card)] p-8 shadow-[var(--card-shadow,none)]"
        >
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Your Aurum Referral Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. BARRY123 or your Aurum username"
            className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-5 py-3.5 text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition"
          />

          {referralUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                Your Referral URL
              </label>
              <div className="flex items-stretch gap-2">
                <div className="flex-1 overflow-hidden rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3">
                  <p className="truncate text-sm font-mono text-blue-200">{referralUrl}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`shrink-0 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-white shadow-[0_4px_16px_rgba(16,185,129,0.4)]'
                      : 'bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:brightness-110'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* How it works */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mt-8 rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 shadow-[var(--card-shadow,none)]"
        >
          <h2 className="mb-6 font-[var(--font-sora)] text-xl font-semibold text-[var(--text-primary)]">
            How it works
          </h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Get your code', desc: 'Log into your Aurum backoffice and copy your referral code or username.' },
              { step: '2', title: 'Generate your link', desc: 'Paste the code above — your unique URL is generated instantly.' },
              { step: '3', title: 'Share with prospects', desc: 'Send the link to anyone interested. When they click it, your code is automatically saved.' },
              { step: '4', title: 'They start onboarding', desc: 'Your prospect goes through the AutoPilot ROI onboarding flow — attributed to you.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-sm font-bold text-blue-300">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info note */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={5}
          className="mt-6 rounded-xl border border-blue-400/20 bg-blue-500/8 px-5 py-4"
        >
          <p className="text-sm leading-relaxed text-blue-200/80">
            <strong className="text-blue-200">💡 Note:</strong> Your referral code comes from
            the Aurum backoffice — not from AutoPilot ROI. If you don&apos;t have one yet, reach out
            to your upline partner. The code ensures proper placement in the team structure.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
