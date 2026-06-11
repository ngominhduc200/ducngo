'use client'

import { useViewMode } from '@/contexts/ViewModeContext'

export default function ModeTransitionOverlay() {
  const { transitioning, mode } = useViewMode()

  const targetDark = transitioning ? mode !== 'compressed' : mode === 'compressed'
  const bg = targetDark ? '#0a0a0a' : '#fafaf9'

  return (
    <div
      className="fixed inset-0 z-[999] pointer-events-none"
      style={{
        backgroundColor: bg,
        opacity: transitioning ? 1 : 0,
        transition: 'opacity 500ms ease-in-out',
        willChange: 'opacity',
      }}
    />
  )
}
