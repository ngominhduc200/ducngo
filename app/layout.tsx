import type { Metadata } from 'next'
import { Instrument_Serif, Public_Sans } from 'next/font/google'
import './globals.css'
import HtmlBg from '@/components/layout/HtmlBg'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Cursor from '@/components/layout/Cursor'

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
    <html lang="en" className={`${instrumentSerif.variable} ${publicSans.variable} scroll-smooth`}>
      <body className="bg-stone-50 text-neutral-900 font-sans font-light">
        <HtmlBg />
        <Cursor />
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
