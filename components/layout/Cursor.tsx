'use client'

import { useState, useEffect } from 'react'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [pressed, setPressed] = useState(false)
  const [isMouse, setIsMouse] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setIsMouse(true)

    const style = document.createElement('style')
    style.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('[data-cursor]')
      setLabel(el ? (el as HTMLElement).dataset.cursor ?? null : null)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)

    return () => {
      style.remove()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!isMouse) return null

  if (label === 'playing-slideshow' || label === 'read-case-study') {
    return (
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${pressed ? 0.95 : 1})`,
          transition: 'transform 80ms ease-out',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#f97316',
          whiteSpace: 'nowrap',
          fontWeight: 400,
        }}
        data-cursor-label
      >
        {label === 'playing-slideshow' ? 'playing slideshow' : 'read case study'}
        {label === 'read-case-study' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 14, height: 14, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 20,
        height: 20,
        backgroundColor: '#f97316',
        transform: `translate(-50%, -50%) scale(${pressed ? 0.75 : 1})`,
        transition: 'transform 80ms ease-out',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  )
}
