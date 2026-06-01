'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#work')
    }
  }

  return (
    <footer id="site-footer" className="fixed bottom-0 left-0 right-0 z-0 bg-blue-950 h-dvh flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start md:items-center gap-[60px] w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[50rem] px-6 antialiased">

        <div className="flex flex-col items-start md:items-center gap-[16px] w-full">
          <p className="font-serif font-normal text-3xl md:text-4xl text-left md:text-center text-white w-full">
            Good design doesn&apos;t happen by accident.
          </p>
          <p className="font-sans font-normal text-sm text-white text-left md:text-center">
            Designed and developed by Duc
          </p>
        </div>

        <div className="flex flex-col items-start md:items-center gap-[7px] font-sans font-normal text-sm text-white text-left md:text-center">
          <span className="uppercase">Explore/</span>
          <Link href="/#work" onClick={handleWorkClick} className="no-underline hover:text-orange-500 active:text-orange-500 text-white">work</Link>
          <Link href="/fun" className="no-underline hover:text-orange-500 active:text-orange-500 text-white">fun</Link>
          <Link href="/about" className="no-underline hover:text-orange-500 active:text-orange-500 text-white">about</Link>
        </div>

        <div className="flex flex-col items-start md:items-center gap-[7px] font-sans font-normal text-sm text-white text-left md:text-center">
          <span className="uppercase">Let&apos;s Chat/</span>
          <a href="https://www.linkedin.com/in/duc-n-0346a4203" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-orange-500 active:text-orange-500 text-white">Linkedin</a>
          <a href="mailto:ngominhduc200@gmail.com" className="no-underline hover:text-orange-500 active:text-orange-500 text-white">ngominhduc200@gmail.com</a>
        </div>

      </div>
    </footer>
  )
}
