import Image from 'next/image'
import Todo from '@/components/ui/Todo'
import { OUTBOUND, outHref } from '@/lib/outbound'
import type { HomeCopy } from '@/lib/content'

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* 01: the hero. M1 lines rise 120ms apart, M2 the underline draws itself
   once the last line has landed, M3 the live dot. */
export default function HomeHero({ copy }: { copy: HomeCopy['hero'] }) {
  const last = copy.lines.length - 1
  const lineCount = copy.lines.length

  return (
    <section className="wrap pt-32 pb-[72px] md:pt-40 md:pb-[120px] md:min-h-[100svh] md:flex md:items-center">
      <div className="grid w-full gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16 items-center">
        {/* A size container, so the headline scales to the column: the longest
            line always fits on one row and the three-line stack holds. */}
        <div className="@container">
          <p className="label flex items-center gap-3 rise" style={{ '--i': 0 } as CSSVars}>
            <span className="live-dot" aria-hidden="true" />
            01 — {copy.label}
          </p>

          <h1 className="display text-[min(13cqi,6rem)] whitespace-nowrap mt-6 text-ink">
            {copy.lines.map((line, i) => (
              <span key={line} className="block rise" style={{ '--i': i + 1 } as CSSVars}>
                {i === last ? (
                  <span className="relative inline-block">
                    {line}
                    {/* Hand-drawn underline, one of the 2-3 sketch marks on the site. */}
                    <svg
                      className="draw absolute left-0 -bottom-2 md:-bottom-3 w-full h-3 md:h-4 text-accent overflow-visible"
                      viewBox="0 0 300 16"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      style={{ '--delay': `${(lineCount + 1) * 120 + 300}ms` } as CSSVars}
                    >
                      <path
                        d="M3 11 C 60 4, 120 13, 180 7 S 270 5, 297 9"
                        pathLength={1}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p
            className="font-body text-lg md:text-xl text-muted mt-8 max-w-[34ch] leading-relaxed rise"
            style={{ '--i': lineCount + 1 } as CSSVars}
          >
            {copy.sub}
          </p>
          <p
            className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink mt-6 rise"
            style={{ '--i': lineCount + 1 } as CSSVars}
          >
            {copy.for}
          </p>

          <div className="flex flex-wrap gap-3 mt-10 rise" style={{ '--i': lineCount + 2 } as CSSVars}>
            <a
              href={outHref(OUTBOUND.youtube)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink hover:text-paper"
            >
              {copy.watch} <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a
              href="#sheet"
              className="btn inline-flex items-center gap-2 border border-ink text-ink font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink hover:text-paper"
            >
              {copy.notes}
            </a>
          </div>
        </div>

        <div className="rise max-w-[400px] w-full md:justify-self-end" style={{ '--i': 2 } as CSSVars}>
          <Image
            src={copy.photo}
            alt={copy.photoAlt}
            width={1024}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 400px, 90vw"
            className="photo w-full aspect-[4/5] object-cover object-[50%_30%]"
          />
          <div className="mt-3">
            <Todo>swap in a photo of Rohan at work</Todo>
          </div>
        </div>
      </div>
    </section>
  )
}
