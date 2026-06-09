'use client'

import { usePathname } from 'next/navigation'

export default function SiteCredit() {
  const pathname = usePathname()
  if (pathname.startsWith('/work/')) return null
  return (
    <p className="fixed bottom-0 right-0 font-sans text-sm text-neutral-400 pointer-events-auto" style={{ paddingBottom: '1.5rem', paddingRight: '1.5rem' }}>
      Design and built by Duc.
    </p>
  )
}
