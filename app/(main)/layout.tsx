import FooterReveal from '@/components/layout/FooterReveal'
import PageTransition from '@/components/layout/PageTransition'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FooterReveal>
        <PageTransition>
          {children}
        </PageTransition>
        <div id="footer-trigger" />
      </FooterReveal>
    </>
  )
}
