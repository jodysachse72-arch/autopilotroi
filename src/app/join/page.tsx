'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function JoinContent() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (refCode) {
      try {
        localStorage.setItem('autopilotroi-ref', refCode)
        setSaved(true)
      } catch {
        // localStorage unavailable
      }
    }
  }, [refCode])

  return (
    <div className="min-h-screen bg-[#06122f]">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-24 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.2),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          {refCode ? (
            <>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-5 py-2 text-sm font-medium text-emerald-200">
                ✓ Referral Code Recognized
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-[var(--font-sora)] text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                You&apos;ve been invited to<br />
                <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Team AutoPilot ROI
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="mx-auto mt-6 max-w-lg text-lg leading-8 text-blue-100/80">
                A partner from our team shared this link with you. Your referral has been
                saved — when you complete onboarding, the right partner will be notified
                and credited.
              </motion.p>

              {/* Referral confirmation card */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/15 bg-white/6 p-6 backdrop-blur-sm">
                <div className="text-sm text-blue-200/60 mb-1">Referral Code</div>
                <div className="text-xl font-mono font-bold text-white tracking-wide">{refCode}</div>
                {saved && (
                  <div className="mt-2 text-xs text-emerald-300/80">
                    ✓ Saved to your session
                  </div>
                )}
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-5 py-2 text-sm font-medium text-blue-200">
                👋 Welcome
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-[var(--font-sora)] text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Welcome to<br />
                <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Team AutoPilot ROI
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="mx-auto mt-6 max-w-lg text-lg leading-8 text-blue-100/80">
                AutoPilot ROI is the structured onboarding system for the Aurum ecosystem.
                Start your journey with education, guided setup, and personal partner support.
              </motion.p>

              {/* No referral info box */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="mx-auto mt-8 max-w-sm rounded-xl border border-amber-400/20 bg-amber-500/8 px-5 py-4">
                <p className="text-sm leading-relaxed text-amber-200/80">
                  <strong>No referral code detected.</strong> If someone sent you a link,
                  make sure you&apos;re using the full URL they shared. You can still explore
                  the site freely.
                </p>
              </motion.div>
            </>
          )}

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start"
              className="group relative overflow-hidden rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-8 py-3.5 text-base font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
            >
              Start Onboarding →
            </Link>
            <Link
              href="/university"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Explore University
            </Link>
          </motion.div>

          {/* What you'll get */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="mx-auto mt-16 grid max-w-lg gap-4 text-left sm:grid-cols-2">
            {[
              { icon: '🎓', title: 'Full Education', desc: 'Videos, guides, and due diligence before you invest anything.' },
              { icon: '🤝', title: 'Personal Support', desc: 'A dedicated partner walks you through every step.' },
              { icon: '🔗', title: 'Correct Placement', desc: 'Your referral code ensures you\'re placed in the right team position.' },
              { icon: '📊', title: 'Readiness Score', desc: 'Know exactly where you stand before committing.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/4 p-4">
                <div className="text-2xl">{item.icon}</div>
                <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-blue-100/60">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#06122f] flex items-center justify-center">
        <div className="text-blue-200/60">Loading...</div>
      </div>
    }>
      <JoinContent />
    </Suspense>
  )
}
