import CaseStudyNav from '@/components/layout/CaseStudyNav'

const NAV_ITEMS = [
  { label: 'context', id: 'context' },
  { label: 'result', id: 'result' },
  { label: 'learning', id: 'learning' },
  { label: 'showcase', id: 'showcase' },
]

const a = (name: string) =>
  `/images/Hootsuite Deck Assets/${encodeURIComponent(name)}`

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-base text-neutral-900 uppercase">{children}</p>
}

function Divider() {
  return <hr className="border-t border-neutral-900 w-full opacity-10" />
}

export default function HootsuiteGraphicPage() {
  return (
    <>
      <main className="flex w-full justify-center items-start">

        <CaseStudyNav navItems={NAV_ITEMS} />

        <div className="flex w-[50rem] py-[150px] flex-col items-center shrink-0">

          {/* Title + cover image */}
          <div id="context" className="flex flex-col gap-[30px] py-[50px] w-full">
            <div className="flex flex-col gap-[20px]">
              <h1 className="font-serif font-normal text-4xl text-neutral-900 leading-[1.3]">
                Shaping Hootsuite&apos;s new branding with Deck of Truth redesigned
              </h1>
              <p className="font-sans text-base text-neutral-900">
                In September 2025, I spent one month with the brand marketing team auditing the current branding, and proposing a new direction to help shift Hootsuite&apos;s brand from social to enterprise. My work was first introduced as a presentation slide deck template, reflecting updated typography, colour, and layout composition that looks modern and enterprise-ready, aligned with the 2026 direction. This deck template was adopted internally across all departments.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a('DOT preview 2.png')} alt="Hootsuite Deck of Truth cover" className="w-full h-auto" />
          </div>

          {/* Result */}
          <section id="result" className="flex flex-col gap-[20px] py-[50px] w-full">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>Result</SectionLabel>
              <p className="font-serif font-normal text-2xl text-neutral-900 leading-[1.3]">
                Typography and colour system carried into the 2026 brand.
              </p>
            </div>
            <p className="font-sans text-base text-neutral-900">
              A lot of my work carried into 2026 such as the typography treatment and gradient colour system became part of the live brand, used to complement content in the foreground.
            </p>
          </section>

          <Divider />

          {/* Learning */}
          <section id="learning" className="flex flex-col gap-[20px] py-[50px] w-full">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>Learning</SectionLabel>
              <p className="font-serif font-normal text-2xl text-neutral-900 leading-[1.3]">
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
                className="italic text-orange-500 hover:opacity-70"
              >
                presentation
              </a>
              {' '}for full proposal!
            </p>
          </section>

        </div>
      </main>

      {/* Full-viewport-width media */}
      <div id="showcase" className="flex flex-col w-full overflow-hidden bg-black" data-dark-bg>
        <video
          src={a('DOT preview.mov')}
          autoPlay
          loop
          muted
          playsInline
          className="w-full block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('DOT preview 3.png')} alt="Hootsuite Deck of Truth preview 3" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('DOT preview 4.png')} alt="Hootsuite Deck of Truth preview 4" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('DOT preview 5.png')} alt="Hootsuite Deck of Truth preview 5" className="w-full block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a('DOT preview 6.png')} alt="Hootsuite Deck of Truth preview 6" className="w-full block" />
      </div>
    </>
  )
}
