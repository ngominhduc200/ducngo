'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useViewMode } from '@/contexts/ViewModeContext'

const SHOWN_PATHS = ['/', '/fun']

const TEXT_CLASS_EXPAND = 'font-serif italic text-9xl lg:text-[12rem] uppercase leading-none text-neutral-900'
const TEXT_CLASS_COMPRESSED = 'font-serif italic text-5xl lg:text-6xl uppercase leading-none text-neutral-900'

export default function DucNgoFooter() {
  const pathname = usePathname()
  const { mode } = useViewMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || !SHOWN_PATHS.includes(pathname)) return null

  const label = pathname === '/fun' ? 'Lab' : 'Duc Ngo'

  // Compressed mode: fixed overlay via portal (doesn't scroll)
  if (mode === 'compressed') {
    return createPortal(
      <div className="hidden lg:block fixed top-0 left-0 z-[50]" style={{ paddingTop: '1.5rem', paddingLeft: '1.5rem' }}>
        <p className={TEXT_CLASS_COMPRESSED} style={{ display: 'block', transform: 'translateY(-0.1em)' }}>{label}</p>
      </div>,
      document.body
    )
  }

  // Expand mode: absolute inside scroll wrapper — scrolls with content
  return (
    <div className="hidden lg:block absolute top-0 left-0 z-[50]" style={{ paddingTop: '1.5rem', paddingLeft: '1.5rem' }}>
      <p className={TEXT_CLASS_EXPAND} style={{ display: 'block', transform: 'translateY(-0.1em)' }}>{label}</p>
    </div>
  )
}
