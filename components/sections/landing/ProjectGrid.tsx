import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/projects'

export default function ProjectGrid() {
  return (
    <section id="work" aria-label="Work" className="p-6">
      <div className="grid grid-cols-2 gap-6" style={{ padding: '24px' }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href + project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
