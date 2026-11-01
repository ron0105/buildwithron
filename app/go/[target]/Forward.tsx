'use client'

import { useEffect } from 'react'

/* Forward only once the analytics script has loaded, because its page view
   is the whole point of this route. The script sends with keepalive, so the
   request survives the navigation. The timeout caps the wait if the script
   is blocked, so an ad blocker costs a count, never the click. */
export default function Forward({ url }: { url: string }) {
  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      window.location.replace(url)
    }

    const cap = setTimeout(go, 1500)
    const poll = setInterval(() => {
      const script = document.querySelector<HTMLScriptElement>(
        'script[src*="insights/script"], script[src*="vercel-scripts"]',
      )
      if (!script) return
      clearInterval(poll)
      if (script.dataset.loaded) setTimeout(go, 150)
      else script.addEventListener('load', () => setTimeout(go, 150), { once: true })
    }, 50)

    return () => {
      clearTimeout(cap)
      clearInterval(poll)
    }
  }, [url])

  return (
    <main className="min-h-screen flex items-center justify-center px-5 bg-paper">
      <p className="font-body text-sm text-muted">
        Opening… <a href={url} className="underline hover:text-ink">continue</a>
      </p>
    </main>
  )
}
