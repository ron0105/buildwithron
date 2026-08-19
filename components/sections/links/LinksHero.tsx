'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/context/LanguageContext'

/*
  No entrance animation on this page, on purpose.

  This is the page the printed wallet card's QR opens, so it gets read by
  someone standing in front of Rohan mid-conversation. It used to mount every
  block at opacity:0 and wait for framer-motion, which put first contentful
  paint at ~1.6s even on a warm cache: the markup arrived in 9ms and then sat
  there invisible while 206KB of JS parsed. The content is server-rendered, so
  the fastest correct thing to do is simply show it.
*/
export default function LinksHero() {
  const { t } = useLanguage()

  /* Labels and handles are proper nouns and account names; notes translate. */
  const links = [
    {
      label: 'YouTube',
      handle: 'Learn With Ron',
      note: t.linkNoteYoutube,
      href: 'https://www.youtube.com/@learn_withron',
      variant: 'marked' as const,
    },
    {
      label: t.linkLabelContact,
      handle: '',
      note: t.linkNoteContact,
      href: '/rohan.vcf',
      variant: 'plain' as const,
    },
    {
      label: 'X',
      handle: '@build_withron',
      note: t.linkNoteX,
      href: 'https://x.com/build_withron',
      variant: 'plain' as const,
    },
    {
      label: 'Instagram',
      handle: '@build.with.ron',
      note: t.linkNoteInstagram,
      href: 'https://www.instagram.com/build.with.ron/',
      variant: 'plain' as const,
    },
    {
      label: 'LinkedIn',
      handle: 'in/ronnnn',
      note: t.linkNoteLinkedin,
      href: 'https://www.linkedin.com/in/ronnnn/',
      variant: 'plain' as const,
    },
    {
      label: 'The Adda Labs',
      handle: t.linkHandleStudio,
      note: t.linkNoteStudio,
      href: '/work',
      variant: 'plain' as const,
    },
    {
      label: 'Email',
      handle: 'rohan0105@gmail.com',
      note: t.linkNoteEmail,
      href: 'mailto:rohan0105@gmail.com',
      variant: 'plain' as const,
    },
  ]

  const shell = {
    /* YouTube's own tile. Purple is the channel's actual brand color (the
       avatar mark), not the site's orange accent, so it gets its own token
       rather than borrowing --color-accent. */
    marked: 'bg-paper border-youtube/45 hover:border-youtube',
    plain: 'bg-paper border-border hover:border-ink',
  }

  return (
    <section className="min-h-screen flex flex-col px-5 sm:px-6 pt-28 sm:pt-36 pb-16 bg-paper">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-ink leading-tight">
            Rohan Tiwarekar<span className="text-accent">.</span>
          </h1>
          <p className="font-body text-base text-muted mt-4 leading-relaxed">
            {t.linksBio}
          </p>
          {/* Compact secondary CTA, not a full tile — this used to be the
              primary tile up top, demoted on Rohan's call so the page reads
              as "about me + where to find me" first, payment second. */}
          <a
            href="/pay"
            onClick={() => track('link_click', { label: 'Pay' })}
            aria-label={t.linkNotePay}
            className="inline-flex items-center gap-1.5 rounded-full border border-pay text-pay font-heading font-semibold text-sm px-5 py-2 mt-6 hover:bg-pay hover:text-white transition-colors duration-200"
          >
            {t.linkHandlePay}
            <span>→</span>
          </a>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-3">
          {links.map((link) => {
            const isExternal =
              link.href.startsWith('http') || link.href.startsWith('mailto') || link.href.endsWith('.vcf')
            const inner = (
              <div
                className={`group flex items-center justify-between gap-4 border rounded-lg px-6 py-5 transition-colors duration-200 cursor-pointer ${shell[link.variant]}`}
              >
                <div>
                  <span className="font-heading font-semibold text-lg block text-ink">
                    {link.label}
                    {link.handle && (
                      <span className="font-body font-normal text-sm ml-3 text-muted">
                        {link.handle}
                      </span>
                    )}
                  </span>
                  <span className="font-body text-sm block mt-1 text-muted/80">
                    {link.note}
                  </span>
                </div>
                <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 text-muted">
                  →
                </span>
              </div>
            )

            const onClick = () => track('link_click', { label: link.label })

            return (
              <li key={link.label}>
                {isExternal ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
                    {inner}
                  </a>
                ) : (
                  <Link href={link.href} onClick={onClick}>
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Footer note */}
        <p className="font-body text-xs text-muted/60 text-center mt-12">
          <Link href="/" className="hover:text-ink transition-colors duration-200">
            buildwithron.com
          </Link>
        </p>
      </div>
    </section>
  )
}
