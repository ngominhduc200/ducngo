'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useViewMode } from '@/contexts/ViewModeContext'
import { usePathname } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'

const ImageUniverse = dynamic(() => import('@/components/ui/ImageUniverse'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#080808]" />,
})

const f = (name: string) => `/images/fun/${name}`

type Item = {
  num: string
  name: string
  src: string
  type: 'image' | 'video'
  poster?: string
}

const ITEMS: Item[] = [
  // Row 1: L P L P L L
  { num: '001', name: '3D illustration DOPE poster', src: f('dope-1.webp'), type: 'image' },
  { num: '002', name: 'AoT Fan Art Wall Maria', src: f('attack-on-titan.webp'), type: 'image' },
  { num: '003', name: 'Hornby St Photography', src: f('photo-1-1.webp'),        type: 'image' },
  { num: '004', name: 'Pixel Shooter Game',  src: f('game-1.mp4'),               type: 'video', poster: f('game-1.webp') },
  { num: '005', name: 'Late Night Bus Poster', src: f('late-night-poster.webp'), type: 'image' },
  { num: '006', name: 'Yellow Brush Illustration', src: f('ngo-minh.webp'),    type: 'image' },
  // Row 2: P L P L L P
  { num: '007', name: 'Gastown Vancouver Photography', src: f('photo-2-1.webp'), type: 'image' },
  { num: '008', name: '3D Flower Render',    src: f('abstract-model.webp'),      type: 'image' },
  { num: '009', name: 'Sky Scene Painting',  src: f('your-name-fake.webp'),      type: 'image' },
  { num: '010', name: '"Vietnam" Isometric Lettering Illustration', src: f('img-0683.webp'), type: 'image' },
  { num: '011', name: '"D" Landing Page Concept', src: f('d.mp4'),              type: 'video', poster: f('d.webp') },
  // Row 3: L L P L L L
  { num: '012', name: 'Granville St Photography', src: f('photo-3-1.webp'),    type: 'image' },
  { num: '013', name: '"Finding Adventure Under the Blue Sky" Poster', src: f('poster-design-1.webp'), type: 'image' },
  { num: '014', name: 'Daisies in a Field', src: f('img-1409.mp4'),             type: 'video', poster: f('img-1409.webp') },
  { num: '015', name: 'Abstract Liquify Colours', src: f('ngo-minh-bg.webp'),   type: 'image' },
  { num: '016', name: 'Holland Festival Poster', src: f('a4-23.webp'),          type: 'image' },
  { num: '017', name: 'Street Photography', src: f('photo-1-2.webp'),           type: 'image' },
  // Row 4: P L P L L P
  { num: '018', name: 'Kinetic Typography Animation', src: f('kinetic-typography.mp4'), type: 'video', poster: f('kinetic-typography.webp') },
  { num: '019', name: 'Fondazione Prada Exhibition Poster', src: f('duc-13a.webp'), type: 'image' },
  { num: '020', name: 'Portfolio Landing Page Concept', src: f('screenshot-2023.webp'), type: 'image' },
  { num: '021', name: 'Holland Festival Poster — Swiss Grid', src: f('test-poster-1.webp'), type: 'image' },
  { num: '022', name: 'Downtown Vancouver Street Photography', src: f('photo-4-1.webp'), type: 'image' },
  { num: '023', name: 'Granville St Photography II', src: f('photo-3-2.webp'),  type: 'image' },
  // Row 5: L L P L L P
  { num: '024', name: '"Audition Bounded" SFU Event Poster', src: f('letter-2.webp'), type: 'image' },
  { num: '025', name: '3D Render — Dark Bunny Head', src: f('bunny-4.webp'),    type: 'image' },
  { num: '026', name: 'Demon Slayer Pixel RPG Game', src: f('game-2.mp4'),      type: 'video', poster: f('game-2.webp') },
  { num: '027', name: 'Donut Vector Illustration', src: f('donut.webp'),        type: 'image' },
  { num: '028', name: 'Gastown — "Water Street Garage" Photography', src: f('photo-2-2.webp'), type: 'image' },
  { num: '029', name: 'Abstract 3D Animation', src: f('untitled-3.mp4'),        type: 'video', poster: f('untitled-3.webp') },
  // Row 6
  { num: '030', name: 'Vancouver Art Gallery Photography', src: f('photo-4-2.webp'), type: 'image' },
]

