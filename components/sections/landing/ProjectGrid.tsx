'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import ProjectCard from '@/components/ui/ProjectCard'

const ARCHIVE = [
  {
    id: 'archive-discogs',
    title: 'Discogs Shop Website Redesigned',
    category: 'Web Design · Front-End Development',
    year: '2025',
    description:
      'Built a responsive e-commerce website using HTML and CSS, including product listing features and client information pages, deployed on GitHub Pages.',
    images: [
      '/images/archive-compressed/discogs-shop/preview.mp4',
    ],
  },
  {
    id: 'archive-the-peak',
    title: 'The Peak SFU Magazine Spread',
    category: 'Graphic Design',
    year: '2022–2024',
    description:
      "Designed magazine spreads, covers, and section layouts for SFU's student newspaper. Transformed written content and illustrations into engaging visual compositions using layout design, typography selection, and colour palette development.",
    images: Array.from({ length: 16 }, (_, i) =>
      i === 0 ? '/images/archive-compressed/the-peak/cover.jpg' : `/images/archive-compressed/the-peak/spread-${String(i).padStart(2, '0')}.jpg`
    ).map((p, i) => i === 15 ? p.replace('.jpg', '.png') : p),
  },
  {
    id: 'archive-fraser-health',
    title: 'Fraser Health Graphic Assets',
    category: 'Graphic Design · 8-month Co-op',
    year: '2023',
    description:
      "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",
    images: Array.from({ length: 11 }, (_, i) => `/images/archive-compressed/fraser-health/asset-${String(i + 1).padStart(2, '0')}.png`),
  },
  {
    id: 'archive-douglas-royals',
    title: 'Douglas College Royals Graphic Assets',
    category: 'Graphic Design',
    year: '2022–2023',
    description:
      "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",
    images: [
      '/images/archive-compressed/douglas-royals/cover.jpg',
      ...Array.from({ length: 15 }, (_, i) => {
        const n = i + 1
        const ext = [3, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(n) ? 'png' : 'jpg'
        return `/images/archive-compressed/douglas-royals/asset-${String(n).padStart(2, '0')}.${ext}`
      }),
    ],
  },
  {
    id: 'archive-4c',
    title: 'Character Design for IAT103 Course Campaign',
    category: 'Graphic Design',
    year: '2022',
    description:
      'Three-week academic project for IAT 103W at SFU. Translated the 4C framework for scholarly composition into a social media awareness campaign. Led character design through Procreate sketches to refined Illustrator vectors, combined with vibrant carousel layouts for engagement.',
    images: Array.from({ length: 9 }, (_, i) => `/images/archive-compressed/iat103/image-${28 + i}.png`),
  },
]

export default function ProjectGrid() {
  const [activeId, setActiveId]     = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [frameIndex, setFrameIndex] = useState(0)
  const [mounted, setMounted]       = useState(false)
  const isHoveringRef    = useRef(false)
  const scrollDirRef     = useRef<'down' | 'up'>('down')
  const prevScrollYRef   = useRef(0)
  const prevActiveRef    = useRef<string | null>(null)
  const scrollActiveRef  = useRef<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Reset frame index when active project changes
  useEffect(() => { setFrameIndex(0) }, [activeId])

  // Broadcast activeId so other components (LandingNav) can sync
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('archive-active', { detail: { id: activeId } }))
  }, [activeId])

  const activeImage = ARCHIVE.find(p => p.id === activeId)?.images[frameIndex] ?? null

  // Cycle images every 0.5s
  useEffect(() => {
    if (!activeId) return
    const project = ARCHIVE.find(p => p.id === activeId)
    if (!project || project.images.length <= 1) return
    const interval = setInterval(() => {
      setFrameIndex(i => (i + 1) % project.images.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeId])

  // Scroll-based activation — targets text div only, not the expanded image
  useEffect(() => {
    const handleScroll = () => {
      if (isHoveringRef.current) return

      const currentY = window.scrollY
      scrollDirRef.current = currentY >= prevScrollYRef.current ? 'down' : 'up'
      prevScrollYRef.current = currentY

      const target = window.innerHeight * 0.5
      let best: string | null = null
      let bestDist = Infinity
      ARCHIVE.forEach(({ id }) => {
        const el = document.querySelector<HTMLElement>(`[data-archive-text="${id}"]`)
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - target)
        if (dist < bestDist) { bestDist = dist; best = id }
      })
      if (bestDist > window.innerHeight * 0.1) best = null

      scrollActiveRef.current = best
      if (best !== prevActiveRef.current) {
        prevActiveRef.current = best
        setActiveId(best)
        if (best !== null && scrollDirRef.current === 'down') {
          setExpandedIds(prev => new Set([...prev, best as string]))
        }
      }
    }

    const archiveEl = document.getElementById('archive')
    const sectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setActiveId(null)
        prevActiveRef.current = null
        scrollActiveRef.current = null
        // Also reset expanded images when scrolled up past archive
        if (entry.boundingClientRect.top > window.innerHeight) {
          setExpandedIds(new Set())
        }
      }
    }, { threshold: 0 })
    if (archiveEl) sectionObserver.observe(archiveEl)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      sectionObserver.disconnect()
    }
  }, [])


  return (
    <>
      <section id="work" aria-label="Work" className="flex flex-col items-center w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[50rem] px-6 mb-16 md:mb-0">
        <ProjectCard
          id="project-peak-create"
          className="pt-20 pb-0 md:py-[150px]"
          title="Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create"
          meta="Product Design · 2026"
          href="/work/peak-create"
          video="/images/peak-create-compressed/cover.mp4"
        />
        <ProjectCard
          id="project-airbnb"
          className="pt-20 pb-0 md:py-[150px]"
          title="Helping groups align on a place to stay together with Airbnb Collaborative Trip Planning"
          meta="Product Design · Concept 2026"
          href="/work/airbnb"
          image="/images/airbnb-compressed/cover.png"
          imageAlt="Collaborative Trip Planning case study preview"
        />
        <ProjectCard
          id="project-hootsuite"
          className="pt-20 pb-0 md:py-[150px]"
          title="Increasing Feature Discovery for Hootsuite"
          meta="UX Design · Handed Off 2025"
          href="/work/hootsuite-composer"
          image="/images/hootsuite-composer-compressed/cover.png"
          imageAlt="Hootsuite Composer case study preview"
        />
        <ProjectCard
          id="project-hootsuite-deck"
          className="pt-20 pb-0 md:py-[150px]"
          title="Shaping Hootsuite&apos;s new branding with Deck of Truth redesigned"
          meta="Graphic Design · 2025"
          href="/work/hootsuite-deck"
          image="/images/hootsuite-deck-compressed/preview-4.png"
          imageAlt="Hootsuite Deck of Truth preview"
        />
      </section>

      {/* Fixed media panel */}
      {mounted && activeImage && createPortal(
        <div
          className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 pointer-events-none z-50 justify-center"
          style={{ width: '20vw', maxWidth: 'calc((100vw - 50rem) / 2 - 2rem)' }}
        >
          {/\.(mp4|mov|webm)$/i.test(activeImage) ? (
            <video
              key={activeImage}
              src={activeImage}
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full h-auto block"
            />
          ) : (
            <Image src={activeImage} alt="" width={0} height={0} sizes="20vw" style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>,
        document.body
      )}

      <section
        id="archive"
        aria-label="Archive"
        className="w-full flex flex-col items-center pb-16 md:pb-[150px] mb-[100px]"
      >
        <div className="w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[50rem] px-6">
          <div className="flex flex-col gap-[10px] pt-[50px] pb-[30px] md:py-[50px]">
            <h2 className="font-serif font-normal text-4xl text-neutral-900">Archive</h2>
            <p className="font-sans text-base text-neutral-400">Graphic design, front-end development, and co-op work from my earlier years.</p>
          </div>

          <hr className="border-t border-zinc-200 w-full" />

          {ARCHIVE.map((project, index) => {
            const isActive = activeId === project.id
            const isLast = index === ARCHIVE.length - 1
            return (
              <div
                key={project.id}
                id={project.id}
                className="cursor-default"
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse') return
                  isHoveringRef.current = true
                  setActiveId(project.id)
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== 'mouse') return
                  isHoveringRef.current = false
                  setActiveId(scrollActiveRef.current)
                }}

              >
                <div className="flex flex-col gap-[20px] py-[30px] md:py-[50px] w-full" data-archive-text={project.id}>
                  <div className="flex flex-col gap-[10px]">
                    <h3 className={`font-serif font-normal text-2xl leading-[1.3] transition-colors duration-300 ${isActive ? 'italic text-orange-500' : 'text-neutral-900'}`}>
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
                  </div>
                  <p className="font-sans text-base text-neutral-600">{project.description}</p>

                  {/* Mobile inline image — expands when active */}
                  <div
                    className={`md:hidden overflow-hidden transition-[max-height] duration-700 ease-in-out ${expandedIds.has(project.id) ? 'max-h-[75vw]' : 'max-h-0'}`}
                  >
                    <div className="relative w-full aspect-[4/3]">
                      {/\.(mp4|mov|webm)$/i.test(project.images[0]) ? (
                        <video src={project.images[0]} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain" style={{ objectPosition: 'right top' }} />
                      ) : (
                        <Image src={project.images[0]} alt="" fill style={{ objectFit: 'contain', objectPosition: 'right top' }} />
                      )}
                    </div>
                  </div>
                </div>
                {!isLast && <hr className="border-t border-zinc-200 w-full" />}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
