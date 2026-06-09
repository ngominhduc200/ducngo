'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useViewMode } from '@/contexts/ViewModeContext'
import { usePathname } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'

const ImageUniverse = dynamic(() => import('@/components/ui/ImageUniverse'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#080808]" />,
})

const f = (name: string) => `/images/fun-compressed/${name}`

const ALL_ITEMS: { src: string; type: 'image' | 'video'; ratio: number }[] = [
  { src: f('dope-1.png'),             type: 'image', ratio: 1.247  },
  { src: f('img-0372.jpg'),           type: 'image', ratio: 1.328  },
  { src: f('attack-on-titan.png'),    type: 'image', ratio: 0.490  },
  { src: f('photo-1-1.jpg'),          type: 'image', ratio: 1.500  },
  { src: f('late-night-poster.png'),  type: 'image', ratio: 1.778  },
  { src: f('ngo-minh.png'),           type: 'image', ratio: 1.000  },
  { src: f('game-1.mp4'),             type: 'video', ratio: 0.532  },
  { src: f('photo-2-1.jpg'),          type: 'image', ratio: 0.667  },
  { src: f('your-name-fake.png'),     type: 'image', ratio: 1.415  },
  { src: f('img-0683.jpg'),           type: 'image', ratio: 1.500  },
  { src: f('poster-design-1.png'),    type: 'image', ratio: 1.000  },
  { src: f('abstract-model.png'),     type: 'image', ratio: 0.563  },
  { src: f('d.mp4'),                  type: 'video', ratio: 0.590  },
  { src: f('photo-3-1.jpg'),          type: 'image', ratio: 1.333  },
  { src: f('ngo-minh-bg.png'),        type: 'image', ratio: 1.000  },
  { src: f('a4-23.png'),              type: 'image', ratio: 1.415  },
  { src: f('img-1409.mp4'),           type: 'video', ratio: 0.563  },
  { src: f('photo-1-2.jpg'),          type: 'image', ratio: 1.333  },
  { src: f('duc-13a.png'),            type: 'image', ratio: 1.294  },
  { src: f('test-poster-1.png'),      type: 'image', ratio: 1.415  },
  { src: f('photo-4-1.jpg'),          type: 'image', ratio: 1.778  },
  { src: f('letter-2.jpg'),           type: 'image', ratio: 1.294  },
  { src: f('bunny-4.png'),            type: 'image', ratio: 1.778  },
  { src: f('kinetic-typography.mp4'), type: 'video', ratio: 0.563  },
  { src: f('photo-2-2.jpg'),          type: 'image', ratio: 1.500  },
  { src: f('screenshot-2023.png'),    type: 'image', ratio: 0.628  },
  { src: f('photo-3-2.jpg'),          type: 'image', ratio: 0.547  },
  { src: f('game-2.mp4'),             type: 'video', ratio: 0.658  },
  { src: f('donut.jpg'),              type: 'image', ratio: 1.000  },
  { src: f('photo-4-2.jpg'),          type: 'image', ratio: 1.333  },
  { src: f('untitled-3.mp4'),         type: 'video', ratio: 0.563  },
]

const IMAGE_FILES = ALL_ITEMS.filter(i => i.type === 'image').map(i => i.src)

type Pos = { left: number; top: number; width: number; height: number }

function MasonryGrid({ numCols, gap }: { numCols: number; gap: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Pos[]>([])
  const [containerH, setContainerH] = useState(0)

  const compute = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const totalW = el.offsetWidth
    if (!totalW) return
    const colW = (totalW - gap * (numCols - 1)) / numCols
    const heights = new Array(numCols).fill(0)

    const pos: Pos[] = ALL_ITEMS.map(item => {
      const col = heights.indexOf(Math.min(...heights))
      const left = col * (colW + gap)
      const top = heights[col]
      const height = colW * item.ratio
      heights[col] += height + gap
      return { left, top, width: colW, height }
    })

    setPositions(pos)
    setContainerH(Math.max(...heights) - gap)
  }, [numCols, gap])

  useEffect(() => {
    compute()
    const ro = new ResizeObserver(compute)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [compute])

  return (
    <div ref={containerRef} className="mx-6 relative" style={{ height: containerH }}>
      {ALL_ITEMS.map((item, i) => {
        const pos = positions[i]
        if (!pos) return null
        return (
          <div
            key={i}
            style={{ position: 'absolute', left: pos.left, top: pos.top, width: pos.width }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                muted loop playsInline autoPlay preload="none"
                style={{ width: '100%', display: 'block' }}
              />
            ) : (
              <Image
                src={item.src}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function useGrid(): { numCols: number; gap: number } {
  const [grid, setGrid] = useState({ numCols: 4, gap: 100 })
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768)       setGrid({ numCols: 2, gap: 16 })
      else if (window.innerWidth < 1024) setGrid({ numCols: 3, gap: 40 })
      else                               setGrid({ numCols: 4, gap: 100 })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return grid
}

export default function FunPage() {
  const { mode } = useViewMode()
  const pathname = usePathname()
  const { numCols, gap } = useGrid()

  useEffect(() => {
    if (mode === 'compressed') {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [mode])

  // ── Immersive ON ──────────────────────────────────────────────────────────
  if (mode === 'compressed') {
    return (
      <div className="relative w-full" style={{ height: '100dvh', background: '#080808' }}>
        <div className="absolute inset-0">
          <ImageUniverse images={[...IMAGE_FILES, ...IMAGE_FILES]} />
        </div>
        <div
          className="hidden lg:flex absolute right-0 top-0 h-full flex-col"
          style={{ width: 'calc((100vw - 1.5rem) / 3)', paddingRight: '1.5rem' }}
        >
          <div
            key={pathname}
            style={{ paddingTop: '5.25rem', animation: 'contentReveal 400ms ease-out both' }}
            className="text-neutral-900"
          >
            <p className="hero-serif text-2xl lg:text-xl xl:text-2xl">
              I draw, code, animate, photograph. For the{' '}
              <em className="italic text-pink-400">love</em> of the game.
            </p>
            <p className="font-sans text-sm text-neutral-400 mt-1">
              This is what keeps me sharp.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Immersive OFF ─────────────────────────────────────────────────────────
  return (
    <div className="relative flex flex-col w-full">
      <div className="lg:hidden">
        <PageHero key={pathname} align="left" tagline="This is what keeps me sharp.">
          I draw, code, animate, photograph. For the{' '}
          <em className="italic text-pink-400">love</em> of the game.
        </PageHero>
      </div>
      <main className="w-full section-mt" style={{ paddingBottom: '200px' }}>
        <hr className="border-t border-zinc-200 mx-6 mb-6" />
        <MasonryGrid numCols={numCols} gap={gap} />
      </main>
      <div
        className="hidden lg:flex absolute right-0 top-0 h-screen flex-col z-[10] pointer-events-auto"
        style={{ width: 'calc((100vw - 1.5rem) / 3)', paddingRight: '1.5rem' }}
      >
        <div
          key={pathname}
          style={{ paddingTop: '5.25rem', animation: 'contentReveal 400ms ease-out both' }}
          className="text-neutral-900"
        >
          <p className="hero-serif text-2xl lg:text-xl xl:text-2xl">
            I draw, code, animate, photograph. For the{' '}
            <em className="italic text-pink-400">love</em> of the game.
          </p>
          <p className="font-sans text-sm text-neutral-400 mt-1">
            This is what keeps me sharp.
          </p>
        </div>
      </div>
    </div>
  )
}
