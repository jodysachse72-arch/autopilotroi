'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

// Public nav items — always visible
const publicNav = [
  { label: 'Home', href: '/' },
  { label: 'Product Suite', href: '/products' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'University', href: '/university' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Check for demo user
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
      } catch {}
    }
    loadUser()
    window.addEventListener('storage', loadUser)
    return () => window.removeEventListener('storage', loadUser)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Don't show navbar on dashboard/admin/auth routes
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/orientation') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup')
  ) {
    return null
  }

  const userInitial = userName ? userName.charAt(0).toUpperCase() : '?'
  const isAdmin = userRole === 'admin'
  const isPartner = userRole === 'partner'
  const roleBadge = isAdmin
    ? { label: 'Admin', color: 'bg-red-500/20 text-red-200 border-red-300/30', icon: '🛡️' }
    : { label: 'Partner', color: 'bg-white/20 text-white border-white/30', icon: '🤝' }

  function handleLogout() {
    localStorage.removeItem('autopilotroi-demo-user')
    setUserRole(null)
    setUserName('')
    setDropdownOpen(false)
    window.location.href = '/'
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'linear-gradient(135deg, #1250b0 0%, #1b61c9 50%, #1558c0 100%)',
        boxShadow: scrolled ? '0 2px 20px rgba(18, 80, 176, 0.45)' : 'none',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      <div className="container flex h-[4.5rem] items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo size={38} showText />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center gap-7 lg:flex">
          {publicNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-[0.9rem] font-medium text-white/80 transition-colors hover:text-white"
              style={{
                color: pathname === item.href ? '#ffffff' : undefined,
              }}
            >
              {item.label}
              {pathname === item.href && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side — Auth buttons */}
        <div className="flex items-center gap-3">

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {userRole ? (
              /* ── Authenticated: Avatar Dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/12 pl-2.5 pr-3.5 py-1.5 transition hover:bg-white/20"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${isAdmin ? 'bg-red-500' : 'bg-white/30'}`}>
                    {userInitial}
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                    {userName || 'User'}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 text-white/60 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl border border-[#d0d8e8] bg-white p-2 shadow-2xl"
                    style={{ animation: 'fadeDown 0.15s ease-out' }}
                  >
                    {/* User info header */}
                    <div className="px-3 py-3 border-b border-[#e0e2e6] mb-1">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${isAdmin ? 'bg-red-500' : 'bg-[#1b61c9]'}`}>
                          {userInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#181d26] truncate">{userName || 'User'}</p>
                          <span className={`inline-flex items-center gap-1 rounded-full border-0 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1b61c9]`}>
                            {roleBadge.icon} {roleBadge.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick links */}
                    <div className="py-1">
                      {(isPartner || isAdmin) && (
                        <DropdownLink href="/dashboard" icon="📊" label="Partner Dashboard" onClick={() => setDropdownOpen(false)} />
                      )}
                      {isAdmin && (
                        <DropdownLink href="/admin" icon="🛡️" label="Admin Panel" onClick={() => setDropdownOpen(false)} />
                      )}
                      <DropdownLink href="/dashboard/links" icon="🔗" label="Referral Links" onClick={() => setDropdownOpen(false)} />
                      <DropdownLink href="/dashboard/links" icon="➕" label="Invite a Partner" onClick={() => setDropdownOpen(false)} />
                      <DropdownLink href="/dashboard/settings" icon="⚙️" label="Settings" onClick={() => setDropdownOpen(false)} />
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[#e0e2e6] pt-1 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <span className="text-base">🚪</span>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="btn-white text-sm px-5 py-2"
                >
                  Start Here →
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden items-center justify-center h-10 w-10 rounded-xl border border-white/25 bg-white/12 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="border-t border-white/15 px-6 py-4 lg:hidden"
          style={{ background: 'linear-gradient(180deg, #1557c8 0%, #1250b0 100%)' }}
        >
          <div className="flex flex-col gap-1">
            {publicNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium transition"
                style={{
                  background: pathname === item.href ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: pathname === item.href ? '#ffffff' : 'rgba(255,255,255,0.75)',
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile auth */}
            <div className="mt-3 border-t border-white/15 pt-3 space-y-1">
              {userRole ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${isAdmin ? 'bg-red-500' : 'bg-white/30'}`}>
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{userName || 'User'}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                        {roleBadge.icon} {roleBadge.label}
                      </span>
                    </div>
                  </div>
                  {(isPartner || isAdmin) && (
                    <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white block">
                      📊 Partner Dashboard
                    </Link>
                  )}
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white block">
                      🛡️ Admin Panel
                    </Link>
                  )}
                  <Link href="/dashboard/links" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white block">
                    🔗 Referral Links
                  </Link>
                  <Link href="/dashboard/settings" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white block">
                    ⚙️ Settings
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-red-300 hover:bg-white/10"
                  >
                    🚪 Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-white/75 hover:bg-white/10 hover:text-white block">
                    Log In
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-white mt-2 w-full justify-center block text-center py-3">
                    Start Here →
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

/* ── Dropdown Link Helper ── */
function DropdownLink({ href, icon, label, onClick }: { href: string; icon: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#181d26] transition hover:bg-[#f0f4ff] hover:text-[#1b61c9]"
    >
      <span className="text-base">{icon}</span>
      {label}
    </Link>
  )
}
