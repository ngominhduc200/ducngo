import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Public_Sans } from 'next/font/google'

export const viewport: Viewport = {
  themeColor: '#fafaf9',
}
import './globals.css'
import HtmlBg from '@/components/layout/HtmlBg'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Cursor from '@/components/layout/Cursor'
import SmoothScroll from '@/components/layout/SmoothScroll'
import ConditionalHeader from '@/components/layout/ConditionalHeader'

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
      <body className="bg-stone-50 text-neutral-900 font-sans font-light" suppressHydrationWarning>
        <SmoothScroll>
          <HtmlBg />
          <ConditionalHeader />
          <Cursor />
          <ScrollToTop />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
