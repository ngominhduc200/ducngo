'use client'

import { useEffect } from 'react'

export default function ScrollRestorer() {
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo')
    if (!target) return
    sessionStorage.removeItem('scrollTo')
    // Small delay to let the page fully render before scrolling
    const id = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(id)
  }, [])
  return null
}
