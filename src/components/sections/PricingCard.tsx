import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   PricingCard — fintech-grade offer/investment tier card.
   Two variants:
     standard: white card, subtle border, brand accent CTA
     featured: brand-blue gradient border glow, elevated shadow
   Matches the site's existing light-mode design system.
   ═══════════════════════════════════════════════════════════════ */

export interface PricingFeature {
  text: string
}

export interface PricingCardProps {
  planName: string
  planTagline?: string
  priceDisplay: string
  features?: PricingFeature[]
  ctaLabel: string
  ctaHref: string
  badge?: string
  variant?: 'standard' | 'featured'
}

const CHECKMARK = (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ flexShrink: 0, marginTop: '2px' }}
    aria-hidden
  >
    <circle cx="8" cy="8" r="8" fill="rgba(27,97,201,0.10)" />
    <path
      d="M5 8l2.3 2.3L11 5.5"
      stroke="#1b61c9"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CHECKMARK_FEATURED = (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ flexShrink: 0, marginTop: '2px' }}
    aria-hidden
  >
    <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.15)" />
    <path
      d="M5 8l2.3 2.3L11 5.5"
      stroke="rgba(255,255,255,0.90)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function PricingCard({
  planName,
  planTagline,
  priceDisplay,
  features = [],
  ctaLabel,
  ctaHref,
  badge,
  variant = 'standard',
}: PricingCardProps) {
  if (!planName && !priceDisplay) return null

  const isFeatured = variant === 'featured'

  // ── Featured card — brand blue gradient ─────────────────────
  if (isFeatured) {
    return (
      <div
        className="reveal"
        style={{
          position: 'relative',
          borderRadius: '1.25rem',
          padding: '2px',
          background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 50%, #0c3d8a 100%)',
          boxShadow: '0 20px 60px rgba(27,97,201,0.35)',
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              position: 'absolute',
              top: '-0.875rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.3rem 1rem',
              borderRadius: '99px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(245,158,11,0.40)',
            }}
          >
            {badge}
          </div>
        )}

        {/* Inner card */}
        <div
          style={{
            background: 'linear-gradient(160deg, #1b3a7a 0%, #0f2354 100%)',
            borderRadius: 'calc(1.25rem - 2px)',
            padding: '2rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Plan name */}
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(147,197,253,0.80)',
              fontFamily: 'var(--font-display)',
              marginBottom: '0.5rem',
            }}
          >
            {planName}
          </div>

          {/* Price */}
          <div
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
            }}
          >
            {priceDisplay || '—'}
          </div>

          {/* Tagline */}
          {planTagline && (
            <div
              style={{
                fontSize: 'var(--text-body)',
                color: 'rgba(255,255,255,0.60)',
                marginTop: '0.5rem',
                lineHeight: 1.5,
              }}
            >
              {planTagline}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.12)',
              margin: '1.5rem 0',
            }}
          />

          {/* Features */}
          {features.length > 0 && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                flexGrow: 1,
              }}
            >
              {features.slice(0, 8).map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    fontSize: 'var(--text-body)',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  {CHECKMARK_FEATURED}
                  {f.text}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {ctaHref && ctaLabel && (
            <Link
              href={ctaHref}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                color: '#ffffff',
                padding: '0.9rem 1.5rem',
                borderRadius: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                boxShadow: '0 6px 20px rgba(27,97,201,0.45)',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    )
  }

  // ── Standard card ────────────────────────────────────────────
  return (
    <div
      className="reveal"
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid rgba(24,29,38,0.08)',
        borderRadius: '1.25rem',
        padding: '2rem 1.75rem',
        boxShadow: '0 4px 24px rgba(24,29,38,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '-0.875rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(27,97,201,0.10)',
            color: '#1b61c9',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0.3rem 1rem',
            borderRadius: '99px',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(27,97,201,0.18)',
          }}
        >
          {badge}
        </div>
      )}

      {/* Plan name */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#1b61c9',
          fontFamily: 'var(--font-display)',
          marginBottom: '0.5rem',
        }}
      >
        {planName}
      </div>

      {/* Price */}
      <div
        style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          color: '#181d26',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          fontFamily: 'var(--font-display)',
        }}
      >
        {priceDisplay || '—'}
      </div>

      {/* Tagline */}
      {planTagline && (
        <div
          style={{
            fontSize: 'var(--text-body)',
            color: 'rgba(24,29,38,0.55)',
            marginTop: '0.5rem',
            lineHeight: 1.5,
          }}
        >
          {planTagline}
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(24,29,38,0.07)',
          margin: '1.5rem 0',
        }}
      />

      {/* Features */}
      {features.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            flexGrow: 1,
          }}
        >
          {features.slice(0, 8).map((f, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                fontSize: 'var(--text-body)',
                color: 'rgba(24,29,38,0.80)',
                lineHeight: 1.5,
              }}
            >
              {CHECKMARK}
              {f.text}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            background: 'rgba(27,97,201,0.06)',
            color: '#1b61c9',
            padding: '0.9rem 1.5rem',
            borderRadius: '0.75rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            border: '1.5px solid rgba(27,97,201,0.20)',
            transition: 'background 150ms ease, border-color 150ms ease',
            marginTop: 'auto',
          }}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
