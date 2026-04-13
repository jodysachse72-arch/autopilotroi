import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media — AutopilotROI',
  description: 'Watch CEO interviews, product demos, and market analysis from the Aurum Foundation team.',
  openGraph: {
    title: 'Media — AutopilotROI',
    description: 'CEO interviews, product demos, and market analysis from the Aurum team.',
  },
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children
}
