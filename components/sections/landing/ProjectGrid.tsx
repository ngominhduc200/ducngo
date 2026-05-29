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
          id="project-more"
          className="py-[150px]"
          title="More of my work"
          meta="Archive · 2022-2025"
          href="https://ducngo.framer.website/"
          image="/images/Example.png"
          imageAlt="More work archive"
          external
        />
      </section>
    </>
  )
}
