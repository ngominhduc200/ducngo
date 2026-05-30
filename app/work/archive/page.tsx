import CaseStudyNav from '@/components/layout/CaseStudyNav'

const NAV_ITEMS = [
  { label: 'the peak sfu', id: 'the-peak' },
  { label: 'fraser health', id: 'fraser-health' },
  { label: 'douglas royals', id: 'douglas-royals' },
  { label: '4c', id: '4c' },
  { label: 'discogs shop', id: 'discogs-shop' },
]

const PROJECTS = [
  {
    id: 'discogs-shop',
    title: 'Academic Discogs Shop',
    category: 'Web Design · Front-End Development',
    year: '2022',
    description:
      'Built a responsive e-commerce website using HTML and CSS, including product listing features and client information pages, deployed on GitHub Pages.',
    tools: ['HTML', 'CSS'],
    href: 'https://ducngo.framer.website/',
  },
  {
    id: 'the-peak',
    title: "The Peak SFU",
    category: 'Graphic Design',
    year: '2022-2024',
    description:
      "Designed magazine spreads, covers, and section layouts for SFU's student newspaper. Transformed written content and illustrations into engaging visual compositions using layout design, typography selection, and colour palette development.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
    href: 'https://ducngo.framer.website/the-peak',
  },
  {
    id: 'fraser-health',
    title: 'Fraser Health Authority',
    category: 'Graphic Design · 8-month Co-op',
    year: '2023',
    description:
      "Digital Media Specialist co-op. Created graphics and materials to improve health information delivery, deployed across Fraser Health's digital platforms and hospital locations across British Columbia.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    href: 'https://ducngo.framer.website/fraser-health',
  },
  {
    id: 'douglas-royals',
    title: "Douglas College Royals",
    category: 'Graphic Design',
    year: '2022-2023',
    description:
      "Part-time role creating visual assets for Douglas College's athletic department — promotional posters, athlete spotlights, event schedules, and digital and physical marketing materials.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Figma'],
    href: 'https://ducngo.framer.website/douglas-college-royals',
  },
  {
    id: '4c',
    title: 'Design Communication and Collaboration',
    category: 'Graphic Design · Academic',
    year: '2022',
    description:
      'Three-week academic project for IAT 103W at SFU. Translated the 4C framework for scholarly composition into a social media awareness campaign. Led character design through Procreate sketches to refined Illustrator vectors, combined with vibrant carousel layouts for engagement.',
    tools: ['Procreate', 'Adobe Illustrator', 'Figma'],
    href: 'https://ducngo.framer.website/4c',
  },
]

function Divider() {
  return <hr className="border-t border-zinc-200 w-full" />
}

export default function ArchivePage() {
  return (
    <main className="flex w-full justify-center items-start">
      <CaseStudyNav navItems={NAV_ITEMS} />

      <div className="flex w-full max-w-[50rem] md:max-w-[37.5rem] lg:max-w-[43.75rem] xl:max-w-[56.25rem] py-16 md:py-[150px] flex-col items-start px-4 sm:px-6 md:px-0 gap-0">

        {/* Header */}
        <div className="flex flex-col gap-[20px] pb-[80px] w-full">
          <h1 className="font-serif font-normal text-2xl md:text-4xl text-neutral-900 leading-[1.3]">
            Archive
          </h1>
          <p className="font-sans text-base text-neutral-400">2022–2025</p>
          <p className="font-sans text-base text-neutral-900 max-w-xl">
            Graphic design, front-end development, and co-op work from my earlier years — before I moved fully into product design.
          </p>
        </div>

        <Divider />

        {/* Project list */}
        {PROJECTS.map((project) => (
          <div key={project.id} id={project.id} className="w-full">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-[20px] py-[50px] w-full no-underline hover:opacity-70 transition-opacity"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-[10px]">
                  <p className="font-sans text-sm text-neutral-400">{project.category} · {project.year}</p>
                  <h2 className="font-serif font-normal text-2xl text-neutral-900 leading-[1.3]">
                    {project.title}
                  </h2>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-neutral-400 shrink-0 mt-1 group-hover:text-neutral-900 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <p className="font-sans text-base text-neutral-600">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="font-sans text-xs text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </a>
            <Divider />
          </div>
        ))}

      </div>
    </main>
  )
}
