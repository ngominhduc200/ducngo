import PageHero from '@/components/sections/PageHero'

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <PageHero align="left" tagline="I capture everything aesthetic.">
        Hello, I&apos;m{' '}
        <em className="italic" style={{ color: '#0ea5e9' }}>Duc.</em>
      </PageHero>

      <div className="flex flex-col gap-[60px] md:gap-[100px] w-full max-w-[56.25rem] px-6 mt-16 md:mt-[150px] pb-16 md:pb-[165px]">

        {/* Bio + credentials */}
        <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
          <p className="leading-[1.3]">
            Starting as a graphic designer, I fell in love with the idea of making things more
            interactive and human. As I learned more about research and code, I decided to pursue
            a career where I design products, interactions, and visuals that drive experience.
            I get really excited whenever I bring an idea to life. Currently, I study at Simon Fraser University, Canada, majoring in Interactive Arts and Technology.
          </p>
          <p className="leading-[1.3]">
            Outside of design, I play games on Xbox, hang out with a daily matcha, and watch Netflix with meals I cook.
          </p>
          <p className="leading-[1.3]">
            You can find me on{' '}
            <a
              href="https://linkedin.com/in/ngominhduc200"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-orange-500 active:text-orange-500"
            >
              LinkedIn
            </a>
            {' '}or say hi at{' '}
            <a
              href="mailto:ngominhduc200@gmail.com"
              className="underline hover:text-orange-500 active:text-orange-500"
            >
              ngominhduc200@gmail.com
            </a>
            .
          </p>

          <hr className="border-t border-neutral-900 w-full opacity-10" />

          {/* Experience + Education */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-6 items-start w-full">

            {/* Experience */}
            <div className="flex flex-1 flex-col gap-6 min-w-0">
              <p className="font-serif font-normal text-[28px] leading-[1.3] text-neutral-900">Experience</p>
              <div className="flex gap-6 items-start w-full">
                {/* Dates */}
                <div className="flex flex-1 flex-col gap-6 min-w-0">
                  <p className="leading-[1.3]">2026</p>
                  <p className="leading-[1.3] whitespace-nowrap">2025-26</p>
                  <p className="leading-[1.3] whitespace-nowrap">2024-25</p>
                  <p className="leading-[1.3] whitespace-nowrap">2023-24</p>
                </div>
                {/* Companies */}
                <div className="flex flex-1 flex-col gap-6 min-w-0">
                  <p className="leading-[1.3] whitespace-nowrap">Hootsuite</p>
                  <p className="leading-[1.3] whitespace-nowrap">The Peak SFU</p>
                  <p className="leading-[1.3] whitespace-nowrap">Douglas College</p>
                  <p className="leading-[1.3] whitespace-nowrap">Fraser Health</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="flex flex-1 flex-col gap-6 min-w-0">
              <p className="font-serif font-normal text-[28px] leading-[1.3] text-neutral-900">Education</p>
              <div className="flex gap-6 items-start w-full">
                {/* Date */}
                <div className="flex flex-1 flex-col min-w-0">
                  <p className="leading-[1.3] whitespace-nowrap">2020-27</p>
                </div>
                {/* School */}
                <div className="flex flex-1 flex-col min-w-0">
                  <p className="leading-[1.3]">Simon Fraser University</p>
                  <p className="leading-[1.3]">BC. Interactive Arts and Technology</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Photo grid */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1 overflow-hidden" style={{ height: '280px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Example.png" alt="" className="w-full h-full object-cover block" />
            </div>
            <div className="flex-1 overflow-hidden" style={{ height: '280px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Example.png" alt="" className="w-full h-full object-cover block" />
            </div>
          </div>
          <div className="overflow-hidden w-full" style={{ height: '280px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Example.png" alt="" className="w-full h-full object-cover block" />
          </div>
        </div>

      </div>
    </main>
  )
}
