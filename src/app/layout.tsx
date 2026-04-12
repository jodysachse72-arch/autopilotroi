import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FeatureFlagProvider } from '@/lib/feature-flags'
import SmartFaqBot from '@/components/ui/SmartFaqBot'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: {
    default: 'AutopilotROI | AI-Driven Finance',
    template: '%s | AutopilotROI',
  },
  description:
    'AutopilotROI is building a product-led entry point into AI automation, digital banking, crypto infrastructure, and guided onboarding.',
  keywords:
    'AutopilotROI, AI finance, digital banking, crypto infrastructure, automation, neobank, exchange',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'),
  openGraph: {
    type: 'website',
    siteName: 'AutopilotROI',
    title: 'AutopilotROI | AI-Driven Finance',
    description:
      'The structured onboarding platform for AI-managed finance — trading bots, crypto cards, exchange, and guided onboarding.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AutopilotROI — AI-Driven Finance Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutopilotROI | AI-Driven Finance',
    description:
      'The structured onboarding platform for AI-managed finance — trading bots, crypto cards, exchange, and neobank.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const thriveDeskId = process.env.NEXT_PUBLIC_THRIVEDESK_WIDGET_ID
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-[var(--font-manrope)]">
        <ThemeProvider>
          <FeatureFlagProvider>
            <AnnouncementBanner />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SmartFaqBot />
          </FeatureFlagProvider>
        </ThemeProvider>

        {/* Plausible Analytics — privacy-friendly, no cookie banner needed */}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}

        {/* ThriveDesk Helpdesk Widget — stub until embed script provided */}
        {thriveDeskId && thriveDeskId !== 'placeholder' && (
          <Script
            id="thrivedesk-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // ThriveDesk widget will be initialized here.
                // Replace this placeholder with the actual embed script
                // from your ThriveDesk dashboard (Settings → Assistant → Installation).
                console.log('[ThriveDesk] Widget ID: ${thriveDeskId} — ready for embed script');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
