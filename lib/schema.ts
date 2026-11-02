import { OUTBOUND } from '@/lib/outbound'
import type { NoteMeta } from '@/lib/content'

/* Structured data for search engines (schema.org JSON-LD). Who Rohan is goes
   on the home and about pages; each note says it's an article by him. */

export const SITE = 'https://buildwithron.com'

export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/#rohan`,
  name: 'Rohan Tiwarekar',
  url: SITE,
  image: `${SITE}/roro.webp`,
  jobTitle: 'Co-founder',
  worksFor: { '@type': 'Organization', name: 'The Adda Labs', url: OUTBOUND.tal },
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  sameAs: [
    OUTBOUND.youtube,
    OUTBOUND.instagram,
    OUTBOUND.linkedin,
    OUTBOUND.x,
    OUTBOUND.github,
    OUTBOUND.tal,
  ],
}

/* Note dates are "Mar 2026". Schema wants ISO, and the day isn't known, so
   it stays at year-month. */
export function isoMonth(date: string): string | undefined {
  const t = Date.parse(`1 ${date} UTC`)
  if (Number.isNaN(t)) return undefined
  return new Date(t).toISOString().slice(0, 7)
}

export function article(note: NoteMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.excerpt,
    datePublished: isoMonth(note.date),
    url: `${SITE}/notes/${note.slug}`,
    image: `${SITE}/notes/${note.slug}/opengraph-image`,
    author: { '@id': `${SITE}/#rohan`, '@type': 'Person', name: 'Rohan Tiwarekar', url: SITE },
  }
}
