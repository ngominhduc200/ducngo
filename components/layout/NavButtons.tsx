import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work',   href: '/#work' },
  { label: 'Fun',    href: '/fun' },
  { label: 'About',  href: '/about' },
  { label: 'Resume', href: '/resume.pdf', external: true },
]

const btnClass = [
  'inline-flex items-center justify-center',
  'w-[124px] px-[10px] py-1',
  'font-sans text-sm text-white uppercase no-underline',
  'bg-orange-600 hover:bg-blue-800 active:bg-blue-800 border border-neutral-900 rounded transition-colors',
].join(' ')

export default function NavButtons() {
  return (
    <nav aria-label="Main navigation" className="flex justify-center gap-[11px]">
      {NAV_LINKS.map(link =>
        link.external ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={btnClass}>
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
