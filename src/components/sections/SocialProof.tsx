'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Testimonials + live activity counter
   Light-mode design system: white bg, navy text, Airtable Blue accents
   ═══════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    name: 'Michael R.',
    role: 'Crypto Investor',
    quote: 'The readiness assessment showed me exactly where I stood. My partner walked me through everything — I was set up within 48 hours.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Sarah K.',
    role: 'Small Business Owner',
    quote: 'I was skeptical about crypto, but the onboarding process made it feel approachable. The education videos were actually useful, not just hype.',
    rating: 5,
    avatar: 'SK',
  },
  {
    name: 'David L.',
    role: 'Financial Analyst',
    quote: 'What sold me was the transparency. The risk disclaimer, the structured approach — this felt like a real platform, not another pitch.',
    rating: 5,
    avatar: 'DL',
  },
  {
    name: 'Jessica M.',
    role: 'Healthcare Professional',
    quote: 'Zero experience with trading bots before this. The quiz matched me with the right tier and my partner\'s guidance was invaluable.',
    rating: 4,
    avatar: 'JM',
  },
  {
    name: 'Robert T.',
    role: 'Retired Engineer',
    quote: "The university content helped me understand the ecosystem before committing anything. Knowledge first — that's the right approach.",
    rating: 5,
    avatar: 'RT',
  },
]

const recentActions = [
  'Someone from Texas just completed their readiness assessment',
  'A new member in California joined 3 minutes ago',
  'Someone from London started University training',
  'A partner in Florida was just notified of a new lead',
  'Someone from Toronto completed the onboarding quiz',
  'A new member in Sydney started their assessment',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activityIndex, setActivityIndex] = useState(0)

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Rotate activity feed
  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((i) => (i + 1) % recentActions.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative overflow-hidden px-6 py-24 lg:px-10"
      style={{ background: '#f7f9fc', borderTop: '1px solid #e0e2e6', borderBottom: '1px solid #e0e2e6' }}
    >
      {/* Subtle blue radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #dbeafe 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            Trusted by Members
          </span>
          <h2 className="mt-4 text-[2rem] font-bold tracking-tight sm:text-[2.5rem]" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
            Real People. Real Results.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1rem] leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>
            Hear from members who went through the same onboarding process you&apos;re about to start.
          </p>
        </div>

        {/* Live activity ticker */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.20)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#10b981' }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: '#10b981' }} />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activityIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm font-medium"
                style={{ color: '#065f46' }}
              >
                {recentActions[activityIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-8 sm:p-10"
              style={{ background: '#ffffff', border: '1px solid #e0e6f0', boxShadow: '0 4px 24px rgba(27,97,201,0.08)' }}
            >
              <StarRating rating={testimonials[activeIndex].rating} />
              <p className="mt-5 text-lg leading-relaxed italic" style={{ color: 'rgba(4,14,32,0.75)' }}>
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1b61c9 0%, #254fad 100%)' }}>
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#181d26' }}>{testimonials[activeIndex].name}</div>
                  <div className="text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>{testimonials[activeIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? 'w-8' : 'w-2 hover:opacity-60'
                }`}
                style={{ background: i === activeIndex ? '#1b61c9' : '#ccddee' }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust stats */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: '2,400+', label: 'Members Onboarded' },
            { value: '94%', label: 'Completion Rate' },
            { value: '< 24h', label: 'Avg. Partner Response' },
            { value: '4.8/5', label: 'Member Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#1b61c9', letterSpacing: '-0.03em' }}>{stat.value}</div>
              <div className="mt-1.5 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(4,14,32,0.40)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
