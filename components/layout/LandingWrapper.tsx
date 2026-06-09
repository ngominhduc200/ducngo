'use client'

import { useViewMode } from '@/contexts/ViewModeContext'

export default function LandingWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useViewMode()

  return (
    <main
      className="relative flex flex-col w-full"
      data-view-mode={mode}
    >
      {children}
    </main>
  )
}
