import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import PageHero from '@/components/ui/PageHero'
import BeforeAfter from '@/components/ui/BeforeAfter'
import { getWork } from '@/lib/content'
import { outHref } from '@/lib/outbound'

export const metadata: Metadata = {
  title: 'Work · Rohan Tiwarekar',
  description: 'Things I built, why I built them, and what changed.',
}

/* Every project in content/work.md, one row each, The Adda Labs first.
   Rows alternate image side on desktop so the page reads like a notebook
   spread, not a grid of tiles. */
export default function WorkPage() {
  const work = getWork()

  return (
    <main>
      <Nav />
      <PageHero label="Work" title={work.title} sub={work.sub} />

      <section className="wrap pb-[72px] md:pb-[120px]">
        <ol className="flex flex-col gap-6 md:gap-10">
          {work.projects.map((p, i) => (
            /* The first project is above the fold: no scroll fade, image
               loaded first, so it paints before the script that runs fades. */
            <li key={p.title} data-reveal={i > 0 ? '' : undefined}>
              <article
                className={`grid md:grid-cols-2 border border-ink rounded-[3px] overflow-hidden bg-paper ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px] border-b md:border-b-0 border-ink">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    className="object-cover saturate-[0.8]"
                  />
                </div>
                <div className={`p-6 md:p-10 flex flex-col ${i % 2 === 1 ? 'md:border-r' : 'md:border-l'} border-ink`}>
                  <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true">·</span>
                    <span className={p.status === 'Active' ? 'text-accent' : ''}>{p.status}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.year}</span>
                  </p>
                  <h2 className="display text-4xl md:text-5xl mt-4 text-ink">{p.title}</h2>
                  <p className="font-body text-lg text-muted mt-3 leading-relaxed">{p.line}</p>
                  <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink mt-5">
                    My role: {p.role}
                  </p>
                  <BeforeAfter before={p.problem} after={p.changed} size="md" />
                  <a
                    href={outHref(p.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] self-start"
                  >
                    Visit {p.title} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </main>
  )
}
