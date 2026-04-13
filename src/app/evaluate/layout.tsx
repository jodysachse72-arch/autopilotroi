import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trust Check — AutopilotROI',
  description: 'Free 5-question tool to evaluate any crypto, AI, or income opportunity using a transparent due diligence framework.',
  openGraph: {
    title: 'Trust Check — Evaluate Any Opportunity',
    description: 'Due diligence in 60 seconds — evaluate any crypto/AI opportunity with our transparency scoring framework.',
  },
}

export default function EvaluateLayout({ children }: { children: React.ReactNode }) {
  return children
}
