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
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2rem', height: '2rem',
                background: '#1b61c9', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: 800, color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>A</span>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '1.0625rem', color: '#181d26', letterSpacing: '-0.01em',
              }}>
                AutoPilot<span style={{ color: '#1b61c9' }}>ROI</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              flex: 1, justifyContent: 'center',
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
              <Link href="/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                color: '#ffffff',
                padding: '0.625rem 1.375rem',
                borderRadius: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(27,97,201,0.40), 0 1px 4px rgba(27,97,201,0.25)',
                transition: 'box-shadow 150ms ease, transform 150ms ease',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}>
                Start Here →
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

      {/* ── Mobile overlay menu — premium dark brand design ── */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'linear-gradient(160deg, #060e28 0%, #0d1d60 60%, #0a1840 100%)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}>
          {/* Top bar: logo + close */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
          }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2rem', height: '2rem',
                background: '#2563eb', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: 800, color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>A</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.0625rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                AutoPilot<span style={{ color: '#60a5fa' }}>ROI</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: '#ffffff', fontSize: '1.125rem', cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav links */}
          <div style={{ flex: 1, padding: '0.75rem 1.5rem' }}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.125rem 0',
                  borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  fontSize: '1.1875rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.88)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
                <span style={{ color: 'rgba(255,255,255,0.30)', fontSize: '1rem' }}>→</span>
              </Link>
            ))}
          </div>

          {/* CTA buttons at bottom */}
          <div style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            <Link href="/login" onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '0.9375rem', borderRadius: '0.875rem',
                fontSize: '1.0625rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}>
              Log in
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '0.9375rem', borderRadius: '0.875rem',
                fontSize: '1.0625rem', fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                boxShadow: '0 6px 24px rgba(27,97,201,0.55)',
                letterSpacing: '0.01em',
              }}>
              Start Here →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
