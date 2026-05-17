'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Maps routes to their background image key
const BG_MAP: Record<string, string> = {
  '/':      'landing',
  '/fun':   'fun',
  '/about': 'about',
}

export default function HtmlBg() {
  const pathname = usePathname()

  useEffect(() => {
    const bg = BG_MAP[pathname] ?? 'landing'
    document.documentElement.setAttribute('data-bg', bg)
    return () => document.documentElement.removeAttribute('data-bg')
  }, [pathname])

  return null
}
