'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

export default function ScrollRestorer() {
  const lenis = useLenis()

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo')
    if (!target) return
    sessionStorage.removeItem('scrollTo')
    const id = setTimeout(() => {
      const el = document.getElementById(target)
      if (!el) return
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
    return () => clearTimeout(id)
  }, [lenis])

  return null
}
