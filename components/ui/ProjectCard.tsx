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
    <Link id={id} href={href} className={`block no-underline w-full${className ? ` ${className}` : ''}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <div className={`flex flex-col w-full ${compact ? 'items-start gap-3' : 'items-center gap-6'}`}>

        <div className={`relative w-full overflow-hidden rounded-none ${compact ? 'aspect-[3/4]' : 'aspect-[1440/847]'}`}>
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <Image src={image} alt={imageAlt} fill style={{ objectFit: 'cover' }} />
          ) : null}
        </div>

        <div className={`flex flex-col w-full ${compact ? 'items-start text-left gap-1' : 'items-center text-center gap-[10px]'}`}>
          <p className={compact ? `font-serif font-normal text-3xl ${dark ? 'text-white' : 'text-neutral-900'}` : 'font-serif font-normal text-3xl text-neutral-900'}>{title}</p>
          <p className={`font-sans text-base ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>{meta}</p>
        </div>

      </div>
    </Link>
  )
}
