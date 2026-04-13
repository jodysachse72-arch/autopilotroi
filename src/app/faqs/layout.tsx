import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs — AutopilotROI',
  description: 'Frequently asked questions about Aurum Foundation, the AI trading bot, onboarding process, referral program, and the partner ecosystem.',
  openGraph: {
    title: 'FAQs — AutopilotROI',
    description: 'Common questions about Aurum, AI bots, crypto onboarding, and the partner program — answered clearly.',
  },
}

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children
}
