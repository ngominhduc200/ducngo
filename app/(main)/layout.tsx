import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageTransition from '@/components/layout/PageTransition'
import SmoothScroll from '@/components/layout/SmoothScroll'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <div id="main-wrapper" className="relative z-[1] min-h-screen bg-stone-50 isolate">
        <PageTransition>
          {children}
        </PageTransition>
        <div id="footer-trigger" />
      </div>
      <Footer />
    </>
  )
}
