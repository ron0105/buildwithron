'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import CopyField from '@/components/ui/CopyField'

interface Props {
  vpa: string
  primaryUri: string
  qrSvg: string
  /* The entry labelled 'any' is the generic upi: intent and takes translated copy. */
  apps: { label: string; href: string }[]
}

/*
  Deliberately unanimated. Everything else on the site fades in on mount, which
  costs the reader a beat while React hydrates. This page gets opened by someone
  standing in front of Rohan waiting to pay him, so it paints and it is done.
*/
export default function PayHero({ vpa, primaryUri, qrSvg, apps }: Props) {
  const { t } = useLanguage()

  return (
    /* card-palette pins the printed card's colours here in both themes. */
    <section className="card-palette min-h-screen flex flex-col px-5 sm:px-6 pt-20 sm:pt-28 pb-16 bg-paper">
      <div className="max-w-md mx-auto w-full">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-ink leading-tight text-center">
          {t.payTitle}<span className="text-accent">.</span>
        </h1>
        <p className="font-body text-base text-muted mt-4 leading-relaxed text-center">
          {t.payLead}
        </p>

        {/*
          Named scheme, not the generic upi: intent. The generic one is supposed
          to raise Android's app chooser, but a phone with a default UPI handler
          jumps straight there — WhatsApp, in the case that surfaced this. Naming
          the app is the only way to know which one opens. Every alternative,
          including the generic intent, sits in the row below.
        */}
        <a
          href={primaryUri}
          className="mt-10 flex items-center justify-center gap-3 rounded-lg bg-accent px-6 py-5 font-heading font-semibold text-lg text-white hover:opacity-90 transition-opacity duration-200"
        >
          {t.payOpenApp}
          <span aria-hidden="true">→</span>
        </a>

        {/*
          The alternatives, including the generic upi: intent as the last entry.
          Named schemes also cover iPhone, where upi: often resolves to nothing
          at all — a dead button with no visible alternative is the worst
          outcome on a page someone opened to hand over money.
        */}
        <p className="font-body text-sm text-muted text-center mt-8 mb-3">
          {t.payPickApp}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {apps.map((app) => (
            <a
              key={app.label}
              href={app.href}
              className="rounded-lg border border-border px-1 py-3 text-center font-body text-[13px] whitespace-nowrap text-muted hover:border-ink hover:text-ink transition-colors duration-200"
            >
              {app.label === 'any' ? t.payAnyUpi : app.label}
            </a>
          ))}
        </div>

        <p className="font-body text-sm text-muted text-center mt-8 mb-3">
          {t.payOrCopy}
        </p>
        <CopyField value={vpa} />

        {/* QR is inlined as markup, so there is no image request and nothing to hydrate. */}
        <div className="mt-12 flex flex-col items-center">
          <div
            className="w-44 h-44 [&>svg]:w-full [&>svg]:h-full rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p className="font-body text-sm text-muted/80 text-center mt-4">
            {t.payScan}
          </p>
        </div>

        <p className="font-body text-xs text-muted/60 text-center mt-12 leading-relaxed">
          {t.payFootnote}
        </p>

        <p className="font-body text-xs text-muted/60 text-center mt-6">
          <Link href="/links" className="hover:text-ink transition-colors duration-200">
            buildwithron.com
          </Link>
        </p>
      </div>
    </section>
  )
}
