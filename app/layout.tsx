import type { Metadata } from 'next'
import { Besley, Mako } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/layout/PageWrapper'
import HtmlBg from '@/components/layout/HtmlBg'

const besley = Besley({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-besley-loaded',
  display: 'swap',
})

const mako = Mako({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-mako-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Duc Ngo — Product Designer',
  description: 'Product designer mapping complexity until it clicks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${besley.variable} ${mako.variable}`}>
      <body>
        <HtmlBg />
        <Footer />
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  )
}
