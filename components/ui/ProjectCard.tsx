import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  id?: string
  className?: string
  title: string
  meta: string
  href: string
  image?: string
  imageAlt?: string
  video?: string
  compact?: boolean
  dark?: boolean
  external?: boolean
}

export default function ProjectCard({ id, className, title, meta, href, image, imageAlt = '', video, compact = false, dark = false, external = false }: ProjectCardProps) {
  return (
    <Link id={id} href={href} data-cursor="read-case-study" className={`group block no-underline w-full${className ? ` ${className}` : ''}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <div className={`flex flex-col w-full ${compact ? 'items-start gap-3' : 'items-center gap-4'}`}>

        {compact ? (
          <div className="relative w-full overflow-hidden rounded-none aspect-[3/4]">
            {video ? (
              <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : image ? (
              <Image src={image} alt={imageAlt} fill style={{ objectFit: 'cover' }} />
            ) : null}
          </div>
        ) : video ? (
          <div className="relative w-full overflow-hidden rounded-none aspect-[16/9]">
            <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
        ) : image ? (
          <div className="relative w-full overflow-hidden rounded-none aspect-[16/9]">
            <Image src={image} alt={imageAlt} fill style={{ objectFit: 'cover' }} />
          </div>
        ) : null}

        <div className={`flex flex-col w-full items-start text-left ${compact ? 'gap-1' : 'gap-2'}`}>
          <p className={compact ? `font-sans text-sm font-normal group-hover:text-orange-500 transition-colors ${dark ? 'text-white' : 'text-neutral-900'}` : 'font-sans text-sm font-normal text-neutral-900 group-hover:text-orange-500 transition-colors'}>{title}</p>
          <p className={`font-sans text-sm ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>{meta}</p>
        </div>

      </div>
    </Link>
  )
}
