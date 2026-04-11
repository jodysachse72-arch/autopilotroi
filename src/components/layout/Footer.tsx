import Link from 'next/link'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Summary', href: '/summary' },
  { label: 'Media', href: '/media' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Resources', href: '/resources' },
  { label: 'Get Started', href: '/start' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06122f]/80 px-6 py-10 text-blue-50/70 backdrop-blur-xl lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="font-[var(--font-sora)] text-xl font-semibold tracking-[-0.05em] text-white">
              <span className="text-white">Autopilot</span>
              <span className="text-blue-300">ROI</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-blue-50/60">
              The structured onboarding platform for Aurum Foundation — educating, guiding, and
              supporting every new member.
            </p>
            <p className="mt-4 text-xs text-blue-50/40">
              © 2026 Team AutoPilot ROI · Powered by Aurum Foundation
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-blue-50/35">
          AutoPilot ROI is an independent onboarding team for Aurum Foundation. This site is not
          financial advice. All investment carries risk. Never invest more than you can afford to
          lose.
        </div>
      </div>
    </footer>
  )
}
