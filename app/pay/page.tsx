import type { Metadata } from 'next'
import PayHero from '@/components/sections/pay/PayHero'
import { pay, upiUri, upiQrSvg } from '@/lib/pay'

export const metadata: Metadata = {
  title: 'Pay — Rohan Tiwarekar',
  description: 'Send a UPI payment to Rohan Tiwarekar.',
  /* A payment endpoint has no business in search results or link previews. */
  robots: { index: false, follow: false },
}

export default async function PayPage() {
  /* Runs once at build. The QR ships inside the HTML as markup. */
  const qrSvg = await upiQrSvg()

  return <PayHero vpa={pay.vpa} upiUri={upiUri()} qrSvg={qrSvg} />
}
