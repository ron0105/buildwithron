import type { Metadata } from 'next'
import ComingHome from '@/components/ui/ComingHome'

/* Hidden on purpose: not in the nav, not in the sitemap, not indexed.
   Only the person with the link should ever land here. */
export const metadata: Metadata = {
  title: 'Hey you',
  robots: { index: false, follow: false },
}

export default function ComingHomePage() {
  return <ComingHome />
}
