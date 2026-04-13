import UniversityContent from '@/components/UniversityContent'

export const metadata = {
  title: 'Aurum University | AutoPilot ROI',
  description:
    'Structured video learning for Aurum Foundation members — from beginner to advanced.',
}

export default async function UniversityPage() {
  // Videos now come from the in-app Content Editor (localStorage/Supabase)
  // UniversityContent handles loading them client-side
  return <UniversityContent videos={null} />
}
