import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profit Calculator — AutopilotROI',
  description: 'Calculate your potential returns with Aurum AI trading bots. Compare 8 investment tiers from Basic (10.5%) to Ultimate (16.62%) with compound interest projections.',
  openGraph: {
    title: 'Profit Calculator — AutopilotROI',
    description: 'See your potential returns across 8 Aurum investment tiers with real-time compound interest calculations.',
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
