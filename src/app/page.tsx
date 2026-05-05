import { StaticHomePage } from '@/components/pages/StaticHomePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

export default function HomePage() {
  return <StaticHomePage />
}
