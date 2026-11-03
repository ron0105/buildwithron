import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Strike from '@/components/ui/Strike'
import Todo from '@/components/ui/Todo'
import type { HomeCopy } from '@/lib/content'

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* The hero. Its one job is the email: on a 390px phone the face, the
   headline and the form all sit on the first screen, so the photo shrinks to
   a thumbnail beside the label there. M1 lines rise 120ms apart, M2 the pen
   marks draw once the last line has landed, M3 the live dot. No "next"
   link after sign-up here: The 12-Day Build link already sits under the form. */
export default function HomeHero({
  copy,
  sheet,
}: {
  copy: HomeCopy['hero']
  sheet: { href: string; label: string } | null
}) {
  const lineCount = copy.lines.length
  const markDelay = (lineCount + 1) * 120 + 300

  return (
    <section id="get-sheet" className="wrap pt-24 pb-[72px] md:pt-40 md:pb-[120px] md:min-h-[100svh] md:flex md:items-center scroll-mt-16">
      <div className="grid w-full grid-cols-[1fr_auto] gap-x-5 md:grid-cols-[1.5fr_1fr] md:gap-x-16 items-center">
        <p className="label flex items-center gap-3 rise md:self-end" style={{ '--i': 0 } as CSSVars}>
          <span className="live-dot" aria-hidden="true" />
          {copy.label}
        </p>

        <div
          className="col-start-2 row-start-1 md:row-span-2 w-[84px] md:w-full md:max-w-[400px] justify-self-end rise"
          style={{ '--i': 2 } as CSSVars}
        >
          <Image
            src={copy.photo}
            alt={copy.photoAlt}
            width={1024}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 400px, 84px"
            className="photo w-full aspect-square md:aspect-[4/5] object-cover object-[50%_30%]"
          />
          <div className="mt-3 hidden md:block">
            <Todo>swap in a photo of Rohan at work</Todo>
          </div>
        </div>

        {/* A size container, so the headline scales to the column: the longest
            line always fits on one row and the stack holds. */}
        <div className="@container col-span-2 md:col-span-1 md:self-start min-w-0">
          <h1 className="display text-[min(13cqi,6rem)] whitespace-nowrap mt-5 md:mt-6 text-ink">
            {copy.lines.map((line, i) => (
              <span key={line} className="block rise" style={{ '--i': i + 1 } as CSSVars}>
                <Marked line={line} strike={copy.strike} underline={copy.underline} delay={markDelay} />
              </span>
            ))}
          </h1>

          <p
            className="font-body text-[17px] md:text-xl text-muted mt-5 md:mt-8 max-w-[40ch] leading-relaxed rise"
            style={{ '--i': lineCount + 1 } as CSSVars}
          >
            {copy.sub}
          </p>

          <div className="mt-6 md:mt-10 rise" style={{ '--i': lineCount + 2 } as CSSVars}>
            <p className="font-heading font-bold text-lg text-ink mb-3">{copy.small}</p>
            <NewsletterForm
              id="hero-signup"
              cta={copy.cta}
              gift={sheet}
            />
            {!sheet && (
              <div className="mt-3">
                <Todo>add the sheet PDF in public/</Todo>
              </div>
            )}
          </div>

          <Link
            href="/cohort"
            className="inline-flex items-center gap-2 mt-6 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] rise"
            style={{ '--i': lineCount + 3 } as CSSVars}
          >
            {copy.cohort} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* Wraps the struck word and the underlined phrase in their pen marks. */
function Marked({
  line,
  strike,
  underline,
  delay,
}: {
  line: string
  strike: string
  underline: string
  delay: number
}) {
  if (line.includes(strike)) {
    const [before, after] = line.split(strike)
    return (
      <>
        {before}
        <Strike delay={delay}>{strike}</Strike>
        {after}
      </>
    )
  }
  if (line.includes(underline)) {
    const [before, after] = line.split(underline)
    return (
      <>
        {before}
        <span className="relative inline-block">
          {underline}
          <svg
            className="draw absolute left-0 -bottom-2 md:-bottom-3 w-full h-3 md:h-4 text-accent overflow-visible"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ '--delay': `${delay + 250}ms` } as CSSVars}
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
        {after}
      </>
    )
  }
  return <>{line}</>
}
