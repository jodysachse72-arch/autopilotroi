import { headers } from 'next/headers'
import PuckRenderer from '@/components/builder/PuckRenderer'
import ContactPageClient from './ContactPageClient'

export const metadata = {
  title: 'Contact | AutopilotROI',
  description: 'Reach out to the AutopilotROI team with questions about Aurum, the partner program, or onboarding.',
}

export const revalidate = 60

async function getPuckData(path: string) {
  try {
    const host = (await headers()).get('host')
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`
    
    const res = await fetch(`${baseUrl}/api/puck?path=${encodeURIComponent(path)}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    return null
  }
}

const DEFAULT_CONTACT_DATA = {
  headline: 'Get in Touch',
  subheadline: 'Have questions about Aurum, the partner program, or onboarding? We\'re here to help.',
  email: 'support@autopilotroi.com',
  telegram: '@AutopilotROI',
  responseNote: 'Email: 24–48 hours · Telegram: typically within a few hours during business days.',
}

export default async function ContactPage() {
  const puckData = await getPuckData('/contact')
  
  if (puckData && Object.keys(puckData).length > 0) {
    return (
      <div className="page-bg">
        <PuckRenderer data={puckData} />
      </div>
    )
  }

  return <ContactPageClient data={DEFAULT_CONTACT_DATA} />
}
