import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Todo from '@/components/ui/Todo'
import { getAbout } from '@/lib/content'
import { OUTBOUND, outHref } from '@/lib/outbound'
import JsonLd from '@/components/ui/JsonLd'
import { person } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About · Rohan Tiwarekar',
  description: "I'm Rohan. Co-founder of The Adda Labs in Mumbai. I build in public.",
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

const channels = [
  { label: 'YouTube', href: OUTBOUND.youtube },
  { label: 'Instagram', href: OUTBOUND.instagram },
  { label: 'LinkedIn', href: OUTBOUND.linkedin },
  { label: 'X', href: OUTBOUND.x },
  { label: 'GitHub', href: OUTBOUND.github },
  { label: 'The Adda Labs', href: OUTBOUND.tal },
  { label: 'Email', href: OUTBOUND.email },
]

/* Short story, three beliefs, every channel. Copy in content/about.md. */
export default function AboutPage() {
  const copy = getAbout()
  /* "I'm Rohan. I build in public." reads as two lines: break after the
     first full stop, orange stop on the last. */
  const [first, ...rest] = copy.title.replace(/[.]$/, '').split(/(?<=\.)\s+/)
  const bare = rest.length ? (
    <>
      {first}
      <br />
      {rest.join(' ')}
    </>
  ) : (
    first
  )

  return (
    <main>
      <JsonLd data={person} />
      <Nav />

      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px] grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20 md:items-end">
        <div>
          <p className="label rise" style={{ '--i': 0 } as CSSVars}>
            About
          </p>
          <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[14ch] rise" style={{ '--i': 1 } as CSSVars}>
            {bare}
            <span className="text-accent">.</span>
          </h1>
          <p
            className="font-body text-lg md:text-xl text-muted mt-6 max-w-[48ch] leading-relaxed rise"
            style={{ '--i': 2 } as CSSVars}
          >
            {copy.sub}
          </p>
        </div>
        <div className="rise" style={{ '--i': 3 } as CSSVars}>
          <Image
            src={copy.photo}
            alt={copy.photoAlt}
            width={1024}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 400px, 90vw"
            className="photo w-full max-w-sm md:max-w-none aspect-[4/5] object-cover object-[50%_30%]"
          />
          <div className="mt-3">
            <Todo>a real, recent photo</Todo>
          </div>
        </div>
      </section>

      <section className="wrap pb-[72px] md:pb-[120px]">
        <div className="border-t border-ink pt-10 md:pt-14 grid gap-8 md:grid-cols-[180px_1fr] md:gap-10">
          <p data-reveal className="label">
            Short story
          </p>
          <div className="max-w-[36rem] space-y-6">
            {copy.story.map((para, i) => (
              <p
                key={i}
                data-reveal
                style={{ '--i': i } as CSSVars}
                className="font-body text-[18px] md:text-[19px] leading-[1.7] text-ink/85"
              >
                {para}
              </p>
            ))}
            <Todo>your own story, 3 to 5 short paragraphs (this one is stitched from the old About page)</Todo>
          </div>
        </div>
      </section>

      <section className="always-dark bg-ink text-paper">
        <div className="wrap section">
          <p data-reveal className="label text-paper/50">
            What I believe
          </p>
          <ol className="mt-10 border-t border-paper/15">
            {copy.beliefs.map((b, i) => (
              <li key={b.title} data-reveal style={{ '--i': i } as CSSVars}>
                <Link
                  href={b.href}
                  className="group grid gap-3 md:grid-cols-[1fr_auto] md:gap-10 md:items-baseline py-8 md:py-10 border-b border-paper/15"
                >
                  <span>
                    <span className="block display text-3xl sm:text-4xl md:text-5xl group-hover:text-accent transition-colors duration-200">
                      {b.title}
                    </span>
                    <span className="block font-body text-base md:text-lg text-paper/60 mt-3 max-w-[56ch] leading-relaxed">
                      {b.line}
                    </span>
                  </span>
                  <span className="arrow hidden md:inline-block text-2xl text-accent" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <p data-reveal className="label">
          Find me
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {channels.map((c, i) => {
            const external = c.href.startsWith('http')
            return (
              <li key={c.label} data-reveal style={{ '--i': i } as CSSVars}>
                <a
                  href={outHref(c.href)}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="btn inline-flex items-center gap-2 border border-ink rounded-[3px] px-5 py-3 font-heading font-bold text-lg text-ink hover:bg-ink hover:text-paper"
                >
                  {c.label} <span className="arrow text-accent" aria-hidden="true">→</span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
