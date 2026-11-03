import type { Metadata } from 'next'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Todo from '@/components/ui/Todo'
import { getNow, getNowSections } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Now · Rohan Tiwarekar',
  description: "What I'm building, learning, reading and not doing right now.",
}

/* Everything on this page comes from content/now.md, so updating it never
   means touching code. */
export default function NowPage() {
  const now = getNow()
  const updated = now?.updated
  const isProd = process.env.VERCEL_ENV === 'production'
  const sections = getNowSections().filter((s) => s.items.length > 0 || (!isProd && s.todo))

  return (
    <main>
      <Nav />
      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <p className="label rise" style={{ '--i': 0 } as React.CSSProperties}>
          Now
        </p>
        <h1
          className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[14ch] rise"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          What I&apos;m doing now<span className="text-accent">.</span>
        </h1>
        {updated && (
          <p className="label mt-6 rise" style={{ '--i': 2 } as React.CSSProperties}>
            Updated {updated}
          </p>
        )}
        {now?.honest && (
          <p
            className="font-body text-lg md:text-xl text-muted mt-6 max-w-[44ch] leading-relaxed rise"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {now.honest}
          </p>
        )}

        <div className="mt-16 md:mt-24 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {sections.map((s, i) => (
            <div key={s.title} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <h2 className="font-heading font-bold text-3xl text-ink pb-4 border-b border-ink">
                {s.title}
              </h2>
              {s.items.length > 0 && (
                <ul className="flex flex-col">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 py-4 border-b border-ink/10 font-body text-lg text-ink"
                    >
                      <span className="text-accent" aria-hidden="true">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.todo && (
                <div className="mt-4">
                  <Todo>{s.todo}</Todo>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
