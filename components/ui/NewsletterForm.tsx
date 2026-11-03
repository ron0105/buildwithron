'use client'

import { useState } from 'react'
import Link from 'next/link'
import { isPlausibleEmail } from '@/lib/subscribe'

type State = 'idle' | 'sending' | 'done' | 'error'

/*
  The newsletter sign-up, in one place, so the footer, the home page and
  /newsletter all post the same way to /api/subscribe. The consent box stays:
  the API refuses without it (DPDP needs a real yes before an address is
  stored).

  tone="dark" is for the ink bands (footer), "light" for paper sections.
  gift: when the sign-up unlocks a free download (the weekly sheet), the
  success state hands it over right there. Nothing is emailed: the site has
  no sender, so the page is the delivery.
  next: one link shown after the gift, so the next step is a tap away.
  The id doubles as the source stored with the sign-up, which is how sheet
  sign-ups are told apart from newsletter ones (Hobby drops custom events).
*/
export default function NewsletterForm({
  tone = 'light',
  id = 'newsletter',
  cta = 'Subscribe',
  gift,
  next,
}: {
  tone?: 'light' | 'dark'
  id?: string
  cta?: string
  gift?: { href: string; label: string } | null
  next?: { href: string; label: string }
}) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  const dark = tone === 'dark'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    if (!isPlausibleEmail(email)) {
      setError('That address does not look right.')
      setState('error')
      return
    }
    if (!consent) {
      setError('Please tick the box so I have your yes.')
      setState('error')
      return
    }

    setState('sending')
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, website: trap, source: id }),
      })
      const data = await res.json()
      if (data.ok) {
        setState('done')
      } else {
        setError(
          data.reason === 'invalid'
            ? 'That address does not look right.'
            : 'That did not go through. Try again in a moment.',
        )
        setState('error')
      }
    } catch {
      setError('That did not go through. Try again in a moment.')
      setState('error')
    }
  }

  if (state === 'done' && gift) {
    return (
      <div role="status">
        <p className={`font-body text-base ${dark ? 'text-paper' : 'text-ink'}`}>
          You&apos;re in. Here it is:
        </p>
        <a
          href={gift.href}
          download
          className="btn inline-flex items-center gap-2 mt-4 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink"
        >
          {gift.label} <span className="arrow" aria-hidden="true">↓</span>
        </a>
        {next && (
          <Link
            href={next.href}
            className={`inline-block mt-5 font-body font-semibold underline decoration-accent decoration-2 underline-offset-[6px] ${dark ? 'text-paper' : 'text-ink'}`}
          >
            {next.label} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    )
  }

  if (state === 'done') {
    return (
      <p role="status" className={`font-body text-base ${dark ? 'text-paper' : 'text-ink'}`}>
        You&apos;re in. I&apos;ll only write when something changes.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          Your email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`flex-1 min-w-0 font-body text-base bg-transparent border px-4 py-3 rounded-[3px] focus:outline-none focus:border-accent transition-colors duration-200 ${
            dark
              ? 'border-paper/30 text-paper placeholder:text-paper/40'
              : 'border-ink/30 text-ink placeholder:text-muted'
          }`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className={`btn font-body text-sm font-semibold bg-accent text-paper px-6 py-3 rounded-[3px] cursor-pointer disabled:opacity-60 disabled:cursor-wait shrink-0 ${
            dark ? 'hover:bg-paper hover:text-ink' : 'hover:bg-ink hover:text-paper'
          }`}
        >
          {state === 'sending' ? 'Adding you…' : cta}
        </button>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-2.5 mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] w-4 h-4 shrink-0 accent-[color:var(--color-accent)] cursor-pointer"
        />
        <span className={`font-body text-xs leading-relaxed ${dark ? 'text-paper/60' : 'text-muted'}`}>
          Yes, email me. No spam. Unsubscribe anytime.{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
            How I handle your data
          </Link>
        </span>
      </label>

      {state === 'error' && error && (
        <p role="alert" className={`font-body text-sm mt-3 ${dark ? 'text-orange-300' : 'text-accent'}`}>
          {error}
        </p>
      )}
    </form>
  )
}
