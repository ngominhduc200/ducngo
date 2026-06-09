'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type ViewMode = 'expand' | 'compressed'

const COVER_MS = 500
const STORAGE_KEY = 'viewMode'

const ViewModeContext = createContext<{
  mode: ViewMode
  setMode: (m: ViewMode) => void
  transitioning: boolean
}>({ mode: 'expand', setMode: () => {}, transitioning: false })

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>('expand')
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved === 'compressed') setModeState('compressed')
  }, [])

  const setMode = (next: ViewMode) => {
    if (next === mode) return
    sessionStorage.setItem(STORAGE_KEY, next)
    setTransitioning(true)
    setTimeout(() => {
      setModeState(next)
      setTransitioning(false)
    }, COVER_MS)
  }

  return (
    <ViewModeContext.Provider value={{ mode, setMode, transitioning }}>
      {children}
    </ViewModeContext.Provider>
  )
}

export function useViewMode() {
  return useContext(ViewModeContext)
}
