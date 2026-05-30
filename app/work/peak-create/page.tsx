import CaseStudyNav from '@/components/layout/CaseStudyNav'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'
import Divider from '@/components/ui/Divider'
import ImageBlock from '@/components/ui/ImageBlock'
import PullQuote from '@/components/ui/PullQuote'
import SectionLabel from '@/components/ui/SectionLabel'
import CaseStudyHero from '@/components/sections/CaseStudyHero'
import CaseStudySection from '@/components/sections/CaseStudySection'
import SectionHeader from '@/components/sections/SectionHeader'

const a = (name: string) => `/images/peak-create/${name}`

export default function PeakCreatePage() {
  return (
    <main className="flex w-full justify-center items-start">
      <CaseStudyNav navItems={[
        { label: 'how it started', id: 'how-it-started' },
        { label: 'research', id: 'research' },
        { label: 'problem', id: 'problem' },
        { label: 'findings', id: 'findings' },
        { label: 'design challenge', id: 'design-challenge' },
        { label: 'design process', id: 'design-process' },
        { label: 'final solution', id: 'final-solution' },
        { label: 'result', id: 'result' },
        { label: 'learning', id: 'learning' },
      ]} />

      <div className="flex w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] py-16 md:py-[150px] flex-col items-center px-4 sm:px-6 md:px-0">

        <CaseStudyHero
          title="Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create"
          description="Over one month, I designed the user experience and interface for an illustration request tool that connects Production Editors, Section Editors, and Illustrators in one shared workspace with full visibility into the workflow. I collaborated with a UX researcher and two UX writers."
          coverSrc={a('cover.png')}
          coverAlt="Peak Create — hero"
          meta={[
            { label: 'Team', value: 'Duc Ngo (Product Designer), Kelvin Kwan (UX Researcher), Sarah Luong (UX Writer), Hazel Hau (UX Writer)' },
            { label: 'Skills', value: 'Product Design, User Interface Design, Prototyping' },
            { label: 'Duration', value: 'March 2026 (1 month)' },
          ]}
        />

        <Divider />

        <CaseStudySection id="how-it-started">
          <SectionHeader label="how it started">
            Being part of the team gave me a front-row view of where things broke down each week.
          </SectionHeader>
          <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
            <p>The Peak is SFU&apos;s student newspaper, published weekly. I joined as an Assistant Editor in 2021. Every Production Friday, I take articles, photos, and illustrations and lay them out in InDesign for print and web.</p>
            <p>Illustrations are supposed to arrive before production day, but sometimes they&apos;d come in late. I&apos;d watch my Production Editor chase down illustrators over email.</p>
          </div>
          <PullQuote>
            What does the illustration workflow actually look like before production day?
          </PullQuote>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="research" gap={10}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <SectionHeader label="research">
                We interviewed both editors and watched a live working day to see how the tools were actually used.
              </SectionHeader>
              <div className="flex flex-col gap-6 font-sans text-base text-neutral-900">
                <p>I teamed up with a UX researcher and two UX writers. We interviewed the Production Editor and a Section Editor, and observed a live working day to see how the tools were actually being used.</p>
                <p>We learned the pipeline involves three roles: 5 Section Editors who submit illustration requests, 1 Production Editor who owns the entire workflow, and 11 freelance illustrators who self-claim tasks and deliver by deadline.</p>
              </div>
            </div>
            <ImageBlock alt="Illustration workflow" src={a('research-workflow.png')} />
          </div>
          <div className="flex flex-col gap-3">
            <SectionLabel>Who&apos;s involved</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-16">
              {[
                { title: '5 Section Editors', body: 'writes articles, determines when illustrations are needed and submits requests.' },
                { title: '1 Production Editor', body: 'reviews and releases requests, monitors submissions, prepare files for production day.' },
                { title: '~11 Illustrators', body: 'browses weekly requests, claims work, delivers artwork by deadline.' },
              ].map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-3">
                  <span className="font-serif font-medium text-2xl text-neutral-900">{title}</span>
                  <p className="font-sans text-base text-neutral-900">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="problem" gap={10}>
          <SectionHeader label="problem">
            3 to 5 illustration requests go out each week, and the Production Editor manually tracks each one across multiple tools throughout the week.
          </SectionHeader>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-base text-neutral-900">
              When I asked my Production Editor about the most consuming part of the process, she said:
            </p>
            <PullQuote>
              It&apos;s not really time. I would say it&apos;s more like mentally draining. Throughout the week, when I see the request from a session editors and then send it out to illustrators and get to draft, I&apos;m always thinking if they are done yet.
            </PullQuote>
          </div>
          <ImageBlock alt="Example of Slack and email workflow" src={a('problem-tools.png')} />
          <p className="font-sans text-base text-neutral-900">
            That shifted my focus. With no single tool connecting a request from brief to payment, everything runs across Sheets, Slack, Gmail, and Drive.
          </p>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="findings" gap={10}>
          <div className="flex flex-col gap-8">
            <SectionHeader label="findings">
              The illustration workflow is split across four tools with no connection between them.
            </SectionHeader>
            <p className="font-sans text-base text-neutral-900">
              Using everything from interviews and observation, I traced where requests break down. The pattern was consistent: briefs lacked structure because editors typed into a free-text cell, clarifications got lost across Slack and email, submissions landed in a generic Drive folder with no link back to the request, and invoices were tallied by hand at semester end.
            </p>
          </div>
          <ImageBlock alt="Illustration tracker — all weeks" src={a('findings-all-weeks.png')} />
          <ImageBlock alt="Illustration tracker — current week" src={a('findings-current-week.png')} />
          <ImageBlock alt="Illustration tracker — invoice" src={a('findings-invoice.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="design-challenge" gap={12} className="px-10 bg-zinc-100 items-start text-left">
          {[
            { label: 'design challenge 01', italic: "give the production editor full visibility into the pipeline so they're not manually bridging every step?" },
            { label: 'design challenge 02', italic: 'help section editors write briefs that give illustrators everything they need?' },
            { label: 'design challenge 03', italic: 'give illustrators a direct feedback channel so they can start work with confidence?' },
          ].map(({ label, italic }) => (
            <div key={label} className="flex flex-col gap-3 items-start">
              <SectionLabel>{label}</SectionLabel>
              <p className="font-serif font-normal text-xl md:text-3xl text-neutral-900">
                How might we {italic}
              </p>
            </div>
          ))}
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="design-process" gap={10}>
          <div className="flex flex-col gap-8">
            <SectionHeader label="design process" weight="normal">
              My first direction was a task management app.
            </SectionHeader>
            <p className="font-sans text-base text-neutral-900">
              Projects organized by semester, table and board views to track request status. But it required too much setup for 3 to 5 weekly requests, and felt no different from Trello or Asana.
            </p>
          </div>
          <ImageBlock alt="First iteration wireframes — draft 1" src={a('draft-1.png')} />
          <ImageBlock alt="First iteration wireframes — draft 2" src={a('draft-2.png')} />
          <ImageBlock alt="First iteration wireframes — draft 3" src={a('draft-3.png')} />
        </CaseStudySection>

        <Divider />

        <CaseStudySection gap={10}>
          <div className="flex flex-col gap-8">
            <SectionHeader label="pivot" weight="normal">
              I rebuilt it around how The Peak actually works in their fixed weekly structure. Below are four major changes.
            </SectionHeader>
          </div>
          {[
            { caption: 'The Peak runs one illustration folder per semester, three per year. The navigation only needs three items: dashboard, projects, notifications.', src: a('pivot-dashboard.png') },
            { caption: 'The structured form replaces the free-text spreadsheet cell. Section, pricing, article content, and art direction all in one place.', src: a('pivot-request-form.png') },
            { caption: "Requests are grouped by deadline week, synced to the Peak's weekly production cycle, so the dashboard always shows what's due now.", src: a('pivot-project.png') },
            { caption: 'The artwork gets the most space. The brief sits alongside it so Jack can review and leave feedback without extra clicks.', src: a('pivot-request-detail.png') },
          ].map(({ caption, src }) => (
            <div key={src} className="flex flex-col gap-3">
              <ImageBlock alt={caption} src={src} />
              <p className="font-sans text-base text-neutral-900">{caption}</p>
            </div>
          ))}
        </CaseStudySection>

        <Divider />

        <CaseStudySection gap={10}>
          <SectionLabel>user testing and revision</SectionLabel>
          <p className="font-sans text-base text-neutral-900">
            I led testing with 2 Production Editors while my team handled 4 illustrators. Users completed most tasks, but kept losing confidence at the same moments such as after leaving feedback, after uploading a file, after clicking a button. The interface gave no signal that anything happened. I revised the three core pages to fix this: clearer hierarchy, single primary actions, and visible confirmation at every step.
          </p>
          {[
            { caption: "The dashboard was revised to show the current week's requests on login, with expenses and recent activity surfaced upfront. Users can see what's happening without digging into any folder.", before: a('dashboard-before.png'), after: a('dashboard-after.png') },
            { caption: 'The project page was revised to surface actions, expenses, and members all in one view, with "new request" as the clear primary action so editors can submit without guessing.', before: a('project-before.png'), after: a('project-after.png') },
            { caption: 'The request detail was revised to collapse the brief and give more space to the artwork, with a single prominent CTA and a progress bar replacing the status pill.', before: a('request-before.png'), after: a('request-after.png') },
          ].map(({ caption, before, after }) => (
            <div key={before} className="flex flex-col gap-3">
              <BeforeAfterSlider before={before} after={after} beforeAlt="Before revision" afterAlt="After revision" />
              <p className="font-sans text-base text-neutral-900">{caption}</p>
            </div>
          ))}
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="final-solution" gap={16}>
          <SectionHeader label="final solution" weight="normal">
            Here&apos;s how everything comes together: one place for editors to brief, illustrators to submit, and the Production Editor to track it all without switching tools.
          </SectionHeader>
          {[
            { label: '01 — project setup', heading: 'Jack creates a semester project and invites the team in one place.', step: 1 },
            { label: '02 — structured brief form', heading: 'Suzie creates a request. The form guides her through section, headline, price tier, description, and art direction.', step: 2 },
            { label: '03 — comment space and publish status', heading: "Jack reviews the request and leaves a question on the brief. When it's clear, he publishes and Artie is notified.", step: 3 },
            { label: '04 — claim and submission space', heading: 'Artie browses open requests on her contributor board, reads the brief and claims the request. Once completed, she submits the artwork to the provided space.', step: 4 },
            { label: '05 — review artwork', heading: 'Jack sees the submission, he opens the request and leaves feedback for Artie.', step: 5 },
            { label: '06 — complete status', heading: 'When Jack is happy with the artwork, he approves it with one click. The request is marked Completed.', step: 6 },
            { label: '07 — semester invoice per contributor', heading: "At the end of semester, Jack checks the total of completed request and downloads Artie's invoice for payment.", step: 7 },
          ].map(({ label, heading, step }) => (
            <div key={label} className="flex flex-col gap-8">
              <SectionHeader label={label} as="h3" weight="normal">{heading}</SectionHeader>
              <AutoPlayVideo src={a(`step-${step}.mp4`)} />
            </div>
          ))}
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="result" gap={12}>
          <div className="flex flex-col gap-10">
            <SectionHeader label="result" weight="normal">
              Stakeholder feedback showed strong potential to better support for managing requests from draft to completion,...
            </SectionHeader>
            <PullQuote attribution="Abbey Perley, Peak's Production Editor">
              I like this more than the way we do it now because right now there&apos;s nowhere to keep requests that are like half baked, like they&apos;re not done.
            </PullQuote>
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="font-serif font-normal text-xl md:text-3xl text-neutral-900">
              ...and reduce manual tracking, real confidence in adopting the system as a full replacement for the current workflow.
            </h2>
            <PullQuote attribution="Josh Ralla, former Peak's Production Editor" align="center">
              If this were real… this would actually be useful. It puts a lot of communication into one place, whereas with how the system works now, I have to track the weekly tracker, I have to track the illustrated tracker. I have to check Slack if I need to get clarification from the editors. So all those 3 places are streamlined here.
            </PullQuote>
          </div>
        </CaseStudySection>

        <Divider />

        <CaseStudySection id="learning">
          <SectionHeader label="learning" weight="normal">
            Understanding the system helped me prototype with full confidence.
          </SectionHeader>
          <p className="font-sans text-base text-neutral-900">
            I prototyped every interaction with error states and system feedback built in, so during testing, users never had to pause between screens guessing what comes next. That meant the feedback we collected reflected real usability issues, not gaps in the prototype itself.
          </p>
        </CaseStudySection>

      </div>
    </main>
  )
}
