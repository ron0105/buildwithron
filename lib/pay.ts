import QRCode from 'qrcode'

/*
  The single source of truth for payment details.

  Change `vpa` or `payeeName` here and everything downstream follows: the
  tap-to-pay button, the copyable ID, and the on-screen QR, which is generated
  from these values at build time rather than uploaded as an image. There is no
  second copy to forget about and no PNG that can silently go stale after the
  account behind it changes.

  Personal payment identifier, on purpose. Anything invoiced as The Adda Labs
  work is billed by the LLP and does not belong here.
*/
export const pay = {
  vpa: 'rohan0105@oksbi',
  payeeName: 'Rohan Tiwarekar',
  currency: 'INR',
} as const

/*
  NPCI UPI deep link. Every Indian UPI app registers this scheme, so a tap on
  Android opens the payment sheet pre-filled. Amount is deliberately omitted:
  the payer types it, which keeps one link valid for every situation.

  `pn` must be URI-encoded. An unencoded space here is the classic reason a UPI
  intent silently fails to resolve on some apps.
*/
export function upiUri(amount?: number): string {
  const params = new URLSearchParams({
    pa: pay.vpa,
    pn: pay.payeeName,
    cu: pay.currency,
  })
  if (amount && amount > 0) params.set('am', amount.toFixed(2))

  /*
    URLSearchParams serialises a space as `+`, which is correct for form
    encoding and wrong here: several UPI apps read the payee name literally and
    show "Rohan+Tiwarekar" on the confirmation screen. `%20` is understood
    everywhere.
  */
  return `upi://pay?${params.toString().replace(/\+/g, '%20')}`
}

/*
  Per-app deep links.

  `upi://pay` is the generic NPCI intent. On Android it raises the app chooser
  with the payee already filled in, which is the whole experience we want. iOS
  has no equivalent intent system and the Indian UPI apps do not reliably claim
  the `upi:` scheme there, so on an iPhone that button can do nothing at all.

  These named schemes give an iPhone user something to aim at. They are still
  best-effort: whether a given app answers depends on that app's build, so the
  copyable ID and the QR below them remain the only guaranteed paths and must
  never be removed.
*/
export const payApps = [
  { label: 'Google Pay', scheme: 'tez://upi/pay' },
  { label: 'PhonePe', scheme: 'phonepe://pay' },
  { label: 'Paytm', scheme: 'paytmmp://pay' },
] as const

export function appUri(scheme: string): string {
  return `${scheme}?${new URLSearchParams({
    pa: pay.vpa,
    pn: pay.payeeName,
    cu: pay.currency,
  }).toString().replace(/\+/g, '%20')}`
}

/*
  Rendered on the server at build time, so the markup ships inside the HTML.
  No image request, no client-side QR library, nothing to hydrate before the
  code is scannable.

  Error correction level M is the UPI norm: enough redundancy to survive a
  phone camera at an angle without inflating the module count.
*/
export async function upiQrSvg(): Promise<string> {
  return QRCode.toString(upiUri(), {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    /* The printed card's ink on the printed card's stock, so the on-screen code
       and the one in your pocket are the same object. Contrast is far above
       what any scanner needs. */
    color: { dark: '#0B1410', light: '#EEE7D9' },
  })
}
