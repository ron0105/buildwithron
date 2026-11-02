import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Prose from '@/components/ui/Prose'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { getNote, getNotes } from '@/lib/content'
import JsonLd from '@/components/ui/JsonLd'
import { article } from '@/lib/schema'

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  return {
    title: `${note.meta.title} · Rohan Tiwarekar`,
    description: note.meta.excerpt,
  }
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* One note, set for reading (36rem, about 68 characters a line at 19px). The sign-up box sits
   at the end of the note, so the footer drops its own copy here. */
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  /* getNotes is newest first, so "newer" is the one before this in the list. */
  const all = getNotes()
  const at = all.findIndex((n) => n.slug === slug)
  const newer = at > 0 ? all[at - 1] : null
  const older = at < all.length - 1 ? all[at + 1] : null

  return (
    <main>
      <JsonLd data={article(note.meta)} />
      <Nav />
      <article className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <div className="max-w-[36rem] mx-auto">
          <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
            <Link href="/notes" className="hover:text-ink transition-colors duration-200">
              ← Notes
            </Link>
            <span aria-hidden="true">·</span>
            <span>{note.meta.date}</span>
            <span aria-hidden="true">·</span>
            <span>{note.meta.readTime}</span>
          </p>

          <h1 className="display text-4xl sm:text-5xl md:text-6xl mt-6 mb-12 text-ink rise" style={{ '--i': 1 } as CSSVars}>
            {note.meta.title}
          </h1>

          <div className="rise" style={{ '--i': 2 } as CSSVars}>
            <Prose content={note.content} />
          </div>

          {note.meta.takeaway && (
            <div data-reveal className="mt-14 border-l-2 border-accent pl-6">
              <p className="label">Takeaway</p>
              <p className="font-heading font-bold text-2xl md:text-3xl leading-snug text-ink mt-3">
                {note.meta.takeaway}
              </p>
            </div>
          )}

          <aside data-reveal className="mt-16 border border-ink rounded-[3px] p-6 md:p-8 bg-paper">
            <p className="label">Newsletter</p>
            <p className="font-heading font-bold text-2xl md:text-3xl text-ink mt-3">
              Notes from the build<span className="text-accent">.</span>
            </p>
            <p className="font-body text-base text-muted mt-2 mb-6">Sent only when something changes.</p>
            <NewsletterForm id="note-newsletter" />
          </aside>

          <nav aria-label="More notes" className="mt-16 pt-8 border-t border-ink grid gap-6 sm:grid-cols-2">
            {older ? (
              <Link href={`/notes/${older.slug}`} className="group">
                <span className="label">← Older</span>
                <span className="block font-heading font-bold text-xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link href={`/notes/${newer.slug}`} className="group sm:text-right">
                <span className="label">Newer →</span>
                <span className="block font-heading font-bold text-xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
      <Footer newsletter={false} />
    </main>
  )
}
