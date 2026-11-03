'use client'

import { useState } from 'react'
import Link from 'next/link'

type State = 'idle' | 'sending' | 'done' | 'error'

type Copy = {
  task: { label: string; prompt: string }
  why: string
  cta: string
  payment: string
  done: { title: string; text: string }
}

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', max: 80 },
  { name: 'whatsapp', label: 'WhatsApp number', type: 'tel', autoComplete: 'tel', max: 20, placeholder: '+91 98765 43210' },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2', max: 60 },
  { name: 'college', label: 'College, or your last course', type: 'text', autoComplete: 'organization', max: 120 },
] as const

/*
  The cohort application, posted to /api/apply. Short on purpose: four
  plain fields, two answers, one consent box. The small task asks for a
  little effort, which filters for people who finish things. The consent box
  stays: the API refuses without it (DPDP needs a real yes before a phone
  number is stored).
*/
export default function ApplyForm({ copy, todo }: { copy: Copy; todo?: React.ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  const set = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [name]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    const missing = [...FIELDS.map((f) => f.name), 'why', 'task'].some((k) => !values[k]?.trim())
    if (missing) {
      setError('Please fill in every box.')
      setState('error')
      return
    }
    if (!/^(\+?91)?[6-9]\d{9}$/.test((values.whatsapp ?? '').replace(/[\s-]/g, ''))) {
      setError('That WhatsApp number does not look right. Use your 10-digit Indian number.')
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
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent, website: trap }),
      })
      const data = await res.json()
      if (data.ok) {
        setState('done')
        window.scrollTo({ top: 0 })
      } else {
        setError(
          data.reason === 'invalid'
            ? 'Something in the form does not look right. Check each box and try again.'
            : 'That did not go through. Try again in a moment.',
        )
        setState('error')
      }
    } catch {
      setError('That did not go through. Try again in a moment.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="border border-ink rounded-[3px] p-6 md:p-10 max-w-[640px]">
        <p className="display text-4xl md:text-5xl text-ink">{copy.done.title}</p>
        <p className="font-body text-lg text-muted mt-4">{copy.done.text}</p>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
        >
          Read my notes while you wait <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    )
  }

  const input =
    'w-full font-body text-base bg-transparent border border-ink/30 text-ink placeholder:text-muted px-4 py-3 rounded-[3px] focus:outline-none focus:border-accent transition-colors duration-200'
  const labelCls = 'block font-body font-semibold text-ink mb-2'

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-[640px] flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`apply-${f.name}`} className={labelCls}>
              {f.label}
            </label>
            <input
              id={`apply-${f.name}`}
              type={f.type}
              autoComplete={f.autoComplete}
              maxLength={f.max}
              placeholder={'placeholder' in f ? f.placeholder : undefined}
              inputMode={f.type === 'tel' ? 'tel' : undefined}
              value={values[f.name] ?? ''}
              onChange={set(f.name)}
              className={input}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="apply-why" className={labelCls}>
          {copy.why}
        </label>
        <textarea id="apply-why" rows={4} maxLength={1200} value={values.why ?? ''} onChange={set('why')} className={input} />
      </div>

      <div>
        <label htmlFor="apply-task" className={labelCls}>
          {copy.task.label}
        </label>
        <p className="font-body text-base text-muted mb-3 leading-relaxed">{copy.task.prompt}</p>
        {todo}
        <textarea id="apply-task" rows={6} maxLength={1500} value={values.task ?? ''} onChange={set('task')} className={`${input} mt-1`} />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] w-4 h-4 shrink-0 accent-[color:var(--color-accent)] cursor-pointer"
        />
        <span className="font-body text-sm leading-relaxed text-muted">
          Yes, keep my answers and contact me on WhatsApp about The 12-Day Build.{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
            How I handle your data
          </Link>
        </span>
      </label>

      <p className="font-body text-sm text-muted">{copy.payment}</p>

      {state === 'error' && error && (
        <p role="alert" className="font-body text-sm text-accent">
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {state === 'sending' ? 'Sending…' : copy.cta} <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
