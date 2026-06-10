'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useViewMode } from '@/contexts/ViewModeContext'
import { useAboutModal } from '@/contexts/AboutModalContext'

const RESUME_URL = 'https://drive.google.com/file/d/17I24nDeEwg7q8yptVhdWdWsnCFsJbNuD/view?usp=sharing'

export default function RightSidebar() {
  const pathname = usePathname()
  const { mode, setMode } = useViewMode()
  const { isOpen: aboutOpen, toggle: toggleAbout, close: closeAbout } = useAboutModal()

  // Case study and about pages have their own full-screen layout — hide sidebar
  if (pathname.startsWith('/project/') || pathname === '/about') return null

  const linkCls = 'no-underline hover:text-orange-500 active:text-orange-500'
  const btnCls  = `cursor-pointer bg-transparent border-none p-0 hover:text-orange-500 active:text-orange-500`

  return (
    <aside className="hidden lg:flex fixed top-0 right-0 h-screen flex-col z-[1000] pointer-events-none font-sans text-sm text-neutral-400"
      style={{ width: 'calc((100vw - 1.5rem) / 3)', paddingRight: '1.5rem' }}
    >
      {/* Nav row */}
      <nav className="flex items-center pointer-events-auto" style={{ paddingTop: '1.5rem' }}>
        <div className="flex-1 flex items-center">
          <Link href="/" className={linkCls} onClick={e => { if (pathname === '/') e.preventDefault(); closeAbout() }}>projects</Link>
          <span>,&nbsp;</span>
          <Link href="/lab" className={linkCls} onClick={e => { if (pathname === '/lab') e.preventDefault(); closeAbout() }}>lab</Link>
          <span>,&nbsp;</span>
          <button onClick={toggleAbout} className={`${btnCls} ${aboutOpen ? 'text-orange-500' : ''}`}>about</button>
          <span>,&nbsp;</span>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>resume</a>
        </div>
        <button
          onClick={() => setMode(mode === 'compressed' ? 'expand' : 'compressed')}
          className={`${btnCls} ${mode === 'compressed' ? 'text-orange-500' : ''}`}
        >
          immersive: {mode === 'compressed' ? 'on' : 'off'}
        </button>
      </nav>

    </aside>
  )
}
