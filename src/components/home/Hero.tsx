import Link from 'next/link'

const TRUST_POINTS = [
  'Start with $100 USDT',
  'AI trades 24/7 — you sleep',
  'Setup complete in 3 days',
] as const

export default function Hero() {
  return (
    <section
      className="section"
      style={{
        paddingTop: 'clamp(4rem, 12vw, 10rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      }}
    >
      <div className="container-content" style={{ maxWidth: '56rem' }}>
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="badge">✦ Powered by Aurum Ecosystem</span>
        </div>

        {/* Headline */}
        <h1 className="text-hero text-center" style={{ marginBottom: '1.5rem' }}>
          Your Money,
          <br />
          <span style={{ color: 'var(--color-accent)' }}>Working 24/7</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-body-lg text-center mx-auto"
          style={{
            maxWidth: '38rem',
            color: 'var(--color-fg-muted)',
            marginBottom: '2.5rem',
          }}
        >
          Start earning with $100 USDT. AutoPilotROI guides you into the Aurum
          ecosystem step by step — AI trading bot, Visa crypto card, exchange,
          and Web3 neobank. No experience needed.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Start Here →
          </Link>
          <Link href="#how-it-works" className="btn btn-ghost btn-lg">
            See how it works
          </Link>
        </div>

        {/* Trust points */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_POINTS.map((point) => (
            <span
              key={point}
              className="text-caption inline-flex items-center gap-2"
              style={{ color: 'var(--color-fg-muted)' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="8" fill="var(--color-accent-light)" />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
