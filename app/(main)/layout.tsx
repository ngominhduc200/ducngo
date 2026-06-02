import FooterReveal from '@/components/layout/FooterReveal'
import Header from '@/components/layout/Header'
import PageTransition from '@/components/layout/PageTransition'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <FooterReveal>
        <PageTransition>
          {children}
        </PageTransition>
        <div id="footer-trigger" />
      </FooterReveal>
    </>
  )
}
