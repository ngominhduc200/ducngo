import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Duc Ngo',
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

const reckless = localFont({
  src: [
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-Thin.woff2', style: 'normal', weight: '100' },
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-ThinItalic.woff2', style: 'italic', weight: '100' },
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-Light.woff2', style: 'normal', weight: '300' },
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-LightItalic.woff2', style: 'italic', weight: '300' },
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-Regular.woff2', style: 'normal', weight: '400' },
    { path: '../public/fonts/font-serif/Reckless Condensed S/RecklessCondensedS-TRIAL-RegularItalic.woff2', style: 'italic', weight: '400' },
  ],
  variable: '--font-reckless-loaded',
  display: 'swap',
})

const neueHaasUnica = localFont({
  src: [
    { path: '../public/fonts/font-sans/NeueHaasUnica-Light.woff2', style: 'normal', weight: '300' },
    { path: '../public/fonts/font-sans/NeueHaasUnica-LightItalic.woff2', style: 'italic', weight: '300' },
    { path: '../public/fonts/font-sans/NeueHaasUnica-Regular.woff2', style: 'normal', weight: '400' },
    { path: '../public/fonts/font-sans/NeueHaasUnica-Italic.woff2', style: 'italic', weight: '400' },
    { path: '../public/fonts/font-sans/NeueHaasUnica-Medium.woff2', style: 'normal', weight: '500' },
    { path: '../public/fonts/font-sans/NeueHaasUnica-MediumItalic.woff2', style: 'italic', weight: '500' },
  ],
  variable: '--font-public-sans-loaded',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${reckless.variable} ${neueHaasUnica.variable} scroll-smooth bg-stone-50`}>
      <body className="bg-stone-50 text-neutral-900 font-sans text-sm font-normal" suppressHydrationWarning>
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
        <Analytics />
      </body>
    </html>
  )
}
