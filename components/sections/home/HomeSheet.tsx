import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Todo from '@/components/ui/Todo'
import type { HomeCopy } from '@/lib/content'

/* 02: the free thing. Give before asking: one real tool that fixes a small
   part of the problem, handed over the moment someone signs up. The sheet
   on the right is a sketch of the real one, so people see what they get. */
export default function HomeSheet({
  copy,
  hasFile,
}: {
  copy: HomeCopy['sheet']
  hasFile: boolean
}) {
  return (
    <section id="sheet" className="wrap section border-t border-ink/10 scroll-mt-16">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16 items-center">
        <div>
          <SectionHead n={2} label={copy.label} title={copy.title} />
          <p data-reveal className="font-body text-lg text-muted mt-6 max-w-[46ch] leading-relaxed">
            {copy.body}
          </p>
          <div data-reveal className="mt-8">
            <NewsletterForm
              id="sheet-signup"
              cta={copy.cta}
              gift={hasFile ? { href: copy.file, label: copy.fileLabel } : null}
            />
            {!hasFile && (
              <div className="mt-3">
                <Todo>add the sheet PDF at public{copy.file}</Todo>
              </div>
            )}
          </div>
          <Link
            href={copy.storyHref}
            data-reveal
            className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
          >
            {copy.story} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Sketch of the sheet. Decorative, so hidden from screen readers;
            the rows are already in the copy above. */}
        <div data-reveal aria-hidden="true" className="relative max-w-[420px] w-full md:justify-self-end">
          <div className="bg-paper border border-ink rounded-[3px] p-6 md:p-8 -rotate-[1.5deg] shadow-[6px_6px_0_0_var(--color-ink)]">
            <div className="flex items-baseline justify-between">
              <span className="label">This week</span>
              <span className="label">Mon — Sun</span>
            </div>
            <ol className="mt-6 flex flex-col gap-5">
              {copy.rows.map((row, i) => (
                <li key={row}>
                  <span className="font-heading font-bold text-lg text-ink flex items-baseline gap-3">
                    <span className="label">{String(i + 1).padStart(2, '0')}</span>
                    {i === copy.rows.length - 1 ? (
                      <span className="relative inline-block">
                        {row}
                        {/* The second of the site's hand-drawn marks: a loose
                            circle round the question that matters. */}
                        <svg
                          className="draw absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] text-accent overflow-visible"
                          viewBox="0 0 200 50"
                          preserveAspectRatio="none"
                          style={{ '--delay': '200ms' } as React.CSSProperties}
                        >
                          <path
                            d="M12 30 C 10 10, 80 4, 150 6 S 198 22, 186 36 S 90 50, 40 44 S 4 34, 22 16"
                            pathLength={1}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      row
                    )}
                  </span>
                  <span className="block mt-3 border-b border-dashed border-ink/25" />
                  <span className="block mt-5 border-b border-dashed border-ink/25" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
