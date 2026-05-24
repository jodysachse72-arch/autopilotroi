import Link from 'next/link'

interface PlanFeature {
  text: string
}

interface Plan {
  name: string
  tagline: string
  price: string
  features: PlanFeature[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'First-time investors testing the ecosystem.',
    price: '$100 USDT',
    features: [
      { text: 'EX-AI Bot activation' },
      { text: 'AI-managed 24/7 trading' },
      { text: 'Aurum University access' },
      { text: 'Partner support included' },
    ],
    ctaLabel: 'Start with $100 →',
    ctaHref: '/signup',
  },
  {
    name: 'Growth',
    tagline: 'Investors ready to maximize compounding returns.',
    price: '$500–$2,500',
    features: [
      { text: 'All Starter features' },
      { text: 'Higher compounding tier' },
      { text: 'Multi-exchange deployment' },
      { text: 'Priority partner access' },
      { text: 'Advanced dashboard analytics' },
    ],
    ctaLabel: 'Activate Growth →',
    ctaHref: '/signup',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Advanced',
    tagline: 'Full ecosystem access across all Aurum products.',
    price: '$2,500+',
    features: [
      { text: 'All Growth features' },
      { text: 'Visa Crypto Card (physical)' },
      { text: 'Neobank account access' },
      { text: 'Partner income eligibility' },
      { text: 'Dedicated onboarding specialist' },
    ],
    ctaLabel: 'Go Advanced →',
    ctaHref: '/signup',
  },
]

export default function Pricing() {
  return (
    <section className="section section-alt">
      <div className="container-content">
        <div className="text-center mb-16" style={{ maxWidth: '36rem', margin: '0 auto 4rem' }}>
          <span className="badge mb-4 inline-flex">Start Where You Are</span>
          <h2 className="text-display mb-4">
            Your entry point.
            <br />
            Your pace.
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            Every plan includes full AI bot access, guided onboarding, and partner support.
            Start with what you&apos;re comfortable with — scale when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl p-8 flex flex-col relative"
              style={{
                backgroundColor: plan.featured ? 'var(--color-fg)' : 'var(--color-surface)',
                color: plan.featured ? '#ffffff' : 'var(--color-fg)',
                border: plan.featured ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {plan.badge && (
                <span className="badge-featured absolute -top-3 left-8 text-caption px-3 py-1 rounded-full">
                  ⭐ {plan.badge}
                </span>
              )}

              <h3 className="text-subheading mb-2">{plan.name}</h3>
              <p
                className="text-caption mb-6"
                style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--color-fg-muted)' }}
              >
                {plan.tagline}
              </p>

              <p className="text-heading mb-8" style={{ fontWeight: 800 }}>
                {plan.price}
                <span
                  className="text-caption font-normal ml-2"
                  style={{ color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--color-fg-faint)' }}
                >
                  minimum
                </span>
              </p>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-body">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle
                        cx="9"
                        cy="9"
                        r="9"
                        fill={plan.featured ? 'rgba(255,255,255,0.1)' : 'var(--color-accent-light)'}
                      />
                      <path
                        d="M5.5 9l2.5 2.5 4.5-4.5"
                        stroke={plan.featured ? '#ffffff' : 'var(--color-accent)'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--color-fg-muted)' }}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`btn btn-lg w-full ${plan.featured ? 'btn-accent' : 'btn-ghost'}`}
                style={plan.featured ? { backgroundColor: 'var(--color-accent)', color: '#fff' } : {}}
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
