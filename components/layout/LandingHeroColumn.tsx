'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useViewMode } from '@/contexts/ViewModeContext'

const COLUMN_STYLE = { width: 'calc((100vw - 1.5rem) / 3)', paddingRight: '1.5rem' }
const INNER_STYLE = { paddingTop: '5.25rem', animation: 'contentReveal 400ms ease-out both' }

function HeroContent({ pathname }: { pathname: string }) {
  return (
    <div key={pathname} style={INNER_STYLE} className="text-neutral-900">
      <p className="hero-serif text-3xl lg:text-2xl xl:text-3xl">
        I&apos;m a{' '}
        <em className="italic text-orange-500">product</em>{' '}
        and{' '}
        <em className="italic text-sky-500">visual</em>{' '}
        designer grounded in research and systems thinking.
      </p>
      <p className="font-sans text-sm text-neutral-400 mt-2">
        Currently designing at Hootsuite and The Peak SFU.
      </p>
    </div>
  )
}

export default function LandingHeroColumn() {
  const pathname = usePathname()
  const { mode } = useViewMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Expand mode: absolute inside scroll wrapper — scrolls with content
  if (mode !== 'compressed') {
    return (
      <div
        className="hidden lg:flex absolute right-0 top-0 h-screen flex-col z-[10] pointer-events-auto"
        style={COLUMN_STYLE}
      >
        <HeroContent pathname={pathname} />
      </div>
    )
  }

  // Compressed mode: fixed overlay via portal
  if (!mounted) return null

  return createPortal(
    <div
      className="hidden lg:flex fixed right-0 top-0 h-screen flex-col z-[10] pointer-events-auto"
      style={COLUMN_STYLE}
    >
      <HeroContent pathname={pathname} />
    </div>,
    document.body
  )
}
