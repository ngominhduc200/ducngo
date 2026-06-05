'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const [visible, setVisible] = useState(true)
  const prevScrollY = useRef(0)
  const pathname = usePathname()
  const router = useRouter()

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      sessionStorage.setItem('scrollTo', 'work')
      router.push('/')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const atBottom = currentY + window.innerHeight >= document.documentElement.scrollHeight - 50
      if (currentY <= 0) {
        setVisible(true)
      } else if (atBottom) {
        setVisible(false)
      } else if (currentY < prevScrollY.current) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      prevScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-6 py-4 font-sans text-sm text-neutral-400 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Link href="/" className="no-underline hover:text-orange-500 active:text-orange-500">
        Duc Ngo
      </Link>

      <nav className="flex items-center">
        <a href="/#work" onClick={handleWorkClick} className="no-underline hover:text-orange-500 active:text-orange-500">work</a>
        <span>,&nbsp;</span>
        <Link href="/fun" className="no-underline hover:text-orange-500 active:text-orange-500">fun</Link>
        <span>,&nbsp;</span>
        <Link href="/about" className="no-underline hover:text-orange-500 active:text-orange-500">about</Link>
      </nav>

      <a href="https://drive.google.com/file/d/17I24nDeEwg7q8yptVhdWdWsnCFsJbNuD/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-orange-500 active:text-orange-500">
        resume
      </a>
    </header>
  )
}
