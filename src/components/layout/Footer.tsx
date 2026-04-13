import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Summary', href: '/summary' },
  { label: 'University', href: '/university' },
  { label: 'Media', href: '/media' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Earnings Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer data-dark className="border-t border-white/10 bg-[#06122f]/80 px-6 py-12 text-blue-50/70 backdrop-blur-xl lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Logo size={32} showText />
            <p className="mt-3 text-sm leading-7 text-blue-50/50">
              The structured onboarding platform for the Aurum ecosystem — educating, guiding, and
              supporting every new member.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">Navigate</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-blue-50/50 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & CTA */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">Legal</h3>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-blue-50/50 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started →
            </Link>
          </div>
        </div>

        {/* Risk Disclaimer + Copyright */}
        <div className="mt-10 space-y-4 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-blue-50/30">
            <strong className="text-blue-50/50">Risk Disclaimer:</strong> AutoPilot ROI is an
            independent onboarding platform. This site does not provide financial advice. All
            investments carry risk, including the risk of total loss. Returns referenced on this
            site are illustrative and not guaranteed. Never invest more than you can afford to lose.
            See our{' '}
            <Link href="/disclaimer" className="text-blue-400/60 underline hover:text-blue-400">
              full disclaimer
            </Link>{' '}
            for details.
          </p>
          <p className="text-xs text-blue-50/25">
            © {new Date().getFullYear()} AutoPilot ROI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
