'use client'

import { useRef, useEffect } from 'react'

const EASE   = 0.085  // how fast current catches up to target (lower = smoother)
const DECAY  = 0.94   // how fast velocity fades per frame
const MAX_TILT = 10

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

    // Cache item positions once layout is stable
    const itemPositions: { x: number; w: number }[] = []
    const cacheTimer = setTimeout(() => {
      itemsRef.current.forEach((el, i) => {
        if (el) itemPositions[i] = { x: el.offsetLeft, w: el.offsetWidth }
      })
    }, 150)

    const viewWidth = wrapper.offsetWidth

    // Lerp-based scroll state
    let velocity = 500   // entrance kick
    let target   = 0     // unbounded accumulator
    let current  = 0     // unbounded, lerps toward target

    let raf = 0
    const tick = () => {
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

      // Play/pause videos based on visibility
      if (itemPositions.length > 0) {
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

      if (Math.abs(velocity) > 0.1 || Math.abs(target - current) > 0.1) {
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
      clearTimeout(cacheTimer)
      ro.disconnect()
      wrapper.removeEventListener('wheel', onWheel)
    }
  }, [])

  const doubled = [...items, ...items]

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <div ref={trackRef} className="flex gap-[100px] items-center" style={{ width: 'max-content' }}>
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
                preload="metadata"
                className="h-full w-auto block"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt="" loading="lazy" className="h-full w-auto block" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
