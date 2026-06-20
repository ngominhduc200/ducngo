'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useViewMode } from '@/contexts/ViewModeContext'
import { BLUR_DATA_URL } from '@/lib/blur'

const FEATURE = [
  {
    id: 'project-peak-create',
    title: "Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create",
    category: 'Product Design',
    year: '2026',
    description: "At The Peak, illustration requests ran across Sheets, Slack, Gmail, and Drive with no connection between them. I designed Peak Create: a single tool where editors brief, illustrators submit, and the Production Editor tracks everything from request to invoice. Production Editors said it reduced mental load and saw it as a full replacement for how they work today.",
    cover: { type: 'video' as const, src: '/images/peak-create/cover.mp4' },
    href: '/project/peak-create',
  },
  {
    id: 'project-airbnb',
    title: 'Helping groups align on a place to stay together with Airbnb Collaborative Trip Planning',
    category: 'Product Design',
    year: 'Concept 2026',
    description: 'Group trip planning happens outside Airbnb, with one person carrying all the links and opinions across separate group chats. I designed Collaborative Trip Planning: a feature where members set preferences, browse with merged group filters, react to listings, and see a ranked summary to align without leaving the app. In testing, all 3 participants completed the full flow without prompting and said the summary made group consensus visible without a separate conversation.',
    cover: { type: 'image' as const, src: '/images/airbnb/cover.webp' },
    href: '/project/airbnb',
  },
  {
    id: 'project-hootsuite',
    title: 'Increasing Feature Discovery for Hootsuite',
    category: 'UX Design',
    year: 'Handed Off 2025',
    description: 'Instagram Stories was one of the most-used formats on social media, but inside Hootsuite it sat 4 steps deep in Composer behind a nested dropdown. I designed a homepage widget that surfaces all post formats on the dashboard before users go looking. The project ended with a full engineering handoff, closing the gap between feature discovery and activation for both new and experienced users.',
    cover: { type: 'image' as const, src: '/images/hootsuite-composer/cover.webp' },
    href: '/project/hootsuite-composer',
  },
  {
    id: 'project-hootsuite-deck',
    title: "Shaping Hootsuite's new branding with Deck of Truth redesigned",
    category: 'Brand Design',
    year: 'Shipped 2025',
    description: "Hootsuite's slide deck template was misaligned with where the brand was heading: from social media tool to enterprise platform. I audited the current branding and proposed a new direction built on updated typography, colour gradients, and layout composition. The redesigned Deck of Truth was adopted across all departments, and the typography and gradient system carried into the live 2026 brand.",
    cover: { type: 'image' as const, src: '/images/hootsuite-deck/preview-4.webp' },
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
      i === 0 ? '/images/archive/the-peak/cover.webp' : `/images/archive/the-peak/spread-${String(i).padStart(2, '0')}.webp`
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
      '/images/archive/fraser-health/cover.webp',
      ...Array.from({ length: 9 }, (_, i) => `/images/archive/fraser-health/asset-${String(i + 1).padStart(2, '0')}.webp`),
      '/images/archive/fraser-health/asset-11.webp',
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
      '/images/archive/douglas-royals/cover.webp',
      ...Array.from({ length: 14 }, (_, i) => {
        const n = i + 2
        return `/images/archive/douglas-royals/asset-${String(n).padStart(2, '0')}.webp`
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
      '/images/archive/iat103/cover.webp',
      ...Array.from({ length: 8 }, (_, i) => `/images/archive/iat103/image-${29 + i}.webp`),
    ],
  },
]


function ArchiveCard({ project }: { project: typeof ARCHIVE[0] }) {
  const [isActive, setIsActive] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const hasMultiple = project.images.length > 1
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isActive || !hasMultiple) return
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % project.images.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive, hasMultiple, project.images.length])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.preload === 'none') {
          video.preload = 'auto'
          video.load()
          video.play().catch(() => {})
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

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
        backgroundColor: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isActive && hasMultiple ? '1%' : '0',
        transition: 'background-color 500ms ease, padding 500ms ease',
        ...(/\.(mp4|mov|webm)$/i.test(currentSrc) ? { backgroundImage: `url(${currentSrc.replace(/\.(mp4|mov|webm)$/i, '.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
      }}>
        {/\.(mp4|mov|webm)$/i.test(currentSrc) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <video ref={videoRef} src={currentSrc} poster={currentSrc.replace(/\.(mp4|mov|webm)$/i, '.webp')} autoPlay loop muted playsInline preload="none" style={{ width: '100%', height: '100%', objectFit: isActive && hasMultiple ? 'contain' : 'cover', display: 'block' }} />
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
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-neutral-900">Selected Work</h2>
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
                      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#e5e5e5', ...(project.cover.type === 'video' ? { backgroundImage: `url(${project.cover.src.replace(/\.mp4$/, '.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
                        {project.cover.type === 'video' ? (
                          <video
                            src={project.cover.src}
                            poster={project.cover.src.replace(/\.mp4$/, '.webp')}
                            autoPlay loop muted playsInline
                            preload="auto"
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
                      <div className="md:hidden w-full aspect-[4/3] relative overflow-hidden" style={project.cover.type === 'video' ? { backgroundImage: `url(${project.cover.src.replace(/\.mp4$/, '.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
                        {project.cover.type === 'video' ? (
                          <video src={project.cover.src} poster={project.cover.src.replace(/\.mp4$/, '.webp')} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" />
                        ) : (
                          <Image src={project.cover.src} alt="" fill style={{ objectFit: 'cover' }} loading="eager" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
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
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-neutral-900">Archive</h2>
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
