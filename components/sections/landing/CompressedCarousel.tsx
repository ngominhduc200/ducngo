'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useViewMode } from '@/contexts/ViewModeContext'
import { useSlowConnection } from '@/hooks/useSlowConnection'

const PROJECTS = [
  { id: 'peak-create',    label: 'Peak Create Request System',           href: '/peak-create',                                video: '/images/peak-create/cover.mp4',        image: null as string | null, tagline: 'Product Design · 2026',                    title: "Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create", description: "At The Peak, illustration requests ran across Sheets, Slack, Gmail, and Drive with no connection between them. I designed Peak Create: a single tool where editors brief, illustrators submit, and the Production Editor tracks everything from request to invoice. Production Editors said it reduced mental load and saw it as a full replacement for how they work today.",                                                                                                                                        isArchive: false, external: false },
  { id: 'airbnb',         label: 'Airbnb Collaborative Trip Planning',   href: '/airbnb',                                     image: '/images/airbnb/cover.webp',             video: null as string | null, tagline: 'Product Design · Concept 2026',            title: 'Helping groups align on a place to stay together with Airbnb Collaborative Trip Planning',          description: "Group trip planning happens outside Airbnb, with one person carrying all the links and opinions across separate group chats. I designed Collaborative Trip Planning: a feature where members set preferences, browse with merged group filters, react to listings, and see a ranked summary to align without leaving the app. In testing, all 3 participants completed the full flow without prompting and said the summary made group consensus visible without a separate conversation.",                                                                                                                                                                                              isArchive: false, external: false },
  { id: 'hootsuite',      label: 'Hootsuite Composer Widget',            href: '/hootsuite-composer',                         image: '/images/hootsuite-composer/cover.webp', video: null as string | null, tagline: 'UX Design · Handed Off 2025',               title: 'Increasing Feature Discovery for Hootsuite',                                                        description: "Instagram Stories was one of the most-used formats on social media, but inside Hootsuite it sat 4 steps deep in Composer behind a nested dropdown. I designed a homepage widget that surfaces all post formats on the dashboard before users go looking. The project ended with a full engineering handoff, closing the gap between feature discovery and activation for both new and experienced users.",                                                                                                              isArchive: false, external: false },
  { id: 'hootsuite-deck', label: 'Hootsuite Deck of Truth',              href: '/hootsuite-deck',                             image: '/images/hootsuite-deck/preview-4.webp', video: null as string | null, tagline: 'Graphic Design · Shipped 2025',             title: "Shaping Hootsuite's new branding with Deck of Truth redesigned",                                    description: "Hootsuite's slide deck template was misaligned with where the brand was heading: from social media tool to enterprise platform. I audited the current branding and proposed a new direction built on updated typography, colour gradients, and layout composition. The redesigned Deck of Truth was adopted across all departments, and the typography and gradient system carried into the live 2026 brand.",                               isArchive: false, external: false },
  { id: 'discogs-shop',   label: 'Academic Discogs Shop',                href: 'https://ducngo.framer.website/',                   image: '/images/archive/discogs-shop/preview.webp', video: null as string | null,                             tagline: 'Web Design · Front-End Development · 2022', title: 'Discogs Shop Website Redesigned',                                                                             description: "Built a responsive e-commerce website using HTML and CSS, including product listing features and client information pages, deployed on GitHub Pages.",                                                                                                                                                                                                                                              isArchive: true,  external: true,  images: ['/images/archive/discogs-shop/preview.mp4'] },
  { id: 'peak-sfu',       label: 'The Peak SFU',                         href: 'https://ducngo.framer.website/the-peak',           image: '/images/archive/the-peak/cover.webp',  video: null as string | null, tagline: 'Graphic Design · 2022–2024',               title: 'The Peak SFU Magazine Spread',                                                                                      description: "Designed magazine spreads, covers, and section layouts for SFU's student newspaper. Transformed written content and illustrations into engaging visual compositions using layout design, typography selection, and colour palette development.",                                                                                                                                                      isArchive: true,  external: true,  images: Array.from({ length: 16 }, (_, i) => i === 0 ? '/images/archive/the-peak/cover.webp' : `/images/archive/the-peak/spread-${String(i).padStart(2, '0')}.webp`) },
  { id: 'fraser-health',  label: 'Fraser Health Authority',              href: 'https://ducngo.framer.website/fraser-health',      image: '/images/archive/fraser-health/cover.webp', video: null as string | null, tagline: 'Graphic Design · 8-month Co-op · 2023',    title: 'Fraser Health Graphic Assets',                                                                           description: "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",                                                                                                                                                                                          isArchive: true,  external: true,  images: ['/images/archive/fraser-health/cover.webp', ...Array.from({ length: 9 }, (_, i) => `/images/archive/fraser-health/asset-${String(i + 1).padStart(2, '0')}.webp`), '/images/archive/fraser-health/asset-11.webp'] },
  { id: 'douglas-royals', label: 'Douglas College Royals',               href: 'https://ducngo.framer.website/douglas-college-royals', image: '/images/archive/douglas-royals/cover.webp', video: null as string | null, tagline: 'Graphic Design · 2022–2023',               title: 'Douglas College Royals Graphic Assets',                                                                            description: "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",                                                                                                                                                                                                          isArchive: true,  external: true,  images: ['/images/archive/douglas-royals/cover.webp', ...Array.from({ length: 14 }, (_, i) => `/images/archive/douglas-royals/asset-${String(i + 2).padStart(2, '0')}.webp`)] },
  { id: '4c',             label: 'Design Communication', href: 'https://ducngo.framer.website/4c',                image: '/images/archive/iat103/cover.webp', video: null as string | null, tagline: 'Graphic Design · Academic · 2022',          title: 'Character Design for IAT 103 Course Campaign',                                                            description: "Three-week academic project for IAT 103W at SFU. Translated the 4C framework for scholarly composition into a social media awareness campaign. Led character design through Procreate sketches to refined Illustrator vectors, combined with vibrant carousel layouts for engagement.",                                                                                                                   isArchive: true,  external: true,  images: ['/images/archive/iat103/cover.webp', ...Array.from({ length: 8 }, (_, i) => `/images/archive/iat103/image-${29 + i}.webp`)] },
]

