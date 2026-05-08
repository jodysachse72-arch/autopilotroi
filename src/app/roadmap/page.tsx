import type { Metadata } from 'next'
import RoadmapPageClient from './RoadmapPageClient'

export const metadata: Metadata = {
  title: 'Product Roadmap — AutopilotROI V3',
  description:
    'See what has been built, what is in progress, and the phased plan from editor polish to public launch for AutopilotROI V3.',
}

export default function RoadmapPage() {
  return <RoadmapPageClient />
}
