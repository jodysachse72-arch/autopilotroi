'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Product Suite', href: '/products' },
  { label: 'University', href: '/university' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Earnings Disclaimer', href: '/disclaimer' },
]

const quickLinks = [
  { label: 'Calculator', href: '/calculator' },
  { label: 'Trust Checker', href: '/evaluate' },
  { label: 'Media Kit', href: '/media' },
  { label: 'Partner Summary', href: '/summary' },
]

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: '#ffffff', borderTopColor: '#e0e2e6' }}
    >
      <div className="container pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size={32} showText textColorClass="text-[#181d26]" />
            <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(4, 14, 32, 0.55)' }}>
              The structured onboarding platform for the Aurum ecosystem — educating, guiding, and
              supporting every new member on their path to AI-managed finance.
            </p>
            <Link href="/signup" className="btn-primary mt-6 inline-flex text-sm px-5 py-2.5">
              Get Started Free →
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: '#181d26' }}>
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: '#181d26' }}>
              Tools
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: '#181d26' }}>
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 space-y-4" style={{ borderTop: '1px solid #e0e2e6' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(4, 14, 32, 0.62)' }}>
            <strong style={{ color: 'rgba(4, 14, 32, 0.75)' }}>Risk Disclaimer:</strong>{' '}
            AutoPilot ROI is an independent onboarding platform. This site does not provide financial
            advice. All investments carry risk, including the risk of total loss. Returns referenced
            on this site are illustrative and not guaranteed. Never invest more than you can afford
            to lose. See our{' '}
            <Link href="/disclaimer" className="footer-link underline">
              full disclaimer
            </Link>{' '}
            for details.
          </p>
          <p className="text-xs" style={{ color: 'rgba(4, 14, 32, 0.50)' }}>
            © {new Date().getFullYear()} AutoPilot ROI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