function ArchiveSlideshow({ images }: { images: string[] }) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const hasMultiple = images.length > 1

  useEffect(() => {
    if (!isActive || !hasMultiple) return
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % images.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive, hasMultiple, images.length])

  const currentSrc = images[frameIndex]
  const isVideo = /\.(mp4|mov|webm)$/i.test(currentSrc)

  return (
    <div
      className="w-full h-full"
      data-cursor={hasMultiple ? 'playing-slideshow' : undefined}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => { setIsActive(false); setFrameIndex(0) }}
      style={{
        padding: isActive && hasMultiple ? '1%' : '0',
        transition: 'padding 500ms ease',
        boxSizing: 'border-box',
      }}
    >
      {isVideo ? (
        <video
          src={currentSrc}
          poster={currentSrc.replace(/\.(mp4|mov|webm)$/i, '.webp')}
          autoPlay loop muted playsInline preload="auto"
          style={{ width: '100%', height: '100%', objectFit: isActive && hasMultiple ? 'contain' : 'cover', display: 'block' }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt=""
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: isActive && hasMultiple ? 'contain' : 'cover', display: 'block' }}
        />
      )}
    </div>
  )
}

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
                backgroundImage: project.video ? `url(${project.video.replace(/\.mp4$/, '.webp')})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="aspect-[1440/847] flex-shrink-0 overflow-hidden"
            >
              {project.isArchive ? (
                <ArchiveSlideshow images={project.images ?? (project.image ? [project.image] : [])} />
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
