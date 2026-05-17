export interface Project {
  title: string
  meta: string
  href: string
  image?: string
  imageAlt?: string
}

/*
  Add real screenshot paths once assets are in public/images/
  e.g. image: '/images/peak-create-preview.png'
*/
export const PROJECTS: Project[] = [
  {
    title: "Streamlining how The Peak's editorial team briefs, tracks, and pays illustrators with Peak Create",
    meta: 'Case Study · 2026',
    href: '/work/peak-create',
    image: undefined,
    imageAlt: 'Peak Create case study preview',
  },
  {
    title: 'Building a centralized illustration request system',
    meta: 'Case Study · 2026',
    href: '/work/peak-create',
    image: undefined,
    imageAlt: 'Illustration request system preview',
  },
  {
    title: 'Building a centralized illustration request system for The Peak SFU',
    meta: 'Case Study · 2026',
    href: '/work/peak-create',
    image: undefined,
    imageAlt: 'Peak SFU case study preview',
  },
  {
    title: 'Building a centralized illustration request system for The Peak SFU',
    meta: 'Case Study · 2026',
    href: '/work/peak-create',
    image: undefined,
    imageAlt: 'Peak SFU case study preview',
  },
]
