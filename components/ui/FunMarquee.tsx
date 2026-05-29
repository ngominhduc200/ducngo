'use client'

import { useRef, useEffect } from 'react'

const FRICTION = 0.88
const MAX_TILT = 10 // degrees

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

    // Entrance: start fast and visibly decelerate to a stop over ~1.5s
    velRef.current = 200
    const entryStart = Date.now()
    const ENTRY_DURATION = 1000
    const ENTRY_FRICTION = 0.97

    let raf: number
    const tick = () => {
      const friction = Date.now() - entryStart < ENTRY_DURATION ? ENTRY_FRICTION : FRICTION
      velRef.current *= friction
      posRef.current += velRef.current
      if (halfRef.current > 0) {
        posRef.current = ((posRef.current % halfRef.current) + halfRef.current) % halfRef.current
      }
      track.style.transform = `translateX(${-posRef.current}px)`

      // Apply 3D rotateY tilt directly to each item
      const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, velRef.current * 0.1))
      itemsRef.current.forEach(el => {
        if (el) el.style.transform = `perspective(600px) rotateY(${tilt}deg)`
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      velRef.current += delta * 0.5
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
      <div ref={trackRef} className="flex gap-[100px] items-center" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => {
          const height = HEIGHTS[(i % items.length) % HEIGHTS.length]
          return (
            <div
              key={i}
              ref={el => { if (el) itemsRef.current[i] = el }}
              className="flex-shrink-0"
              style={{ height }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-auto block"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt="" className="h-full w-auto block" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
