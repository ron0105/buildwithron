import { OUTBOUND, outHref } from '@/lib/outbound'
import type { HomeCopy } from '@/lib/content'

/* One quiet line for business owners, the second audience. Client offers
   live on theaddalabs.com; the click goes through /go/tal so it's counted. */
export default function HomeBusiness({ copy }: { copy: HomeCopy['business'] }) {
  return (
    <section className="wrap py-12 md:py-16 border-t border-ink/10">
      <p data-reveal className="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2 font-body text-lg text-muted">
        {copy.line}
        <a
          href={outHref(OUTBOUND.tal)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
        >
          {copy.cta} <span className="arrow" aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  )
}
