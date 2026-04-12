'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Logo from '@/components/ui/Logo'

// Public nav items — always visible
const publicNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Trust Check', href: '/evaluate' },
  { label: 'University', href: '/university' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const pathname = usePathname()

  // Check for demo user (replaced by real Supabase auth when configured)
  useEffect(() => {
    try {
      const demo = localStorage.getItem('autopilotroi-demo-user')
      if (demo) {
        const parsed = JSON.parse(demo)
        setUserRole(parsed.role || 'prospect')
        setUserName(parsed.name || parsed.email || '')
      }
    } catch {}
  }, [])

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08205b]/55 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.8rem] max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">

        {/* Logo */}
        <Link href="/">
          <Logo size={42} showText />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {publicNav.map((item) => (
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

        {/* Right side — Auth buttons + Theme toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Auth-dependent buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {userRole ? (
              <>
                {(userRole === 'partner' || userRole === 'admin') && (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-blue-50/80 transition hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-blue-50/80 transition hover:text-white"
                  >
                    Admin
                  </Link>
                )}
                {/* User avatar + name */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 pl-2 pr-3 py-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[100px] truncate">
                    {userName || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('autopilotroi-demo-user')
                    setUserRole(null)
                    setUserName('')
                    window.location.href = '/'
                  }}
                  className="rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-50/80 transition hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
                >
                  Start Here
                </Link>
              </>
            )}
          </div>

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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#08205b]/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {publicNav.map((item) => (
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

            {/* Auth links (mobile) */}
            <div className="mt-3 border-t border-white/10 pt-3 space-y-1">
              {userRole ? (
                <>
                  {(userRole === 'partner' || userRole === 'admin') && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium text-blue-50/80 hover:bg-white/8 hover:text-white block"
                    >
                      📊 Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('autopilotroi-demo-user')
                      setUserRole(null)
                      setMenuOpen(false)
                      window.location.href = '/'
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-blue-50/80 hover:bg-white/8 hover:text-white"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-blue-50/80 hover:bg-white/8 hover:text-white block"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-base font-semibold text-white block"
                  >
                    Start Here
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
