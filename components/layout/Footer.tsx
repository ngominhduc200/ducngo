import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-footer-bg overflow-hidden flex flex-col">
      <p
        className="font-besley italic font-normal leading-[0.72] text-ink-inverse whitespace-nowrap px-6 pb-10"
        style={{
          fontSize: 'clamp(24px, 5.5vw, 76px)',
          paddingTop: 'clamp(32px, 8vw, 96px)',
        }}
      >
        Graphically designed and vide-coded by Duc
      </p>

      <div className="flex px-6 pb-16">
        <div className="flex flex-col gap-2 shrink-0 mr-24">
          <span className="font-mako text-body text-ink-inverse uppercase">Explore/</span>
          {[{ label: 'Work', href: '/#work' }, { label: 'Fun', href: '/fun' }, { label: 'About', href: '/about' }].map(l => (
            <Link key={l.label} href={l.href} className="font-mako text-body text-ink-inverse no-underline">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <span className="font-mako text-body text-ink-inverse uppercase">Let&apos;s Chat/</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="font-mako text-body text-ink-inverse no-underline">
            Linkedin
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="font-mako text-body text-ink-inverse no-underline">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
