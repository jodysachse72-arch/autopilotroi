'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   NAV STRUCTURE — per Barry's review comment
   HOME  |  FAQs  |  *START  |  *RESOURCES  |  CONTACT
   * = dropdown menu
   ═══════════════════════════════════════════════════════════════ */

type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] }

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'FAQs', href: '/faqs' },
  {
    label: 'Start',
    children: [
      { label: 'Onboarding Guide', href: '/start' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Executive Summary', href: '/summary' },
      { label: 'Blog', href: '/blog' },
      { label: 'Media', href: '/media' },
      { label: 'Aurum University', href: '/university' },
      { label: 'EX AI – Calculator', href: '/calculator' },
    ],
  },
  { label: 'Contact', href: '/signup' },
] as const

/* ── Dropdown component ── */
function NavDropdown({ label, children }: { label: string; children: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="nav-link inline-flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 pt-2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="nav-dropdown-panel"
            role="menu"
          >
            {children.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="nav-dropdown-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

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
          {NAV_ITEMS.map((item) =>
            'children' in item ? (
              <NavDropdown key={item.label} label={item.label} children={item.children} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            )
          )}
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
            {NAV_ITEMS.map((item) =>
              'children' in item ? (
                <div key={item.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between text-heading py-3 transition-colors hover:text-[var(--color-accent)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.label}
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 10 6"
                      fill="none"
                      className="transition-transform duration-200"
                      style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="flex flex-col gap-1 pb-3 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="py-2 text-body-lg transition-colors hover:text-[var(--color-accent)]"
                          style={{ color: 'var(--color-fg-muted)', fontFamily: 'var(--font-display)' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-heading py-3 transition-colors hover:text-[var(--color-accent)]"
                  style={{ fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--color-border)' }}
                >
                  {item.label}
                </Link>
              )
            )}
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
