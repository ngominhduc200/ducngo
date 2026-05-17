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
  'font-mako text-btn text-ink-inverse uppercase no-underline',
  'bg-accent-primary border border-ink-primary rounded-card',
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
