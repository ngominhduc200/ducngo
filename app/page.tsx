import Header from '@/components/layout/Header'
import NavButtons from '@/components/layout/NavButtons'
import Hero from '@/components/sections/landing/Hero'
import ProjectGrid from '@/components/sections/landing/ProjectGrid'

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center gap-[8.75rem] w-full max-w-[108rem] mx-auto">
      {/* 1. Identity bar */}
      <Header />

      {/* 2. Hero & Nav Wrapper */}
      <div className="flex flex-col items-center gap-[2.125rem] w-full max-w-[56.25rem]">
        {/* Hero */}
        <Hero />

        {/* Nav buttons */}
        <NavButtons />
      </div>

      {/* 3. Project grid */}
      <ProjectGrid />
    </main>
  )
}