'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return null
}
