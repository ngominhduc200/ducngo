'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Work',   href: '/#work' },
  { label: 'Fun',    href: '/fun' },
  { label: 'About',  href: '/about' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/17I24nDeEwg7q8yptVhdWdWsnCFsJbNuD/view?usp=sharing', external: true },
]

const btnClass = [
  'inline-flex items-center justify-center',
  'w-[124px] px-[10px] py-1',
  'font-sans text-sm text-white uppercase no-underline',
  'bg-orange-600 hover:bg-blue-800 active:bg-blue-800 border border-neutral-900 rounded transition-colors',
].join(' ')

export default function NavButtons() {
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

  return (
    <nav aria-label="Main navigation" className="flex justify-center gap-[11px]">
      {NAV_LINKS.map(link =>
        link.external ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={btnClass}>
            {link.label}
          </a>
        ) : link.href === '/#work' ? (
          <a key={link.label} href={link.href} onClick={handleWorkClick} className={btnClass}>
            {link.label}
          </a>
        ) : (
          <Link key={link.label} href={link.href} className={btnClass}>
            {link.label}
          </Link>
        )
      )}
    </nav>
  )
}
