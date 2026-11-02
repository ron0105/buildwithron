import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import PageHero from '@/components/ui/PageHero'
import { getNotes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notes · Rohan Tiwarekar',
  description: 'Short, honest writing about how I build. No polish.',
}

/* A plain list, newest first: date and reading time, title, one line. */
export default function NotesPage() {
  const notes = getNotes()

  return (
    <main>
      <Nav />
      <PageHero label="Notes" title="Notes." sub="Short, honest writing. No polish." />

      <section className="wrap pb-[72px] md:pb-[120px]">
        <ol className="border-t border-ink">
          {notes.map((note, i) => (
            <li key={note.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <Link
                href={`/notes/${note.slug}`}
                className="group grid gap-2 md:grid-cols-[180px_1fr_auto] md:gap-10 md:items-baseline py-8 md:py-10 border-b border-ink/15"
              >
                <span className="label">
                  {note.date} · {note.readTime}
                </span>
                <span>
                  <span className="block font-heading font-bold text-2xl md:text-4xl leading-tight text-ink group-hover:text-accent transition-colors duration-200">
                    {note.title}
                  </span>
                  <span className="block font-body text-base md:text-lg text-muted mt-3 max-w-[60ch] leading-relaxed">
                    {note.excerpt}
                  </span>
                </span>
                <span className="arrow hidden md:inline-block text-2xl text-accent" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </main>
  )
}
