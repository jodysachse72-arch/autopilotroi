'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { brand, navItems } from '@/content/shared'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={brand.logoHref} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L14 7H10V12H8V7H4L9 2Z" fill="white"/>
                <path d="M4 12H14V14H4V12Z" fill="white" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight">{brand.name}</div>
              <div className="text-blue-500 text-xs uppercase tracking-widest leading-tight">{brand.tagline}</div>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link href="#" className="hidden sm:block text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Partner Login
            </Link>
            <Link
              href="/start"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Find My Spot →
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
