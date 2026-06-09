'use client'

import { useEffect } from 'react'
import { useViewMode } from '@/contexts/ViewModeContext'

export default function HtmlBg() {
  const { mode } = useViewMode()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'compressed')
  }, [mode])

  return null
}
