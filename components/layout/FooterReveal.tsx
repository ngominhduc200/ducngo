'use client'

import { useLayoutEffect } from 'react'
import { motion, useMotionValue, useScroll } from 'framer-motion'
import Footer from './Footer'

export default function FooterReveal({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const y = useMotionValue(0)
  const innerY = useMotionValue(0)

  useLayoutEffect(() => {
    const update = (v: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return

      y.set(v - max)

      const parallax = window.innerHeight * 0.5
      const zone = window.innerHeight
      const progress = Math.max(0, Math.min(1, (v - (max - zone)) / zone))
      innerY.set((1 - progress) * parallax)
    }

    update(scrollY.get())
    return scrollY.on('change', update)
  }, [scrollY, y, innerY])

  return (
    <>
      <div id="main-wrapper" className="relative z-[1] min-h-dvh bg-stone-50 isolate">
        {children}
      </div>
      <div id="footer-root" className="relative z-0 w-full overflow-hidden">
        <motion.div style={{ y }}>
          <motion.div style={{ y: innerY }}>
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
