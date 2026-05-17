import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  meta: string
  href: string
  image?: string
  imageAlt?: string
}

export default function ProjectCard({ title, meta, href, image, imageAlt = '' }: ProjectCardProps) {
  return (
    <Link href={href} className="no-underline block">
      <div style={{
        display: 'flex',
        width: '100%',
        padding: '24px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
        backgroundColor: 'var(--color-ink-primary)',
        borderRadius: 'var(--radius-card)',
        cursor: 'pointer',
      }}>
        <div style={{
          width: '100%',
          height: '400px',
          backgroundColor: 'var(--color-accent-olive)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {image && (
            <div className="absolute inset-8">
              <div className="relative w-full h-full rounded-image overflow-hidden">
                <Image src={image} alt={imageAlt} fill className="object-cover object-top" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[11px]">
          <p className="font-besley font-medium text-heading text-ink-inverse">
            {title}
          </p>
          <p className="font-mako text-body text-ink-inverse uppercase">
            {meta}
          </p>
        </div>
      </div>
    </Link>
  )
}
