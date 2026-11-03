import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import LiteYouTube from '@/components/ui/LiteYouTube'
import type { EpisodeMeta, HomeCopy, NoteMeta } from '@/lib/content'
import { youtubeId } from '@/lib/youtube'

/* Latest: the newest aired episode, then the three newest notes. */
export default function HomeLatest({
  copy,
  episode,
  notes,
}: {
  copy: HomeCopy['latest']
  episode: EpisodeMeta | null
  notes: NoteMeta[]
}) {
  const id = episode ? youtubeId(episode.youtubeUrl) : null

  return (
    <section className="wrap section border-t border-ink/10">
      <SectionHead label={copy.label} title={copy.title} />

      {episode && id && (
        <div data-reveal className="mt-12 md:mt-16 grid gap-6 md:grid-cols-[1.6fr_1fr] md:gap-12 items-end">
          <LiteYouTube id={id} title={episode.title} />
          <div>
            <p className="label">
              Learn With Ron · Ep {String(episode.episode).padStart(3, '0')} · {episode.date}
            </p>
            <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mt-3 text-ink">
              {episode.title}
            </h3>
            <p className="font-body text-base text-muted mt-3 leading-relaxed">{episode.excerpt}</p>
            <Link
              href={`/learn/${episode.slug}`}
              className="inline-flex items-center gap-2 mt-5 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
            >
              What happened <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}

      <ul className="mt-12 md:mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
        {notes.slice(0, 3).map((note, i) => (
          <li key={note.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
            <Link
              href={`/notes/${note.slug}`}
              className="card-lift flex flex-col h-full bg-paper border border-ink/15 hover:border-ink rounded-[3px] p-6 transition-colors duration-200"
            >
              <span className="label">
                {note.date} · {note.readTime}
              </span>
              <span className="font-heading font-bold text-2xl leading-tight mt-4 text-ink">{note.title}</span>
              <span className="font-body text-base text-muted mt-3 leading-relaxed flex-1">{note.excerpt}</span>
              <span className="font-body font-semibold text-ink mt-6">
                Read <span className="arrow text-accent" aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
