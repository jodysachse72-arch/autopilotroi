import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import './globals.css'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'AutopilotROI | AI-Driven Finance',
  description:
    'AutopilotROI is building a product-led entry point into AI automation, digital banking, crypto infrastructure, and guided onboarding.',
  keywords:
    'AutopilotROI, AI finance, digital banking, crypto infrastructure, automation, neobank, exchange',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-[var(--font-manrope)]">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
