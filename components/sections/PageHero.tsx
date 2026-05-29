export default function PageHero({
  children,
  tagline,
  align = 'center',
}: {
  children: React.ReactNode
  tagline?: React.ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <section
      className={`flex flex-col gap-2 w-full max-w-[56.25rem] px-6 pt-[150px] ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <h1 className="font-serif font-normal text-5xl text-neutral-900 w-full">{children}</h1>
      {tagline && <p className="font-sans text-base text-neutral-900">{tagline}</p>}
    </section>
  )
}
