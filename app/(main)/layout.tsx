import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageTransition from '@/components/layout/PageTransition'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="main-wrapper" className="relative z-[1] min-h-dvh bg-stone-50 isolate mb-[80vh]">
        <PageTransition>
          {children}
        </PageTransition>
        <div id="footer-trigger" />
      </div>
      <Footer />
    </>
  )
}
