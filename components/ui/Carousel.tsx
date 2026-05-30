'use client'
import { useState, useRef, useEffect } from 'react'

const CARD_RATIO = 0.85
const GAP = 16
const DRAG_THRESHOLD = 50


export default function Carousel({ images }: {
  images: { src: string; alt: string }[]
}) {
  const [index, setIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
      setReady(true)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cardWidth = containerWidth * CARD_RATIO
  const offset = (containerWidth - cardWidth) / 2
  const totalTrackWidth = images.length * cardWidth + (images.length - 1) * GAP
  const minTranslate = containerWidth - totalTrackWidth
  const translateX = Math.min(0, Math.max(minTranslate, offset - index * (cardWidth + GAP)))

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(images.length - 1, i)))

  const settle = (endX: number) => {
    if (dragStartX.current === null) return
    const delta = endX - dragStartX.current
    if (delta > DRAG_THRESHOLD) goTo(index - 1)
    else if (delta < -DRAG_THRESHOLD) goTo(index + 1)
    dragStartX.current = null
  }

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Viewport */}
      <div
        ref={containerRef}
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => { dragStartX.current = e.clientX }}
        onMouseUp={(e) => settle(e.clientX)}
        onMouseLeave={() => { dragStartX.current = null }}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => settle(e.changedTouches[0].clientX)}
      >
        {/* Track */}
        <div
          className={`flex select-none ${ready ? 'transition-transform duration-300 ease-in-out' : ''}`}
          style={{ gap: GAP, transform: `translateX(${translateX}px)` }}
        >
          {images.map(({ src, alt }, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden"
              style={{ width: cardWidth > 0 ? cardWidth : `${CARD_RATIO * 100}%`, height: '50vh' }}
            >
              {Math.abs(i - index) <= 1 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover pointer-events-none" style={{ objectPosition: 'center 67%' }} draggable={false} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              'w-2 h-2 rounded-full transition-colors',
              i === index ? 'bg-orange-500' : 'bg-zinc-200',
            ].join(' ')}
          />
        ))}
      </div>

    </div>
  )
}
