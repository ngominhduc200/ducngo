'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ProjectCard from '@/components/ui/ProjectCard'

const ARCHIVE = [
  {
    id: 'archive-discogs',
    title: 'Discogs Shop',
    category: 'Web Design · Front-End Development',
    year: '2025',
    description:
      'Built a responsive e-commerce website using HTML and CSS, including product listing features and client information pages, deployed on GitHub Pages.',
    tools: ['HTML', 'CSS'],
    href: 'https://pages.github.sfu.ca/iat339/SummerMadness_P2_Company/',
    image: '/images/archive assets/Discog Shop.png',
  },
  {
    id: 'archive-the-peak',
    title: "The Peak SFU's Graphic Collection",
    category: 'Graphic Design',
    year: '2022–2024',
    description:
      "Designed magazine spreads, covers, and section layouts for SFU's student newspaper. Transformed written content and illustrations into engaging visual compositions using layout design, typography selection, and colour palette development.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
    href: 'https://ducngo.framer.website/the-peak',
    image: '/images/archive assets/The Peak.jpg',
  },
  {
    id: 'archive-fraser-health',
    title: 'Fraser Health Authority',
    category: 'Graphic Design · 8-month Co-op',
    year: '2023',
    description:
      "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    href: 'https://ducngo.framer.website/fraser-health',
    image: '/images/Example.png',
  },
  {
    id: 'archive-douglas-royals',
    title: "Douglas College Royals' Graphic Collection",
    category: 'Graphic Design',
    year: '2022–2023',
    description:
      "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Figma'],
    href: 'https://ducngo.framer.website/douglas-college-royals',
    image: '/images/archive assets/Douglas.jpg',
  },
  {
    id: 'archive-4c',
    title: 'Communication and Collaboration',
    category: 'Graphic Design',
    year: '2022',
    description:
      'Three-week academic project for IAT 103W at SFU. Translated the 4C framework for scholarly composition into a social media awareness campaign. Led character design through Procreate sketches to refined Illustrator vectors, combined with vibrant carousel layouts for engagement.',
    tools: ['Procreate', 'Adobe Illustrator', 'Figma'],
    href: 'https://ducngo.framer.website/4c',
    image: '/images/Example.png',
  },
]

export default function ProjectGrid() {
  const [cursorImage, setCursorImage] = useState<string | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <section id="work" aria-label="Work" className="flex flex-col items-center w-full max-w-[56.25rem] px-6">
        <ProjectCard
          id="project-peak-create"
          className="py-16 md:py-[150px]"
          title="Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create"
          meta="Product Design · 2026"
          href="/work/peak-create"
          video="/images/Peak Create Assets/PeakCreate Project Cover.mp4"
        />
        <ProjectCard
          id="project-airbnb"
          className="py-16 md:py-[150px]"
          title="Collaborative trip planning"
          meta="Product Design · Concept 2026"
          href="/work/airbnb"
          image="/images/airbnb case study assets/Cover.png"
          imageAlt="Collaborative Trip Planning case study preview"
        />
        <ProjectCard
          id="project-hootsuite"
          className="py-16 md:py-[150px]"
          title="Increasing Feature Discovery for Hootsuite"
          meta="UX Design · Handed Off 2025"
          href="/work/hootsuite-composer"
          image="/images/Hootsuite Composer Assets/Cover.png"
          imageAlt="Hootsuite Composer case study preview"
        />
        <ProjectCard
          id="project-hootsuite-deck"
          className="py-16 md:py-[150px]"
          title="Shaping Hootsuite&apos;s new branding with Deck of Truth redesigned"
          meta="Graphic Design · 2025"
          href="/work/hootsuite-deck"
          image="/images/Hootsuite Deck Assets/DOT preview 4.png"
          imageAlt="Hootsuite Deck of Truth preview"
        />
      </section>

      <section
        id="archive"
        aria-label="Archive"
        className="w-full flex flex-col items-center pb-16 md:pb-[150px]"
        onMouseMove={handleMouseMove}
      >
        {/* Floating cursor image — portalled to body to escape PageTransition's CSS transform stacking context */}
        {mounted && cursorImage && createPortal(
          <div
            className="fixed pointer-events-none z-[99998] overflow-hidden"
            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', height: 200, width: 'fit-content' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cursorImage} alt="" className="h-full w-auto object-cover" />
          </div>,
          document.body
        )}

        <div className="w-full max-w-[56.25rem] px-6">
          <div className="flex flex-col gap-[10px] py-[50px]">
            <p className="font-sans text-base text-neutral-400">Archive</p>
            <p className="font-serif font-normal text-2xl text-neutral-900">
              Graphic design, front-end development, and co-op work from my earlier years.
            </p>
          </div>

          <hr className="border-t border-neutral-900 w-full opacity-10" />

          {ARCHIVE.map((project) => (
            <div key={project.id}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-[20px] py-[50px] w-full no-underline hover:opacity-70 transition-opacity"
                onMouseEnter={() => {
                  setCursorImage(project.image)
                  window.dispatchEvent(new CustomEvent('cursor-image', { detail: { active: true } }))
                }}
                onMouseLeave={() => {
                  setCursorImage(null)
                  window.dispatchEvent(new CustomEvent('cursor-image', { detail: { active: false } }))
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-[10px]">
                    <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
                    <h2 className="font-serif font-normal text-2xl text-neutral-900 leading-[1.3]">
                      {project.title}
                    </h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-neutral-400 shrink-0 mt-1 group-hover:text-neutral-900 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                <p className="font-sans text-base text-neutral-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="font-sans text-xs text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </a>
              <hr className="border-t border-neutral-900 w-full opacity-10" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
