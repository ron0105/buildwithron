'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

/*
  Wraps every page in the root layout, which makes it the gate on first paint
  for the whole site. It used to be a framer-motion div mounting at opacity:0,
  so no page showed anything until React had hydrated: /links measured a 1640ms
  first contentful paint against a 9ms TTFB, with the markup already delivered
  and simply held invisible.

  Same 150ms fade, expressed in CSS (see globals.css), and only between pages.
  On the first load the page paints as-is: fading the whole page in from
  opacity 0 made Lighthouse report no paint at all on text-only pages (every
  /notes page failed with NO_FCP).

  `key` still remounts the element on navigation, which is what replays the
  animation between routes.
*/
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [firstPath] = useState(pathname)

  return (
    <div key={pathname} className={pathname === firstPath ? undefined : 'page-fade-in'}>
      {children}
    </div>
  )
}
