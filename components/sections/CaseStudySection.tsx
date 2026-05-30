const GAP: Record<number, string> = {
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
}

export default function CaseStudySection({
  id,
  children,
  gap = 8,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  gap?: 6 | 8 | 10 | 12 | 16
  className?: string
}) {
  return (
    <section id={id} className={`flex flex-col ${GAP[gap]} py-16 w-full ${className}`}>
      {children}
    </section>
  )
}
