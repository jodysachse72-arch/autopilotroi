import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoPilot ROI — The Guided Gateway into Aurum',
  description:
    "Don't navigate Aurum alone. Team AutoPilot ROI educates you first, places you in an active growing downline, and walks you through every step with personal support.",
  keywords: 'Aurum, AI trading, crypto, downline, spillover, EX-AI Bot, AutoPilot ROI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
