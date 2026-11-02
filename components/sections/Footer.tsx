import Link from 'next/link'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { OUTBOUND, outHref } from '@/lib/outbound'

/* Every outbound link goes through /go/<key>, so a click is a counted page
   view (Vercel Hobby drops custom events). */
const channels = [
  { label: 'YouTube', href: OUTBOUND.youtube },
  { label: 'Instagram', href: OUTBOUND.instagram },
  { label: 'LinkedIn', href: OUTBOUND.linkedin },
  { label: 'The Adda Labs', href: OUTBOUND.tal },
]

const more = [
  { label: 'X', href: OUTBOUND.x },
  { label: 'GitHub', href: OUTBOUND.github },
  { label: 'Email', href: OUTBOUND.email },
]

/* newsletter={false} on pages that already carry the sign-up (home), so the
   form never shows twice in a row. */
export default function Footer({ newsletter = true }: { newsletter?: boolean }) {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap section">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
          {newsletter ? (
            <div>
              <p className="label text-paper/50">Newsletter</p>
              <h2 className="display text-4xl sm:text-5xl md:text-6xl mt-4">
                Notes from the build<span className="text-accent">.</span>
              </h2>
              <p className="font-body text-base text-paper/60 mt-4 mb-8">
                Sent only when something changes.
              </p>
              <NewsletterForm tone="dark" id="footer-newsletter" />
            </div>
          ) : (
            <p className="display text-5xl sm:text-6xl md:text-7xl">
              Rohan
              <br />
              Tiwarekar<span className="text-accent">.</span>
            </p>
          )}

          <nav aria-label="Elsewhere" className="md:pt-2">
            <p className="label text-paper/50">Find me</p>
            <ul className="mt-5 flex flex-col gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={outHref(c.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-heading text-2xl font-bold text-paper hover:text-accent transition-colors duration-200"
                  >
                    {c.label} <span className="arrow text-accent" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {more.map((c) => (
                <li key={c.label}>
                  <a
                    href={outHref(c.href)}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-mono text-xs uppercase tracking-[0.08em] text-paper/50 hover:text-paper transition-colors duration-200"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 md:mt-24 pt-6 border-t border-paper/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-body text-sm text-paper/60">Built in public in Mumbai.</span>
          <span className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.08em] text-paper/40">
            <Link href="/privacy" className="hover:text-paper transition-colors duration-200">
              Privacy
            </Link>
            <span>&copy; {new Date().getFullYear()} Rohan Tiwarekar</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
