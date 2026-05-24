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

export default function Testimonials() {
  return (
    <section
      className="section section-dark"
      style={{
        background: 'linear-gradient(135deg, #121212 0%, #1a1a2e 50%, #0f172a 100%)',
      }}
    >
      <div className="container-content">
        <div className="text-center mb-16" style={{ maxWidth: '36rem', margin: '0 auto 4rem' }}>
          <span className="badge badge-dark mb-4 inline-flex">Members Speak</span>
          <h2 className="text-display" style={{ color: '#ffffff' }}>
            Real people.
            <br />
            Real returns.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-xl p-8 flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5" style={{ color: '#fbbf24' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0l2.47 4.99L16 5.81l-4 3.9.94 5.49L8 12.49l-4.94 2.7L4 9.71 0 5.81l5.53-.82L8 0z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="text-body flex-1 mb-6"
                style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 'var(--lh-relaxed)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div>
                <p className="text-caption font-semibold" style={{ color: '#ffffff' }}>
                  {t.author}
                </p>
                <p className="text-caption" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
