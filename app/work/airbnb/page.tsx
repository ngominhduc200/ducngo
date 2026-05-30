import CaseStudyNav from '@/components/layout/CaseStudyNav'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'
import Carousel from '@/components/ui/Carousel'
import Divider from '@/components/ui/Divider'
import ImageBlock from '@/components/ui/ImageBlock'
import PullQuote from '@/components/ui/PullQuote'
import SectionLabel from '@/components/ui/SectionLabel'
import CaseStudyHero from '@/components/sections/CaseStudyHero'
import CaseStudySection from '@/components/sections/CaseStudySection'
import SectionHeader from '@/components/sections/SectionHeader'

const a = (name: string) => `/images/airbnb/${name}`

const NAV_ITEMS = [
  { label: 'how it started', id: 'how-it-started' },
  { label: 'primary research', id: 'primary-research' },
  { label: 'research synthesis', id: 'research-synthesis' },
  { label: 'persona', id: 'persona' },
  { label: 'proposed solutions', id: 'proposed-solution' },
  { label: 'final solution', id: 'final-solution' },
  { label: 'result', id: 'result' },
  { label: 'learning', id: 'learning' },
]

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-16">{children}</div>
}

function FocusItem({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-serif font-medium text-2xl text-neutral-900">{heading}</p>
      <p className="font-sans text-base text-neutral-900">{body}</p>
    </div>
  )
}

