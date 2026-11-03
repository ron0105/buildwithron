import { NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/subscribe'

/* Runs on the server so the provider key never reaches the browser. */
export async function POST(request: Request) {
  let email: unknown
  let consent: unknown
  let trap: unknown
  let source: unknown

  try {
    const body = await request.json()
    email = body?.email
    consent = body?.consent
    trap = body?.website
    source = body?.source
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  /* Honeypot. A real person never fills a field they cannot see, so a filled
     one means a bot. Answer 200 so it learns nothing from the response. */
  if (typeof trap === 'string' && trap.length > 0) {
    return NextResponse.json({ ok: true })
  }

  /* DPDP: consent has to be a real affirmative act, so the box must be
     ticked. Never default it to true on the client. */
  if (consent !== true) {
    return NextResponse.json({ ok: false, reason: 'consent' }, { status: 400 })
  }

  if (typeof email !== 'string') {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  /* Which form it came from (the form's id). Kept short and plain so it can't
     carry anything else into storage. */
  const from = typeof source === 'string' && /^[a-z-]{1,32}$/.test(source) ? source : 'unknown'

  const result = await addSubscriber(email, from)

  if (result.ok) return NextResponse.json({ ok: true })

  /* A duplicate is not a failure the visitor needs to see. Telling them the
     address is already on the list also leaks who is subscribed. */
  if (result.reason === 'duplicate') return NextResponse.json({ ok: true })

  const status = result.reason === 'invalid' ? 400 : 500
  return NextResponse.json({ ok: false, reason: result.reason }, { status })
}
