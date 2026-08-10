import type { Metadata } from 'next'
import PayHero from '@/components/sections/pay/PayHero'
import { pay, upiUri, upiQrSvg, payApps, appUri } from '@/lib/pay'

export const metadata: Metadata = {
  title: 'Pay — Rohan Tiwarekar',
  description: 'Send a UPI payment to Rohan Tiwarekar.',
  /* A payment endpoint has no business in search results or link previews. */
  robots: { index: false, follow: false },
}

export default async function PayPage() {
  /* Runs once at build. The QR ships inside the HTML as markup. */
  const qrSvg = await upiQrSvg()

  /*
    Google Pay is promoted to the primary button and the generic upi: intent is
    demoted to one option among the rest.

    The generic intent is meant to raise Android's app chooser, but if the phone
    has a default UPI handler set it goes straight there with no prompt. On
    Rohan's phone that is WhatsApp, which does have UPI payments, so the link
    was working exactly as specified and still landing somewhere he did not
    want. A named scheme is the only way to be sure which app opens.
  */
  const [primary, ...rest] = payApps
  const apps = [
    ...rest.map((a) => ({ label: a.label, href: appUri(a.scheme) })),
    { label: 'any', href: upiUri() },
  ]

  return (
    <PayHero
      vpa={pay.vpa}
      primaryUri={appUri(primary.scheme)}
      qrSvg={qrSvg}
      apps={apps}
    />
  )
}
