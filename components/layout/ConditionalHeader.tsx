'use client'

import { usePathname } from 'next/navigation'
import { isCaseStudy } from '@/lib/case-study-paths'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  if (isCaseStudy(pathname) || pathname === '/about') return null
  return <Header />
}
