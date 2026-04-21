'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Products',    href: '/products' },
  { label: 'University',  href: '/university' },
  { label: 'Blog',        href: '/blog' },
  { label: 'FAQs',        href: '/faqs' },
  { label: 'Media',       href: '/media' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'center', height: '4.5rem', gap: '2rem' }}>

            {/* ── Logo ── */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                background: '#1b61c9',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>A</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.0625rem',
                color: '#181d26',
                letterSpacing: '-0.01em',
              }}>
                AutoPilot<span style={{ color: '#1b61c9' }}>ROI</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              flex: 1,
              justifyContent: 'center',
            }} className="hidden md:flex">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '0.5rem 0.875rem',
                    borderRadius: '0.625rem',
                    fontSize: 'var(--text-body)',
                    fontWeight: 500,
                    color: 'rgba(24,29,38,0.68)',
                    textDecoration: 'none',
                    transition: 'color 150ms ease, background 150ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = '#181d26'
                    ;(e.target as HTMLElement).style.background = '#f0f2f6'
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'rgba(24,29,38,0.68)'
                    ;(e.target as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Desktop CTAs ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
              className="hidden md:flex">
              <Link href="/login" style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                fontSize: 'var(--text-body)',
                fontWeight: 600,
                color: 'rgba(24,29,38,0.72)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}>
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary" style={{ padding: '0.5625rem 1.25rem', fontSize: 'var(--text-body)' }}>
                Start Here
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden"
              style={{
                marginLeft: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(o => !o)}
            >
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: '#181d26', borderRadius: '2px',
                transition: 'transform 200ms ease, opacity 200ms ease',
                transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: '#181d26', borderRadius: '2px',
                transition: 'opacity 200ms ease',
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px',
                background: '#181d26', borderRadius: '2px',
                transition: 'transform 200ms ease, opacity 200ms ease',
                transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }} />
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile overlay menu ── */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: '#ffffff',
          padding: '5.5rem 1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          overflowY: 'auto',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '1rem 1.25rem',
                borderRadius: '0.875rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#181d26',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                background: '#f8fafc',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="btn btn-outline"
              style={{ justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
              Log in
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
              Start Here →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
