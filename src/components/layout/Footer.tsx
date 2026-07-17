'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

const FOOTER_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Calculator', href: '/calculator' },
      { label: 'University', href: '/university' },
      { label: 'Media', href: '/media' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQs', href: '/faqs' },
      { label: 'Start Guide', href: '/start' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
] as const

export default function Footer() {
  const pathname = usePathname()
  const isAiFinance = pathname.startsWith('/ai-finance')
  return (
    <footer
      className="section"
      style={{ backgroundColor: 'var(--color-fg)', color: 'rgba(255,255,255,0.6)' }}
    >
      <div className="container-content">
        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="AutoPilotROI Home" className="inline-block mb-4">
              <Logo size={32} showText textColorClass="text-white" />
            </Link>
            <p className="text-caption" style={{ maxWidth: '20rem', lineHeight: 'var(--lh-relaxed)' }}>
              {isAiFinance
                ? 'A platform-agnostic, guided experience for exploring AI-managed finance. Not a financial advisor.'
                : 'Independent onboarding platform for the Aurum AI ecosystem. Not a financial advisor.'}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-caption font-semibold mb-4"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-caption"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p>&copy; {new Date().getFullYear()} AutoPilotROI. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.3)' }}>
            {isAiFinance
              ? 'Independent platform · Provider-agnostic by design'
              : <>Independent platform &middot; Not affiliated with Aurum Foundation</>}
          </p>
        </div>
      </div>
    </footer>
  )
}
