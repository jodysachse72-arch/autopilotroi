'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Product Suite', href: '#product-suite' },
  { label: 'Blog', href: '/media' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/resources' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08205b]/55 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.8rem] max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#dbeafe_0%,#60a5fa_55%,#1d4ed8_100%)] shadow-[0_0_20px_rgba(96,165,250,0.35)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none text-slate-950" aria-hidden="true">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M7.5 13.5c1.6-2.8 4.2-4.2 7.8-4.2 1.1 0 2.1.1 3.2.4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <path
                d="m14.8 7.8 3.9 1.9-2.2 3.7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <span className="font-[var(--font-sora)] text-[1.7rem] font-semibold tracking-[-0.06em]">
            <span className="text-white">Autopilot</span>
            <span className="text-blue-300">ROI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-base font-medium transition hover:text-white ${
                pathname === item.href ? 'text-white' : 'text-blue-50/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex lg:hidden items-center justify-center h-10 w-10 rounded-xl border border-white/15 bg-white/8 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current strokeWidth-2" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#08205b]/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                  pathname === item.href
                    ? 'bg-white/12 text-white'
                    : 'text-blue-50/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/start"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-xl bg-blue-600 px-4 py-3 text-center text-base font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
