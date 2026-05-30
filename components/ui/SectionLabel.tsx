export default function SectionLabel({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <p className={`font-sans text-base ${dark ? 'text-white' : 'text-neutral-400'}`}>
      {children.charAt(0).toUpperCase() + children.slice(1)}
    </p>
  )
}
