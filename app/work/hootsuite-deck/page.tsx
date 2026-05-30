import CaseStudyNav from '@/components/layout/CaseStudyNav'
import Divider from '@/components/ui/Divider'
import SectionLabel from '@/components/ui/SectionLabel'
import CaseStudyHero from '@/components/sections/CaseStudyHero'
import CaseStudySection from '@/components/sections/CaseStudySection'

const NAV_ITEMS = [
  { label: 'context', id: 'context' },
  { label: 'result', id: 'result' },
  { label: 'learning', id: 'learning' },
  { label: 'showcase', id: 'showcase' },
]

const a = (name: string) => `/images/hootsuite-deck/${name}`

export default function HootsuiteGraphicPage() {
  return (
    <>
      <main className="flex w-full justify-center items-start">

        <CaseStudyNav navItems={NAV_ITEMS} />

        <div className="flex w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] py-16 md:py-[150px] flex-col items-center px-4 sm:px-6 md:px-0">

          <CaseStudyHero
            id="context"
            title="Shaping Hootsuite's new branding with Deck of Truth redesigned"
            description="In September 2025, I spent one month with the brand marketing team auditing the current branding, and proposing a new direction to help shift Hootsuite's brand from social to enterprise. My work was first introduced as a presentation slide deck template, reflecting updated typography, colour, and layout composition that looks modern and enterprise-ready, aligned with the 2026 direction. This deck template was adopted internally across all departments."
            coverSrc={a('preview-2.png')}
            coverAlt="Hootsuite Deck of Truth cover"
          />

          <CaseStudySection id="result">
            <div className="flex flex-col gap-3">
              <SectionLabel>Result</SectionLabel>
              <p className="font-serif font-normal text-xl md:text-2xl text-neutral-900 leading-[1.3]">
                Typography and colour system carried into the 2026 brand.
              </p>
            </div>
            <p className="font-sans text-base text-neutral-900">
              A lot of my work carried into 2026 such as the typography treatment and gradient colour system became part of the live brand, used to complement content in the foreground.
            </p>
          </CaseStudySection>

          <Divider />

          <CaseStudySection id="learning">
            <div className="flex flex-col gap-3">
              <SectionLabel>Learning</SectionLabel>
              <p className="font-serif font-normal text-xl md:text-2xl text-neutral-900 leading-[1.3]">
                Designed with research-backed decision helps me work with confidence.
              </p>
            </div>
            <p className="font-sans text-base text-neutral-900">
              Working in graphic design with a research-first process taught me that validating decisions through others&apos; expertise saves testing time. Going in with research-backed choices gave me the confidence to design knowing the quality I was working with could actually hold up.
            </p>
            <p className="font-sans text-base text-neutral-900">
              Check out my highlight below or view the{' '}
              <a
                href="https://www.figma.com/design/hut5yExXNg4Vbr2Qc1XIw0/Portfolio?node-id=422-196"
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-orange-500 hover:text-sky-500 transition-colors"
              >
                presentation
              </a>
              {' '}for full proposal!
            </p>
          </CaseStudySection>

        </div>
      </main>

      {/* Full-viewport-width media */}
      <div id="showcase" className="flex flex-col w-full overflow-hidden bg-black" data-dark-bg>
        <video
          src={a('preview.mp4')}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('preview-3.png')} alt="Hootsuite Deck of Truth preview 3" loading="lazy" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('preview-4.png')} alt="Hootsuite Deck of Truth preview 4" loading="lazy" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('preview-5.png')} alt="Hootsuite Deck of Truth preview 5" loading="lazy" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('preview-6.png')} alt="Hootsuite Deck of Truth preview 6" loading="lazy" className="w-full block" />
      </div>
    </>
  )
}
