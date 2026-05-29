'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const DEFAULT_navItems = [
  { label: 'how it started', id: 'how-it-started' },
  { label: 'research', id: 'research' },
  { label: 'findings', id: 'findings' },
  { label: 'design challenge', id: 'design-challenge' },
  { label: 'design process', id: 'design-process' },
  { label: 'final solution', id: 'final-solution' },
  { label: 'result', id: 'result' },
]

const baseClass = 'font-sans text-sm no-underline hover:text-orange-500 active:text-orange-500'

export default function CaseStudyNav({ navItems = DEFAULT_navItems }: {
  navItems?: { label: string; id: string }[]
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [atFooter, setAtFooter] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Scroll fallback for sections outside the narrow intersection band (e.g. full-width showcase)
    const handleScroll = () => {
      let best: string | null = null
      let bestDist = Infinity
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const dist = Math.abs(rect.top - window.innerHeight * 0.4)
        if (dist < bestDist) { bestDist = dist; best = id }
      })
      if (best) setActiveId(best)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Watch for dark-background sections
    const darkObserver = new IntersectionObserver(
      (entries) => {
        const anyDark = entries.some(e => e.isIntersecting)
        setIsDark(anyDark)
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-dark-bg]').forEach(el => darkObserver.observe(el))

    const footerObserver = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0 }
    )
    const trigger = document.getElementById('footer-trigger')
    if (trigger) footerObserver.observe(trigger)

    return () => {
      observer.disconnect()
      darkObserver.disconnect()
      footerObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const textColor = isDark ? 'text-white' : 'text-neutral-900'

  if (!mounted) return null

  return createPortal(
    <nav className={`hidden lg:flex fixed left-6 top-0 bottom-0 z-10 flex-col gap-[24px] w-auto justify-center transition-opacity duration-300 ${atFooter ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Link href="/" className={`${baseClass} ${textColor} transition-colors duration-300`} aria-label="Home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
      </Link>
      <div className="flex flex-col gap-[18px]">
        {navItems.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`${baseClass} transition-colors duration-300 ${activeId === id ? 'text-orange-500' : textColor}`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>,
    document.body
  )
}
