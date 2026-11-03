/*
  Cohort applications. Same storage as the email list (lib/subscribe.ts): a
  private Vercel Blob store when one is linked, a console line otherwise.
  Rohan reads them in the Vercel dashboard (Storage → Blob → applications/)
  and replies on WhatsApp. No email sender exists, so nothing is sent.
*/
import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'

export type Application = {
  name: string
  whatsapp: string
  city: string
  college: string
  why: string
  task: string
}

/* Short caps keep one application from filling storage, and keep the text
   readable in one sitting. */
export const LIMITS: Record<keyof Application, number> = {
  name: 80,
  whatsapp: 20,
  city: 60,
  college: 120,
  why: 1200,
  task: 1500,
}

export function cleanApplication(raw: unknown): Application | null {
  if (!raw || typeof raw !== 'object') return null
  const body = raw as Record<string, unknown>
  const out = {} as Application
  for (const key of Object.keys(LIMITS) as (keyof Application)[]) {
    const value = body[key]
    if (typeof value !== 'string') return null
    const trimmed = value.trim()
    if (!trimmed || trimmed.length > LIMITS[key]) return null
    out[key] = trimmed
  }
  /* Indian mobile numbers, with or without +91, spaces or dashes. */
  const digits = out.whatsapp.replace(/[\s-]/g, '')
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) return null
  out.whatsapp = digits
  return out
}

export async function saveApplication(app: Application): Promise<boolean> {
  const useBlob = process.env.SUBSCRIBE_PROVIDER === 'blob' || Boolean(process.env.BLOB_STORE_ID)
  const record = { ...app, consentedAt: new Date().toISOString() }

  if (!useBlob) {
    console.log(`[apply] would save application from ${app.name} (${app.city})`)
    return true
  }

  try {
    /* Date first so the dashboard lists them in order. */
    await put(`applications/${record.consentedAt.slice(0, 10)}-${randomUUID()}.json`, JSON.stringify(record), {
      access: 'private',
      contentType: 'application/json',
    })
    return true
  } catch {
    return false
  }
}
