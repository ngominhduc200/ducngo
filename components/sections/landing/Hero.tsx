'use client'

import { usePathname } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'

const content = (
  <>
    I&apos;m a{' '}
    <em className="italic text-orange-500">product</em>{' '}
    and{' '}
    <em className="italic text-sky-500">visual</em>{' '}
    designer grounded in research and systems thinking.
  </>
)

export default function Hero() {
  const pathname = usePathname()
  return (
    <div className="lg:hidden">
      <PageHero key={pathname} align="left" tagline="Open for Fall 2026 Internship. Currently designing at Hootsuite and The Peak SFU.">
        {content}
      </PageHero>
    </div>
  )
}
