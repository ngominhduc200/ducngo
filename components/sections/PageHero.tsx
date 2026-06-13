export default function PageHero({
  children,
  tagline,
  align = 'center',
  headingColor = 'text-neutral-900',
  className = '',
}: {
  children: React.ReactNode
  tagline?: React.ReactNode
  align?: 'center' | 'left'
  headingColor?: string
  className?: string
}) {
  return (
    <section
      style={{ animation: 'contentReveal 0.5s ease-out both' }}
      className={`w-full px-6 pt-20 pb-8 ${
        align === 'left'
          ? 'flex flex-col gap-2 items-start text-left'
          : 'flex flex-col gap-2 items-start text-left md:items-center md:text-center'
      } ${className}`}
    >
      <h1 className={`hero-serif font-normal text-2xl lg:text-xl xl:text-2xl w-full ${headingColor}`}>{children}</h1>
      {tagline && <p className="font-sans text-sm text-neutral-400">{tagline}</p>}
    </section>
  )
}
