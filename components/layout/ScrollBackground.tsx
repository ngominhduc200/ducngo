'use client'
import { useEffect } from 'react'

// stone-50: rgb(250,250,249)  →  neutral-900: rgb(23,23,23)
const FROM = [250, 250, 249]
const TO = [23, 23, 23]

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

export default function ScrollBackground({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const wrapper = document.getElementById('main-wrapper')
    if (!wrapper) return

    const update = () => {
      const section = document.getElementById(sectionId)
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0→1 as section enters (top goes from 90% viewport to 0)
      const enterProgress = Math.max(0, Math.min(1, (vh * 0.9 - rect.top) / (vh * 0.9)))
      // 1→0 as section exits downward (bottom goes from 50% viewport to 0)
      const exitFactor = Math.max(0, Math.min(1, rect.bottom / (vh * 0.5)))
      const progress = enterProgress * exitFactor
      const r = lerp(FROM[0], TO[0], progress)
      const g = lerp(FROM[1], TO[1], progress)
      const b = lerp(FROM[2], TO[2], progress)
      wrapper.style.backgroundColor = `rgb(${r},${g},${b})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      wrapper.style.backgroundColor = ''
    }
  }, [sectionId])

  return null
}
