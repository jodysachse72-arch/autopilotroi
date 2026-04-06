import Hero from '@/components/sections/home/Hero'
import WhyJoin from '@/components/sections/home/WhyJoin'
import AurumProducts from '@/components/sections/home/AurumProducts'
import Journey from '@/components/sections/home/Journey'
import ReadinessScore from '@/components/sections/home/ReadinessScore'
import TeamAdvantage from '@/components/sections/home/TeamAdvantage'
import Testimonials from '@/components/sections/home/Testimonials'
import FinalCta from '@/components/sections/home/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyJoin />
      <AurumProducts />
      <Journey />
      <ReadinessScore />
      <TeamAdvantage />
      <Testimonials />
      <FinalCta />
    </>
  )
}
