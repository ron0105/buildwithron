import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import PageHero from '@/components/ui/PageHero'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Todo from '@/components/ui/Todo'
import { getHome, getNotes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Newsletter · Rohan Tiwarekar',
  description: 'Notes from the build. Sent only when something changes.',
}

/* The page to link from bios and posts. Same list as the home sign-up, so it
   hands over the weekly sheet too. No issues have gone out yet, so the
   latest notes stand in for "past issues". */
export default function NewsletterPage() {
  const sheet = getHome().sheet
  const hasSheet = fs.existsSync(path.join(process.cwd(), 'public', sheet.file))
  const notes = getNotes().slice(0, 3)

  return (
    <main>
      <Nav />
      <PageHero label="Newsletter" title="Notes from the build." sub="Sent only when something changes.">
        {hasSheet && (
          <p className="font-body text-base text-ink mb-5">
            Sign up and you get the free sheet straight away.
          </p>
        )}
        <NewsletterForm
          id="newsletter-page"
          gift={hasSheet ? { href: sheet.file, label: sheet.fileLabel } : null}
        />
      </PageHero>

      <section className="wrap pb-[72px] md:pb-[120px]">
        <div className="border-t border-ink pt-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <p data-reveal className="label">
            Past issues
          </p>
          <p data-reveal className="font-body text-base text-muted">
            None yet. Here&apos;s what I&apos;ve written lately.
          </p>
        </div>
        <ol className="mt-6">
          {notes.map((note, i) => (
            <li key={note.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <Link
                href={`/notes/${note.slug}`}
                className="group grid gap-2 md:grid-cols-[180px_1fr_auto] md:gap-10 md:items-baseline py-7 border-b border-ink/15"
              >
                <span className="label">
                  {note.date} · {note.readTime}
                </span>
                <span className="font-heading font-bold text-2xl md:text-3xl leading-tight text-ink group-hover:text-accent transition-colors duration-200">
                  {note.title}
                </span>
                <span className="arrow hidden md:inline-block text-2xl text-accent" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Todo>list past issues here once the first one goes out</Todo>
        </div>
      </section>

      <Footer newsletter={false} />
    </main>
  )
}
