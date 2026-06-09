import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Public_Sans } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Duc Ngo Portfolio',
  description: 'Product and visual designer based in Vancouver. Open for Fall 2026 internship.',
}

export const viewport: Viewport = {
  themeColor: '#fafaf9',
}
import './globals.css'
import HtmlBg from '@/components/layout/HtmlBg'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Cursor from '@/components/layout/Cursor'
import SmoothScroll from '@/components/layout/SmoothScroll'
import ConditionalHeader from '@/components/layout/ConditionalHeader'
import ModeTransitionOverlay from '@/components/layout/ModeTransitionOverlay'
import AboutModal from '@/components/layout/AboutModal'
import RightSidebar from '@/components/layout/RightSidebar'
import DucNgoFooter from '@/components/layout/DucNgoFooter'
import PageTransition from '@/components/layout/PageTransition'
import PageLoader from '@/components/layout/PageLoader'
import SiteCredit from '@/components/layout/SiteCredit'
import { ViewModeProvider } from '@/contexts/ViewModeContext'
import { AboutModalProvider } from '@/contexts/AboutModalContext'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif-loaded',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-public-sans-loaded',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${publicSans.variable} scroll-smooth bg-stone-50`}>
      <body className="bg-stone-50 text-neutral-900 font-sans text-sm font-light" suppressHydrationWarning>
        <ViewModeProvider>
          <AboutModalProvider>
            <Cursor />
            <SmoothScroll>
              <HtmlBg />
              <DucNgoFooter />
              <ConditionalHeader />
              <ScrollToTop />
              <ModeTransitionOverlay />
              <AboutModal />
              <RightSidebar />
              <PageLoader />
              <PageTransition>{children}</PageTransition>
            </SmoothScroll>
            <SiteCredit />
          </AboutModalProvider>
        </ViewModeProvider>
      </body>
    </html>
  )
}
