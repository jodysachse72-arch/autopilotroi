import type { Metadata } from 'next'
import RoadmapPageClient from './RoadmapPageClient'

export const metadata: Metadata = {
  title: 'Internal Roadmap — AutopilotROI V3',
  description: 'Internal project status, completed work, and next priorities for AutopilotROI V3.',
  robots: { index: false, follow: false },
}

export default function RoadmapPage() {
  return <RoadmapPageClient />
}
