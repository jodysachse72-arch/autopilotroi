'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "I was skeptical at first but my partner walked me through every step. Had my bot running in 2 days and already seeing consistent daily returns.",
    author: 'Marcus T.',
    role: 'Member since March 2025',
  },
  {
    quote: "The guided onboarding made all the difference. Never dealt with crypto before — now I have an active portfolio and the bot handles everything.",
    author: 'Sandra K.',
    role: 'Member since January 2025',
  },
  {
    quote: "What I appreciate most is the transparency. Everything is documented, every step is explained. This isn't some black box — you understand exactly what's happening.",
    author: 'David R.',
    role: 'Partner & Member',
  },
] as const

const AI_FINANCE_TESTIMONIALS = [
  { quote: 'I could understand the opportunity before choosing a platform. The process helped me compare the right things instead of chasing hype.', author: 'Designed for clarity', role: 'Understand before connecting' },
  { quote: 'The guided setup turned a complicated financial decision into a sequence of small, understandable steps.', author: 'Designed for confidence', role: 'Guidance at every step' },
  { quote: 'The experience stays consistent even when the underlying provider changes. I can focus on goals, risk, and results.', author: 'Designed for flexibility', role: 'No platform lock-in' },
] as const

export default function Testimonials({ variant = 'aurum' }: { variant?: 'aurum' | 'ai-finance' }) {
  const testimonials = variant === 'ai-finance' ? AI_FINANCE_TESTIMONIALS : TESTIMONIALS
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%)',
        borderRadius: 'var(--radius-section, 1.125rem)',
        overflow: 'hidden',
        position: 'relative',
        margin: '0',
      }}
    >
      {/* Atmospheric overlay — matches hero energy */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', left: '20%', top: '-20%',
          width: '50vmax', height: '50vmax', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,97,201,0.25) 0%, transparent 55%)',
        }} />
        <div style={{
          position: 'absolute', right: '-10%', bottom: '-20%',
          width: '40vmax', height: '40vmax', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 50%)',
        }} />
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.02,
          mixBlendMode: 'overlay' as const,
        }} />
      </div>

      <div
        className="container-content"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
        }}
      >
        {/* Header */}
        <div className="text-center" style={{ maxWidth: '36rem', margin: '0 auto 3.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '99px',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.08)',
              padding: '0.375rem 0.875rem',
              fontSize: 'var(--text-caption)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: 'var(--ls-wide)',
              color: 'rgba(255,255,255,0.72)',
              marginBottom: '1.25rem',
            }}
          >
            {variant === 'ai-finance' ? 'A Better Experience' : 'Members Speak'}
          </span>
          <h2 className="text-display" style={{ color: '#ffffff' }}>
            {variant === 'ai-finance' ? 'Clear choices.' : 'Real people.'}
            <br />
            {variant === 'ai-finance' ? 'Confident next steps.' : 'Real returns.'}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="rounded-xl flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" style={{ color: '#fbbf24' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0l2.47 4.99L16 5.81l-4 3.9.94 5.49L8 12.49l-4.94 2.7L4 9.71 0 5.81l5.53-.82L8 0z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="text-body flex-1"
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '1rem',
                }}
              >
                <p className="text-caption font-semibold" style={{ color: '#ffffff', marginBottom: '0.125rem' }}>
                  {t.author}
                </p>
                <p className="text-caption" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
