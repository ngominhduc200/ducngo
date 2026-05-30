import CaseStudyNav from '@/components/layout/CaseStudyNav'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'
import Divider from '@/components/ui/Divider'
import ImageBlock from '@/components/ui/ImageBlock'
import PullQuote from '@/components/ui/PullQuote'
import CaseStudyHero from '@/components/sections/CaseStudyHero'
import CaseStudySection from '@/components/sections/CaseStudySection'
import SectionHeader from '@/components/sections/SectionHeader'

const a = (name: string) => `/images/hootsuite-composer/${name}`

const NAV_ITEMS = [
  { label: 'context', id: 'context' },
  { label: 'problem', id: 'problem' },
  { label: 'solution', id: 'solution' },
  { label: 'learning', id: 'learning' },
]

export default function HootsuiteComposerPage() {
  return (
    <main className="flex w-full justify-center items-start">

      <CaseStudyNav navItems={NAV_ITEMS} />

      <div className="flex w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] py-16 md:py-[150px] flex-col items-center px-4 sm:px-6 md:px-0">

        <CaseStudyHero
          title="Increasing Feature Discovery for Hootsuite"
          description="During my internship, I designed a homepage feature that helps Hootsuite users discover the posting options available across their social channels. The project ended with a full handoff to engineering. I worked as a UX Designer, alongside a mentor, partnered with two PMs, and supported by a Senior UX Designer."
          coverSrc={a('cover.png')}
          coverAlt="Hootsuite Composer — cover"
          meta={[
            { label: 'Team', value: 'Duc Ngo (Product Designer Lead), 1 Mentor, 2 Project Managers, 1 Senior UX Designer' },
            { label: 'Duration', value: 'November 2025 (1 month)' },
          ]}
        />

        <Divider />

        <CaseStudySection id="context">
          <SectionHeader label="context">
            Composer is where Hootsuite users draft their social posts.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            Hootsuite is a social media management platform where teams plan, schedule, and publish content across multiple networks. Composer is the workspace inside it where every post actually gets written.
          </p>
          <PullQuote>
            The Product Growth team flagged that one of Composer&apos;s most valuable formats was getting lost inside it.
          </PullQuote>
          <ImageBlock alt="Composer context" src={a('context.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="problem" gap={10}>
          <SectionHeader label="problem">
            Many Hootsuite users were posting Instagram Stories without the Hootsuite app.
          </SectionHeader>
          <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
            <p>Instagram Stories had grown into one of the most-used post formats on social media, but Hootsuite users were rarely creating them inside the app. The reason was that the Story option sat 4 steps inside the Composer, hidden behind a nested dropdown. Users had to know where to look.</p>
            <p>For experienced users, this was enough friction on every Story to make posting directly through Instagram the faster choice. For new users, it was a discovery problem. It only shows when they reach the Composer.</p>
          </div>
          <PullQuote>
            How might I surface Stories and Reels right from the start, closing the gap between discovery and activation?
          </PullQuote>
          <ImageBlock alt="Problem — hidden Stories option" src={a('problem.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="solution" gap={10}>
          <SectionHeader label="solution">
            A homepage widget that puts formats in front of users before they go looking.
          </SectionHeader>
          <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
            <p>The intent was to put discovery before search. Users shouldn&apos;t need to know what&apos;s possible before they can find it, especially newer users still learning what Hootsuite can do. So I designed a single-row carousel that meets users the moment they land on the dashboard. Every post format is visible upfront. Stories, Reels, Cross-Post, and the rest of the network options scroll into view through a Recommended filter that defaults to five at a time, keeping the rest of the dashboard intact.</p>
            <p>For handoff, I extended the Hootsuite design system with a new button component, mapped every state including a hover micro-animation, and documented card flows, responsive specs, and accessibility landmarks so the team could extend the widget without breaking it.</p>
          </div>
          <AutoPlayVideo src={a('prototype.mp4')} />
          <ImageBlock alt="Final result — composer widget 2" src={a('result-2.png')} />
          <ImageBlock alt="Final result — composer widget 3" src={a('result-3.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="learning">
          <SectionHeader label="learning">
            I learned how a cross-functional team sharpens the design.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            Working closely with PMs helped me understand the business goals and user needs at the same time. Having a mentor got me onboarded with the system and product early on. Exchanging feedback with the team along the way shaped how I framed the solution and brought the final outcome together.
          </p>
        </CaseStudySection>

      </div>
    </main>
  )
}
