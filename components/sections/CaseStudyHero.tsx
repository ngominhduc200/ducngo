import Image from 'next/image'
import Link from 'next/link'

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
      <Link href="/" className="md:hidden no-underline w-fit -mt-6 bg-neutral-100 text-neutral-700 hover:text-orange-500 active:text-orange-500 px-3 py-1 rounded-[1px] inline-flex items-center gap-2" aria-label="Home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        <span className="font-sans text-sm">work</span>
      </Link>
      <div className="flex flex-col gap-8">
        <h1 className="font-serif font-normal text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-900 leading-[1.3]">
          {title}
        </h1>
        <p className="font-sans text-sm text-neutral-900">{description}</p>
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
              <span className="font-sans text-sm text-neutral-900 uppercase">{label}</span>
              <span className="font-sans text-sm text-neutral-900">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
