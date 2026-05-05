import { headers } from 'next/headers'
import PuckRenderer from '@/components/builder/PuckRenderer'
import { StaticCalculatorPage } from './StaticCalculatorPage'

export const dynamic = 'force-dynamic'

async function getPuckData(path: string) {
  try {
    const host = (await headers()).get('host')
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`
    
    const res = await fetch(`${baseUrl}/api/puck?path=${encodeURIComponent(path)}`, {
      cache: 'no-store', // ensures we get the latest data published
    })

    if (!res.ok) {
      console.error('Failed to fetch Puck data for', path, res.status)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching Puck data:', error)
    return null
  }
}

export default async function CalculatorPage() {
  const puckData = await getPuckData('/calculator')
  
  if (puckData && Object.keys(puckData).length > 0) {
    return (
      <div className="page-bg">
        <PuckRenderer data={puckData} />
      </div>
    )
  }

  // Fallback to the statically coded page if no Puck data exists
  return <StaticCalculatorPage />
}
