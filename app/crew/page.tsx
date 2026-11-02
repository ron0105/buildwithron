import type { Metadata } from 'next'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Todo from '@/components/ui/Todo'
import { getCrew } from '@/lib/content'
import { OUTBOUND, outHref } from '@/lib/outbound'

export const metadata: Metadata = {
  title: 'The Founding Five · Rohan Tiwarekar',
  description:
    "I'm picking 5 people to learn with me, build real things, and earn a path into The Adda Labs.",
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* The Founding Five: the step between this site and The Adda Labs. Copy in
   content/crew.md. Apply goes through /go/crew-apply so every click counts. */
export default function CrewPage() {
  const copy = getCrew()
  const apply = outHref(OUTBOUND['crew-apply'])

  return (
    <main>
      <Nav />

      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
          <span className="live-dot" aria-hidden="true" />
          The Founding Five
        </p>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[15ch] rise" style={{ '--i': 1 } as CSSVars}>
          {copy.title}
        </h1>
        <p
          className="font-body text-lg md:text-xl text-muted mt-8 max-w-[52ch] leading-relaxed rise"
          style={{ '--i': 2 } as CSSVars}
        >
          {copy.body}
        </p>
        <div className="mt-10 rise" style={{ '--i': 3 } as CSSVars}>
          <ApplyButton href={apply} label={copy.apply.cta} />
        </div>
      </section>

      <section className="always-dark bg-ink text-paper">
        <div className="wrap section">
          <p data-reveal className="label text-paper/50">How I pick</p>
          <p data-reveal className="display text-4xl sm:text-5xl md:text-7xl mt-6 max-w-[20ch]">
            {copy.culture}
          </p>
        </div>
      </section>

      <section className="wrap section">
        <p data-reveal className="label">How it works</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {copy.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ '--i': i } as CSSVars}
              className="border border-ink rounded-[3px] p-6 md:p-8 bg-paper"
            >
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="display text-4xl md:text-5xl mt-3 text-ink">
                {step.title}
                {i < copy.steps.length - 1 && (
                  <span className="text-accent ml-3" aria-hidden="true">→</span>
                )}
              </h2>
              <p className="font-body text-lg text-muted mt-4 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-16 md:mt-24 border-t border-ink pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-2xl md:text-3xl text-ink">Want a seat?</p>
            <p className="font-body text-base text-muted mt-2">{copy.apply.note}</p>
            <div className="mt-3">
              <Todo>say what applicants should put in the email</Todo>
            </div>
          </div>
          <ApplyButton href={apply} label={copy.apply.cta} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ApplyButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink shrink-0"
    >
      {label} <span className="arrow" aria-hidden="true">→</span>
    </a>
  )
}
