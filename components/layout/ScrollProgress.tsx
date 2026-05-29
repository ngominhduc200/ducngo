'use client'

import { useEffect, useState, useRef } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)

      // Show while scrolling, fade out after scrolling stops
      setVisible(true)
      clearTimeout(stopTimer.current)
      stopTimer.current = setTimeout(() => setVisible(false), 800)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      clearTimeout(stopTimer.current)
    }
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] h-0.5 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="h-full bg-orange-500 origin-left"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
