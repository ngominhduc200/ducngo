'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const EASE       = 0.085
const DECAY      = 0.94
const MAX_TILT   = 10
const ENTRY_GAP  = 500
const TARGET_GAP = 100
const GAP_EASE   = 0.03
const ENTRY_VEL  = 20

const HEIGHTS = [
  '43vh', '27vh', '39vh', '33vh', '49vh',
  '23vh', '36vh', '47vh', '29vh', '41vh',
]

export default function FunMarquee({
  items,
}: {
  items: { src: string; type: 'image' | 'video' }[]
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    let half = 0
    const updateHalf = () => { half = track.scrollWidth / 2 }
    const ro = new ResizeObserver(updateHalf)
    ro.observe(track)
    updateHalf()

    const viewWidth      = wrapper.offsetWidth
    const itemPositions: { x: number; w: number }[] = []

    let velocity   = ENTRY_VEL
    let target     = 0
    let current    = 0
    let currentGap = ENTRY_GAP
    let entering   = true

    let raf = 0
    const tick = () => {
      // ── Entrance: gap compresses from large → target ────────────────
      if (entering) {
        currentGap += (TARGET_GAP - currentGap) * GAP_EASE
        track.style.gap = `${currentGap}px`
        if (Math.abs(currentGap - TARGET_GAP) < 1) {
          currentGap = TARGET_GAP
          track.style.gap = `${TARGET_GAP}px`
          entering = false
          itemsRef.current.forEach((el, i) => {
            if (el) itemPositions[i] = { x: el.offsetLeft, w: el.offsetWidth }
          })
        }
      }

      // ── Physics ─────────────────────────────────────────────────────
      target  += velocity
      velocity *= DECAY
      current += (target - current) * EASE

      const h       = half || 1
      const display = ((current % h) + h) % h
      const tilt    = Math.max(-MAX_TILT, Math.min(MAX_TILT, (target - current) * 0.02))

      track.style.transform = `translateX(${-display}px)`
      itemsRef.current.forEach(el => {
        if (el) el.style.transform = `perspective(600px) rotateY(${tilt}deg)`
      })

      // ── Video visibility (after entrance) ───────────────────────────
      if (!entering && itemPositions.length > 0) {
        itemsRef.current.forEach((itemEl, i) => {
          const video = itemEl?.querySelector('video') as HTMLVideoElement | null
          if (!video) return
          const p = itemPositions[i]
          if (!p) return
          const x = p.x % h
          // Upgrade preload when near viewport
          if (video.preload === 'none') {
            const dist = Math.min(Math.abs(x - display), Math.abs(x - display + h))
            if (dist < viewWidth * 2) video.preload = 'metadata'
          }
          const inView =
            (x + p.w > display && x < display + viewWidth) ||
            (x + p.w + h > display && x + h < display + viewWidth)
          if (inView  && video.paused)  video.play().catch(() => {})
          if (!inView && !video.paused) video.pause()
        })
      }

      if (entering || Math.abs(velocity) > 0.1 || Math.abs(target - current) > 0.1) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }
    raf = requestAnimationFrame(tick)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      velocity += delta * 0.5
      if (!raf) raf = requestAnimationFrame(tick)
    }

    wrapper.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrapper.removeEventListener('wheel', onWheel)
    }
  }, [])

  const doubled = [...items, ...items]

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ width: 'max-content', gap: `${ENTRY_GAP}px` }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            ref={el => { if (el) itemsRef.current[i] = el }}
            className="flex-shrink-0"
            style={{ height: HEIGHTS[(i % items.length) % HEIGHTS.length] }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                loop
                muted
                playsInline
                preload="none"
                className="h-full w-auto block"
              />
            ) : (
              <Image
                src={item.src}
                alt=""
                width={0}
                height={0}
                sizes="50vw"
                style={{ height: '100%', width: 'auto' }}
                className="block"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
