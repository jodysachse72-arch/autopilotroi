// test-preview-flow: vercel toolbar + comments validation
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Ecosystem from '@/components/home/Ecosystem'
import Testimonials from '@/components/home/Testimonials'
import Pricing from '@/components/home/Pricing'
import CTABand from '@/components/home/CTABand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Ecosystem />
      <Testimonials />
      <Pricing />
      <CTABand />
    </>
  )
}
