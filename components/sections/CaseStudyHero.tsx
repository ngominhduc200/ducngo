import Image from 'next/image'

export default function CaseStudyHero({
  id,
  title,
  description,
  coverSrc,
  coverAlt,
  meta,
}: {
  id?: string
  title: React.ReactNode
  description: string
  coverSrc: string
  coverAlt: string
  meta?: { label: string; value: string }[]
}) {
  return (
    <div id={id} className="flex flex-col gap-10 py-16 w-full">
      <div className="flex flex-col gap-8">
        <h1 className="font-serif font-normal text-xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-900 leading-[1.3]">
          {title}
        </h1>
        <p className="font-sans text-base text-neutral-900">{description}</p>
      </div>
      <Image
        src={coverSrc}
        alt={coverAlt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ width: '100%', height: 'auto' }}
        priority
      />
      {meta && meta.length > 0 && (
        <div className={`grid grid-cols-1 ${meta.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-6 sm:gap-16`}>
          {meta.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-3">
              <span className="font-sans text-base text-neutral-900 uppercase">{label}</span>
              <span className="font-sans text-base text-neutral-900">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
