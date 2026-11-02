'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/*
  Scroll reveals for anything marked data-reveal (motion spec M4, M5).

  One observer for the whole site instead of a wrapper per element, so pages
  stay server components and the markup stays plain. It only arms elements
  that start below the fold, after the page has loaded: anything already on
  screen is left alone, so first paint never waits on JavaScript and nothing
  visible ever blinks out. Reveals run once.
*/
export default function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )

    const arm = () => {
      const fold = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.reveal-armed)').forEach((el) => {
        if (el.getBoundingClientRect().top < fold) return
        el.classList.add('reveal-armed')
        observer.observe(el)
      })
    }

    /* Wait a frame so the new route's markup is in place after navigation. */
    const frame = requestAnimationFrame(arm)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
