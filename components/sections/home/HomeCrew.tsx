import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import type { HomeCopy } from '@/lib/content'

/* 05: the Founding Five teaser. The one dark band on the page, so the step
   from the site to the crew is the loudest thing after the hero. */
export default function HomeCrew({ copy }: { copy: HomeCopy['crew'] }) {
  return (
    <section className="always-dark bg-ink text-paper">
      <div className="wrap section grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 md:items-end">
        <SectionHead n={5} label="The Crew" title={copy.title} tone="dark" />
        <div data-reveal>
          <p className="font-body text-lg text-paper/70 leading-relaxed">{copy.body}</p>
          <Link
            href="/crew"
            className="btn inline-flex items-center gap-2 mt-8 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-paper hover:text-ink"
          >
            {copy.cta} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
