'use client'

import { useEffect, useState } from 'react'
import { useViewMode } from '@/contexts/ViewModeContext'

export default function ModeTransitionOverlay() {
  const { transitioning, mode } = useViewMode()
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (transitioning && mode === 'compressed') {
      // compressed → expand: show loading text
      setShowLoading(true)
    } else if (!transitioning) {
      // keep text visible through the 500ms fade-out, then hide
      const t = setTimeout(() => setShowLoading(false), 550)
      return () => clearTimeout(t)
    }
  }, [transitioning, mode])

  const targetDark = transitioning ? mode !== 'compressed' : mode === 'compressed'
  const bg = targetDark ? '#0a0a0a' : '#fafaf9'

  return (
    <div
      className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
      style={{
        backgroundColor: bg,
        opacity: transitioning ? 1 : 0,
        transition: 'opacity 500ms ease-in-out',
      }}
    >
      {showLoading && <span className="font-sans text-sm text-blue-400">loading...</span>}
    </div>
  )
}
