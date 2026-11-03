import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import type { HomeCopy } from '@/lib/content'

/* The 12-Day Build teaser. The one dark band on the page, so the paid step
   is the loudest thing after the hero. The price sits in plain sight: people
   trust an offer more when they don't have to dig for what it costs. */
export default function HomeCohort({ copy }: { copy: HomeCopy['cohort'] }) {
  return (
    <section className="always-dark bg-ink text-paper">
      <div className="wrap section grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 md:items-end">
        <div>
          <SectionHead label={copy.label} title={copy.title} tone="dark" />
          <p data-reveal className="font-body text-lg text-paper/70 leading-relaxed mt-6 max-w-[44ch]">
            {copy.body}
          </p>
        </div>
        <div data-reveal>
          <p className="display text-6xl md:text-7xl">{copy.price}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.gets.map((g) => (
              <li
                key={g}
                className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/80 border border-paper/25 px-3 py-1.5 rounded-[3px]"
              >
                {g}
              </li>
            ))}
          </ul>
          <Link
            href="/cohort"
            className="btn inline-flex items-center gap-2 mt-8 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-paper hover:text-ink"
          >
            {copy.cta} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
