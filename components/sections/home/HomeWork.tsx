import Image from 'next/image'
import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import BeforeAfter from '@/components/ui/BeforeAfter'
import Todo from '@/components/ui/Todo'
import { getWork } from '@/lib/content'
import { OUTBOUND, outHref } from '@/lib/outbound'
import type { HomeCopy } from '@/lib/content'

/* Proof: The Adda Labs first and big, then 1 or 2 projects. Each card says
   the problem, what I did, and what changed. TAL goes out through /go/tal so
   the click is counted. */
export default function HomeWork({ copy }: { copy: HomeCopy['proof'] }) {
  const { projects } = getWork()
  const tal = projects[0]
  const selected = copy.selected
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is (typeof projects)[number] => Boolean(p))

  return (
    <section className="wrap section border-t border-ink/10">
      <SectionHead label={copy.label} title={copy.title} />

      <a
        href={outHref(OUTBOUND.tal)}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className="card-lift mt-12 md:mt-16 grid md:grid-cols-[1.3fr_1fr] bg-paper border border-ink rounded-[3px] overflow-hidden"
      >
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] border-b md:border-b-0 md:border-r border-ink">
          <Image
            src={tal.image}
            alt=""
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover saturate-[0.8]"
          />
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          <span className="label">{tal.role} · {tal.tags[0]}</span>
          <span className="display text-4xl md:text-5xl mt-4 text-ink">{tal.title}</span>
          <span className="font-body text-lg text-muted mt-4 leading-relaxed">{tal.line}</span>
          <BeforeAfter before={tal.problem} did={tal.what} after={tal.changed} />
          <span className="font-body font-semibold text-ink mt-8">
            Visit {tal.title} <span className="arrow text-accent" aria-hidden="true">→</span>
          </span>
        </div>
      </a>

      <ul className="mt-4 md:mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
        {selected.map((p, i) => (
          <li key={p.title} data-reveal style={{ '--i': i } as React.CSSProperties}>
            <Link
              href="/work"
              className="card-lift flex flex-col h-full bg-paper border border-ink/15 hover:border-ink rounded-[3px] overflow-hidden transition-colors duration-200"
            >
              <span className="relative block aspect-[16/10] border-b border-ink/15">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover saturate-[0.8]" />
              </span>
              <span className="p-6 flex flex-col flex-1">
                <span className="label">{p.tags.join(' · ')}</span>
                <span className="font-heading font-bold text-2xl leading-tight mt-3 text-ink">{p.title}</span>
                <BeforeAfter before={p.problem} did={p.what} after={p.changed} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Todo>add a real number or client quote to each card, only if real</Todo>
      </div>

      <Link
        href="/work"
        className="inline-flex items-center gap-2 mt-10 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
      >
        {copy.more} <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
