'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const EASE     = 0.85
const DECAY    = 0.95
const MAX_TILT = 10

const HEIGHTS = [
  '53vh', '33vh', '48vh', '40vh', '60vh',
  '28vh', '44vh', '58vh', '36vh', '50vh',
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
    const cacheTimer = setTimeout(() => {
      itemsRef.current.forEach((el, i) => {
        if (el) itemPositions[i] = { x: el.offsetLeft, w: el.offsetWidth }
      })
    }, 150)

    let velocity      = 150
    let target        = 0
    let current       = 0
    const ENTRANCE_FRAMES = 100
    let entranceFrame     = 0
    let entranceOffset    = viewWidth

    const checkVideos = (display: number, h: number) => {
      if (itemPositions.length === 0) return
      itemsRef.current.forEach((itemEl, i) => {
        const video = itemEl?.querySelector('video') as HTMLVideoElement | null
        if (!video) return
        const p = itemPositions[i]
        if (!p) return
        const x = p.x % h
        if (video.preload === 'none') {
          const dist = Math.min(Math.abs(x - display), Math.abs(x - display + h))
          if (dist < viewWidth * 2) { video.preload = 'auto'; video.load() }
        }
        const inView =
          (x + p.w > display && x < display + viewWidth) ||
          (x + p.w + h > display && x + h < display + viewWidth)
        if (inView  && video.paused)  video.play().catch(() => {})
        if (!inView && !video.paused) video.pause()
      })
    }

    let raf = 0
    const tick = () => {
      target  += velocity
      velocity *= DECAY
      current += (target - current) * EASE
      if (entranceFrame < ENTRANCE_FRAMES) {
        const t    = entranceFrame / ENTRANCE_FRAMES
        const ease = 1 - Math.pow(1 - t, 3)
        entranceOffset = viewWidth * (1 - ease)
        entranceFrame++
      } else {
        entranceOffset = 0
      }

      const h       = half || 1
      const display = ((current % h) + h) % h
      const tilt    = Math.max(-MAX_TILT, Math.min(MAX_TILT, (target - current) * 0.5))

      track.style.transform = `translateX(${-display + entranceOffset}px)`
      itemsRef.current.forEach(el => {
        if (el) el.style.transform = `perspective(600px) rotateY(${tilt}deg)`
      })

      checkVideos(display, h)

      if (Math.abs(velocity) > 0.1 || Math.abs(target - current) > 0.1 || entranceFrame < ENTRANCE_FRAMES) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }
    raf = requestAnimationFrame(tick)

    // Re-check videos whenever the carousel section enters the page viewport
    const pageObserver = new IntersectionObserver(([entry]) => {
      const h = half || 1
      const display = ((current % h) + h) % h
      if (entry.isIntersecting) {
        checkVideos(display, h)
        if (!raf) raf = requestAnimationFrame(tick)
      } else {
        itemsRef.current.forEach(el => {
          const v = el?.querySelector('video') as HTMLVideoElement | null
          if (v && !v.paused) v.pause()
        })
      }
    }, { threshold: 0 })
    pageObserver.observe(wrapper)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      velocity += delta * 0.1
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const armWheel = () => wrapper.addEventListener('mousemove', onFirstMove, { once: true })
    const onFirstMove = () => wrapper.addEventListener('wheel', onWheel, { passive: false })
    const onMouseLeave = () => {
      wrapper.removeEventListener('wheel', onWheel)
      wrapper.removeEventListener('mousemove', onFirstMove)
      armWheel()
    }
    armWheel()
    wrapper.addEventListener('mouseleave', onMouseLeave)

    // Drag / touch support
    let lastPointerX = 0
    let lastDelta = 0
    let isDragging = false

    let hasMoved = false

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      hasMoved = false
      lastPointerX = e.clientX
      lastDelta = 0
      velocity = 0
      wrapper.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      if (!hasMoved) {
        hasMoved = true
        if (e.pointerType === 'mouse') {
          wrapper.style.transition = 'opacity 150ms ease'
          wrapper.style.opacity = '0.85'
        }
      }
      lastDelta = lastPointerX - e.clientX
      target += lastDelta
      lastPointerX = e.clientX
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return
      isDragging = false
      velocity = lastDelta * 5
      wrapper.style.transition = 'opacity 300ms ease'
      wrapper.style.opacity = '1'
      if (!hasMoved) {
        const video = (e.target as Element)?.closest('div')?.querySelector('video') as HTMLVideoElement & { webkitEnterFullscreen?: () => void } | null
        if (video) {
          if (video.webkitEnterFullscreen) video.webkitEnterFullscreen()
          else video.requestFullscreen?.()
        }
      }
      hasMoved = false
    }

    wrapper.addEventListener('pointerdown', onPointerDown)
    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerup', onPointerUp)
    wrapper.addEventListener('pointercancel', onPointerUp)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(cacheTimer)
      ro.disconnect()
      pageObserver.disconnect()
      wrapper.removeEventListener('mousemove', onFirstMove)
      wrapper.removeEventListener('mouseleave', onMouseLeave)
      wrapper.removeEventListener('wheel', onWheel)
      wrapper.removeEventListener('pointerdown', onPointerDown)
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerup', onPointerUp)
      wrapper.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  const doubled = [...items, ...items]

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none">
      <div ref={trackRef} className="flex gap-4 md:gap-[100px] items-center" style={{ width: 'max-content' }}>
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
