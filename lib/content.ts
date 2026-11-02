import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type NoteMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  takeaway: string
}

export type EpisodeMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  episode: number
  youtubeUrl: string
  status: string
  question: string
  verdict: string
  nextTease?: string
}

export type NowItem = { text: string; href: string }
export type LiveStatus = {
  status: 'offline' | 'live' | 'scheduled'
  text: string
  href: string
}
export type NowData = {
  updated: string
  building: NowItem
  episode: NowItem
  note: NowItem
  live?: LiveStatus
}

export type NowSection = { title: string; items: string[]; todo: string | null }

export function getNow(): NowData | null {
  const file = path.join(CONTENT_DIR, 'now.md')
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf-8'))
  return data as NowData
}

export type HomeCopy = {
  hero: {
    label: string
    lines: string[]
    sub: string
    for: string
    watch: string
    notes: string
    photo: string
    photoAlt: string
  }
  sheet: {
    label: string
    title: string
    body: string
    rows: string[]
    cta: string
    file: string
    fileLabel: string
    story: string
    storyHref: string
  }
  now: { title: string; more: string }
  latest: { title: string }
  work: {
    title: string
    selected: string[]
    more: string
  }
  crew: { title: string; body: string; cta: string }
}

export type Project = {
  title: string
  status: string
  role: string
  year: string
  tags: string[]
  line: string
  image: string
  href: string
  problem: string
  what: string
  changed: string
}

export type WorkCopy = { title: string; sub: string; projects: Project[] }

export function getWork(): WorkCopy {
  const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, 'work.md'), 'utf-8'))
  return data as WorkCopy
}

export type CrewCopy = {
  title: string
  body: string
  culture: string
  steps: { title: string; text: string }[]
  apply: { cta: string; note: string }
}

export function getCrew(): CrewCopy {
  const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, 'crew.md'), 'utf-8'))
  return data as CrewCopy
}

export function getHome(): HomeCopy {
  const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, 'home.md'), 'utf-8'))
  return data as HomeCopy
}

/* The /now body is plain Markdown: a "## Heading" per section, a "- " line
   per item. Kept that simple on purpose, so updating it takes two minutes.
   Lines starting with TODO are pulled out so the page can show them on
   previews only. */
export function getNowSections(): NowSection[] {
  const file = path.join(CONTENT_DIR, 'now.md')
  if (!fs.existsSync(file)) return []
  const { content } = matter(fs.readFileSync(file, 'utf-8'))
  return content
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [title, ...rest] = block.split('\n')
      const lines = rest
        .map((l) => l.trim())
        .filter((l) => l.startsWith('- '))
        .map((l) => l.slice(2).trim())
      const todo = lines.find((l) => l.startsWith('TODO')) ?? null
      return {
        title: title.trim(),
        items: lines.filter((l) => !l.startsWith('TODO')),
        todo: todo ? todo.replace(/^TODO(\([^)]*\))?:?\s*/, '') : null,
      }
    })
}

function readCollection(collection: string) {
  const dir = path.join(CONTENT_DIR, collection)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

export function getNotes(): NoteMeta[] {
  return readCollection('notes')
    .map(({ slug, data }) => ({ slug, ...data }) as NoteMeta)
    .sort((a, b) => Date.parse(`1 ${b.date}`) - Date.parse(`1 ${a.date}`))
}

export function getNote(slug: string) {
  const entry = readCollection('notes').find((e) => e.slug === slug)
  if (!entry) return null
  return { meta: { slug, ...entry.data } as NoteMeta, content: entry.content }
}

export function getEpisodes(): EpisodeMeta[] {
  return readCollection('learn')
    .map(({ slug, data }) => ({ slug, ...data }) as EpisodeMeta)
    .sort((a, b) => b.episode - a.episode)
}

export function getEpisode(slug: string) {
  const entry = readCollection('learn').find((e) => e.slug === slug)
  if (!entry) return null
  return { meta: { slug, ...entry.data } as EpisodeMeta, content: entry.content }
}
