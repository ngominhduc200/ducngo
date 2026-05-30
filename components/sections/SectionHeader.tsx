import SectionLabel from '@/components/ui/SectionLabel'

export default function SectionHeader({
  label,
  children,
  as: Tag = 'h2',
  weight = 'medium',
  dark,
}: {
  label: string
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
  weight?: 'normal' | 'medium'
  dark?: boolean
}) {
  const weightClass = weight === 'medium' ? 'font-medium' : 'font-normal'
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel dark={dark}>{label}</SectionLabel>
      <Tag className={`font-serif ${weightClass} text-xl md:text-3xl text-neutral-900`}>
        {children}
      </Tag>
    </div>
  )
}
