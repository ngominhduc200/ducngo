import ScrollProgress from '@/components/layout/ScrollProgress'
import PageTransition from '@/components/layout/PageTransition'

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[1] min-h-screen bg-stone-50">
      <ScrollProgress />
      <PageTransition>
        {children}
      </PageTransition>
    </div>
  )
}
