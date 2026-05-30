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
      '/images/archive/discogs-shop/preview.mp4',
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
      i === 0 ? '/images/archive/the-peak/cover.jpg' : `/images/archive/the-peak/spread-${String(i).padStart(2, '0')}.jpg`
    ).map((p, i) => i === 15 ? p.replace('.jpg', '.png') : p),
  },
  {
    id: 'archive-fraser-health',
    title: 'Fraser Health Graphic Assets',
    category: 'Graphic Design · 8-month Co-op',
    year: '2023',
    description:
      "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",
    images: Array.from({ length: 11 }, (_, i) => `/images/archive/fraser-health/asset-${String(i + 1).padStart(2, '0')}.png`),
  },
  {
    id: 'archive-douglas-royals',
    title: 'Douglas College Royals Graphic Assets',
    category: 'Graphic Design',
    year: '2022–2023',
    description:
      "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",
    images: [
      '/images/archive/douglas-royals/cover.jpg',
      ...Array.from({ length: 15 }, (_, i) => {
        const n = i + 1
        const ext = [3, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(n) ? 'png' : 'jpg'
        return `/images/archive/douglas-royals/asset-${String(n).padStart(2, '0')}.${ext}`
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
    images: Array.from({ length: 9 }, (_, i) => `/images/archive/iat103/image-${28 + i}.png`),
  },
]

export default function ProjectGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [frameIndex, setFrameIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const isHoveringRef = useRef(false)
  const intersectingRef = useRef<Set<string>>(new Set())

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const checkFooter = () => {
      setAtFooter(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', checkFooter, { passive: true })
    checkFooter()
    return () => window.removeEventListener('scroll', checkFooter)
  }, [])

  // Reset frame index when active project changes
  useEffect(() => { setFrameIndex(0) }, [activeId])

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

  // Scroll-based activation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target.id)
          } else {
            intersectingRef.current.delete(entry.target.id)
          }
        })
        if (!isHoveringRef.current) {
          const ids = Array.from(intersectingRef.current)
          setActiveId(ids.length > 0 ? ids[ids.length - 1] : null)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    ARCHIVE.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])


  return (
    <>
      <section id="work" aria-label="Work" className="flex flex-col items-center w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] px-6">
        <ProjectCard
          id="project-peak-create"
          className="py-16 md:py-[150px]"
          title="Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create"
          meta="Product Design · 2026"
          href="/work/peak-create"
          video="/images/peak-create/cover.mp4"
        />
        <ProjectCard
          id="project-airbnb"
          className="py-16 md:py-[150px]"
          title="Collaborative trip planning"
          meta="Product Design · Concept 2026"
          href="/work/airbnb"
          image="/images/airbnb/cover.png"
          imageAlt="Collaborative Trip Planning case study preview"
        />
        <ProjectCard
          id="project-hootsuite"
          className="py-16 md:py-[150px]"
          title="Increasing Feature Discovery for Hootsuite"
          meta="UX Design · Handed Off 2025"
          href="/work/hootsuite-composer"
          image="/images/hootsuite-composer/cover.png"
          imageAlt="Hootsuite Composer case study preview"
        />
        <ProjectCard
          id="project-hootsuite-deck"
          className="py-16 md:py-[150px]"
          title="Shaping Hootsuite&apos;s new branding with Deck of Truth redesigned"
          meta="Graphic Design · 2025"
          href="/work/hootsuite-deck"
          image="/images/hootsuite-deck/preview-4.png"
          imageAlt="Hootsuite Deck of Truth preview"
        />
      </section>

      {/* Fixed media panel */}
      {mounted && activeImage && !atFooter && createPortal(
        <div
          className="fixed right-8 top-1/2 -translate-y-1/2 pointer-events-none z-50 flex justify-center"
          style={{ width: '20vw' }}
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
        <div className="w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] px-6">
          <div className="flex flex-col gap-[10px] py-[50px]">
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
                onMouseEnter={() => {
                  isHoveringRef.current = true
                  setActiveId(project.id)
                }}
                onMouseLeave={() => {
                  isHoveringRef.current = false
                  const ids = Array.from(intersectingRef.current)
                  setActiveId(ids.length > 0 ? ids[ids.length - 1] : null)
                }}
              >
                <div className="flex flex-col gap-[20px] py-[50px] w-full">
                  <div className="flex flex-col gap-[10px]">
                    <h3 className={`font-serif font-normal text-2xl leading-[1.3] transition-colors duration-300 ${isActive ? 'italic text-orange-500' : 'text-neutral-900'}`}>
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
                  </div>
                  <p className="font-sans text-base text-neutral-600">{project.description}</p>
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
