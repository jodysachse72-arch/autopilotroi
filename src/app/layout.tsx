import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { FeatureFlagProvider } from '@/lib/feature-flags'
import SmartFaqBot from '@/components/ui/SmartFaqBot'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AutopilotROI | AI-Driven Finance',
    template: '%s | AutopilotROI',
  },
  description:
    'AutopilotROI is the structured onboarding platform for AI-managed finance — trading bots, crypto cards, exchange, and a Web3 neobank.',
  keywords:
    'AutopilotROI, AI finance, digital banking, crypto infrastructure, Aurum, automation, neobank, exchange',
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
    <html lang="en" className={cn(jakartaSans.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <FeatureFlagProvider>
          <AnnouncementBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SmartFaqBot />
        </FeatureFlagProvider>

        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}

        {thriveDeskId && thriveDeskId !== 'placeholder' && (
          <Script
            id="thrivedesk-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `console.log('[ThriveDesk] Widget ID: ${thriveDeskId} — ready for embed script');`,
            }}
          />
        )}
      </body>
    </html>
  )
}
