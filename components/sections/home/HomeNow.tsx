import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import Todo from '@/components/ui/Todo'
import type { HomeCopy } from '@/lib/content'

/* 06: three or four lines from content/now.md, then out to /now. */
export default function HomeNow({ copy, lines }: { copy: HomeCopy['now']; lines: string[] }) {
  return (
    <section className="wrap section border-t border-ink/10">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <SectionHead n={6} label="Now" title={copy.title} />
        <div className="md:pt-10">
          {lines.length === 0 ? (
            <Todo>add 3-4 lines to content/now.md</Todo>
          ) : (
            <ul className="flex flex-col">
              {lines.slice(0, 4).map((line, i) => (
                <li
                  key={line}
                  data-reveal
                  style={{ '--i': i } as React.CSSProperties}
                  className="flex items-baseline gap-4 py-4 border-b border-ink/10 font-body text-lg md:text-xl text-ink"
                >
                  <span className="label shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  {line}
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/now"
            className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
          >
            {copy.more} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
