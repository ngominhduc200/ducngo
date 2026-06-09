'use client'

import { useEffect, useRef, useState } from 'react'
import { useAboutModal } from '@/contexts/AboutModalContext'
import { useViewMode } from '@/contexts/ViewModeContext'
import AboutContent from '@/components/sections/AboutContent'

export default function AboutModal() {
  const { isOpen, close } = useAboutModal()
  const { mode } = useViewMode()
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation | null>(null)

  // Entrance: fires when component mounts (show just became true)
  useEffect(() => {
    if (!show) return
    const el = ref.current
    if (!el) return
    if (animRef.current) animRef.current.cancel()
    animRef.current = el.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 300, easing: 'ease-out', fill: 'forwards' }
    )
  }, [show])

  // Handle open/close
  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      const el = ref.current
      if (!el) { setShow(false); return }
      if (animRef.current) animRef.current.cancel()
      animRef.current = el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: 'ease-in', fill: 'forwards' }
      )
      animRef.current.onfinish = () => setShow(false)
    }
  }, [isOpen])

  if (!show) return null

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    close()
  }

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className={`fixed inset-0 z-[900] flex items-center backdrop-blur-xl ${mode === 'compressed' ? 'bg-[#0a0a0a]/90' : 'bg-stone-50/80'}`}
      onClick={handleClick}
    >
      <AboutContent />
    </div>
  )
}
