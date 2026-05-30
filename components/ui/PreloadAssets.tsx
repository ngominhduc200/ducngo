'use client'

import { useEffect } from 'react'

export default function PreloadAssets({ urls }: { urls: string[] }) {
  useEffect(() => {
    urls.forEach(url => {
      if (/\.(mp4|mov|webm)$/i.test(url)) return
      const img = new window.Image()
      img.src = url
    })
  }, [])
  return null
}
