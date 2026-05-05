import { NextResponse } from 'next/server'
import { getPublishedFaqsServer } from '@/lib/cms/server-adapter'

export async function GET() {
  try {
    const faqs = await getPublishedFaqsServer()
    return NextResponse.json({ faqs })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ faqs: [] }, { status: 500 })
  }
}
