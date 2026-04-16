'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/* ═══════════════════════════════════════════════════════════════
   COMMAND PALETTE — Cmd/Ctrl+K quick search across admin
   ═══════════════════════════════════════════════════════════════ */

interface SearchResult {
  label: string
  href: string
  icon: string
  category: string
}

const ALL_PAGES: SearchResult[] = [
  // Admin
  { label: 'Admin Dashboard', href: '/admin', icon: '📊', category: 'Admin' },
  { label: 'Partners', href: '/admin/partners', icon: '🤝', category: 'Admin' },
  { label: 'Prospects', href: '/admin/prospects', icon: '👥', category: 'Admin' },
  { label: 'Strategy Roadmap', href: '/admin/roadmap', icon: '🗺️', category: 'Admin' },
  { label: 'Changelog', href: '/admin/changelog', icon: '📝', category: 'Admin' },
  { label: 'Checklist', href: '/admin/checklist', icon: '✅', category: 'Admin' },
  { label: 'Feature Toggles', href: '/admin/features', icon: '🎛️', category: 'Admin' },
  { label: 'Guide', href: '/admin/guide', icon: '📖', category: 'Admin' },
  { label: 'CMS Studio', href: '/admin/cms', icon: '🎨', category: 'Admin' },
  { label: 'Emails', href: '/admin/emails', icon: '✉️', category: 'Admin' },
  { label: 'Integrations', href: '/admin/settings', icon: '⚙️', category: 'Admin' },
  // Partner Dashboard
  { label: 'Partner Dashboard', href: '/dashboard', icon: '📊', category: 'Dashboard' },
  { label: 'My Prospects', href: '/dashboard/prospects', icon: '👥', category: 'Dashboard' },
  { label: 'Performance', href: '/dashboard/performance', icon: '📈', category: 'Dashboard' },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: '🏆', category: 'Dashboard' },
  { label: 'Referral Links', href: '/dashboard/links', icon: '🔗', category: 'Dashboard' },
  { label: 'Partner Videos', href: '/dashboard/videos', icon: '🎬', category: 'Dashboard' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️', category: 'Dashboard' },
  // Public
  { label: 'Homepage', href: '/', icon: '🏠', category: 'Public' },
  { label: 'Products', href: '/products', icon: '📦', category: 'Public' },
  { label: 'FAQs', href: '/faqs', icon: '❓', category: 'Public' },
  { label: 'Calculator', href: '/calculator', icon: '🧮', category: 'Public' },
  { label: 'University', href: '/university', icon: '🎓', category: 'Public' },
  { label: 'Sign Up', href: '/signup', icon: '✍️', category: 'Public' },
  { label: 'Login', href: '/login', icon: '🔑', category: 'Public' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Listen for Cmd/Ctrl + K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  const filtered = query
    ? ALL_PAGES.filter(
        (p) =>
          p.label.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PAGES

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Palette */}
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #e0e2e6' }}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(4,14,32,0.35)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages... (type to filter)"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#181d26' }}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border px-2 py-0.5 text-[10px]"
            style={{ border: '1px solid #e0e2e6', color: 'rgba(4,14,32,0.45)', background: '#f8fafc' }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[40vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>
              No pages match &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((result, i) => (
              <button
                key={result.href}
                onClick={() => navigate(result.href)}
                onMouseEnter={() => setSelectedIndex(i)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition"
                style={{
                  background: i === selectedIndex ? 'rgba(27,97,201,0.07)' : 'transparent',
                  color: i === selectedIndex ? '#1b61c9' : 'rgba(4,14,32,0.69)',
                }}
              >
                <span className="text-base">{result.icon}</span>
                <span className="flex-1 font-medium">{result.label}</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.35)' }}>{result.category}</span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 text-[10px]"
          style={{ borderTop: '1px solid #e0e2e6', color: 'rgba(4,14,32,0.35)' }}>
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  )
}
