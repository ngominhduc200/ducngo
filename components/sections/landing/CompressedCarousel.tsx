'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useViewMode } from '@/contexts/ViewModeContext'
import { useSlowConnection } from '@/hooks/useSlowConnection'

const PROJECTS = [
  { id: 'peak-create',    label: 'Peak Create Request System',           href: '/project/peak-create',                                video: '/images/peak-create-compressed/cover.mp4',        image: null as string | null, tagline: 'Product Design · 2026',                    title: "Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create", description: "Over one month, I designed the user experience and interface for an illustration request tool that connects Production Editors, Section Editors, and Illustrators in one shared workspace with full visibility into the workflow. I collaborated with a UX researcher and two UX writers.",                                                                                                                                        isArchive: false, external: false },
  { id: 'airbnb',         label: 'Airbnb Collaborative Trip Planning',   href: '/project/airbnb',                                     image: '/images/airbnb-compressed/cover.webp',             video: null as string | null, tagline: 'Product Design · Concept 2026',            title: 'Helping groups align on a place to stay together with Airbnb Collaborative Trip Planning',          description: "In 3 weeks, I led the user research, wireframes, and prototype for a new Airbnb feature that lets groups collaborate on finding and booking a place to stay inside the app. I worked with a UX researcher and two UX designers.",                                                                                                                                                                                              isArchive: false, external: false },
  { id: 'hootsuite',      label: 'Hootsuite Composer Widget',            href: '/project/hootsuite-composer',                         image: '/images/hootsuite-composer-compressed/cover.webp', video: null as string | null, tagline: 'UX Design · Handed Off 2025',               title: 'Increasing Feature Discovery for Hootsuite',                                                        description: "During my internship, I designed a homepage feature that helps Hootsuite users discover the posting options available across their social channels. The project ended with a full handoff to engineering. I worked as a UX Designer, alongside a mentor, partnered with two PMs, and supported by a Senior UX Designer.",                                                                                                              isArchive: false, external: false },
  { id: 'hootsuite-deck', label: 'Hootsuite Deck of Truth',              href: '/project/hootsuite-deck',                             image: '/images/hootsuite-deck-compressed/preview-4.webp', video: null as string | null, tagline: 'Graphic Design · Shipped 2025',             title: "Shaping Hootsuite's new branding with Deck of Truth redesigned",                                    description: "In September 2025, I spent one month with the brand marketing team auditing the current branding, and proposing a new direction to help shift Hootsuite's brand from social to enterprise. My work was first introduced as a presentation slide deck template, reflecting updated typography, colour, and layout composition that looks modern and enterprise-ready, aligned with the 2026 direction. This deck template was adopted internally across all departments.",                               isArchive: false, external: false },
  { id: 'discogs-shop',   label: 'Academic Discogs Shop',                href: 'https://ducngo.framer.website/',                   image: '/images/archive-compressed/discogs-shop/preview.webp', video: null as string | null,                             tagline: 'Web Design · Front-End Development · 2022', title: 'Discogs Shop Website Redesigned',                                                                             description: "Built a responsive e-commerce website using HTML and CSS, including product listing features and client information pages, deployed on GitHub Pages.",                                                                                                                                                                                                                                              isArchive: true,  external: true  },
  { id: 'peak-sfu',       label: 'The Peak SFU',                         href: 'https://ducngo.framer.website/the-peak',           image: '/images/archive-compressed/the-peak/cover.webp',  video: null as string | null, tagline: 'Graphic Design · 2022–2024',               title: 'The Peak SFU Magazine Spread',                                                                                      description: "Designed magazine spreads, covers, and section layouts for SFU's student newspaper. Transformed written content and illustrations into engaging visual compositions using layout design, typography selection, and colour palette development.",                                                                                                                                                      isArchive: true,  external: true  },
  { id: 'fraser-health',  label: 'Fraser Health Authority',              href: 'https://ducngo.framer.website/fraser-health',      image: '/images/archive-compressed/fraser-health/cover.webp', video: null as string | null, tagline: 'Graphic Design · 8-month Co-op · 2023',    title: 'Fraser Health Graphic Assets',                                                                           description: "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",                                                                                                                                                                                          isArchive: true,  external: true  },
  { id: 'douglas-royals', label: 'Douglas College Royals',               href: 'https://ducngo.framer.website/douglas-college-royals', image: '/images/archive-compressed/douglas-royals/cover.webp', video: null as string | null, tagline: 'Graphic Design · 2022–2023',               title: 'Douglas College Royals Graphic Assets',                                                                            description: "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",                                                                                                                                                                                                          isArchive: true,  external: true  },
  { id: '4c',             label: 'Design Communication', href: 'https://ducngo.framer.website/4c',                image: '/images/archive-compressed/iat103/cover.webp', video: null as string | null, tagline: 'Graphic Design · Academic · 2022',          title: 'Character Design for IAT 103 Course Campaign',                                                            description: "Three-week academic project for IAT 103W at SFU. Translated the 4C framework for scholarly composition into a social media awareness campaign. Led character design through Procreate sketches to refined Illustrator vectors, combined with vibrant carousel layouts for engagement.",                                                                                                                   isArchive: true,  external: true  },
]

