import CaseStudyNav from '@/components/layout/CaseStudyNav'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'

const a = (name: string) =>
  `/images/Peak Create Assets/${name}`

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-base text-neutral-900 uppercase">{children}</p>
}

function Divider() {
  return <hr className="border-t border-neutral-900 w-full opacity-10" />
}

function ImageBlock({ alt, src = '/images/Example.png' }: { alt: string; src?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="w-full h-auto" />
  )
}

function PullQuote({ children, attribution, align = 'start' }: {
  children: React.ReactNode
  attribution: string
  align?: 'start' | 'center'
}) {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className={`flex gap-[14px] items-${align}`}>
        <div className="w-[2px] self-stretch bg-neutral-900 shrink-0" />
        <p className="font-serif font-medium italic text-lg text-neutral-900 flex-1">
          {children}
        </p>
      </div>
      <p className="font-sans text-base text-neutral-900">{attribution}</p>
    </div>
  )
}

export default function PeakCreatePage() {
  return (
    <main className="flex w-full justify-center items-start">

      {/* ── Sidebar nav ────────────────────────────────────────────── */}
      <CaseStudyNav />

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="flex w-[50rem] py-[150px] flex-col items-center shrink-0">

        {/* Title + hero + meta */}
        <div className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-serif font-normal text-4xl text-neutral-900">
              Streamlining how The Peak&apos;s editorial team briefs, tracks, and pays illustrators with Peak Create
            </h1>
            <p className="font-sans text-base text-neutral-900">
              Over one month, I designed the user experience and interface for an illustration request tool that connects Production Editors, Section Editors, and Illustrators in one shared workspace with full visibility into the workflow. I collaborated with a UX researcher and two UX writers.
            </p>
          </div>
          <ImageBlock alt="Peak Create — hero" src={a('Cover image.png')} />
          <div className="grid grid-cols-3 gap-[50px]">
            {[
              { label: 'Team', value: 'Duc Ngo (Product Designer), Kelvin Kwan (UX Researcher), Sarah Luong (UX Writer), Hazel Hau (UX Writer)' },
              { label: 'Skills', value: 'Product Design, User Interface Design, Prototyping' },
              { label: 'Duration', value: 'March 2026 (1 month)' },
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
              I&apos;ve been at The Peak since 2021. This project started from what I kept seeing on production day.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-sans text-base text-neutral-900">
            <p>The Peak is SFU&apos;s independent student newspaper, published weekly during every academic term. I joined as an Assistant Editor in 2021, working under the Production Editor. My job kicks in every Friday — I take articles, photos, and illustrations, and lay everything out in InDesign for print and web.</p>
            <p>But something I kept noticing: illustrations are supposed to arrive before production day, but sometimes they&apos;d come in late. When that happened, I&apos;d see my Production Editor chasing down illustrators over email.</p>
            <p>That raised a question for me: what does the illustration workflow actually look like before production day?</p>
          </div>
        </section>

        <Divider />

        {/* ── Research ──────────────────────────────────────────────── */}
        <section id="research" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <SectionLabel>research</SectionLabel>
                <h2 className="font-serif font-medium text-3xl text-neutral-900">
                  To find out, my team and I went straight to the people doing the work.
                </h2>
              </div>
              <div className="flex flex-col gap-4 font-sans text-base text-neutral-900">
                <p>I teamed up with a UX researcher and two UX writers. We interviewed the Production Editor and a Section Editor, and observed a live working day to see how the tools were actually being used.</p>
                <p>We learned the pipeline involves three roles: 5 Section Editors who submit illustration requests, 1 Production Editor who owns the entire workflow, and 11 freelance illustrators who self-claim tasks and deliver by deadline.</p>
              </div>
            </div>
            <ImageBlock alt="Illustration workflow" src={a('Research_Illustration workflow.png')} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>Who&apos;s involved</SectionLabel>
            <div className="grid grid-cols-3 gap-[50px]">
              {[
                { title: '5 Section Editors', body: 'writes articles, determines when illustrations are needed and submits requests.' },
                { title: '1 Production Editor', body: 'reviews and releases requests, monitors submissions, prepare files for production day.' },
                { title: '~11 Illustrators', body: 'browses weekly requests, claims work, delivers artwork by deadline.' },
              ].map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-[10px]">
                  <span className="font-serif font-medium text-lg text-neutral-900">{title}</span>
                  <p className="font-sans text-base text-neutral-900">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Problem ───────────────────────────────────────────────── */}
        <section id="problem" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>problem</SectionLabel>
            <h2 className="font-serif font-medium text-3xl text-neutral-900">
              Every week, there are 3-5 illustration requests. The amount seems small, but it takes energy.
            </h2>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="font-sans text-base text-neutral-900">
              When I asked my Production Editor about the most consuming part of the process, she said:
            </p>
            <div className="flex gap-[14px] items-start">
              <div className="w-[2px] self-stretch bg-neutral-900 shrink-0" />
              <p className="font-serif font-medium italic text-lg text-neutral-900 flex-1">
                It&apos;s not really time. I would say it&apos;s more like mentally draining. Throughout the week, when I see the request from a session editors and then send it out to illustrators and get to draft, I&apos;m always thinking if they are done yet.
              </p>
            </div>
          </div>
          <ImageBlock alt="Example of Slack and email workflow" src={a('Problem_Example of Slack and Email.png')} />
          <p className="font-sans text-base text-neutral-900">
            That shifted my focus. The problem wasn&apos;t volume — it was uncertainty. No single tool connects a request from brief to payment, so everything runs across Sheets, Slack, Gmail, and Drive.
          </p>
        </section>

        <Divider />

        {/* ── Findings ──────────────────────────────────────────────── */}
        <section id="findings" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>findings</SectionLabel>
              <h2 className="font-serif font-medium text-3xl text-neutral-900">
                The friction comes from the tools, not the people.
              </h2>
            </div>
            <p className="font-sans text-base text-neutral-900">
              Using everything from interviews and observation, I traced where requests break down. The pattern was consistent: briefs lacked structure because editors typed into a free-text cell, clarifications got lost across Slack and email, submissions landed in a generic Drive folder with no link back to the request, and invoices were tallied by hand at semester end. Six pain points, all rooted in the same cause — four disconnected tools.
            </p>
          </div>
          <ImageBlock alt="Illustration tracker — all weeks" src={a('Findings_Illustration Tracker (All Weeks).png')} />
          <ImageBlock alt="Illustration tracker — current week" src={a('Findings_Illustration Tracker (Current Week).png')} />
          <ImageBlock alt="Illustration tracker — invoice" src={a('Findings_Illustration Tracker (Invoice).png')} />
        </section>

        <Divider />

        {/* ── Design challenges ─────────────────────────────────────── */}
        <section id="design-challenge" className="flex flex-col gap-[40px] py-[50px] w-full">
          {[
            {
              label: 'design challenge #1',
              bold: "give the production editor full visibility into the pipeline so they're not manually bridging every step?",
            },
            {
              label: 'design challenge #2',
              bold: 'help section editors write briefs that give illustrators everything they need?',
            },
            {
              label: 'design challenge #3',
              bold: 'give illustrators a direct feedback channel so they can start work with confidence?',
            },
          ].map(({ label, bold }) => (
            <div key={label} className="flex flex-col gap-[10px]">
              <SectionLabel>{label}</SectionLabel>
              <p className="font-serif font-normal text-3xl text-neutral-900">
                How might we <strong className="font-bold">{bold}</strong>
              </p>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── Design process ────────────────────────────────────────── */}
        <section id="design-process" className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>design process</SectionLabel>
              <h2 className="font-serif font-normal text-3xl text-neutral-900">
                From task management tool to an illustration-focused system.
              </h2>
            </div>
            <p className="font-sans text-base text-neutral-900">
              First iteration: My first idea was to build a task management app — projects organized by semester, with table and board views to track request status. But it required too much setup for 3–5 weekly requests, and it felt no different from the other existing apps like Trello or Asana.
            </p>
          </div>
          <ImageBlock alt="First iteration wireframes — draft 1" src={a('Draft 1.png')} />
          <ImageBlock alt="First iteration wireframes — draft 2" src={a('Draft 2.png')} />
          <ImageBlock alt="First iteration wireframes — draft 3" src={a('Draft 3.png')} />
        </section>

        <Divider />

        {/* ── Pivot ─────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-[30px] py-[50px] w-full">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>pivot</SectionLabel>
              <h2 className="font-serif font-normal text-3xl text-neutral-900">
                I stripped it back to something built only for The Peak
              </h2>
            </div>
            <p className="font-sans text-base text-neutral-900">
              not a task management tool, but a system designed around how this specific team works. Four decisions came out of this shift.
            </p>
          </div>
          {[
            {
              caption: 'The Peak runs one illustration folder per semester, three per year. The navigation only needs three items: dashboard, projects, notifications.',
              src: a('Pivot_Dashboard.png'),
            },
            {
              caption: 'The structured form replaces the free-text spreadsheet cell — section, inline pricing, article content, and art direction all in one place.',
              src: a('Pivot_Request form.png'),
            },
            {
              caption: "Requests are grouped by deadline week, synced to the Peak's weekly production cycle, so the dashboard always shows what's due now.",
              src: a('Pivot_Project page.png'),
            },
            {
              caption: 'The artwork gets the most space. The brief sits alongside it so Jack can review and leave feedback without extra clicks.',
              src: a('Pivot_Request detail.png'),
            },
          ].map(({ caption, src }) => (
            <div key={src} className="flex flex-col gap-[10px]">
              <ImageBlock alt={caption} src={src} />
              <p className="font-sans text-base text-neutral-900">{caption}</p>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── User testing ──────────────────────────────────────────── */}
        <section className="flex flex-col gap-[30px] py-[50px] w-full">
          <p className="font-sans text-base text-neutral-900">
            User testing and revision: I led testing with 2 Production Editors while my team handled 4 illustrators. Users completed most tasks, but kept losing confidence at the same moments such as after leaving feedback, after uploading a file, after clicking a button. The interface gave no signal that anything happened. I revised the three core pages to fix this: clearer hierarchy, single primary actions, and visible confirmation at every step.
          </p>
          {[
            {
              caption: "The dashboard was revised to show the current week's requests on login, with expenses and recent activity surfaced upfront — so users can see what's happening without digging into any folder.",
              before: a('Dashboard before.png'),
              after: a('Dashboard after.png'),
            },
            {
              caption: 'The project page was revised to surface actions, expenses, and members all in one view — with "new request" as a clear primary action so editors can submit without guessing.',
              before: a('Project before.png'),
              after: a('Project after.png'),
            },
            {
              caption: 'The request detail was revised to collapse the brief and give more space to the artwork, with a single prominent CTA and a progress bar replacing the status pill.',
              before: a('Request before.png'),
              after: a('Request after.png'),
            },
          ].map(({ caption, before, after }) => (
            <div key={before} className="flex flex-col gap-[10px]">
              <BeforeAfterSlider
                before={before}
                after={after}
                beforeAlt="Before revision"
                afterAlt="After revision"
              />
              <p className="font-sans text-base text-neutral-900">{caption}</p>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── Final solution ────────────────────────────────────────── */}
        <section id="final-solution" className="flex flex-col gap-[50px] py-[50px] w-full">
          <div className="flex flex-col gap-[10px]">
            <SectionLabel>final solution</SectionLabel>
            <h2 className="font-serif font-normal text-3xl text-neutral-900">
              Here&apos;s how everything comes together — one place for editors to brief, illustrators to submit, and the Production Editor to track it all without switching tools.
            </h2>
          </div>
          {[
            { label: '01 — project setup', heading: 'Jack creates a semester project and invites the team in one place.', step: 1 },
            { label: '02 — structured brief form', heading: 'Suzie creates a request. The form guides her through section, headline, price tier, description, and art direction.', step: 2 },
            { label: '03 — comment space and publish status', heading: "Jack reviews the request and leaves a question on the brief. When it's clear, he publishes and Artie is notified.", step: 3 },
            { label: '04 — claim and submission space', heading: 'Artie browses open requests on her contributor board, reads the brief and claims the request. Once completed, she submits the artwork to the provided space.', step: 4 },
            { label: '05 — review artwork', heading: 'Jack sees the submission, he opens the request and leaves feedback for Artie.', step: 5 },
            { label: '06 — complete status', heading: 'When Jack is happy with the artwork, he approves it with one click. The request is marked Completed.', step: 6 },
            { label: '07 — semester invoice per contributor', heading: "At the end of semester, Jack checks the total of completed request and downloads Artie's invoice for payment.", step: 7 },
          ].map(({ label, heading, step }) => (
            <div key={label} className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <SectionLabel>{label}</SectionLabel>
                <h3 className="font-serif font-normal text-3xl text-neutral-900">{heading}</h3>
              </div>
              <AutoPlayVideo src={a(`Final solution_Step ${step}.mov`)} />
            </div>
          ))}
        </section>

        <Divider />

        {/* ── Result ────────────────────────────────────────────────── */}
        <section id="result" className="flex flex-col gap-[40px] py-[50px] w-full">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>result</SectionLabel>
              <h2 className="font-serif font-normal text-3xl text-neutral-900">
                Stakeholder feedback showed strong potential to better support for managing requests from draft to completion,...
              </h2>
            </div>
            <PullQuote attribution="Abbey Perley, Peak's Production Editor" align="start">
              I like this more than the way we do it now because right now there&apos;s nowhere to keep requests that are like half baked, like they&apos;re not done.
            </PullQuote>
          </div>
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-serif font-normal text-3xl text-neutral-900">
              ...and reduce manual tracking, real confidence in adopting the system as a full replacement for the current workflow.
            </h2>
            <PullQuote attribution="Josh Ralla, former Peak's Production Editor" align="center">
              If this were real… this would actually be useful. It puts a lot of communication into one place, whereas with how the system works now, I have to track the weekly tracker, I have to track the illustrated tracker. I have to check Slack if I need to get clarification from the editors. So all those 3 places are streamlined here.
            </PullQuote>
          </div>
        </section>

        <Divider />

        {/* ── Learning ──────────────────────────────────────────────── */}
        <section id="learning" className="flex flex-col gap-[40px] py-[50px] w-full">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <SectionLabel>learning</SectionLabel>
              <h2 className="font-serif font-normal text-3xl text-neutral-900">
                Stakeholder feedback showed strong potential to better support for managing requests from draft to completion,...
              </h2>
            </div>
            <PullQuote attribution="Abbey Perley, Peak's Production Editor" align="start">
              I like this more than the way we do it now because right now there&apos;s nowhere to keep requests that are like half baked, like they&apos;re not done.
            </PullQuote>
          </div>
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-serif font-normal text-3xl text-neutral-900">
              ...and reduce manual tracking, real confidence in adopting the system as a full replacement for the current workflow.
            </h2>
            <PullQuote attribution="Josh Ralla, former Peak's Production Editor" align="center">
              If this were real… this would actually be useful. It puts a lot of communication into one place, whereas with how the system works now, I have to track the weekly tracker, I have to track the illustrated tracker. I have to check Slack if I need to get clarification from the editors. So all those 3 places are streamlined here.
            </PullQuote>
          </div>
        </section>

      </div>
    </main>
  )
}
