'use client'
import { useRef, useEffect, useState, useCallback } from 'react'

export default function AutoPlayVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)
  const dragging = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
          setPlaying(true)
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(video)

    const onTimeUpdate = () => {
      if (!dragging.current && video.duration) {
        setProgress(video.currentTime / video.duration)
      }
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      observer.disconnect()
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  const trackRef = useRef<HTMLDivElement>(null)

  const seekTo = useCallback((clientX: number) => {
    const video = videoRef.current
    const track = trackRef.current
    if (!video || !track || !video.duration) return
    const rect = track.getBoundingClientRect()
    const pct = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1))
    video.currentTime = pct * video.duration
    setProgress(pct)
  }, [])

  const handleTrackMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    seekTo(e.clientX)
    const onMove = (ev: MouseEvent) => { if (dragging.current) seekTo(ev.clientX) }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [seekTo])

  const handleTrackTouchDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch') return
    dragging.current = true
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    seekTo(e.clientX)
  }, [seekTo])

  const handleTrackTouchMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch' || !dragging.current) return
    seekTo(e.clientX)
  }, [seekTo])

  const handleTrackTouchUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') dragging.current = false
  }, [])

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="w-full block"
      />
      {/* Controls overlay — bottom of video */}
      <div className={`absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3 mix-blend-difference transition-opacity duration-200 opacity-100 ${hovered ? 'md:opacity-100' : 'md:opacity-0 md:pointer-events-none'}`}>
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="shrink-0 text-orange-500 transition-colors"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          )}
        </button>

        {/* Progress slider */}
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          onPointerDown={handleTrackTouchDown}
          onPointerMove={handleTrackTouchMove}
          onPointerUp={handleTrackTouchUp}
          onPointerCancel={handleTrackTouchUp}
          className="relative flex-1 h-0.5 bg-white/30 cursor-pointer touch-none"
          aria-label="Seek"
        >
          <div className="absolute top-0 left-0 h-full bg-orange-500" style={{ width: `${progress * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-orange-500" style={{ left: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
