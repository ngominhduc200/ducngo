import PageTransition from '@/components/layout/PageTransition'

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[1] min-h-screen bg-stone-50">
      <PageTransition>
        {children}
      </PageTransition>
    </div>
  )
}
