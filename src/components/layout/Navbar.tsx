'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Start Here', href: '/start' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'FAQs', href: '/faqs' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        height: '5rem',
        backgroundColor: scrolled ? 'rgba(250,249,246,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="container-content flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="AutoPilotROI Home">
          <Logo size={36} showText textColorClass="text-[#121212]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-caption font-medium transition-colors hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-fg-muted)', fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/signup" className="btn btn-primary btn-md">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-12 h-12 rounded-xl transition-colors"
          style={{ backgroundColor: menuOpen ? 'var(--color-surface-alt)' : 'transparent' }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-0.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-fg)',
              transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-0.5 rounded-full mt-1.5 transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-fg)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 rounded-full mt-1.5 transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-fg)',
              transform: menuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[5rem] z-40 md:hidden"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <nav className="container-content flex flex-col gap-2 pt-8" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-heading py-3 transition-colors hover:text-[var(--color-accent)]"
                style={{ fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--color-border)' }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary btn-lg w-full"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
