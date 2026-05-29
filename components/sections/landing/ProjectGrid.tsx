import ProjectCard from '@/components/ui/ProjectCard'

export default function ProjectGrid() {
  return (
    <>
      <section id="work" aria-label="Work" className="flex flex-col items-center w-full max-w-[56.25rem] px-6">
        <ProjectCard
          id="project-peak-create"
          className="py-[150px]"
          title="Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create"
          meta="Product Design · 2026"
          href="/work/peak-create"
          video="/images/Peak Create Assets/PeakCreate Project Cover.mp4"
        />
        <ProjectCard
          id="project-airbnb"
          className="py-[150px]"
          title="Collaborative trip planning"
          meta="Product Design · Concept 2026"
          href="/work/airbnb"
          image="/images/airbnb case study assets/Cover.png"
          imageAlt="Collaborative Trip Planning case study preview"
        />
        <ProjectCard
          id="project-hootsuite"
          className="py-[150px]"
          title="Increasing Feature Discovery for Hootsuite"
          meta="UX Design · Handed Off 2025"
          href="/work/hootsuite-composer"
          image="/images/Hootsuite Composer Assets/Cover.png"
          imageAlt="Hootsuite Composer case study preview"
        />
        <ProjectCard
          id="project-hootsuite-deck"
          className="py-[150px]"
          title="Shaping Hootsuite&apos;s new branding with Deck of Truth redesigned"
          meta="Graphic Design · 2025"
          href="/work/hootsuite-deck"
          image="/images/Hootsuite Deck Assets/DOT preview 4.png"
          imageAlt="Hootsuite Deck of Truth preview"
        />
        <ProjectCard
          id="project-holland"
          className="py-[150px]"
          title="Holland Festival"
          meta="Case Study In Progress · 2026"
          href="/work/peak-create"
          image="/images/Example.png"
          imageAlt="Holland Festival case study preview"
        />
      </section>

      <section id="more-work" aria-label="More Work" className="w-full flex flex-col items-center py-[150px] mb-[150px]">
        <div className="w-full max-w-[56.25rem] px-6">
          <h2 className="font-serif font-normal text-4xl text-neutral-900 mb-[50px]">More <em className="italic text-teal-500">work</em></h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCard
                key={i}
                compact
                title="Project Title"
                meta="Case Study In Progress · 2026"
                href="/work/peak-create"
                image="/images/Example.png"
                imageAlt="Project placeholder"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
