import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products — AutopilotROI',
  description: 'Explore the Aurum ecosystem: EX-AI Trading Bot, Zeus Bot, Crypto NeoBank, Visa Crypto Card, Exchange, and RWA Gold tokenization.',
  openGraph: {
    title: 'Products — AutopilotROI',
    description: 'Explore the full Aurum ecosystem — AI trading bots, crypto banking, and real-world asset tokenization.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
