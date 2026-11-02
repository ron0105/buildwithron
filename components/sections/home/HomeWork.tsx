import Image from 'next/image'
import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import { experiments } from '@/lib/data'
import { OUTBOUND, outHref } from '@/lib/outbound'
import type { HomeCopy } from '@/lib/content'

/* People weigh a project against the pain they know, so each card shows the
   problem and what changed, not the deliverables. Both lines are Rohan's own
   words from lib/data.ts. */
function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <span className="mt-4 flex flex-col gap-4 flex-1">
      <span>
        <span className="label block">The problem</span>
        <span className="font-body text-[15px] text-muted leading-relaxed mt-1 block">{before}</span>
      </span>
      <span>
        <span className="label block text-accent">What changed</span>
        <span className="font-body text-[15px] text-ink leading-relaxed mt-1 block">{after}</span>
      </span>
    </span>
  )
}

/* 04: The Adda Labs first and big, then the selected projects. TAL goes out
   through /go/tal so the click is counted. */
export default function HomeWork({ copy }: { copy: HomeCopy['work'] }) {
  const tal = experiments.find((e) => e.title === 'The Adda Labs')
  const selected = copy.selected
    .map((title) => experiments.find((e) => e.title === title))
    .filter((e): e is (typeof experiments)[number] => Boolean(e))

  return (
    <section className="wrap section border-t border-ink/10">
      <SectionHead n={4} label="Work" title={copy.title} />

      <a
        href={outHref(OUTBOUND.tal)}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className="card-lift mt-12 md:mt-16 grid md:grid-cols-[1.3fr_1fr] bg-paper border border-ink rounded-[3px] overflow-hidden"
      >
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] border-b md:border-b-0 md:border-r border-ink">
          <Image
            src={copy.featured.image}
            alt=""
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover saturate-[0.8]"
          />
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          <span className="label">Co-founder · Venture lab</span>
          <span className="display text-4xl md:text-5xl mt-4 text-ink">{copy.featured.title}</span>
          <span className="font-body text-lg text-muted mt-4 leading-relaxed">{copy.featured.line}</span>
          {tal && <BeforeAfter before={tal.why} after={tal.learned} />}
          <span className="font-body font-semibold text-ink mt-8">
            Visit The Adda Labs <span className="arrow text-accent" aria-hidden="true">→</span>
          </span>
        </div>
      </a>

      <ul className="mt-4 md:mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
        {selected.map((p, i) => (
          <li key={p.id} data-reveal style={{ '--i': i } as React.CSSProperties}>
            <Link
              href="/work"
              className="card-lift flex flex-col h-full bg-paper border border-ink/15 hover:border-ink rounded-[3px] overflow-hidden transition-colors duration-200"
            >
              <span className="relative block aspect-[16/10] border-b border-ink/15">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover saturate-[0.8]" />
              </span>
              <span className="p-6 flex flex-col flex-1">
                <span className="label">{p.tags.join(' · ')}</span>
                <span className="font-heading font-bold text-2xl leading-tight mt-3 text-ink">{p.title}</span>
                <BeforeAfter before={p.why} after={p.learned} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/work"
        className="inline-flex items-center gap-2 mt-10 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
      >
        {copy.more} <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