const GAP  = 64   // px between items
const EASE = 0.1  // lerp factor per frame

export default function CompressedCarousel() {
  const { mode } = useViewMode()
  const slowConnection = useSlowConnection()
  const [mounted, setMounted]     = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const router       = useRouter()
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const itemsRef     = useRef<HTMLDivElement[]>([])
  const activeIdxRef = useRef<number | null>(null)
  const routerRef    = useRef(router)
  useEffect(() => { routerRef.current = router }, [router])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || mode !== 'compressed') return

    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    wrapper.animate(
      [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 500, easing: 'ease-out', fill: 'forwards' }
    )

    document.body.style.overflow = 'hidden'

    // Pre-activate first project so nav shows immediately on load
    window.dispatchEvent(new CustomEvent('compressed-active', {
      detail: {
        index:       1,
        label:       PROJECTS[0].label,
        tagline:     PROJECTS[0].tagline,
        title:       PROJECTS[0].title,
        description: PROJECTS[0].description,
        href:        PROJECTS[0].href,
        isArchive:   PROJECTS[0].isArchive,
      }
    }))

    const n = PROJECTS.length
    let half    = 0
    let target  = 0
    let current = 0
    let raf     = 0

    const computeMetrics = () => {
      let total = 0
      for (let i = 0; i < n; i++) {
        const el = itemsRef.current[i]
        if (!el) return
        total += el.offsetHeight
      }
      half = total + n * GAP

      // paddingTop: center copy-1's first item at 50vh
      const el0 = itemsRef.current[0]
      if (el0) {
        track.style.paddingTop = `${window.innerHeight / 2 - el0.offsetHeight / 2}px`
      }

      // Start positioned at copy 2 so copy 1's items are visible above
      if (current === 0) {
        current = half
        target  = half
        track.style.transform = `translateY(${-current}px)`
      }
    }

    const timer = setTimeout(computeMetrics, 120)
    const ro = new ResizeObserver(computeMetrics)
    ro.observe(track)

    const detectActive = () => {
      const center = window.innerHeight / 2
      let bestIdx: number | null = null
      let bestDist = Infinity
      itemsRef.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - center)
        if (dist < bestDist) { bestDist = dist; bestIdx = i % n }
      })
      if (bestIdx !== activeIdxRef.current) {
        activeIdxRef.current = bestIdx
        setActiveIdx(bestIdx)
        const proj = bestIdx !== null ? PROJECTS[bestIdx] : null
        window.dispatchEvent(new CustomEvent('compressed-active', {
          detail: {
            index:       proj ? bestIdx! + 1 : null,
            label:       proj?.label       ?? null,
            tagline:     proj?.tagline     ?? null,
            title:       proj?.title       ?? null,
            description: proj?.description ?? null,
            href:        proj?.href        ?? null,
            isArchive:   proj?.isArchive   ?? false,
          }
        }))
      }
    }

    const tick = () => {
      current += (target - current) * EASE

      // Re-centre silently when we drift out of the middle copy's range
      const h = half || 1
      if (current > h * 1.9) { current -= h; target -= h }
      if (current < h * 0.1) { current += h; target += h }

      track.style.transform = `translateY(${-current}px)`
      detectActive()

      if (Math.abs(target - current) > 0.1) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        detectActive()
      }
    }

    const resume = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target += e.deltaY
      resume()
    }
    wrapper.addEventListener('wheel', onWheel, { passive: false })

    let lastY = 0, lastDelta = 0, isDragging = false
    let startY = 0, hasMoved = false, pendingHref: string | null = null

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true; lastY = e.clientY; startY = e.clientY; lastDelta = 0; hasMoved = false
      pendingHref = (e.target as HTMLElement).closest('a')?.getAttribute('href') ?? null
      wrapper.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      if (Math.abs(e.clientY - startY) > 8) hasMoved = true
      lastDelta = lastY - e.clientY
      target += lastDelta
      lastY = e.clientY
      resume()
    }
    const onPointerUp = () => {
      if (!isDragging) return
      isDragging = false
      if (!hasMoved && pendingHref) {
        if (pendingHref.startsWith('http')) {
          window.open(pendingHref, '_blank', 'noopener,noreferrer')
        } else {
          routerRef.current.push(pendingHref)
        }
        return
      }
      target += lastDelta * 8
      resume()
    }

    wrapper.addEventListener('pointerdown', onPointerDown)
    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerup',   onPointerUp)
    wrapper.addEventListener('pointercancel', onPointerUp)

    const handleNavigate = (e: Event) => {
      const { index } = (e as CustomEvent<{ index: number }>).detail
      const el = itemsRef.current[n + index]
      if (!el) return
      const rect = el.getBoundingClientRect()
      target += (rect.top + rect.height / 2) - window.innerHeight / 2
      resume()
    }
    window.addEventListener('compressed-navigate', handleNavigate)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      ro.disconnect()
      document.body.style.overflow = ''
      wrapper.removeEventListener('wheel', onWheel)
      wrapper.removeEventListener('pointerdown', onPointerDown)
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerup',   onPointerUp)
      wrapper.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('compressed-navigate', handleNavigate)
    }
  }, [mounted, mode])

  if (!mounted || mode !== 'compressed') return null

  // 3 copies so items are always visible above and below
  const tripled = [...PROJECTS, ...PROJECTS, ...PROJECTS]

  return createPortal(
    <div
      ref={wrapperRef}
      data-lenis-prevent
      className="hidden lg:block fixed inset-0 z-[2] overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ paddingLeft: 'calc(18vw + 144px)' }}
    >
      <div
        ref={trackRef}
        className="flex flex-col"
        style={{ gap: `${GAP}px`, paddingBottom: '50vh', willChange: 'transform' }}
      >
        {tripled.map((project, i) => {
          const projIdx = i % PROJECTS.length
          const isActive = projIdx === activeIdx
          return (
            <div
              key={`${project.id}-${i}`}
              ref={el => { if (el) itemsRef.current[i] = el }}
              style={{
                width: '32vw',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transformOrigin: 'left center',
                transition: 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                backgroundColor: project.video ? undefined : '#e5e5e5',
                backgroundImage: project.video ? `url(${project.video.replace(/\.mp4$/, '.webp')})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="aspect-[1440/847] flex-shrink-0 overflow-hidden bg-[#0a0a0a]"
            >
              {project.isArchive ? (
                <div className="w-full h-full">
                  {project.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt="" loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              ) : (
                <Link href={project.href} className="block w-full h-full no-underline" data-cursor="read-case-study">
                  {project.video ? (
                    slowConnection
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={project.video.replace(/\.mp4$/, '.webp')} alt="" style={{ height: '100%', width: 'auto', objectFit: 'cover' }} />
                      : <video src={project.video} poster={project.video.replace(/\.mp4$/, '.webp')} autoPlay loop muted playsInline preload="auto" className="h-full w-auto" />
                  ) : project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt="" loading="eager" style={{ height: '100%', width: 'auto' }} />
                  ) : null}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>,
    document.body
  )
}
