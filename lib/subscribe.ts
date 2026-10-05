/*
  The one place that knows which email provider we use.

  Swapping provider means editing this file and the env vars, nothing else.
  That is deliberate: the list is the asset, and being able to leave a provider
  without touching the site is part of owning it.

  Env vars (set in .env.local, never committed):
    SUBSCRIBE_PROVIDER  one of: blob | kit | buttondown | beehiiv | log
    SUBSCRIBE_API_KEY   the provider's API key
    SUBSCRIBE_LIST_ID   form/publication id, where the provider needs one

  'log' is the default and writes to the server console instead of calling
  anyone. It lets the form be built and tested before an account exists.

  'blob' keeps the list in a private Vercel Blob store connected to the
  project. No key to set: Vercel injects the credentials when the store is
  connected, and it is picked automatically when SUBSCRIBE_PROVIDER is
  unset. It is a holding pen, not a newsletter tool; export it to a real
  provider when it is time to send.
*/

import { createHash } from 'node:crypto'
import { put } from '@vercel/blob'

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'duplicate' | 'provider' | 'config' }

/* Deliberately loose. Strict regexes reject valid addresses, and the provider
   verifies properly anyway. This only catches obvious typos. */
export function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export async function addSubscriber(rawEmail: string): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase()
  if (!isPlausibleEmail(email)) return { ok: false, reason: 'invalid' }

  /* A connected Blob store is enough to turn capture on: Vercel sets
     BLOB_STORE_ID when the store is linked, so there is nothing to configure. */
  const provider =
    process.env.SUBSCRIBE_PROVIDER ?? (process.env.BLOB_STORE_ID ? 'blob' : 'log')
  const apiKey = process.env.SUBSCRIBE_API_KEY
  const listId = process.env.SUBSCRIBE_LIST_ID

  if (provider === 'log') {
    console.log(`[subscribe] would add: ${email}`)
    return { ok: true }
  }

  if (provider === 'blob') {
    /* One file per address, named by its hash, so a repeat signup overwrites
       instead of duplicating and the pathname never exposes the email. */
    const id = createHash('sha256').update(email).digest('hex')
    try {
      await put(
        `subscribers/${id}.json`,
        JSON.stringify({ email, consentedAt: new Date().toISOString() }),
        { access: 'private', contentType: 'application/json', allowOverwrite: true },
      )
      return { ok: true }
    } catch {
      return { ok: false, reason: 'provider' }
    }
  }

  if (!apiKey) return { ok: false, reason: 'config' }

  try {
    switch (provider) {
      case 'kit': {
        if (!listId) return { ok: false, reason: 'config' }
        const res = await fetch(`https://api.kit.com/v4/forms/${listId}/subscribers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Kit-Api-Key': apiKey },
          body: JSON.stringify({ email_address: email }),
        })
        return res.ok ? { ok: true } : { ok: false, reason: 'provider' }
      }

      case 'buttondown': {
        const res = await fetch('https://api.buttondown.com/v1/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Token ${apiKey}` },
          body: JSON.stringify({ email_address: email }),
        })
        if (res.status === 409) return { ok: false, reason: 'duplicate' }
        return res.ok ? { ok: true } : { ok: false, reason: 'provider' }
      }

      case 'beehiiv': {
        if (!listId) return { ok: false, reason: 'config' }
        const res = await fetch(
          `https://api.beehiiv.com/v2/publications/${listId}/subscriptions`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({ email, reactivate_existing: false }),
          },
        )
        return res.ok ? { ok: true } : { ok: false, reason: 'provider' }
      }

      default:
        return { ok: false, reason: 'config' }
    }
  } catch {
    return { ok: false, reason: 'provider' }
  }
}
