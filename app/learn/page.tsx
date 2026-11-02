import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import PageHero from '@/components/ui/PageHero'
import LiteYouTube from '@/components/ui/LiteYouTube'
import { getEpisodes, getNow } from '@/lib/content'
import { OUTBOUND, outHref } from '@/lib/outbound'
import { youtubeId } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Learn With Ron · Rohan Tiwarekar',
  description:
    'I use AI live on camera. Every episode: a real question, a live test, an honest verdict.',
}

/* Every Learn With Ron episode, newest first. Videos load as thumbnails and
   only pull the YouTube player when someone presses play. */
export default function LearnPage() {
  const episodes = getEpisodes()
  const upcoming = getNow()?.episode ?? null

  return (
    <main>
      <Nav />
      <PageHero
        label="Learn With Ron"
        title="I use AI live on camera. You see what actually happens."
        sub="Every episode starts with a real question, gets tested live, and ends with an honest verdict. Mistakes included."
      >
        <a
          href={outHref(OUTBOUND.youtube)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink"
        >
          Subscribe on YouTube <span className="arrow" aria-hidden="true">→</span>
        </a>
      </PageHero>

      <section className="wrap pb-[72px] md:pb-[120px]">
        <ul className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16 border-t border-ink pt-10 md:pt-14">
          {episodes.map((ep, i) => {
            const id = youtubeId(ep.youtubeUrl)
            return (
              <li key={ep.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                {id && <LiteYouTube id={id} title={ep.title} />}
                <p className="label mt-5">
                  Ep {String(ep.episode).padStart(3, '0')} · {ep.date}
                </p>
                <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-ink mt-2">
                  {ep.question}
                </h2>
                <p className="font-body text-base md:text-lg text-muted mt-3 leading-relaxed">{ep.excerpt}</p>
                <Link
                  href={`/learn/${ep.slug}`}
                  className="inline-flex items-center gap-2 mt-5 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
                >
                  What happened <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            )
          })}

          {upcoming && (
            <li data-reveal className="border border-dashed border-ink/40 rounded-[3px] p-6 md:p-8 flex flex-col justify-center min-h-[240px]">
              <p className="label flex items-center gap-3">
                <span className="live-dot" aria-hidden="true" />
                Up next
              </p>
              <p className="font-heading font-bold text-2xl md:text-3xl leading-tight text-ink mt-4">
                {upcoming.text}
              </p>
              <a
                href={outHref(OUTBOUND.youtube)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] self-start"
              >
                Catch it live on YouTube <span className="arrow" aria-hidden="true">→</span>
              </a>
            </li>
          )}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
