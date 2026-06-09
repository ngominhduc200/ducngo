import Hero from '@/components/sections/landing/Hero'
import ProjectGrid from '@/components/sections/landing/ProjectGrid'
import CompressedCarousel from '@/components/sections/landing/CompressedCarousel'
import LandingNav from '@/components/layout/LandingNav'
import LandingContent from '@/components/layout/LandingContent'
import ScrollRestorer from '@/components/layout/ScrollRestorer'
import LandingWrapper from '@/components/layout/LandingWrapper'
import LandingHeroColumn from '@/components/layout/LandingHeroColumn'

export default function LandingPage() {
  return (
    <LandingWrapper>
      <ScrollRestorer />
      <LandingNav />
      <CompressedCarousel />

      <LandingContent>
        <Hero />
        <ProjectGrid />
      </LandingContent>

      <LandingHeroColumn />
    </LandingWrapper>
  )
}
