import { NextResponse } from 'next/server'
import { cleanApplication, saveApplication } from '@/lib/apply'

/* Runs on the server so storage keys never reach the browser. */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  /* Honeypot: a filled hidden field means a bot. Answer 200 so it learns nothing. */
  if (typeof body?.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  /* DPDP: storing a WhatsApp number needs a real, ticked yes. */
  if (body?.consent !== true) {
    return NextResponse.json({ ok: false, reason: 'consent' }, { status: 400 })
  }

  const app = cleanApplication(body)
  if (!app) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })

  const saved = await saveApplication(app)
  return saved
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ ok: false, reason: 'provider' }, { status: 500 })
}
