import fs from 'fs'
import path from 'path'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import HomeHero from '@/components/sections/home/HomeHero'
import HomeWork from '@/components/sections/home/HomeWork'
import HomeLatest from '@/components/sections/home/HomeLatest'
import HomeCohort from '@/components/sections/home/HomeCohort'
import HomeBusiness from '@/components/sections/home/HomeBusiness'
import HomeSheet from '@/components/sections/home/HomeSheet'
import { getEpisodes, getHome, getNotes } from '@/lib/content'
import JsonLd from '@/components/ui/JsonLd'
import { person } from '@/lib/schema'

/* One ask per section. The free sheet opens and closes the page (the main
   action for the next 6 months), proof and the latest work build trust in
   between, then The 12-Day Build is the one paid step. Business owners get a
   single quiet line. "Now" lives on /now only (Rohan, Nov 2). */
export default function Home() {
  const copy = getHome()
  const episode = getEpisodes().find((e) => e.status === 'aired') ?? null
  const hasSheet = fs.existsSync(path.join(process.cwd(), 'public', copy.sheet.file))
  const sheet = hasSheet
    ? { href: copy.sheet.file, label: copy.sheet.fileLabel, next: copy.sheet.next }
    : null

  return (
    <main>
      <JsonLd data={person} />
      <Nav />
      <HomeHero copy={copy.hero} sheet={sheet} />
      <HomeWork copy={copy.proof} />
      <HomeLatest copy={copy.latest} episode={episode} notes={getNotes()} />
      <HomeCohort copy={copy.cohort} />
      <HomeBusiness copy={copy.business} />
      <HomeSheet copy={copy.final} sheet={sheet} />
      <Footer newsletter={false} />
    </main>
  )
}
