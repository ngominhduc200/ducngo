'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'

export default function PageLoader() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const isWork = pathname.startsWith('/project/')

  // Reset bar on route change
  useEffect(() => {
    if (barRef.current) barRef.current.style.width = '0%'
  }, [pathname])

  // Drive progress off Lenis scroll position — works regardless of scroll implementation
  useLenis(({ scroll, limit }) => {
    if (!isWork || !barRef.current) return
    barRef.current.style.width = limit > 0 ? `${(scroll / limit) * 100}%` : '0%'
  })

  if (!isWork) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[2000] h-[2px] pointer-events-none">
      <div ref={barRef} className="h-full bg-orange-500" style={{ width: '0%' }} />
    </div>
  )
}
