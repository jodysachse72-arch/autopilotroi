import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Ecosystem from '@/components/home/Ecosystem'
import Testimonials from '@/components/home/Testimonials'
import Pricing from '@/components/home/Pricing'
import CTABand from '@/components/home/CTABand'

export const metadata: Metadata = {
  title: 'AI Finance — Platform-Agnostic Preview',
  description: 'A platform-agnostic approach to guided, AI-managed finance.',
  robots: { index: false, follow: false },
}

export default function AiFinancePage() {
  return (
    <div className="sections-stack">
      <Hero variant="ai-finance" />
      <Stats variant="ai-finance" />
      <Features variant="ai-finance" />
      <HowItWorks variant="ai-finance" />
      <Ecosystem variant="ai-finance" />
      <Testimonials variant="ai-finance" />
      <Pricing variant="ai-finance" />
      <CTABand variant="ai-finance" />
    </div>
  )
}
