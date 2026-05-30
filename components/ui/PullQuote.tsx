export default function PullQuote({
  children,
  attribution,
  align = 'start',
}: {
  children: React.ReactNode
  attribution?: string
  align?: 'start' | 'center'
}) {
  const alignClass = align === 'center' ? 'items-center' : 'items-start'
  return (
    <div className={`flex gap-3.5 ${alignClass}`}>
      <div className="w-[2px] self-stretch bg-neutral-900 shrink-0" />
      <div className="flex flex-col gap-4 flex-1">
        <p className="font-serif font-medium italic text-2xl text-neutral-900">
          {children}
        </p>
        {attribution && <p className="font-sans text-sm text-neutral-400">{attribution}</p>}
      </div>
    </div>
  )
}