const IMAGE_ITEMS = ITEMS.filter(i => i.type === 'image').map(i => ({ src: i.src, name: i.name }))
function LabCard({ item }: { item: Item }) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="overflow-hidden">
        <div>
          {item.type === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              autoPlay loop muted playsInline preload="auto"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-sans font-normal text-sm text-neutral-400">{item.num}</span>
        <span className="font-sans font-normal text-sm text-neutral-900">{item.name}</span>
      </div>
    </div>
  )
}

function LabGrid() {
  return (
    <div
      className="mx-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-10 md:gap-y-12 lg:grid-cols-6 lg:gap-x-20 lg:gap-y-[6.25rem]"
    >
      {ITEMS.map(item => <LabCard key={item.num} item={item} />)}
    </div>
  )
}

export default function FunPage() {
  const { mode } = useViewMode()
  const pathname = usePathname()
  const [universeReady, setUniverseReady] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = () => import('@/components/ui/ImageUniverse')
    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 4000 })
    } else {
      setTimeout(load, 2000)
    }
  }, [])

  useEffect(() => {
    if (mode === 'compressed') {
      document.documentElement.style.overflow = 'hidden'
      setUniverseReady(false)
      const t = setTimeout(() => setUniverseReady(true), 150)
      return () => clearTimeout(t)
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [mode])

  useEffect(() => {
    if (mode !== 'compressed') return
    const el = overlayRef.current
    if (el) { el.getAnimations().forEach(a => a.cancel()); el.style.visibility = 'visible'; el.style.opacity = '' }
    const timer = setTimeout(() => {
      const ov = overlayRef.current; if (!ov) return
      const anim = ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' })
      anim.onfinish = () => { if (overlayRef.current) overlayRef.current.style.visibility = 'hidden' }
    }, 2000)
    return () => clearTimeout(timer)
  }, [mode])

  return (
    <>
      {mode === 'compressed' ? (
        // ── Immersive ON ────────────────────────────────────────────────────
        <div className="relative w-full" style={{ height: '100dvh', background: '#080808' }}>
          {universeReady && (
            <div className="absolute inset-0">
              <ImageUniverse items={IMAGE_ITEMS} />
            </div>
          )}
          <div
            ref={overlayRef}
            style={{
              position: 'fixed', inset: 0, zIndex: 1500,
              background: '#080808',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            <span className="font-sans text-sm text-blue-400">loading...</span>
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
              <p className="hero-serif text-3xl lg:text-2xl xl:text-3xl">
                I draw, code, animate, photograph. For the{' '}
                <em className="italic text-pink-400">love</em> of the game.
              </p>
              <p className="font-sans text-sm text-neutral-400 mt-2">
                This is what keeps me sharp.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ── Immersive OFF ───────────────────────────────────────────────────
        <div className="relative flex flex-col w-full">
          <div className="lg:hidden">
            <PageHero key={pathname} align="left" tagline="This is what keeps me sharp.">
              I draw, code, animate, photograph. For the{' '}
              <em className="italic text-pink-400">love</em> of the game.
            </PageHero>
          </div>
          <main className="w-full section-mt pb-[12.5rem]">
            <hr className="border-t border-zinc-200 mx-6 mb-6" />
            <LabGrid />
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
              <p className="hero-serif text-3xl lg:text-2xl xl:text-3xl">
                I draw, code, animate, photograph. For the{' '}
                <em className="italic text-pink-400">love</em> of the game.
              </p>
              <p className="font-sans text-sm text-neutral-400 mt-2">
                This is what keeps me sharp.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
