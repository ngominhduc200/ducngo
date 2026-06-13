'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

interface ImageItem {
  src: string
  name: string
}

interface Props {
  items: ImageItem[]
  onProgress?: (pct: number) => void
}

const FOV_DEG  = 70
const MIN_DIST = 300
const MAX_DIST = 6000
const HALF_FOV = (FOV_DEG * 0.5 * Math.PI) / 180

function frustumPoint(camZ: number, aspect: number): THREE.Vector3 {
  const depth = MIN_DIST + Math.pow(Math.random(), 0.35) * (MAX_DIST - MIN_DIST)
  const halfH = depth * Math.tan(HALF_FOV) * 1.05
  const halfW = halfH * aspect * 1.05
  return new THREE.Vector3(
    (Math.random() * 2 - 1) * halfW,
    (Math.random() * 2 - 1) * halfH,
    camZ - depth,
  )
}

export default function ImageUniverse({ items, onProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const tooltip   = tooltipRef.current
    if (!container || items.length === 0) return

    const W = container.clientWidth
    const H = container.clientHeight
    let aspect = W / H

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x080808)
    const canvas = renderer.domElement
    Object.assign(canvas.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%',
    })
    container.appendChild(canvas)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x080808, 0.00015)
    const camera = new THREE.PerspectiveCamera(FOV_DEG, aspect, 1, 12000)
    camera.position.set(0, 0, 0)

    // ── Load textures ─────────────────────────────────────────────────────────
    const loader   = new THREE.TextureLoader()
    const meshes: THREE.Mesh[] = []
    const toDispose: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = []

    const srcGroups = new Map<string, ImageItem[]>()
    items.forEach((item) => {
      if (!srcGroups.has(item.src)) srcGroups.set(item.src, [])
      srcGroups.get(item.src)!.push(item)
    })

    let staggerIdx = 0
    let loadedCount = 0
    const totalSrcs = srcGroups.size
    onProgress?.(0)

    srcGroups.forEach((groupItems, src) => {
      loader.load(src, (tex) => {
        loadedCount++
        onProgress?.(Math.round((loadedCount / totalSrcs) * 100))
        tex.colorSpace = THREE.SRGBColorSpace
        toDispose.push(tex)

        const img       = tex.image as HTMLImageElement
        const imgAspect = (img.naturalWidth || img.width || 1.5) / (img.naturalHeight || img.height || 1)

        groupItems.forEach((item) => {
          const baseH = 170 + Math.random() * 210
          const geo   = new THREE.PlaneGeometry(baseH * imgAspect, baseH)
          const mat   = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0 })
          const mesh  = new THREE.Mesh(geo, mat)
          mesh.userData.name = item.name

          mesh.position.copy(frustumPoint(camera.position.z, aspect))
          scene.add(mesh)
          meshes.push(mesh)
          toDispose.push(geo, mat)

          gsap.to(mat, {
            opacity: 1,
            duration: 1.8,
            delay: staggerIdx * 0.04 + Math.random() * 0.2,
            ease: 'power2.out',
          })
          staggerIdx++
        })
      })
    })

    // ── Raycaster ─────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse     = new THREE.Vector2()
    let mouseX = 0
    let mouseY = 0

    // ── Scroll velocity ───────────────────────────────────────────────────────
    let scrollVel = 0

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollVel += e.deltaY * 0.15
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    let lastTouchY = 0
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault()
      scrollVel += (lastTouchY - e.touches[0].clientY) * 0.5
      lastTouchY = e.touches[0].clientY
    }
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove',  onTouchMove,  { passive: false })

    // ── Mouse look ────────────────────────────────────────────────────────────
    const look = { x: 0, y: 0 }
    const lookX = gsap.quickTo(look, 'x', { duration: 1.2, ease: 'power3.out' })
    const lookY = gsap.quickTo(look, 'y', { duration: 1.2, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      lookX( (e.clientX / window.innerWidth  - 0.5) * 2)
      lookY(-(e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── GSAP render ticker ────────────────────────────────────────────────────
    let hoveredName = ''

    const tick = () => {
      scrollVel *= 0.90
      camera.position.z -= scrollVel

      const camZ = camera.position.z

      meshes.forEach(m => {
        const dz = m.position.z - camZ
        if (dz > 200 || dz < -(MAX_DIST + 400)) {
          m.position.copy(frustumPoint(camZ, aspect))
        }
        m.lookAt(camera.position)
      })

      camera.position.x = 0
      camera.position.y = 0
      camera.lookAt(look.x * 500, look.y * 300, camZ - 700)

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(meshes)
      const name = hits.length > 0 ? (hits[0].object.userData.name as string) : ''

      if (tooltip && name !== hoveredName) {
        hoveredName = name
        tooltip.textContent = name
        tooltip.style.opacity = name ? '1' : '0'
      }
      if (tooltip && name) {
        tooltip.style.left = (mouseX - 10) + 'px'
        tooltip.style.top  = (mouseY + 16) + 'px'
      }

      renderer.render(scene, camera)
    }

    gsap.ticker.lagSmoothing(0)
    gsap.ticker.add(tick)

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      aspect = w / h
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      setTimeout(() => {
        if (container.contains(canvas)) container.removeChild(canvas)
        const doDispose = () => toDispose.forEach(d => d.dispose())
        if ('requestIdleCallback' in window) {
          requestIdleCallback(doDispose, { timeout: 5000 })
        } else {
          setTimeout(doDispose, 1000)
        }
      }, 1200)
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ background: '#080808' }}
    >
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s ease',
          transform: 'none',
          fontFamily: 'var(--font-public-sans-loaded, sans-serif)',
          fontWeight: 300,
          fontSize: '0.75rem',
          color: '#a3a3a3',
          letterSpacing: '0.01em',
          zIndex: 10,
          whiteSpace: 'nowrap',
        }}
      />
    </div>
  )
}
