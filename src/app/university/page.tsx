import { getUniversityVideos } from '@/sanity/client'
import UniversityContent from '@/components/UniversityContent'

export const metadata = {
  title: 'Aurum University | AutoPilot ROI',
  description:
    'Structured video learning for Aurum Foundation members — from beginner to advanced.',
}

export default async function UniversityPage() {
  const videos = await getUniversityVideos()
  return <UniversityContent videos={videos} />
}
