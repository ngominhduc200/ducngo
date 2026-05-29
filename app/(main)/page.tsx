import Hero from '@/components/sections/landing/Hero'
import ProjectGrid from '@/components/sections/landing/ProjectGrid'
import LandingNav from '@/components/layout/LandingNav'

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <LandingNav />
      <Hero />
      <ProjectGrid />
    </main>
  )
}
