import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Todo from '@/components/ui/Todo'
import { getCohort } from '@/lib/content'

export const metadata: Metadata = {
  title: 'The 12-Day Build · Rohan Tiwarekar',
  description:
    'No experience? Spend 12 days on two real projects with The Adda Labs. ₹5,000, with a full refund guarantee. Leave with proof you can show anyone.',
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/*
  The 12-Day Build. Copy in content/cohort.md. Order follows how people
  decide: what they get and what it costs first, then who it's for, how it
  works, the promise, and the questions that stop them. One ask throughout:
  apply. A page view of /cohort/apply is the apply-click count (Hobby drops
  custom events).
*/
export default function CohortPage() {
  const c = getCohort()

  return (
    <main>
      <Nav />

      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
          <span className="live-dot" aria-hidden="true" />
          {c.hero.label}
        </p>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[16ch] text-ink rise" style={{ '--i': 1 } as CSSVars}>
          {c.hero.title}
        </h1>
        <p className="font-body text-lg md:text-xl text-muted mt-6 max-w-[48ch] leading-relaxed rise" style={{ '--i': 2 } as CSSVars}>
          {c.hero.sub}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2 md:gap-3 rise" style={{ '--i': 3 } as CSSVars}>
          {c.hero.facts.map((f) => (
            <li key={f} className="font-heading font-bold text-lg md:text-3xl text-ink border border-ink rounded-[3px] px-3 py-1.5 md:px-4 md:py-2">
              {f}
            </li>
          ))}
        </ul>
        {c.hero.todo && (
          <div className="mt-3">
            <Todo>{c.hero.todo}</Todo>
          </div>
        )}
        <div className="mt-10 rise" style={{ '--i': 4 } as CSSVars}>
          <ApplyButton label={c.hero.cta} />
        </div>
      </section>

      <section className="wrap section border-t border-ink/10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div data-reveal>
            <p className="label">{c.for.title}</p>
            <p className="font-heading font-bold text-2xl md:text-3xl text-ink mt-4 leading-snug">{c.for.text}</p>
          </div>
          <div data-reveal style={{ '--i': 1 } as CSSVars}>
            <p className="label">{c.notFor.title}</p>
            <p className="font-body text-lg text-muted mt-4 leading-relaxed">{c.notFor.text}</p>
          </div>
        </div>
      </section>

      <section className="always-dark bg-ink text-paper">
        <div className="wrap section">
          <p data-reveal className="label text-paper/50">{c.gets.title}</p>
          <ul className="mt-8 grid gap-x-12 md:grid-cols-2 border-t border-paper/15">
            {c.gets.items.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={{ '--i': i } as CSSVars}
                className="flex items-baseline gap-4 py-5 border-b border-paper/15 font-body text-lg md:text-xl"
              >
                <span className="text-accent" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <p data-reveal className="label">{c.steps.title}</p>
        <ol className="mt-8 grid gap-2 md:grid-cols-4 md:gap-4">
          {c.steps.items.map((step, i) => (
            <li
              key={step}
              data-reveal
              style={{ '--i': i } as CSSVars}
              className="flex items-baseline gap-4 md:block border border-ink rounded-[3px] px-4 py-3 md:p-5 bg-paper"
            >
              <span className="label shrink-0">Step {i + 1}</span>
              <p className="font-heading font-bold text-lg md:text-xl text-ink md:mt-3 leading-snug">{step}</p>
            </li>
          ))}
        </ol>
        {c.steps.todo && (
          <div className="mt-4">
            <Todo>{c.steps.todo}</Todo>
          </div>
        )}

        <div className="mt-16 md:mt-24 grid gap-10 md:grid-cols-3 md:gap-12">
          {([c.after, c.promise, c.expect] as { title: string; text: string; todo?: string }[]).map((b, i) => (
            <div key={b.title} data-reveal style={{ '--i': i } as CSSVars} className="border-t border-ink pt-6">
              <p className="label">{b.title}</p>
              <p className="font-body text-lg text-ink mt-4 leading-relaxed">{b.text}</p>
              {b.todo && (
                <div className="mt-3">
                  <Todo>{b.todo}</Todo>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section border-t border-ink/10">
        <p data-reveal className="label">{c.faq.title}</p>
        <dl className="mt-8 max-w-[760px] border-t border-ink/15">
          {c.faq.items.map((item) => (
            <div key={item.q} data-reveal className="py-6 border-b border-ink/15">
              <dt className="font-heading font-bold text-xl text-ink">{item.q}</dt>
              <dd className="font-body text-lg text-muted mt-2 leading-relaxed">
                {item.a ?? <Todo>{item.todo}</Todo>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="always-dark bg-ink text-paper">
        <div className="wrap section flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 data-reveal className="display text-4xl sm:text-5xl md:text-6xl max-w-[14ch]">
            {c.final.title}
          </h2>
          <div data-reveal className="flex flex-col gap-5 md:items-end">
            <ApplyButton label={c.final.cta} dark />
            <Link
              href="/#get-sheet"
              className="inline-flex items-center gap-2 font-body font-semibold text-paper/80 hover:text-paper underline decoration-accent decoration-2 underline-offset-[6px]"
            >
              {c.final.notReady} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ApplyButton({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <Link
      href="/cohort/apply"
      className={`btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] ${
        dark ? 'hover:bg-paper hover:text-ink' : 'hover:bg-ink'
      }`}
    >
      {label} <span className="arrow" aria-hidden="true">→</span>
    </Link>
  )
}
