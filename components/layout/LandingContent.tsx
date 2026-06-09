'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useViewMode } from '@/contexts/ViewModeContext'

export default function LandingContent({ children }: { children: React.ReactNode }) {
  const { mode } = useViewMode()
  const lenis = useLenis()
  const prevMode = useRef<string | null>(null)
  const [animTrigger, setAnimTrigger] = useState(0)

  useEffect(() => {
    // Reset scroll on initial mount
    lenis?.scrollTo(0, { immediate: true })
  }, [lenis])

  useEffect(() => {
    if (prevMode.current !== null && prevMode.current !== mode && mode === 'expand') {
      lenis?.scrollTo(0, { immediate: true })
      setAnimTrigger(n => n + 1)
    }
    prevMode.current = mode
  }, [mode, lenis])

  return (
    <div
      key={animTrigger}
      className={`w-full ${mode === 'expand' ? 'lg:pt-[1.5rem]' : ''}`}
      style={animTrigger > 0 && mode === 'expand' ? {
        animation: 'contentReveal 500ms ease-out both',
      } : undefined}
    >
      {children}
    </div>
  )
}
