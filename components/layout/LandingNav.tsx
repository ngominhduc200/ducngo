'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const PROJECTS = [
  { label: 'Peak Create', id: 'project-peak-create' },
  { label: 'Airbnb Collaborative Planning', id: 'project-airbnb' },
  { label: 'Hootsuite Composer', id: 'project-hootsuite' },
  { label: 'Hootsuite Deck of Truth', id: 'project-hootsuite-deck' },
  { label: 'More of my work', id: 'project-more' },
]

const baseClass = 'font-sans text-sm no-underline hover:text-orange-500 active:text-orange-500'

export default function LandingNav() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [atMoreWork, setAtMoreWork] = useState(false)
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

    const moreWorkObserver = new IntersectionObserver(
      ([entry]) => setAtMoreWork(entry.isIntersecting),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    const moreWorkEl = document.getElementById('more-work')
    if (moreWorkEl) moreWorkObserver.observe(moreWorkEl)

    setMounted(true)

    const checkTop = () => setAtTop(window.scrollY < 50)
    window.addEventListener('scroll', checkTop, { passive: true })
    checkTop()

    const footerObserver = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0 }
    )
    const trigger = document.getElementById('footer-trigger')
    if (trigger) footerObserver.observe(trigger)

    return () => {
      observer.disconnect()
      moreWorkObserver.disconnect()
      footerObserver.disconnect()
      window.removeEventListener('scroll', checkTop)
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <nav
      className={`fixed left-6 top-0 bottom-0 z-10 flex flex-col justify-center w-auto pointer-events-none transition-opacity duration-300 ${
        navVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="flex flex-col h-[33vh] justify-center pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Counter / icon — crossfade between the two */}
        <div className="relative h-5 flex items-center">
          <span className={`font-sans text-sm select-none transition-all duration-300 ${atMoreWork ? 'opacity-0' : 'opacity-100'} ${activeIdx !== null ? 'text-orange-500' : 'text-neutral-900'}`}>
            {activeIdx !== null ? activeIdx + 1 : 0}/{PROJECTS.length}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 text-orange-500 absolute left-0 transition-all duration-300 ${atMoreWork ? 'opacity-100' : 'opacity-0'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
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
                className={`${baseClass} ${!atMoreWork && activeIdx === idx ? 'text-orange-500' : 'text-neutral-900'}`}
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
