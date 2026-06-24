const SLUGS = ['peak-create', 'airbnb', 'hootsuite-composer', 'hootsuite-deck', 'archive']

export const isCaseStudy = (pathname: string) =>
  SLUGS.some(slug => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))
