'use client'

import { useState, useEffect } from 'react'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [pressed, setPressed] = useState(false)
  const [isMouse, setIsMouse] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setIsMouse(true)

    const style = document.createElement('style')
    style.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      style.remove()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  if (!isMouse) return null

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
