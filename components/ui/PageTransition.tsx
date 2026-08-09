'use client'

import { usePathname } from 'next/navigation'

/*
  Wraps every page in the root layout, which makes it the gate on first paint
  for the whole site. It used to be a framer-motion div mounting at opacity:0,
  so no page showed anything until React had hydrated: /links measured a 1640ms
  first contentful paint against a 9ms TTFB, with the markup already delivered
  and simply held invisible.

  Same 200ms fade, expressed in CSS (see globals.css). It now starts when the
  browser paints instead of when the bundle finishes, and it costs the page no
  JavaScript at all.

  `key` still remounts the element on navigation, which is what replays the
  animation between routes.
*/
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  )
}
