'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const PROJECTS = [
  { label: 'Peak Create Request System', id: 'project-peak-create' },
  { label: 'Airbnb Collaborative Planning', id: 'project-airbnb' },
  { label: 'Hootsuite Composer Widget', id: 'project-hootsuite' },
  { label: 'Hootsuite Deck of Truth', id: 'project-hootsuite-deck' },
  { label: 'Archive', id: 'archive' },
]

const baseClass = 'font-sans text-sm no-underline hover:text-orange-500 active:text-orange-500'

export default function LandingNav() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [atTop, setAtTop] = useState(true)
  const [atFooter, setAtFooter] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navVisible = !atTop && !atFooter
  const isExpanded = navVisible && isHovered

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = PROJECTS.findIndex(p => p.id === entry.target.id)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    PROJECTS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    setMounted(true)

    const checkTop = () => setAtTop(window.scrollY < 50)
    window.addEventListener('scroll', checkTop, { passive: true })
    checkTop()

    const checkFooter = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - window.innerHeight * 0.8
      setAtFooter(atBottom)
    }
    window.addEventListener('scroll', checkFooter, { passive: true })
    checkFooter()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', checkTop)
      window.removeEventListener('scroll', checkFooter)
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <nav
      className={`hidden lg:flex fixed left-6 top-0 bottom-0 z-10 flex-col justify-center w-auto pointer-events-none transition-opacity duration-300 ${
        navVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="flex flex-col h-[33vh] justify-center pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Counter */}
        <div className="relative h-5 flex items-center">
          <span className={`font-sans text-sm select-none ${activeIdx !== null ? 'text-orange-500' : 'text-neutral-400'}`}>
            {activeIdx !== null ? activeIdx + 1 : 0}/{PROJECTS.length}
          </span>
        </div>

        {/* Project list — only expands on hover */}
        <div
          className="flex flex-col overflow-hidden"
          style={{
            maxHeight: isExpanded ? '400px' : '0px',
            opacity: isExpanded ? 1 : 0,
            transition: 'max-height 400ms ease-in-out, opacity 300ms ease-in-out',
          }}
        >
          <div className="flex flex-col gap-[18px] pt-6">
            {PROJECTS.map(({ label, id }, idx) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${baseClass} ${activeIdx === idx ? 'text-orange-500' : 'text-neutral-400'}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>,
    document.body
  )
}
