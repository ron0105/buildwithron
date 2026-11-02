import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Prose from '@/components/ui/Prose'
import LiteYouTube from '@/components/ui/LiteYouTube'
import { getEpisode, getEpisodes } from '@/lib/content'
import { OUTBOUND, outHref } from '@/lib/outbound'
import { youtubeId } from '@/lib/youtube'

export function generateStaticParams() {
  return getEpisodes().map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = getEpisode(slug)
  if (!ep) return {}
  return {
    title: `${ep.meta.title} · Learn With Ron`,
    description: ep.meta.excerpt,
  }
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* One episode: the question, the video (click to play), the write-up, the
   verdict. Same 36rem reading column as notes. */
export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = getEpisode(slug)
  if (!ep) notFound()

  const all = getEpisodes()
  const next = all.find((e) => e.episode === ep.meta.episode + 1)
  const prev = all.find((e) => e.episode === ep.meta.episode - 1)
  const id = youtubeId(ep.meta.youtubeUrl)

  return (
    <main>
      <Nav />
      <article className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <div className="max-w-[36rem] mx-auto">
          <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
            <Link href="/learn" className="hover:text-ink transition-colors duration-200">
              ← Learn With Ron
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-accent">Ep {String(ep.meta.episode).padStart(3, '0')}</span>
            <span aria-hidden="true">·</span>
            <span>{ep.meta.date}</span>
          </p>

          <h1 className="display text-4xl sm:text-5xl md:text-6xl mt-6 text-ink rise" style={{ '--i': 1 } as CSSVars}>
            {ep.meta.question}
          </h1>
        </div>

        {id && (
          <div className="max-w-[880px] mx-auto mt-12 rise" style={{ '--i': 2 } as CSSVars}>
            <LiteYouTube id={id} title={ep.meta.title} priority />
          </div>
        )}

        <div className="max-w-[36rem] mx-auto mt-12">
          <Prose content={ep.content} />

          <div data-reveal className="mt-14 border-l-2 border-accent pl-6">
            <p className="label">The verdict</p>
            <p className="font-heading font-bold text-2xl md:text-3xl leading-snug text-ink mt-3">
              {ep.meta.verdict}
            </p>
          </div>

          <nav aria-label="More episodes" className="mt-16 pt-8 border-t border-ink grid gap-6 sm:grid-cols-2">
            {prev ? (
              <Link href={`/learn/${prev.slug}`} className="group">
                <span className="label">← Ep {String(prev.episode).padStart(3, '0')}</span>
                <span className="block font-heading font-bold text-xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                  {prev.question}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/learn/${next.slug}`} className="group sm:text-right">
                <span className="label">Ep {String(next.episode).padStart(3, '0')} →</span>
                <span className="block font-heading font-bold text-xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                  {next.question}
                </span>
              </Link>
            ) : (
              <a
                href={outHref(OUTBOUND.youtube)}
                target="_blank"
                rel="noopener noreferrer"
                className="group sm:text-right"
              >
                <span className="label">Up next</span>
                <span className="block font-heading font-bold text-xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                  Next episode drops on YouTube →
                </span>
              </a>
            )}
          </nav>
        </div>
      </article>
      <Footer />
    </main>
  )
}
