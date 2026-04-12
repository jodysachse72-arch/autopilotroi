'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Testimonials + live activity counter
   Drop this section onto any page to build trust
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
    quote: 'Zero experience with trading bots before this. The quiz matched me with the right tier and my partner\u2019s guidance was invaluable.',
    rating: 4,
    avatar: 'JM',
  },
  {
    name: 'Robert T.',
    role: 'Retired Engineer',
    quote: "The university content helped me understand the ecosystem before committing anything. Knowledge first \u2014 that\u2019s the right approach.",
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
        <svg key={i} className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
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
    <section className="relative overflow-hidden border-t border-white/5 bg-[#06122f] px-6 py-20 lg:px-10">
      {/* Background glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Trusted by Members
          </span>
          <h2 className="mt-4 font-[var(--font-sora)] text-3xl font-bold text-white sm:text-4xl">
            Real People. Real Results.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100/50">
            Hear from members who went through the same onboarding process you&apos;re about to start.
          </p>
        </div>

        {/* Live activity ticker */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activityIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm text-emerald-300/80"
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
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
            >
              <StarRating rating={testimonials[activeIndex].rating} />
              <p className="mt-4 text-lg leading-relaxed text-white/80 italic">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-white/40">{testimonials[activeIndex].role}</div>
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
                  i === activeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '2,400+', label: 'Members Onboarded' },
            { value: '94%', label: 'Completion Rate' },
            { value: '< 24h', label: 'Avg. Partner Response' },
            { value: '4.8/5', label: 'Member Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[var(--font-sora)] text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
