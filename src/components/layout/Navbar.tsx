'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'

/* ═══════════════════════════════════════════════════════════════
   AutopilotROI V3 (2.0A) — Public Navbar
   Barry's nav spec: HOME | FAQs | START▼ | RESOURCES▼ | CONTACT
   Desktop: hover dropdowns · Mobile: accordion sections
   ═══════════════════════════════════════════════════════════════ */

type NavDropItem = { label: string; href: string }
type NavItem = {
  id: string
  label: string
  href: string
  dropdown?: NavDropItem[]
}

const PUBLIC_NAV: NavItem[] = [
  { id: 'home',      label: 'Home',      href: '/' },
  { id: 'faqs',      label: 'FAQs',      href: '/faqs' },
  {
    id: 'start',
    label: 'Start',
    href: '#',
    dropdown: [
      { label: 'Onboarding Guide', href: '/onboarding' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '#',
    dropdown: [
      { label: 'Executive Summary', href: '/summary'    },
      { label: 'Media',             href: '/media'      },
      { label: 'Aurum University',  href: '/university' },
    ],
  },
  { id: 'contact',   label: 'Contact',   href: '/contact' },
]

export default function Navbar() {
  const [menuOpen,         setMenuOpen]         = useState(false)
  const [scrolled,         setScrolled]         = useState(false)
  const [openNavDropdown,  setOpenNavDropdown]   = useState<string | null>(null)
  const [openMobileSects,  setOpenMobileSects]   = useState<Set<string>>(new Set())
  const pathname = usePathname()
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll shadow ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close menu + dropdowns on route change ─────────────────────
  useEffect(() => {
    setMenuOpen(false)
    setOpenNavDropdown(null)
    setOpenMobileSects(new Set())
  }, [pathname])

  // ── Route exclusions — hide on admin/dashboard pages ──────────
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/orientation') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup')
  ) return null

  // ── Dropdown hover helpers (with a small delay so the user can
  //    move the cursor from the label to the dropdown panel) ───────
  function handleNavEnter(id: string) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setOpenNavDropdown(id)
  }

  function handleNavLeave() {
    closeTimerRef.current = setTimeout(() => setOpenNavDropdown(null), 120)
  }

  // ── Mobile accordion toggle ────────────────────────────────────
  function toggleMobile(id: string) {
    setOpenMobileSects(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    (item.dropdown?.some(d => pathname === d.href) ?? false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: scrolled ? '1px solid #e0e2e6' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.07)' : 'none',
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      <div className="container-xl">
        <div style={{ display: 'flex', alignItems: 'center', height: '4.5rem', gap: '1.5rem' }}>

          {/* ── Logo ────────────────────────────────────────────── */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}
          >
            <LogoIcon size={32} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.0625rem',
              color: '#181d26',
              letterSpacing: '-0.02em',
            }}>
              Autopilot<span style={{ color: '#1b61c9' }}>ROI</span>
            </span>
          </Link>

          {/* ── Desktop nav ─────────────────────────────────────── */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1, justifyContent: 'center' }}
            className="hidden lg:flex"
            aria-label="Main navigation"
          >
            {PUBLIC_NAV.map(item => {
              const active  = isActive(item)
              const hasMenu = !!(item.dropdown?.length)
              const isOpen  = openNavDropdown === item.id

              return (
                <div
                  key={item.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => hasMenu ? handleNavEnter(item.id) : undefined}
                  onMouseLeave={() => hasMenu ? handleNavLeave() : undefined}
                >
                  {hasMenu ? (
                    /* Dropdown trigger button */
                    <button
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.4375rem 0.875rem',
                        borderRadius: '0.625rem',
                        fontSize: 'var(--text-body)',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#1b61c9' : 'rgba(24,29,38,0.65)',
                        background: active ? 'rgba(27,97,201,0.07)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        transition: 'color 150ms ease, background 150ms ease',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = '#181d26'
                          ;(e.currentTarget as HTMLElement).style.background = '#f1f5f9'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = 'rgba(24,29,38,0.65)'
                          ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                        }
                      }}
                    >
                      {item.label}
                      <svg
                        style={{
                          width: '0.75rem', height: '0.75rem',
                          transition: 'transform 160ms ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: 'rgba(24,29,38,0.40)',
                        }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    /* Regular nav link */
                    <Link
                      href={item.href}
                      style={{
                        padding: '0.4375rem 0.875rem',
                        borderRadius: '0.625rem',
                        fontSize: 'var(--text-body)',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#1b61c9' : 'rgba(24,29,38,0.65)',
                        textDecoration: 'none',
                        background: active ? 'rgba(27,97,201,0.07)' : 'transparent',
                        display: 'block',
                        transition: 'color 150ms ease, background 150ms ease',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = '#181d26'
                          ;(e.currentTarget as HTMLElement).style.background = '#f1f5f9'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = 'rgba(24,29,38,0.65)'
                          ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Desktop Dropdown Panel */}
                  {hasMenu && isOpen && (
                    <div
                      onMouseEnter={() => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current) }}
                      onMouseLeave={() => handleNavLeave()}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.375rem)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        minWidth: '13rem',
                        background: '#ffffff',
                        border: '1px solid #e0e2e6',
                        borderRadius: '0.875rem',
                        padding: '0.375rem',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                        animation: 'fadeDown 0.12s ease-out',
                        zIndex: 200,
                      }}
                    >
                      {item.dropdown!.map(d => (
                        <Link
                          key={d.href}
                          href={d.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            padding: '0.6875rem 0.875rem',
                            borderRadius: '0.625rem',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: '#181d26',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-display)',
                            transition: 'background 140ms ease, color 140ms ease',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#f0f4ff'
                            ;(e.currentTarget as HTMLElement).style.color = '#1b61c9'
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent'
                            ;(e.currentTarget as HTMLElement).style.color = '#181d26'
                          }}
                        >
                          <svg style={{ width: '0.75rem', height: '0.75rem', color: '#1b61c9', flexShrink: 0 }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* ── Desktop CTA ─────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
            className="hidden lg:flex">
            <Link
              href="/status"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.625rem 1.375rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(27,97,201,0.38), 0 1px 4px rgba(27,97,201,0.22)',
                transition: 'box-shadow 150ms ease, transform 150ms ease',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(27,97,201,0.48)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(27,97,201,0.38), 0 1px 4px rgba(27,97,201,0.22)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              Check My Readiness →
            </Link>
          </div>

          {/* ── Mobile hamburger ────────────────────────────────── */}
          <button
            className="flex lg:hidden"
            style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.25rem', height: '2.25rem',
              borderRadius: '0.625rem',
              border: '1.5px solid #e0e2e6',
              background: '#ffffff',
              cursor: 'pointer',
              color: '#181d26',
            }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" style={{ width: '1.125rem', height: '1.125rem' }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" style={{ width: '1.125rem', height: '1.125rem' }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      {menuOpen && (
        <nav
          className="lg:hidden"
          style={{
            borderTop: '1px solid #e0e2e6',
            background: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}
          aria-label="Mobile navigation"
        >
          <div style={{ padding: '0.75rem 1rem 1rem' }}>

            {PUBLIC_NAV.map(item => {
              const active       = isActive(item)
              const hasMenu      = !!(item.dropdown?.length)
              const mobileIsOpen = openMobileSects.has(item.id)

              if (!hasMenu) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem 0.875rem',
                      borderRadius: '0.625rem',
                      fontSize: '1rem', fontWeight: active ? 600 : 500,
                      color: active ? '#1b61c9' : '#181d26',
                      background: active ? 'rgba(27,97,201,0.07)' : 'transparent',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '0.125rem',
                    }}
                  >
                    {item.label}
                    <svg style={{ width: '0.875rem', height: '0.875rem', color: 'rgba(24,29,38,0.30)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )
              }

              // Dropdown accordion item
              return (
                <div key={item.id} style={{ marginBottom: '0.125rem' }}>
                  <button
                    onClick={() => toggleMobile(item.id)}
                    aria-expanded={mobileIsOpen}
                    style={{
                      display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem 0.875rem',
                      borderRadius: '0.625rem',
                      fontSize: '1rem', fontWeight: active ? 600 : 500,
                      color: active ? '#1b61c9' : '#181d26',
                      background: active || mobileIsOpen ? 'rgba(27,97,201,0.06)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      textAlign: 'left',
                    }}
                  >
                    {item.label}
                    <svg
                      style={{
                        width: '0.875rem', height: '0.875rem',
                        color: 'rgba(24,29,38,0.40)',
                        transition: 'transform 160ms ease',
                        transform: mobileIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileIsOpen && (
                    <div style={{
                      padding: '0.25rem 0 0.25rem 1rem',
                      marginBottom: '0.25rem',
                    }}>
                      {item.dropdown!.map(d => (
                        <Link
                          key={d.href}
                          href={d.href}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.9375rem', fontWeight: 500,
                            color: '#1b61c9',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          <svg style={{ width: '0.6875rem', height: '0.6875rem', flexShrink: 0 }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Mobile CTA */}
            <div style={{ borderTop: '1px solid #e0e2e6', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
              <Link
                href="/status"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem', fontWeight: 700, color: '#ffffff',
                  textDecoration: 'none', fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                  boxShadow: '0 4px 16px rgba(27,97,201,0.38)',
                  letterSpacing: '0.01em',
                }}
              >
                Check My Readiness →
              </Link>
            </div>

          </div>
        </nav>
      )}
    </header>
  )
}
