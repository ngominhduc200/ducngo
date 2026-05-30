export default function PageHero({
  children,
  tagline,
  align = 'center',
  headingColor = 'text-neutral-900',
}: {
  children: React.ReactNode
  tagline?: React.ReactNode
  align?: 'center' | 'left'
  headingColor?: string
}) {
  return (
    <section
      className={`flex flex-col gap-2 w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] px-6 pt-20 md:pt-[150px] ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <h1 className={`font-serif font-normal text-2xl md:text-3xl lg:text-4xl xl:text-5xl w-full ${headingColor}`}>{children}</h1>
      {tagline && <p className="font-sans text-base text-neutral-400">{tagline}</p>}
    </section>
  )
}
