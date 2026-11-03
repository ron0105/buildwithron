/*
  Every outbound link worth counting, in one place.

  Vercel custom events need the Pro plan, and this account is Hobby, so
  track() calls are dropped silently. Page views are free on Hobby, so an
  outbound click is routed through /go/<key>: that page view is the count,
  and the page forwards to the real destination straight away.
*/
export const OUTBOUND = {
  email: 'mailto:rohan0105@gmail.com',
  youtube: 'https://www.youtube.com/@learn_withron',
  x: 'https://x.com/build_withron',
  instagram: 'https://www.instagram.com/build.with.ron/',
  linkedin: 'https://www.linkedin.com/in/ronnnn/',
  github: 'https://github.com/ron0105',
  'contact-card': '/rohan.vcf',
  tal: 'https://www.theaddalabs.com/',
  /* Old apply link from the Founding Five page. The team is now reached
     through The 12-Day Build, so it forwards there. Kept so old links work. */
  'crew-apply': '/cohort',
} as const

export type OutboundKey = keyof typeof OUTBOUND

const byUrl = new Map<string, OutboundKey>(
  Object.entries(OUTBOUND).map(([key, url]) => [url, key as OutboundKey]),
)

/* Swap a destination for its counted /go route. Anything not in the table
   passes through untouched, so this is safe to wrap around any href. */
export function outHref(url: string): string {
  const key = byUrl.get(url)
  return key ? `/go/${key}` : url
}
