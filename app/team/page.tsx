import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import { getTeam } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Join the team · Rohan Tiwarekar',
  description:
    'The step after The 12-Day Build. I pick up to 5 people who show ownership and reliability. A seat is earned, not promised.',
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* Join the team: the step after The 12-Day Build, footer link only. Copy in
   content/team.md. /crew forwards here (next.config.ts). The only way in is
   the cohort, so the one button goes to /cohort. */
export default function TeamPage() {
  const copy = getTeam()

  return (
    <main>
      <Nav />

      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
          <span className="live-dot" aria-hidden="true" />
          {copy.label}
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
        <p className="font-heading font-bold text-xl text-ink mt-6 rise" style={{ '--i': 3 } as CSSVars}>
          {copy.earned}
        </p>
        <div className="mt-10 rise" style={{ '--i': 4 } as CSSVars}>
          <CohortButton label={copy.cta} />
        </div>
      </section>

      <section className="always-dark bg-ink text-paper">
        <div className="wrap section">
          <p data-reveal className="display text-4xl sm:text-5xl md:text-7xl max-w-[20ch]">
            {copy.culture}
          </p>
        </div>
      </section>

      <section className="wrap section">
        <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
          {copy.steps.map((step, i) => (
            <li
              key={step}
              data-reveal
              style={{ '--i': i } as CSSVars}
              className="border border-ink rounded-[3px] p-6 md:p-8 bg-paper"
            >
              <span className="label">Step {i + 1}</span>
              <h2 className="display text-3xl md:text-4xl mt-3 text-ink">
                {step}
                {i < copy.steps.length - 1 && (
                  <span className="text-accent ml-3" aria-hidden="true">→</span>
                )}
              </h2>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-12 md:mt-16">
          <CohortButton label={copy.cta} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function CohortButton({ label }: { label: string }) {
  return (
    <Link
      href="/cohort"
      className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink"
    >
      {label} <span className="arrow" aria-hidden="true">→</span>
    </Link>
  )
}
