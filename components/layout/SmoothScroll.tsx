'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip on fun page — it has its own custom wheel handling
    if (pathname === '/fun') return

    const lenis = new Lenis({ lerp: 0.1 })

    let raf: number
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [pathname])

  return null
}
