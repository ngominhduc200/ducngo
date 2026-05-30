'use client'

import { useRef, useEffect } from 'react'

const EASE           = 0.085
const DECAY          = 0.94
const MAX_TILT       = 10
const SHOW_THRESHOLD = 2
const ENTRY_GAP      = 500   // starting gap (px)
const TARGET_GAP     = 100   // final gap (px)
const GAP_EASE       = 0.03  // how fast gap closes
const ENTRY_VEL      = 10    // slow entrance speed

const HEIGHTS = [
  '43vh', '27vh', '39vh', '33vh', '49vh',
  '23vh', '36vh', '47vh', '29vh', '41vh',
]

export default function FunMarquee({
  items,
}: {
  items: { src: string; type: 'image' | 'video' }[]
}) {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const itemsRef    = useRef<HTMLDivElement[]>([])
  const overlaysRef = useRef<HTMLDivElement[]>([])
  const isScrolling = useRef(true)

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

    const setOverlays = (show: boolean) => {
      isScrolling.current = show
      overlaysRef.current.forEach(el => {
        if (el) el.style.opacity = show ? '1' : '0'
      })
    }

    let raf = 0
    const tick = () => {
      // ── Entrance: animate gap from large → target ──────────────────
      if (entering) {
        currentGap += (TARGET_GAP - currentGap) * GAP_EASE
        track.style.gap = `${currentGap}px`

        if (Math.abs(currentGap - TARGET_GAP) < 1) {
          currentGap = TARGET_GAP
          track.style.gap = `${TARGET_GAP}px`
          entering = false
          // Cache positions now that layout is stable
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

      // ── Overlay + video visibility (only after entrance) ────────────
      if (!entering) {
        const shouldShow = Math.abs(velocity) > SHOW_THRESHOLD || Math.abs(target - current) > SHOW_THRESHOLD
        if (shouldShow !== isScrolling.current) setOverlays(shouldShow)

        if (!shouldShow && itemPositions.length > 0) {
          itemsRef.current.forEach((itemEl, i) => {
            const video = itemEl?.querySelector('video') as HTMLVideoElement | null
            if (!video) return
            const p = itemPositions[i]
            if (!p) return
            const x = p.x % h
            const inView =
              (x + p.w > display && x < display + viewWidth) ||
              (x + p.w + h > display && x + h < display + viewWidth)
            if (inView  && video.paused)  video.play().catch(() => {})
            if (!inView && !video.paused) video.pause()
          })
        }
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
            className="relative flex-shrink-0"
            style={{ height: HEIGHTS[(i % items.length) % HEIGHTS.length] }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-auto block"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt="" loading="lazy" className="h-full w-auto block" />
            )}
            <div
              ref={el => { if (el) overlaysRef.current[i] = el }}
              className="absolute inset-0 pointer-events-none backdrop-blur-2xl"
              style={{ opacity: 1, transition: 'opacity 0.7s ease-out 0.1s' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
