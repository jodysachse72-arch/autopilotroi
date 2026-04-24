'use client'

import { usePathname } from 'next/navigation'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmartFaqBot from '@/components/ui/SmartFaqBot'

/**
 * MarketingShell
 *
 * Wraps public/marketing pages with Navbar, Footer, AnnouncementBanner,
 * and SmartFaqBot. Renders nothing extra for backend routes so those
 * layouts have full control over their own chrome.
 */

const BACKEND_PREFIXES = ['/admin', '/dashboard', '/login', '/forgot-password', '/reset-password']

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBackend = BACKEND_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(prefix + '/')
  )

  if (isBackend) {
    // Backend layouts manage their own shell — render children only
    return <>{children}</>
  }

  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SmartFaqBot />
    </>
  )
}
