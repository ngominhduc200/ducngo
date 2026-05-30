'use client'

import { useRef, useEffect } from 'react'

const FRICTION = 0.88
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
  const trackRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const posRef = useRef(0)
  const halfRef = useRef(0)
  const velRef = useRef(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    const updateHalf = () => { halfRef.current = track.scrollWidth / 2 }
    const ro = new ResizeObserver(updateHalf)
    ro.observe(track)
    updateHalf()

    // Cache item positions once after layout settles
    const itemPositions: { x: number; w: number }[] = []
    const cacheTimer = setTimeout(() => {
      itemsRef.current.forEach((el, i) => {
        if (el) itemPositions[i] = { x: el.offsetLeft, w: el.offsetWidth }
      })
    }, 150)

    velRef.current = 200
    const entryStart = Date.now()
    const ENTRY_DURATION = 1000
    const ENTRY_FRICTION = 0.97
    const viewWidth = wrapper.offsetWidth

    let raf = 0
    const tick = () => {
      const friction = Date.now() - entryStart < ENTRY_DURATION ? ENTRY_FRICTION : FRICTION
      velRef.current *= friction
      posRef.current += velRef.current
      if (halfRef.current > 0) {
        posRef.current = ((posRef.current % halfRef.current) + halfRef.current) % halfRef.current
      }

      track.style.transform = `translateX(${-posRef.current}px)`

      const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, velRef.current * 0.1))
      itemsRef.current.forEach(el => {
        if (el) el.style.transform = `perspective(600px) rotateY(${tilt}deg)`
      })

      // Play/pause videos based on whether they're in the visible window
      if (itemPositions.length > 0) {
        const pos = posRef.current
        const half = halfRef.current || 1
        itemsRef.current.forEach((itemEl, i) => {
          const video = itemEl?.querySelector('video') as HTMLVideoElement | null
          if (!video) return
          const p = itemPositions[i]
          if (!p) return
          const x = p.x % half
          const inView =
            (x + p.w > pos && x < pos + viewWidth) ||
            (x + p.w + half > pos && x + half < pos + viewWidth)
          if (inView && video.paused) video.play().catch(() => {})
          else if (!inView && !video.paused) video.pause()
        })
      }

      if (Math.abs(velRef.current) > 0.05) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }
    raf = requestAnimationFrame(tick)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      velRef.current += delta * 0.5
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
