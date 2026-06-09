'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useViewMode } from '@/contexts/ViewModeContext'

const PROJECTS = [
  { label: 'Peak Create Request System',           id: 'project-peak-create',    isArchive: false },
  { label: 'Airbnb Collaborative Planning',        id: 'project-airbnb',         isArchive: false },
  { label: 'Hootsuite Composer Widget',            id: 'project-hootsuite',      isArchive: false },
  { label: 'Hootsuite Deck of Truth',              id: 'project-hootsuite-deck', isArchive: false },
  { label: 'Academic Discogs Shop',                id: 'archive-discogs',        isArchive: true  },
  { label: 'The Peak SFU',                         id: 'archive-peak',           isArchive: true  },
  { label: 'Fraser Health Authority',              id: 'archive-fraser',         isArchive: true  },
  { label: 'Douglas College Royals',               id: 'archive-douglas',        isArchive: true  },
  { label: 'Design Communication', id: 'archive-4c',           isArchive: true  },
]

export default function LandingNav() {
  const { mode } = useViewMode()

  const [mounted, setMounted] = useState(false)

  // ── Compressed mode state ──────────────────────────────────────────────────
  const [compressedIndex, setCompressedIndex] = useState<number | null>(null)
  const [compressedLabel, setCompressedLabel] = useState<string | null>(null)
  const [compressedTagline, setCompressedTagline] = useState<string | null>(null)
  const [compressedTitle, setCompressedTitle] = useState<string | null>(null)
  const [compressedDescription, setCompressedDescription] = useState<string | null>(null)
  const [compressedHref, setCompressedHref] = useState<string | null>(null)
  const [compressedIsArchive, setCompressedIsArchive] = useState(false)
  const [compressedHovered, setCompressedHovered] = useState(false)

  // ── Compressed mode portal refs (for entrance animation) ───────────────────
  const navPortalRef = useRef<HTMLDivElement>(null)
  const heroRef      = useRef<HTMLDivElement>(null)
  const descRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleCompressedActive = (e: Event) => {
      const { index, label, tagline, title, description, href, isArchive } = (e as CustomEvent<{ index: number | null; label: string | null; tagline: string | null; title: string | null; description: string | null; href: string | null; isArchive: boolean }>).detail
      setCompressedIndex(index)
      setCompressedLabel(label)
      setCompressedTagline(tagline)
      setCompressedTitle(title)
      setCompressedDescription(description)
      setCompressedHref(href)
      setCompressedIsArchive(isArchive ?? false)
    }
    window.addEventListener('compressed-active', handleCompressedActive)

    return () => {
      window.removeEventListener('compressed-active', handleCompressedActive)
    }
  }, [])

  useEffect(() => {
    if (!mounted || mode !== 'compressed') return
    const keyframes = [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }]
    const opts: KeyframeAnimationOptions = { duration: 500, easing: 'ease-out', fill: 'forwards' }
    navPortalRef.current?.animate(keyframes, opts)
    heroRef.current?.animate(keyframes, opts)
    descRef.current?.animate(keyframes, opts)
  }, [mounted, mode])

  if (!mounted) return null

  // Expand mode — hero handled by RightSidebar
  if (mode !== 'compressed') return null

  // ── Compressed mode: fixed left nav + project description ────────────────
  return (
    <>
      {createPortal(
        (() => {
          const itemH = 20   // px — text-sm line-height
          const itemGap = 18 // px — gap between rows
          const activeIdx = Math.max(0, (compressedIndex ?? 1) - 1)
          const activeCenterFromTop = activeIdx * (itemH + itemGap) + itemH / 2
          return (
            <div
              ref={navPortalRef}
              className="hidden lg:block fixed left-6 z-10 pointer-events-none"
              style={{ top: `calc(50vh - ${activeCenterFromTop}px)`, transition: compressedHovered ? 'top 400ms ease-in-out' : 'none' }}
            >
              <div
                className="flex flex-col gap-[18px] pointer-events-auto"
                onMouseEnter={() => setCompressedHovered(true)}
                onMouseLeave={() => setCompressedHovered(false)}
              >
                {PROJECTS.map(({ label, id, isArchive }, idx) => {
                  const isActive = compressedIndex === idx + 1
                  const visible = isActive || compressedHovered
                  return (
                    <div
                      key={id}
                      onClick={() => window.dispatchEvent(new CustomEvent('compressed-navigate', { detail: { index: idx } }))}
                      style={{ opacity: visible ? 1 : 0, transition: compressedHovered ? 'opacity 300ms ease' : 'none', pointerEvents: visible ? 'auto' : 'none', display: 'flex', alignItems: 'center', gap: 'calc(8vw - 4rem)' }}
                      className={`font-sans text-sm text-left cursor-pointer hover:!text-orange-500 ${
                        isActive ? 'text-neutral-900' : 'text-stone-400'
                      }`}
                    >
                      <span className="shrink-0 w-14 select-none">{isArchive ? 'Archive' : String(idx + 1).padStart(2, '0')}</span>
                      <span className="whitespace-nowrap">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })(),
        document.body
      )}
      {createPortal(
        <div
          ref={descRef}
          className="hidden lg:flex fixed flex-col gap-10 pointer-events-auto z-[10]"
          {...(!compressedIsArchive ? { 'data-cursor': 'read-case-study' } : {})}
          style={{ top: '50vh', transform: 'translateY(-0.625rem)', right: 0, width: 'calc((100vw - 1.5rem) / 3)', paddingRight: '1.5rem' }}
        >
          {compressedTagline && compressedTitle && compressedHref && (
            compressedIsArchive ? (
              <div className="flex flex-col gap-10">
                <div>
                  <span className="font-sans text-sm text-neutral-900">{compressedTagline}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-sans text-sm font-normal text-neutral-900">{compressedTitle}</p>
                  {compressedDescription && <p className="font-sans text-sm text-neutral-400">{compressedDescription}</p>}
                </div>
              </div>
            ) : (
              <Link href={compressedHref} className="group flex flex-col gap-10 no-underline">
                <div>
                  <span className="font-sans text-sm text-neutral-900">{compressedTagline}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-sans text-sm font-normal text-neutral-900 group-hover:text-orange-500 transition-colors">{compressedTitle}</p>
                  {compressedDescription && <p className="font-sans text-sm text-neutral-400">{compressedDescription}</p>}
                </div>
              </Link>
            )
          )}
        </div>,
        document.body
      )}
    </>
  )
}
