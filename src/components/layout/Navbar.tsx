'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   NAV STRUCTURE
   HOME  |  FAQs  |  *START  |  *RESOURCES  |  CONTACT
   * = dropdown menu

   Mobile menu is architected with labeled sections so future
   auth/admin/partner groups slot in without restructuring.
   ═══════════════════════════════════════════════════════════════ */

type NavLink = { label: string; href: string; description?: string }
type NavGroup = { label: string; children: NavLink[] }
type NavItem = NavLink | NavGroup

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'FAQs', href: '/faqs' },
  {
    label: 'Start',
    children: [
      { label: 'Sign Up', href: '/signup', description: 'Begin your readiness assessment' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Executive Summary', href: '/summary', description: 'Platform overview' },
      { label: 'Blog', href: '/blog', description: 'News & updates' },
      { label: 'Media', href: '/media', description: 'Videos & press' },
      { label: 'Aurum University', href: '/university', description: 'Learn the ecosystem' },
      { label: 'EX AI – Calculator', href: '/calculator', description: 'Estimate your returns' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

const AI_FINANCE_NAV_ITEMS: NavItem[] = [
  { label: 'AI Finance', href: '/ai-finance' },
  { label: 'How It Works', href: '/ai-finance#how-it-works' },
  { label: 'Contact', href: '/contact' },
]

function isGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

/* ── Chevron icon ── */
function Chevron({ open, size = 10 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 10 6"
      fill="none"
      className="transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Desktop dropdown ── */
function NavDropdown({ label, children }: NavGroup) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="nav-link inline-flex items-center gap-1.5"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 pt-2" style={{ transform: 'translateX(-50%)' }}>
          <div className="nav-dropdown-panel" role="menu">
            {children.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="nav-dropdown-item"
              >
                <span className="nav-dropdown-item-label">{item.label}</span>
                {item.description && (
                  <span className="nav-dropdown-item-desc">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   MOBILE MENU — full-screen overlay with section architecture.
   Designed to scale with future auth/admin/partner sections.
   ════════════════════════════════════════════════════════════════ */
function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: NavItem[]
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="mobile-menu-overlay">
      {/* ── Scrollable content ── */}
      <div className="mobile-menu-scroll">

        {/* ── Section: Navigation ── */}
        <div className="mobile-menu-section">
          <span className="mobile-menu-section-label">Navigation</span>

          {items.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className="mobile-menu-group">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="mobile-menu-link mobile-menu-link--parent"
                >
                  <span>{item.label}</span>
                  <Chevron open={expanded === item.label} size={12} />
                </button>

                {expanded === item.label && (
                  <div className="mobile-menu-children">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="mobile-menu-child"
                      >
                        <span className="mobile-menu-child-label">{child.label}</span>
                        {child.description && (
                          <span className="mobile-menu-child-desc">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="mobile-menu-link"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* ── Section: Future auth section placeholder ──
            When auth is added, insert here:
            {user && (
              <div className="mobile-menu-section">
                <span className="mobile-menu-section-label">Account</span>
                ...dashboard, settings, logout...
              </div>
            )}
        ── */}

        {/* ── CTA block ── */}
        <div className="mobile-menu-cta">
          <Link href="/signup" onClick={onClose} className="btn btn-primary btn-lg w-full">
            Get Started
          </Link>
          <p className="mobile-menu-cta-sub">
            Free onboarding · No commitment
          </p>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   NAVBAR ROOT
   ════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname()
  const isAiFinance = pathname.startsWith('/ai-finance')
  const navItems = isAiFinance ? AI_FINANCE_NAV_ITEMS : NAV_ITEMS
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <Link href={isAiFinance ? '/ai-finance' : '/'} aria-label="AutoPilotROI Home">
          <Logo size={36} showText textColorClass="text-[#121212]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) =>
            isGroup(item) ? (
              <NavDropdown key={item.label} {...item} />
            ) : (
              <Link key={item.href} href={item.href} className="nav-link">
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

        {/* Mobile hamburger — clean 3-line icon */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-hamburger md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="mobile-hamburger-bar"
            style={{
              transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="mobile-hamburger-bar"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
            }}
          />
          <span
            className="mobile-hamburger-bar"
            style={{
              transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={navItems} />
    </header>
  )
}
