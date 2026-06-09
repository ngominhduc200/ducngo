'use client'

import { useEffect } from 'react'
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

const ALL_ITEMS: { src: string; type: 'image' | 'video' }[] = [
  { src: f('dope-1.png'),             type: 'image' },
  { src: f('img-0372.jpg'),           type: 'image' },
  { src: f('attack-on-titan.png'),    type: 'image' },
  { src: f('photo-1-1.jpg'),          type: 'image' },
  { src: f('late-night-poster.png'),  type: 'image' },
  { src: f('ngo-minh.png'),           type: 'image' },
  { src: f('game-1.mp4'),             type: 'video' },
  { src: f('photo-2-1.jpg'),          type: 'image' },
  { src: f('your-name-fake.png'),     type: 'image' },
  { src: f('img-0683.jpg'),           type: 'image' },
  { src: f('poster-design-1.png'),    type: 'image' },
  { src: f('abstract-model.png'),     type: 'image' },
  { src: f('d.mp4'),                  type: 'video' },
  { src: f('photo-3-1.jpg'),          type: 'image' },
  { src: f('ngo-minh-bg.png'),        type: 'image' },
  { src: f('a4-23.png'),              type: 'image' },
  { src: f('img-1409.mp4'),           type: 'video' },
  { src: f('photo-1-2.jpg'),          type: 'image' },
  { src: f('duc-13a.png'),            type: 'image' },
  { src: f('test-poster-1.png'),      type: 'image' },
  { src: f('photo-4-1.jpg'),          type: 'image' },
  { src: f('letter-2.jpg'),           type: 'image' },
  { src: f('bunny-4.png'),            type: 'image' },
  { src: f('kinetic-typography.mp4'), type: 'video' },
  { src: f('photo-2-2.jpg'),          type: 'image' },
  { src: f('screenshot-2023.png'),    type: 'image' },
  { src: f('photo-3-2.jpg'),          type: 'image' },
  { src: f('game-2.mp4'),             type: 'video' },
  { src: f('donut.jpg'),              type: 'image' },
  { src: f('photo-4-2.jpg'),          type: 'image' },
  { src: f('untitled-3.mp4'),         type: 'video' },
]

const IMAGE_FILES = ALL_ITEMS.filter(i => i.type === 'image').map(i => i.src)

export default function FunPage() {
  const { mode } = useViewMode()
  const pathname = usePathname()
  useEffect(() => {
    if (mode === 'compressed') {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [mode])

  // ── Immersive ON: full-screen Three.js canvas, hero overlaid on the right ──
  if (mode === 'compressed') {
    return (
      <>
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
      </>
    )
  }

  // ── Immersive OFF: Pinterest-style grid + scrolling hero column ──
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
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-[100px] mx-6">
          {ALL_ITEMS.map((item, i) => (
            <div key={i} className="break-inside-avoid mb-4 md:mb-[100px]">
              {item.type === 'video' ? (
                <video src={item.src} muted loop playsInline autoPlay preload="none" className="w-full block" />
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
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
