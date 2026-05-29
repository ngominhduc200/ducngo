import CaseStudyNav from '@/components/layout/CaseStudyNav'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'
import Carousel from '@/components/ui/Carousel'

const a = (name: string) => `/images/airbnb case study assets/${name}`

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

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex gap-[14px] items-start">
        <div className="w-[2px] self-stretch bg-neutral-900 shrink-0" />
        <p className="font-serif font-medium italic text-lg text-neutral-900 flex-1">
          {children}
        </p>
      </div>
      {attribution && <p className="font-sans text-base text-neutral-900">{attribution}</p>}
    </div>
  )
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-[50px]">{children}</div>
}

function FocusItem({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="font-serif font-medium text-lg text-neutral-900">{heading}</p>
      <p className="font-sans text-base text-neutral-900">{body}</p>
    </div>
  )
}

export default function AirbnbPage() {
  return (
    <main className="flex w-full justify-center items-start">

      <CaseStudyNav navItems={NAV_ITEMS} />

      <div className="flex w-[50rem] py-[150px] flex-col items-center shrink-0">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-serif font-normal text-4xl text-neutral-900">
              Collaborative Trip Planning
            </h1>
            <p className="font-sans text-base text-neutral-900">
              In 3 weeks, I led the user research, wireframes, and prototype for a new Airbnb feature that lets groups collaborate on finding and booking a place to stay inside the app. I worked with a UX researcher and two UX designers.
            </p>
          </div>
          <ImageBlock alt="Collaborative Trip Planning — cover" src={a('Cover.png')} />
          <div className="grid grid-cols-3 gap-[50px]">
            {[
              { label: 'Team', value: 'Duc Ngo (Product Designer), Kelvin Kwan (UX Researcher), Sarah Luong (UX Designer), Hazel Hau (UX Designer)' },
              { label: 'Skills', value: 'UX Research, User Interface Design, Prototyping' },
              { label: 'Duration', value: 'February 2026 (3 weeks)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[10px]">
                <span className="font-sans text-base text-neutral-900 uppercase">{label}</span>
                <span className="font-sans text-base text-neutral-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── How it started ────────────────────────────────────────── */}
        <section id="how-it-started" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>how it started</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Studied Airbnb&apos;s business and product
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            To kickoff, we researched on Airbnb&apos;s business to understand their goal and principles. We also studied their branding and design system to get everyone in the team onboarded. In this step, I recreated their design system on Figma to help the team learn and apply it to wireframes efficiently.
          </p>
          <ImageBlock alt="How it started" src={a('how its started.png')} />
          <Carousel
            images={[1, 2, 3, 4, 5, 6].map(n => ({
              src: a(`how its started - carousel ${n}.png`),
              alt: `Airbnb design system study — slide ${n}`,
            }))}
          />
        </section>

        <Divider />

        {/* ── Primary Research ──────────────────────────────────────── */}
        <section id="primary-research" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>primary research</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Interviewed Airbnb&apos;s users about travel experience
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            While Airbnb has years to develop their features and user experience, with curiosity on what we can do to improve even more on their products, we chose direct interview with both new and experienced guests and hosts. We focus on their whole trip experience rather than the app itself to learn about their behaviour while travel.
          </p>
          <ImageBlock alt="Primary research" src={a('primary research.png')} />
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>our focus</SectionLabel>
            <div className="flex flex-col gap-[20px]">
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
        </section>

        <Divider />

        {/* ── Research Synthesis ────────────────────────────────────── */}
        <section id="research-synthesis" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>research synthesis</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Navigated through rich data to find common themes
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            From the interview sessions, we gathered a lot of data from the interview transcripts. While it takes time to separate into small sticky notes by small insights, it really helps for the affinity mapping where it was easy for us to identify an area to focus and where pain points exist.
          </p>
          <BeforeAfterSlider
            before={a('research synthesis before.png')}
            after={a('research synthesis after.png')}
            beforeAlt="Research data — before synthesis"
            afterAlt="Research data — after synthesis"
          />
          <TwoCol>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>focused area 1</SectionLabel>
              <p className="font-serif font-medium text-lg text-neutral-900">
                Check-in instruction sits in long message and users report to film video when entering to check for pre-existing damage
              </p>
              <p className="font-sans text-base text-neutral-900">
                Participants scrolled through long house manuals and chat threads just to find a door code or wifi password. The in-app chat worked for messaging but not for urgent lookups, leaving guests to reread and forward instructions on their own.
              </p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>focused area 2</SectionLabel>
              <p className="font-serif font-medium text-lg text-neutral-900">
                Planning that leads to booking doesn&apos;t happen in Airbnb.
              </p>
              <p className="font-sans text-base text-neutral-900">
                Every group coordinated across multiple apps, with one person carrying all the links, opinions, and logistics. Group decisions were slow and needed full agreement, and too many options made it hard to commit.
              </p>
            </div>
          </TwoCol>
        </section>

        <Divider />

        {/* ── Persona ───────────────────────────────────────────────── */}
        <section id="persona" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>persona</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Developed personas for 2 different types of traveler
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            Next, we developed 2 personas as the guide to keep us aligned on who we are designing for. They represent 2 distinct groups of users — one who plans and one who follows. Carrying different roles means their need to use the app is also different.
          </p>
          <ImageBlock alt="Persona 1 — Andy the organizer" src={a('persona 1.png')} />
          <ImageBlock alt="Persona 2 — Jennie the follower" src={a('persona 2.png')} />
        </section>

        <Divider />

        {/* ── Proposed Solution 01 ──────────────────────────────────── */}
        <section id="proposed-solution" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>proposed solution 01</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Arrival Pods is for Andy who needs clear info on arrival and proof if something goes wrong.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            Andy is the organizer. The moment he arrives, he&apos;s also the first one expected to figure out the door code, share the wifi, and make sure nothing goes wrong.
          </p>
          <TwoCol>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>andy&apos;s pain point 1</SectionLabel>
              <p className="font-serif font-medium text-lg text-neutral-900">
                Critical info is buried in long chat
              </p>
              <p className="font-sans text-base text-neutral-900">
                Guests arrive tired, carrying luggage, navigating an unfamiliar street. Digging through a house manual or scrolling back through a chat thread to find a door code is the last thing they should have to do.
              </p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>andy&apos;s pain point 2</SectionLabel>
              <p className="font-serif font-medium text-lg text-neutral-900">
                No place to report existing damage
              </p>
              <p className="font-sans text-base text-neutral-900">
                Guests notice a scratch or broken fixture on entry but have no clear way to document it. Without a record, there&apos;s a quiet worry that they&apos;ll be blamed and charged for it at checkout.
              </p>
            </div>
          </TwoCol>
          <Carousel
            images={[1, 2, 3].map(n => ({
              src: a(`proposed solution 01 - carousel ${n}.png`),
              alt: `Arrival Pods — storyboard ${n}`,
            }))}
          />
        </section>

        <Divider />

        {/* ── Proposed Solution 02 ──────────────────────────────────── */}
        <section className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>proposed solution 02</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Collaborative planning is for Jennie who needs a way to contribute without losing her voice in the group.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            We explored different solutions for each of the personas with low fidelity wireframes. To better share ideas among the team, each solution is fully established in a storyboard to demonstrate how users would interact or how it would be applied in scenarios.
          </p>
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>jennie&apos;s pain point</SectionLabel>
            <p className="font-serif font-medium text-lg text-neutral-900">
              No structured way to contribute in group planning
            </p>
            <p className="font-sans text-base text-neutral-900">
              In group trip planning, Jennie often feels unsure when and how to contribute. Decisions happen across group chats where preferences are voiced unevenly, making it hard to tell what the group actually agrees on. To avoid conflict, she stays quiet or repeats herself, relying on others to interpret her input.
            </p>
          </div>
          <Carousel
            images={[1, 2].map(n => ({
              src: a(`proposed solution 02 - carousel ${n}.png`),
              alt: `Collaborative planning — storyboard ${n}`,
            }))}
          />
        </section>

        <Divider />

        {/* ── Final Solution ────────────────────────────────────────── */}
        <section id="final-solution" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>final solution</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Collaborative Planning was chosen because it solved every pain point without forcing a rigid user flow.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-sans text-base text-neutral-900">
            <p>To decide, we evaluated each solution against four questions: does it fully solve the pain points, does the interaction make sense for the user, does it create friction, and does it align with Airbnb&apos;s guiding principles.</p>
            <p>By recognizing that Arrival Pods has a lot of moving parts through different stages such as check-in, check-out, and report damage, it would force users to lock in a defined flow which is not always the case. We decided to move forward with Collaborative Planning because it helps groups reach a decision without leaving the app.</p>
          </div>
        </section>

        <Divider />

        {/* ── Prototype Walkthrough ─────────────────────────────────── */}
        <section id="prototype" className="flex flex-col gap-[50px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>prototype walkthrough</SectionLabel>
              <h2 className="font-serif font-normal text-3xl text-neutral-900">
                Final prototype is built with interactions that feel native with the app.
              </h2>
            </div>
            <p className="font-sans text-base text-neutral-900">
              Following Jennie, a group member, through the flow from invitation to decision.
            </p>
          </div>
          {[
            {
              label: '01 — Join the wishlist',
              heading: 'Jennie accepts an invitation to the "Korea Trip 2026" wishlist. Onboarding nudges her to set preferences before browsing.',
              video: a('01 - Join wishlist.mov'),
            },
            {
              label: '02 — Set preferences',
              heading: "She picks a budget range and her must-have amenities. The app folds her input into the group's aggregated preferences, so she does not need to repeat it in a group chat.",
              video: a('02 - Add preference.mov'),
            },
            {
              label: "03 — Browse with the group's filters applied",
              heading: 'On Explore, Jennie applies the merged group preferences to her search and adds a listing to the wishlist. She can see immediately which listings carry soft warnings.',
              video: a('03 - Browse and add listing.mov'),
            },
            {
              label: '04 — See where the group is leaning',
              heading: "Jennie opens the Summary to see every saved listing ranked by reactions. The group's favourite is at the top. She and the rest of the group can move toward booking without a separate conversation.",
              video: a('04 - Votes summary.mov'),
            },
          ].map(({ label, heading, video }) => (
            <div key={label} className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <SectionLabel>{label}</SectionLabel>
                <h3 className="font-serif font-normal text-3xl text-neutral-900">{heading}</h3>
              </div>
              <AutoPlayVideo src={video} />
            </div>
          ))}
        </section>

        <Divider />

        {/* ── Result ────────────────────────────────────────────────── */}
        <section id="result" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>result</SectionLabel>
            <h2 className="font-serif font-normal text-3xl text-neutral-900">
              User testing shows positive feedback about how it made group consensus visible without a separate conversation.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            We invited 3 participants into the prototype and watched them move through the wishlist, set preferences, react, and review the summary. The findings clustered into three areas.
          </p>
          <PullQuote attribution="User testing participant">
            Group chat style with the summary allows people to view everything all at once. They don&apos;t have to discuss and just look at it themselves. It would reduce a lot more back and forth communication with a third party app.
          </PullQuote>
        </section>

        <Divider />

        {/* ── Learning ──────────────────────────────────────────────── */}
        <section id="learning" className="flex flex-col gap-[20px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>learning</SectionLabel>
            <h2 className="font-serif font-normal text-3xl text-neutral-900">
              What I learned
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-900">
            Description
          </p>
        </section>

      </div>
    </main>
  )
}
