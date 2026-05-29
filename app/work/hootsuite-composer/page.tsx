import CaseStudyNav from '@/components/layout/CaseStudyNav'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'

const a = (name: string) =>
  `/images/Hootsuite Composer Assets/${name}`

const NAV_ITEMS = [
  { label: 'context', id: 'context' },
  { label: 'problem', id: 'problem' },
  { label: 'solution', id: 'solution' },
  { label: 'learning', id: 'learning' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-base text-neutral-900 uppercase">{children}</p>
}

function Divider() {
  return <hr className="border-t border-neutral-900 w-full opacity-10" />
}

function ImageBlock({ alt, src }: { alt: string; src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="w-full h-auto" />
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[14px] items-start">
      <div className="w-[2px] self-stretch bg-neutral-900 shrink-0" />
      <p className="font-serif font-medium italic text-lg text-neutral-900 flex-1">
        {children}
      </p>
    </div>
  )
}

export default function HootsuiteComposerPage() {
  return (
    <main className="flex w-full justify-center items-start">

      <CaseStudyNav navItems={NAV_ITEMS} />

      <div className="flex w-full max-w-[50rem] py-16 md:py-[150px] flex-col items-center px-4 sm:px-6 md:px-0">

        {/* Title + cover + meta */}
        <div className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-serif font-normal text-2xl md:text-4xl text-neutral-900">
              Increasing Feature Discovery for Hootsuite
            </h1>
            <p className="font-sans text-base text-neutral-900">
              During my internship, I designed a homepage feature that helps Hootsuite users discover the posting options available across their social channels. The project ended with a full handoff to engineering. I worked as a UX Designer, alongside a mentor, partnered with two PMs, and supported by a Senior UX Designer.
            </p>
          </div>
          <ImageBlock alt="Hootsuite Composer — cover" src={a('Cover.png')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-[50px]">
            {[
              { label: 'Team', value: 'Duc Ngo (Product Designer Lead), 1 Mentor, 2 Project Managers, 1 Senior UX Designer' },
              { label: 'Duration', value: 'November 2025 (1 month)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[10px]">
                <span className="font-sans text-base text-neutral-900 uppercase">{label}</span>
                <span className="font-sans text-base text-neutral-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Context */}
        <section id="context" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>context</SectionLabel>
            <h2 className="font-serif font-medium text-xl md:text-3xl text-neutral-900">
              Composer is where Hootsuite users draft their social posts.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            Hootsuite is a social media management platform where teams plan, schedule, and publish content across multiple networks. Composer is the workspace inside it where every post actually gets written.
          </p>
          <PullQuote>
            The Product Growth team flagged that one of Composer&apos;s most valuable formats was getting lost inside it.
          </PullQuote>
          <ImageBlock alt="Composer context" src={a('Context.png')} />
        </section>

        <Divider />

        {/* Problem */}
        <section id="problem" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>problem</SectionLabel>
            <h2 className="font-serif font-medium text-xl md:text-3xl text-neutral-900">
              Many Hootsuite users were posting Instagram Stories without the Hootsuite app.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-sans text-base text-neutral-900">
            <p>Instagram Stories had grown into one of the most-used post formats on social media, but Hootsuite users were rarely creating them inside the app. The reason was that the Story option sat 4 steps inside the Composer, hidden behind a nested dropdown. Users had to know where to look.</p>
            <p>For experienced users, this was enough friction on every Story to make posting directly through Instagram the faster choice. For new users, it was a discovery problem. It only shows when they reach the Composer.</p>
          </div>
          <PullQuote>
            How might I surface Stories and Reels right from the start, closing the gap between discovery and activation?
          </PullQuote>
          <ImageBlock alt="Problem — hidden Stories option" src={a('Problem.png')} />
        </section>

        <Divider />

        {/* Solution */}
        <section id="solution" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>solution</SectionLabel>
            <h2 className="font-serif font-medium text-xl md:text-3xl text-neutral-900">
              A homepage widget that puts formats in front of users before they go looking.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-sans text-base text-neutral-900">
            <p>The intent was to put discovery before search. Users shouldn&apos;t need to know what&apos;s possible before they can find it, especially newer users still learning what Hootsuite can do. So I designed a single-row carousel that meets users the moment they land on the dashboard. Every post format is visible upfront. Stories, Reels, Cross-Post, and the rest of the network options scroll into view through a Recommended filter that defaults to five at a time, keeping the rest of the dashboard intact.</p>
            <p>For handoff, I extended the Hootsuite design system with a new button component, mapped every state including a hover micro-animation, and documented card flows, responsive specs, and accessibility landmarks so the team could extend the widget without breaking it.</p>
          </div>
          <AutoPlayVideo src={a('Hootsuite Composer Prototype.mov')} />
          <ImageBlock alt="Final result — composer widget 2" src={a('Final result 2.png')} />
          <ImageBlock alt="Final result — composer widget 3" src={a('Final result 3.png')} />
        </section>

        <Divider />

        {/* Learning */}
        <section id="learning" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>learning</SectionLabel>
            <h2 className="font-serif font-medium text-xl md:text-3xl text-neutral-900">
              I learned how a cross-functional team sharpens the design.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            Working closely with PMs helped me understand the business goals and user needs at the same time. Having a mentor got me onboarded with the system and product early on. Exchanging feedback with the team along the way shaped how I framed the solution and brought the final outcome together.
          </p>
        </section>

      </div>
    </main>
  )
}
