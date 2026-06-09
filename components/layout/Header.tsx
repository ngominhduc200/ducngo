'use client'

import Link from 'next/link'
import { useAboutModal } from '@/contexts/AboutModalContext'

export default function Header() {
  const { isOpen: aboutOpen, toggle: toggleAbout } = useAboutModal()

  const linkClass = 'no-underline hover:text-orange-500 active:text-orange-500'

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] flex lg:hidden w-full items-center justify-between px-6 py-4 font-sans text-sm text-neutral-400">
      <nav className="flex items-center">
        <Link href="/" className={linkClass}>projects</Link>
        <span>,&nbsp;</span>
        <Link href="/fun" className={linkClass}>lab</Link>
        <span>,&nbsp;</span>
        <button onClick={toggleAbout} className={`cursor-pointer bg-transparent border-none p-0 ${aboutOpen ? 'text-orange-500' : ''} ${linkClass}`}>about</button>
      </nav>
      <a href="https://drive.google.com/file/d/17I24nDeEwg7q8yptVhdWdWsnCFsJbNuD/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={linkClass}>
        resume
      </a>
    </header>
  )
}
