'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useViewMode } from '@/contexts/ViewModeContext'

const FEATURE = [
  {
    id: 'project-peak-create',
    title: "Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create",
    category: 'Product Design',
    year: '2026',
    description: 'Over one month, I designed the user experience and interface for an illustration request tool that connects Production Editors, Section Editors, and Illustrators in one shared workspace with full visibility into the workflow. I collaborated with a UX researcher and two UX writers.',
    cover: { type: 'video' as const, src: '/images/peak-create-compressed/cover.mp4' },
    href: '/project/peak-create',
  },
  {
    id: 'project-airbnb',
    title: 'Helping groups align on a place to stay together with Airbnb Collaborative Trip Planning',
    category: 'Product Design',
    year: 'Concept 2026',
    description: 'In 3 weeks, I led the user research, wireframes, and prototype for a new Airbnb feature that lets groups collaborate on finding and booking a place to stay inside the app. I worked with a UX researcher and two UX designers.',
    cover: { type: 'image' as const, src: '/images/airbnb-compressed/cover.webp' },
    href: '/project/airbnb',
  },
  {
    id: 'project-hootsuite',
    title: 'Increasing Feature Discovery for Hootsuite',
    category: 'UX Design',
    year: 'Handed Off 2025',
    description: 'During my internship, I designed a homepage feature that helps Hootsuite users discover the posting options available across their social channels. The project ended with a full handoff to engineering. I worked as a UX Designer, alongside a mentor, partnered with two PMs, and supported by a Senior UX Designer.',
    cover: { type: 'image' as const, src: '/images/hootsuite-composer-compressed/cover.webp' },
    href: '/project/hootsuite-composer',
  },
  {
    id: 'project-hootsuite-deck',
    title: "Shaping Hootsuite's new branding with Deck of Truth redesigned",
    category: 'Graphic Design',
    year: 'Shipped 2025',
    description: "In September 2025, I spent one month with the brand marketing team auditing the current branding, and proposing a new direction to help shift Hootsuite's brand from social to enterprise. My work was first introduced as a presentation slide deck template, reflecting updated typography, colour, and layout composition that looks modern and enterprise-ready, aligned with the 2026 direction. This deck template was adopted internally across all departments.",
    cover: { type: 'image' as const, src: '/images/hootsuite-deck-compressed/preview-4.webp' },
    href: '/project/hootsuite-deck',
  },
]

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
      i === 0 ? '/images/archive-compressed/the-peak/cover.webp' : `/images/archive-compressed/the-peak/spread-${String(i).padStart(2, '0')}.webp`
    ),
  },
  {
    id: 'archive-fraser-health',
    title: 'Fraser Health Graphic Assets',
    category: 'Graphic Design · 8-month Co-op',
    year: '2023',
    description:
      "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",
    images: [
      '/images/archive-compressed/fraser-health/cover.webp',
      ...Array.from({ length: 9 }, (_, i) => `/images/archive-compressed/fraser-health/asset-${String(i + 1).padStart(2, '0')}.webp`),
      '/images/archive-compressed/fraser-health/asset-11.webp',
    ],
  },
  {
    id: 'archive-douglas-royals',
    title: 'Douglas College Royals Graphic Assets',
    category: 'Graphic Design',
    year: '2022–2023',
    description:
      "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",
    images: [
      '/images/archive-compressed/douglas-royals/cover.webp',
      ...Array.from({ length: 14 }, (_, i) => {
        const n = i + 2
        return `/images/archive-compressed/douglas-royals/asset-${String(n).padStart(2, '0')}.webp`
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
    images: [
      '/images/archive-compressed/iat103/cover.webp',
      ...Array.from({ length: 8 }, (_, i) => `/images/archive-compressed/iat103/image-${29 + i}.webp`),
    ],
  },
]


function ArchiveCard({ project }: { project: typeof ARCHIVE[0] }) {
  const [isActive, setIsActive] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const hasMultiple = project.images.length > 1

  useEffect(() => {
    if (!isActive || !hasMultiple) return
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % project.images.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive, hasMultiple, project.images.length])

  const currentSrc = project.images[frameIndex]

  return (
    <div
      id={project.id}
      data-cursor={hasMultiple ? 'playing-slideshow' : undefined}
      onPointerEnter={(e) => { if (e.pointerType !== 'mouse') return; setIsActive(true) }}
      onPointerLeave={(e) => { if (e.pointerType !== 'mouse') return; setIsActive(false); setFrameIndex(0) }}
    >
      <div className="flex flex-col h-full">
      <hr className="border-t border-zinc-200 w-full" />
      <div className="flex flex-col gap-[10px] mt-[20px]">
        <h3 className={`font-sans text-sm font-normal transition-colors duration-300 ${isActive && hasMultiple ? 'text-orange-500' : 'text-neutral-900'}`}>
          {project.title}
        </h3>
        <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
      </div>
      <p className="font-sans text-sm text-neutral-600 mt-[10px] mb-[40px]">{project.description}</p>
      <div className="flex-1" />
      <div style={{
        width: '100%', aspectRatio: '16/9', overflow: 'hidden',
        backgroundColor: isActive && hasMultiple ? '#e5e5e5' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isActive && hasMultiple ? '8%' : '0',
        transition: 'background-color 500ms ease, padding 500ms ease',
      }}>
        {/\.(mp4|mov|webm)$/i.test(currentSrc) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <video src={currentSrc} autoPlay loop muted playsInline preload="none" style={{ width: '100%', height: '100%', objectFit: isActive && hasMultiple ? 'contain' : 'cover', display: 'block' }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentSrc} alt="" loading="eager" style={{ width: '100%', height: '100%', objectFit: isActive && hasMultiple ? 'contain' : 'cover', display: 'block' }} />
        )}
      </div>
      </div>
    </div>
  )
}

export default function ProjectGrid() {
  const { mode } = useViewMode()
  const [activeId, setActiveId] = useState<string | null>(null)


  return (
    <>

      {/* ── Feature section ───────────────────────────────────────────────── */}
      <section
        id="work"
        aria-label="Work"
        className={`w-full section-mt${mode === 'compressed' ? ' lg:hidden' : ''}`}
      >
        <div className="mx-6">
          <div className="flex flex-col gap-[10px] pb-[30px]">
            <h2 className="font-serif text-3xl lg:text-5xl font-normal text-neutral-900">Selected Work</h2>
          </div>

          <hr className="border-t border-zinc-200 w-full" />

          {FEATURE.map((project, index) => {
            const isActive = activeId === project.id
            const isLast = index === FEATURE.length - 1
            return (
              <div
                key={project.id}
                id={project.id}
                onPointerEnter={(e) => { if (e.pointerType !== 'mouse') return; setActiveId(project.id) }}
                onPointerLeave={(e) => { if (e.pointerType !== 'mouse') return; setActiveId(null) }}
              >
                <Link href={project.href} className="block no-underline" data-cursor="read-case-study">
                  <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr_1fr] md:gap-6 my-[30px] w-full">
                    {/* Col 1 — Image (desktop only) */}
                    <div className="hidden md:block w-full">
                      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                        {project.cover.type === 'video' ? (
                          <video
                            src={project.cover.src}
                            autoPlay loop muted playsInline
                            preload="none"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.cover.src}
                            alt=""
                            loading="eager"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Col 2 — Empty spacer */}
                    <div className="hidden md:block" />

                    {/* Col 3 — Content */}
                    <div className="flex flex-col gap-[20px]">
                      {/* Mobile cover */}
                      <div className="md:hidden w-full aspect-[4/3] relative overflow-hidden">
                        {project.cover.type === 'video' ? (
                          <video src={project.cover.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                          <Image src={project.cover.src} alt="" fill style={{ objectFit: 'cover' }} loading="eager" />
                        )}
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <h3 className={`font-sans text-sm font-normal transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-neutral-900'}`}>
                          {project.title}
                        </h3>
                        <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
                      </div>
                      <p className="font-sans text-sm text-neutral-600">{project.description}</p>
                    </div>
                  </div>
                </Link>
                {!isLast && <hr className="border-t border-zinc-200 w-full" />}
              </div>
            )
          })}
        </div>
      </section>


      {/* ── Archive (hidden in compressed mode on desktop) ───────────────── */}
      <section
        id="archive"
        aria-label="Archive"
        className={`w-full${mode === 'compressed' ? ' lg:hidden' : ''}`}
        style={{ marginTop: '150px', marginBottom: '200px' }}
      >
        <div className="mx-6">
          <div className="flex flex-col gap-[10px] pt-[50px] pb-[30px]">
            <h2 className="font-serif text-3xl lg:text-5xl font-normal text-neutral-900">Archive</h2>
            <p className="font-sans text-sm text-neutral-400">Graphic design, front-end development, and co-op work from my earlier years.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
            {ARCHIVE.map((project) => (
              <ArchiveCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
