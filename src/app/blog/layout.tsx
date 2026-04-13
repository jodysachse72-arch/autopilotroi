import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — AutopilotROI',
  description: 'Articles on crypto investing, AI trading bots, market trends, and AutopilotROI platform updates.',
  openGraph: {
    title: 'Blog — AutopilotROI',
    description: 'Crypto investing insights, AI trading bot guides, and platform updates.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
