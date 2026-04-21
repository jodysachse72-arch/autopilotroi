import Link from 'next/link'
import { LogoIcon } from '@/components/ui/Logo'

const FOOTER_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Products',    href: '/products' },
      { label: 'University',  href: '/university' },
      { label: 'Calculator',  href: '/calculator' },
      { label: 'Media',       href: '/media' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQs',          href: '/faqs' },
      { label: 'Blog',          href: '/blog' },
      { label: 'Onboarding',    href: '/onboarding' },
      { label: 'Partner Tools', href: '/partner-tools' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use',   href: '/terms' },
      { label: 'Disclaimer',     href: '/disclaimer' },
    ],
  },
]

/* ── Inline styles only (server component) ── */
const linkStyle: React.CSSProperties = {
  fontSize: 'var(--text-body)',
  color: 'rgba(255,255,255,0.58)',
  textDecoration: 'none',
  display: 'block',
  padding: '0.125rem 0',
  transition: 'color 150ms ease',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#181d26', color: '#ffffff' }}>
      <style>{`
        .footer-link:hover { color: #ffffff !important; }
      `}</style>

      <div className="container-xl" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand col */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <LogoIcon size={28} />
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '1.0625rem', color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>
                AutoPilot<span style={{ color: '#60a5fa' }}>ROI</span>
              </span>
            </Link>
            <p style={{
              fontSize: 'var(--text-caption)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.65,
              maxWidth: '18rem',
            }}>
              The structured onboarding platform for AI-managed finance. Trading bots, crypto cards, exchange, and a Web3 neobank.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontSize: 'var(--text-caption)',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                marginBottom: '1rem',
              }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link" style={linkStyle}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.32)' }}>
            © {year} AutoPilotROI. All rights reserved. Not financial advice.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {(['/privacy', '/terms', '/disclaimer'] as const).map((href, i) => (
              <Link key={href} href={href} className="footer-link" style={{ fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>
                {['Privacy', 'Terms', 'Disclaimer'][i]}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
