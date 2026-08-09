'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { isPlausibleEmail } from '@/lib/subscribe'

type State = 'idle' | 'sending' | 'done' | 'error'

/*
  The one door in. FOUNDATION.md picked a product/education endpoint, which
  makes an owned list the asset, so this is the only place on the site asking
  for something. The footer's "Let's talk" is a different intent (client work)
  and deliberately stays separate rather than competing with this.
*/
export default function JoinList() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    if (!consent) {
      setError(t.doorErrorConsent)
      setState('error')
      return
    }
    if (!isPlausibleEmail(email)) {
      setError(t.doorErrorEmail)
      setState('error')
      return
    }

    setState('sending')
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, website: trap }),
      })
      const data = await res.json()
      if (data.ok) {
        setState('done')
      } else {
        setError(data.reason === 'invalid' ? t.doorErrorEmail : t.doorErrorGeneric)
        setState('error')
      }
    } catch {
      setError(t.doorErrorGeneric)
      setState('error')
    }
  }

  return (
    <section className="bg-ink always-dark px-5 sm:px-6 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-paper leading-tight">
            {t.doorTitle}<span className="text-accent">.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-paper/50 leading-relaxed mt-5 max-w-lg">
            {t.doorSub}
          </p>

          {state === 'done' ? (
            <p
              role="status"
              className="font-body text-base sm:text-lg text-accent leading-relaxed mt-10"
            >
              {t.doorSuccess}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10" noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="join-email" className="sr-only">
                  {t.doorPlaceholder}
                </label>
                <input
                  id="join-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.doorPlaceholder}
                  className="flex-1 font-body text-base bg-transparent border border-paper/25 text-paper placeholder:text-paper/30 px-5 py-4 focus:outline-none focus:border-accent transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="font-body text-sm font-medium bg-paper text-ink px-7 py-4 hover:bg-accent hover:text-paper transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-wait shrink-0"
                >
                  {state === 'sending' ? t.doorSending : t.doorButton}
                </button>
              </div>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                <label htmlFor="join-website">Website</label>
                <input
                  id="join-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              <label className="flex items-start gap-3 mt-5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 shrink-0 accent-[color:var(--color-accent)] cursor-pointer"
                />
                <span className="font-body text-xs sm:text-sm text-paper/45 leading-relaxed group-hover:text-paper/70 transition-colors duration-200">
                  {t.doorConsent}{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-accent transition-colors duration-200"
                  >
                    {t.doorPrivacy}
                  </Link>
                </span>
              </label>

              {state === 'error' && error && (
                <p role="alert" className="font-body text-sm text-accent mt-4">
                  {error}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
