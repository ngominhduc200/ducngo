import Image from 'next/image'

export default function AboutContent() {
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 w-full max-h-[calc(100vh-8rem)] px-6 lg:px-[15vw]"
    >
      {/* Left column: 40% — hero, bio, experience, education */}
      <div className="flex flex-col gap-10 min-w-0" style={{ flexBasis: '40%' }}>

        {/* Hero */}
        <h1 className="hero-serif font-normal text-2xl lg:text-xl xl:text-2xl text-neutral-900">
          Hello, I&apos;m{' '}
          <em className="italic" style={{ color: '#0ea5e9' }}>Duc.</em>
        </h1>

        {/* Bio + experience + education */}
        <div className="flex flex-col gap-6 font-sans text-sm text-neutral-900">
          <p className="leading-[1.6]">
            Starting as a graphic designer, I fell in love with the idea of making things more
            interactive and human. As I learned more about research and code, I decided to pursue
            a career where I design products, interactions, and visuals that drive experience.
            I get really excited whenever I bring an idea to life. Currently, I study at Simon Fraser University, Canada, majoring in Interactive Arts and Technology.
          </p>
          <p className="leading-[1.6]">
            Outside of design, I play games on Xbox, hang out with a daily matcha, and watch Netflix with meals I cook.
          </p>
          <p className="leading-[1.6]">
            You can find me on{' '}
            <a
              href="https://www.linkedin.com/in/duc-n-0346a4203"
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-orange-500 hover:text-sky-500 transition-colors"
            >
              LinkedIn
            </a>
            {' '}or say hi at{' '}
            <a
              href="mailto:ngominhduc200@gmail.com"
              className="italic text-orange-500 hover:text-sky-500 transition-colors"
            >
              ngominhduc200@gmail.com
            </a>
            {' '}or{' '}
            <a
              href="mailto:mdn7@sfu.ca"
              className="italic text-orange-500 hover:text-sky-500 transition-colors"
            >
              mdn7@sfu.ca
            </a>
            .
          </p>

          <hr className="border-t border-neutral-900 w-full opacity-10" />

          {/* Experience + Education */}
          <div className="flex flex-row gap-6 items-start w-full">

            {/* Experience */}
            <div className="flex w-full md:flex-1 flex-col gap-6 min-w-0">
              <p className="font-sans text-sm text-neutral-900">Experience</p>
              <div className="flex gap-4">
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <p className="leading-[1.3]">Hootsuite</p>
                  <p className="leading-[1.3]">The Peak SFU</p>
                  <p className="leading-[1.3]">Douglas College</p>
                  <p className="leading-[1.3]">Fraser Health</p>
                </div>
                <div className="flex-none flex flex-col gap-2 text-right">
                  <p className="leading-[1.3]">2026</p>
                  <p className="leading-[1.3]">2025-26</p>
                  <p className="leading-[1.3]">2024-25</p>
                  <p className="leading-[1.3]">2023-24</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="flex w-full md:flex-1 flex-col gap-6 min-w-0">
              <p className="font-sans text-sm text-neutral-900">Education</p>
              <div className="flex gap-4">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="leading-[1.3]">Simon Fraser University</p>
                  <p className="leading-[1.3]">B.Sc. Interactive Arts and Technology</p>
                </div>
                <div className="flex-none flex flex-col gap-2 text-right">
                  <p className="leading-[1.3]">2020-27</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right column: 60% — images */}
      <div className="flex flex-col gap-4 min-w-0 min-h-0" style={{ flexBasis: '60%' }}>

        {/* Row 1: 4 vertical images */}
        <div className="flex-1 grid grid-cols-4 gap-4 min-h-0 overflow-hidden">
          {['Vertical 1.webp', 'Vertical 2.webp', 'Vertical 3.webp', 'Vertical 4.webp'].map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={`/images/about-compressed/${img}`} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" style={{ objectFit: 'cover' }} loading="eager" />
            </div>
          ))}
        </div>

        {/* Row 2: 2 vertical images */}
        <div className="flex-[2] grid grid-cols-2 gap-4 min-h-0">
          {['IMG_0595.webp', 'IMG_1226.webp'].map((img, i) => (
            <div key={i} className="relative overflow-hidden w-full h-full">
              <Image src={`/images/about-compressed/${img}`} alt="" fill sizes="(min-width: 1024px) 26vw, 50vw" style={{ objectFit: 'cover' }} loading="eager" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