export default function AirbnbPage() {
  return (
    <main className="flex w-full justify-center items-start">
      <CaseStudyNav navItems={NAV_ITEMS} />

      <div className="flex w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] py-16 md:py-[150px] flex-col items-center px-4 sm:px-6 md:px-0">

        <CaseStudyHero
          title="Collaborative Trip Planning"
          description="In 3 weeks, I led the user research, wireframes, and prototype for a new Airbnb feature that lets groups collaborate on finding and booking a place to stay inside the app. I worked with a UX researcher and two UX designers."
          coverSrc={a('cover.png')}
          coverAlt="Collaborative Trip Planning — cover"
          meta={[
            { label: 'Team', value: 'Duc Ngo (Product Designer), Kelvin Kwan (UX Researcher), Sarah Luong (UX Designer), Hazel Hau (UX Designer)' },
            { label: 'Skills', value: 'UX Research, User Interface Design, Prototyping' },
            { label: 'Duration', value: 'February 2026 (3 weeks)' },
          ]}
        />

        <Divider />

        <CaseStudySection id="how-it-started">
          <SectionHeader label="how it started">
            Studied Airbnb&apos;s business and product
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            To kickoff, we researched on Airbnb&apos;s business to understand their goal and principles. We also studied their branding and design system to get everyone in the team onboarded. In this step, I recreated their design system on Figma to help the team learn and apply it to wireframes efficiently.
          </p>
          <ImageBlock alt="How it started" src={a('how-it-started.png')} />
          <Carousel
            images={[1, 2, 3, 4, 5, 6].map(n => ({
              src: a(`how-it-started-0${n}.png`),
              alt: `Airbnb design system study — slide ${n}`,
            }))}
          />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="primary-research">
          <SectionHeader label="primary research">
            Interviewed Airbnb&apos;s users about travel experience
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            While Airbnb has years to develop their features and user experience, with curiosity on what we can do to improve even more on their products, we chose direct interview with both new and experienced guests and hosts. We focus on their whole trip experience rather than the app itself to learn about their behaviour while travel.
          </p>
          <ImageBlock alt="Primary research" src={a('primary-research.png')} />
          <div className="flex flex-col gap-3">
            <SectionLabel>our focus</SectionLabel>
            <div className="flex flex-col gap-8">
              <TwoCol>
                <FocusItem
                  heading="User Preferences"
                  body="What criteria do users prioritize when choosing accommodations (e.g., price, location, reliability)?"
                />
                <FocusItem
                  heading="Social Dynamics"
                  body="How do users naturally plan and make decisions when traveling with others?"
                />
              </TwoCol>
              <TwoCol>
                <FocusItem
                  heading="Interaction Patterns"
                  body="How do users navigate Airbnb's search and filter tools to narrow down options?"
                />
                <FocusItem
                  heading="Trust & Mental Models"
                  body="How does the interface communicate trust and quality, and how do users interpret these signals?"
                />
              </TwoCol>
            </div>
          </div>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="research-synthesis">
          <SectionHeader label="research synthesis">
            Navigated through rich data to find common themes
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            From the interview sessions, we gathered a lot of data from the interview transcripts. While it takes time to separate into small sticky notes by small insights, it really helps for the affinity mapping where it was easy for us to identify an area to focus and where pain points exist.
          </p>
          <BeforeAfterSlider
            before={a('research-synthesis-before.png')}
            after={a('research-synthesis-after.png')}
            beforeAlt="Research data — before synthesis"
            afterAlt="Research data — after synthesis"
          />
          <div className="flex flex-col gap-8">
            <SectionLabel>findings</SectionLabel>
            <TwoCol>
              <div className="flex flex-col gap-3">
                <p className="font-serif font-medium text-2xl text-neutral-900">
                  Check-in instruction sits in long message and users report to film video when entering to check for pre-existing damage
                </p>
                <p className="font-sans text-base text-neutral-900">
                  Participants scrolled through long house manuals and chat threads just to find a door code or wifi password. The in-app chat worked for messaging but not for urgent lookups, leaving guests to reread and forward instructions on their own.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-serif font-medium text-2xl text-neutral-900">
                  Planning that leads to booking doesn&apos;t happen in Airbnb.
                </p>
                <p className="font-sans text-base text-neutral-900">
                  Every group coordinated across multiple apps, with one person carrying all the links, opinions, and logistics. Group decisions were slow and needed full agreement, and too many options made it hard to commit.
                </p>
              </div>
            </TwoCol>
          </div>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="persona">
          <SectionHeader label="persona">
            Developed personas for 2 different types of traveler
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            Next, we developed 2 personas to keep us aligned on who we are designing for. They represent 2 distinct groups: one who plans and one who follows. Each role has different needs in the app.
          </p>
          <ImageBlock alt="Persona 1 — Andy the organizer" src={a('persona-1.png')} />
          <ImageBlock alt="Persona 2 — Jennie the follower" src={a('persona-2.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="proposed-solution">
          <SectionHeader label="proposed solution 01">
            Arrival Pods is for Andy who needs clear info on arrival and proof if something goes wrong.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            Andy is the organizer. The moment he arrives, he&apos;s also the first one expected to figure out the door code, share the wifi, and make sure nothing goes wrong.
          </p>
          <TwoCol>
            <div className="flex flex-col gap-3">
              <SectionLabel>andy&apos;s pain point 1</SectionLabel>
              <p className="font-serif font-medium text-2xl text-neutral-900">
                Critical info is buried in long chat
              </p>
              <p className="font-sans text-base text-neutral-900">
                Guests arrive tired, carrying luggage, navigating an unfamiliar street. Digging through a house manual or scrolling back through a chat thread to find a door code is the last thing they should have to do.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <SectionLabel>andy&apos;s pain point 2</SectionLabel>
              <p className="font-serif font-medium text-2xl text-neutral-900">
                No place to report existing damage
              </p>
              <p className="font-sans text-base text-neutral-900">
                Guests notice a scratch or broken fixture on entry but have no clear way to document it. Without a record, there&apos;s a quiet worry that they&apos;ll be blamed and charged for it at checkout.
              </p>
            </div>
          </TwoCol>
          <Carousel
            images={[1, 2, 3].map(n => ({
              src: a(`proposed-solution-01-0${n}.png`),
              alt: `Arrival Pods — storyboard ${n}`,
            }))}
          />
        </CaseStudySection>

        <Divider />

        <CaseStudySection>
          <SectionHeader label="proposed solution 02">
            Collaborative planning is for Jennie who needs a way to contribute without losing her voice in the group.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            We explored different solutions for each of the personas with low fidelity wireframes. To better share ideas among the team, each solution is fully established in a storyboard to demonstrate how users would interact or how it would be applied in scenarios.
          </p>
          <div className="flex flex-col gap-3">
            <SectionLabel>jennie&apos;s pain point</SectionLabel>
            <p className="font-serif font-medium text-2xl text-neutral-900">
              No structured way to contribute in group planning
            </p>
            <p className="font-sans text-base text-neutral-900">
              In group trip planning, Jennie often feels unsure when and how to contribute. Decisions happen across group chats where preferences are voiced unevenly, making it hard to tell what the group actually agrees on. To avoid conflict, she stays quiet or repeats herself, relying on others to interpret her input.
            </p>
          </div>
          <Carousel
            images={[1, 2].map(n => ({
              src: a(`proposed-solution-02-0${n}.png`),
              alt: `Collaborative planning — storyboard ${n}`,
            }))}
          />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="final-solution">
          <SectionHeader label="final solution">
            Collaborative Planning was chosen because it solved every pain point without forcing a rigid user flow.
          </SectionHeader>
          <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
            <p>To decide, we evaluated each solution against four questions: does it fully solve the pain points, does the interaction make sense for the user, does it create friction, and does it align with Airbnb&apos;s guiding principles.</p>
            <p>By recognizing that Arrival Pods has a lot of moving parts through different stages such as check-in, check-out, and report damage, it would force users to lock in a defined flow which is not always the case. We decided to move forward with Collaborative Planning because it helps groups reach a decision without leaving the app.</p>
          </div>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="prototype" gap={16}>
          <div className="flex flex-col gap-8">
            <SectionHeader label="prototype walkthrough" weight="normal">
              Final prototype is built with interactions that feel native with the app.
            </SectionHeader>
            <p className="font-sans text-base text-neutral-900">
              Following Jennie, a group member, through the flow from invitation to decision.
            </p>
          </div>
          {[
            {
              label: '01 — Join the wishlist',
              heading: 'Jennie accepts an invitation to the "Korea Trip 2026" wishlist. Onboarding nudges her to set preferences before browsing.',
              video: a('join-wishlist.mp4'),
            },
            {
              label: '02 — Set preferences',
              heading: "She picks a budget range and her must-have amenities. The app folds her input into the group's aggregated preferences, so she does not need to repeat it in a group chat.",
              video: a('add-preference.mp4'),
            },
            {
              label: "03 — Browse with the group's filters applied",
              heading: 'On Explore, Jennie applies the merged group preferences to her search and adds a listing to the wishlist. She can see immediately which listings carry soft warnings.',
              video: a('browse-and-add-listing.mp4'),
            },
            {
              label: '04 — See where the group is leaning',
              heading: "Jennie opens the Summary to see every saved listing ranked by reactions. The group's favourite is at the top. She and the rest of the group can move toward booking without a separate conversation.",
              video: a('votes-summary.mp4'),
            },
          ].map(({ label, heading, video }) => (
            <div key={label} className="flex flex-col gap-8">
              <SectionHeader label={label} as="h3" weight="normal">{heading}</SectionHeader>
              <AutoPlayVideo src={video} />
            </div>
          ))}
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="result">
          <SectionHeader label="result" weight="normal">
            User testing shows positive feedback about how it made group consensus visible without a separate conversation.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            3 participants tested the full flow from joining a wishlist to reviewing the summary. All three completed every step without prompting, and feedback pointed to the summary screen as where the experience came together.
          </p>
          <PullQuote attribution="User testing participant">
            Group chat style with the summary allows people to view everything all at once. They don&apos;t have to discuss and just look at it themselves. It would reduce a lot more back and forth communication with a third party app.
          </PullQuote>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="learning">
          <SectionHeader label="learning" weight="normal">
            The storyboard is where good ideas get tested.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            Building out wireframes and storyboards early helped us catch friction before we were too invested to change direction. Andy&apos;s solution had real potential in ideation, but fleshing out the full storyboard exposed two problems: prompting users to photograph the space raised privacy concerns, and the flow required too many steps for guests who just want to check in and enjoy their trip outside the app.
          </p>
        </CaseStudySection>

      </div>
    </main>
  )
}
