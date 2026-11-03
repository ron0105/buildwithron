import type { MetadataRoute } from 'next'
import { getNotes, getEpisodes } from '@/lib/content'

const BASE = 'https://buildwithron.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/now', '/work', '/learn', '/notes', '/cohort', '/team', '/about', '/newsletter', '/contact', '/links', '/privacy'].map(
    (p) => ({ url: `${BASE}${p}`, lastModified: new Date() })
  )
  const notes = getNotes().map((n) => ({
    url: `${BASE}/notes/${n.slug}`,
    lastModified: new Date(),
  }))
  const episodes = getEpisodes().map((e) => ({
    url: `${BASE}/learn/${e.slug}`,
    lastModified: new Date(),
  }))
  return [...staticPages, ...notes, ...episodes]
}
