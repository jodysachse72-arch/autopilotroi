'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { LogoIcon } from '@/components/ui/Logo'

// Public nav items — always visible
const publicNav = [
  { label: 'Products',    href: '/products' },
  { label: 'Calculator',  href: '/calculator' },
  { label: 'University',  href: '/university' },
  { label: 'Blog',        href: '/blog' },
  { label: 'FAQs',        href: '/faqs' },
  { label: 'Media',       href: '/media' },
]

// Role badge config
const ROLE_BADGES: Record<string, { label: string; icon: string }> = {
  admin:   { label: 'Admin',   icon: '🛡️' },
  partner: { label: 'Partner', icon: '⭐' },
  prospect:{ label: 'Member',  icon: '✦'  },
}

export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [userRole,     setUserRole]     = useState<string | null>(null)
  const [userName,     setUserName]     = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // ── Scroll shadow ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Auth state from localStorage ───────────────────────────────
  useEffect(() => {
    const loadUser = () => {
      try {
        const demo = localStorage.getItem('autopilotroi-demo-user')
        if (demo) {
          const parsed = JSON.parse(demo)
          setUserRole(parsed.role || 'prospect')
          setUserName(parsed.name || parsed.email || '')
        } else {
          setUserRole(null)
          setUserName('')
        }
      } catch { /* noop */ }
    }
    loadUser()
    window.addEventListener('storage', loadUser)
    return () => window.removeEventListener('storage', loadUser)
  }, [])

  // ── Close dropdown on outside click ───────────────────────────
  useEffect(() => {
    if (!dropdownOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  // ── Close mobile menu + dropdown on route change ───────────────
  useEffect(() => {
    setDropdownOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // ── Route exclusions — hide on auth/dashboard/admin ───────────
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/orientation') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup')
  ) return null

  const isAdmin   = userRole === 'admin'
  const isPartner = userRole === 'partner' || isAdmin
  const roleBadge = ROLE_BADGES[userRole ?? ''] ?? ROLE_BADGES.prospect
  const userInitial = userName ? userName[0].toUpperCase() : '?'

  function handleLogout() {
    localStorage.removeItem('autopilotroi-demo-user')
    setUserRole(null)
    setUserName('')
    setDropdownOpen(false)
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: scrolled
          ? '1px solid #e0e2e6'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 1px 12px rgba(0,0,0,0.07)'
          : 'none',
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      <div className="container-xl">
        <div style={{ display: 'flex', alignItems: 'center', height: '4.5rem', gap: '1.5rem' }}>

          {/* ── Logo ── */}
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

          {/* ── Desktop nav links ── */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1, justifyContent: 'center' }}
            className="hidden lg:flex"
            aria-label="Main navigation"
          >
            {publicNav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.4375rem 0.875rem',
                  borderRadius: '0.625rem',
                  fontSize: 'var(--text-body)',
                  fontWeight: pathname === item.href ? 600 : 500,
                  color: pathname === item.href ? '#1b61c9' : 'rgba(24,29,38,0.65)',
                  textDecoration: 'none',
                  background: pathname === item.href ? 'rgba(27,97,201,0.07)' : 'transparent',
                  transition: 'color 150ms ease, background 150ms ease',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop right: auth section ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
            className="hidden lg:flex">

            {userRole ? (
              /* ── Authenticated: Avatar Dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.375rem 0.875rem 0.375rem 0.375rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid #e0e2e6',
                    background: '#ffffff',
                    cursor: 'pointer',
                    transition: 'border-color 150ms ease, background 150ms ease',
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '2rem', height: '2rem', borderRadius: '50%',
                    background: isAdmin ? '#dc2626' : '#1b61c9',
                    color: '#ffffff',
                    fontSize: '0.75rem', fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                  }}>
                    {userInitial}
                  </div>
                  <span style={{
                    fontSize: '0.875rem', fontWeight: 600,
                    color: '#181d26', maxWidth: '120px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {userName || 'User'}
                  </span>
                  <svg
                    style={{
                      width: '0.875rem', height: '0.875rem',
                      color: 'rgba(24,29,38,0.45)',
                      transition: 'transform 200ms ease',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ── Profile dropdown ── */}
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)',
                    width: '16rem',
                    background: '#ffffff',
                    border: '1px solid #e0e2e6',
                    borderRadius: '1rem',
                    padding: '0.5rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                    animation: 'fadeDown 0.15s ease-out',
                    zIndex: 200,
                  }}>
                    {/* User info */}
                    <div style={{ padding: '0.75rem', borderBottom: '1px solid #e0e2e6', marginBottom: '0.375rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                          background: isAdmin ? '#dc2626' : '#1b61c9',
                          color: '#ffffff', fontSize: '0.875rem', fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                        }}>
                          {userInitial}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: '0.875rem', fontWeight: 600, color: '#181d26',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{userName || 'User'}</p>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            background: 'rgba(27,97,201,0.08)',
                            padding: '0.125rem 0.5rem',
                            borderRadius: '99px',
                            fontSize: '0.6875rem', fontWeight: 700,
                            color: '#1b61c9', textTransform: 'uppercase', letterSpacing: '0.06em',
                          }}>
                            {roleBadge.icon} {roleBadge.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick links */}
                    <div style={{ paddingBottom: '0.25rem' }}>
                      {(isPartner || isAdmin) && (
                        <DropdownLink href="/dashboard"          icon="📊" label="Partner Dashboard" onClick={() => setDropdownOpen(false)} />
                      )}
                      {isAdmin && (
                        <DropdownLink href="/admin"              icon="🛡️" label="Admin Panel"        onClick={() => setDropdownOpen(false)} />
                      )}
                      <DropdownLink href="/dashboard/links"      icon="🔗" label="Referral Links"     onClick={() => setDropdownOpen(false)} />
                      <DropdownLink href="/dashboard/links"      icon="➕" label="Invite a Partner"   onClick={() => setDropdownOpen(false)} />
                      <DropdownLink href="/dashboard/settings"   icon="⚙️" label="Settings"           onClick={() => setDropdownOpen(false)} />
                    </div>

                    {/* Logout */}
                    <div style={{ borderTop: '1px solid #e0e2e6', paddingTop: '0.375rem', marginTop: '0.25rem' }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', width: '100%', alignItems: 'center', gap: '0.75rem',
                          borderRadius: '0.625rem', padding: '0.625rem 0.75rem',
                          fontSize: '0.875rem', fontWeight: 500, color: '#dc2626',
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          transition: 'background 150ms ease',
                          fontFamily: 'var(--font-body)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>🚪</span> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              /* ── Unauthenticated ── */
              <>
                <Link href="/login" style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.625rem',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'rgba(24,29,38,0.65)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}>
                  Log In
                </Link>
                <Link href="/signup" style={{
                  display: 'inline-flex', alignItems: 'center',
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
                }}>
                  Start Here →
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
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

      {/* ── Mobile menu — dropdown below the bar, light-themed ── */}
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
          <div style={{ padding: '0.75rem 1rem' }}>
            {/* Nav links */}
            {publicNav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 0.875rem',
                  borderRadius: '0.625rem',
                  fontSize: '1rem', fontWeight: pathname === item.href ? 600 : 500,
                  color: pathname === item.href ? '#1b61c9' : '#181d26',
                  background: pathname === item.href ? 'rgba(27,97,201,0.07)' : 'transparent',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  marginBottom: '0.125rem',
                }}
              >
                {item.label}
                <svg style={{ width: '0.875rem', height: '0.875rem', color: 'rgba(24,29,38,0.30)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Mobile auth section */}
            <div style={{ borderTop: '1px solid #e0e2e6', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
              {userRole ? (
                <>
                  {/* User info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.875rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                      background: isAdmin ? '#dc2626' : '#1b61c9',
                      color: '#ffffff', fontSize: '0.8125rem', fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                    }}>
                      {userInitial}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#181d26' }}>{userName || 'User'}</p>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1b61c9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {roleBadge.icon} {roleBadge.label}
                      </span>
                    </div>
                  </div>

                  {(isPartner || isAdmin) && (
                    <MobileLink href="/dashboard" onClick={() => setMenuOpen(false)}>📊 Partner Dashboard</MobileLink>
                  )}
                  {isAdmin && (
                    <MobileLink href="/admin" onClick={() => setMenuOpen(false)}>🛡️ Admin Panel</MobileLink>
                  )}
                  <MobileLink href="/dashboard/links"    onClick={() => setMenuOpen(false)}>🔗 Referral Links</MobileLink>
                  <MobileLink href="/dashboard/settings" onClick={() => setMenuOpen(false)}>⚙️ Settings</MobileLink>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.75rem 0.875rem', borderRadius: '0.625rem',
                      fontSize: '1rem', fontWeight: 500, color: '#dc2626',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    🚪 Log Out
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: '0.25rem 0' }}>
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '0.8125rem', borderRadius: '0.75rem',
                      fontSize: '1rem', fontWeight: 600, color: '#181d26',
                      textDecoration: 'none', fontFamily: 'var(--font-display)',
                      border: '1.5px solid #e0e2e6',
                    }}>
                    Log In
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '0.8125rem', borderRadius: '0.75rem',
                      fontSize: '1rem', fontWeight: 700, color: '#ffffff',
                      textDecoration: 'none', fontFamily: 'var(--font-display)',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                      boxShadow: '0 4px 16px rgba(27,97,201,0.38)',
                      letterSpacing: '0.01em',
                    }}>
                    Start Here →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

/* ── Dropdown Link ── */
function DropdownLink({ href, icon, label, onClick }: {
  href: string; icon: string; label: string; onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        borderRadius: '0.625rem', padding: '0.625rem 0.75rem',
        fontSize: '0.875rem', fontWeight: 500, color: '#181d26',
        textDecoration: 'none',
        transition: 'background 150ms ease, color 150ms ease',
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
      <span style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </Link>
  )
}

/* ── Mobile Link ── */
function MobileLink({ href, onClick, children }: {
  href: string; onClick: () => void; children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'block',
        padding: '0.75rem 0.875rem', borderRadius: '0.625rem',
        fontSize: '1rem', fontWeight: 500, color: '#181d26',
        textDecoration: 'none', fontFamily: 'var(--font-body)',
        transition: 'background 150ms ease',
        marginBottom: '0.125rem',
      }}
    >
      {children}
    </Link>
  )
}
