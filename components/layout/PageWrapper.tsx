export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative z-[1] min-h-screen bg-stone-50">{children}</div>
}
