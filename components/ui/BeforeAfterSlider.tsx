'use client'
import { useRef, useCallback } from 'react'
import Image from 'next/image'

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: {
  before: string
  after: string
  beforeAlt?: string
  afterAlt?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const beforeLabelRef = useRef<HTMLSpanElement>(null)
  const afterLabelRef = useRef<HTMLSpanElement>(null)

  const move = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const pct = Math.max(0, Math.min(((clientX - rect.left) / rect.width) * 100, 100))
    if (overlayRef.current) overlayRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    if (handleRef.current) handleRef.current.style.left = `${pct}%`
    if (beforeLabelRef.current) beforeLabelRef.current.style.opacity = pct < 15 ? '0' : '1'
    if (afterLabelRef.current) afterLabelRef.current.style.opacity = pct > 85 ? '0' : '1'
  }, [])

  const reset = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.clipPath = 'inset(0 50% 0 0)'
    if (handleRef.current) handleRef.current.style.left = '50%'
    if (beforeLabelRef.current) beforeLabelRef.current.style.opacity = '1'
    if (afterLabelRef.current) afterLabelRef.current.style.opacity = '1'
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-col-resize shrink-0"
      onMouseMove={(e) => move(e.clientX)}
      onMouseLeave={reset}
    >
      {/* After — base layer, sets natural height */}
      <Image src={after} alt={afterAlt} width={0} height={0} sizes="(max-width: 768px) 100vw, 800px" style={{ width: '100%', height: 'auto', display: 'block' }} draggable={false} />

      {/* Before — absolutely overlays, clipped to left of handle */}
      <div
        ref={overlayRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <Image src={before} alt={beforeAlt} fill style={{ objectFit: 'cover' }} draggable={false} />
      </div>

      {/* Divider */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-px bg-neutral-900/10 pointer-events-none"
        style={{ left: '50%' }}
      />

      <span ref={beforeLabelRef} className="absolute top-3 left-3 bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-[1px] font-sans pointer-events-none transition-opacity duration-200">Before</span>
      <span ref={afterLabelRef} className="absolute top-3 right-3 bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-[1px] font-sans pointer-events-none transition-opacity duration-200">After</span>
    </div>
  )
}
