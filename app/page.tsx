import fs from 'fs'
import path from 'path'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import HomeHero from '@/components/sections/home/HomeHero'
import HomeSheet from '@/components/sections/home/HomeSheet'
import HomeLatest from '@/components/sections/home/HomeLatest'
import HomeWork from '@/components/sections/home/HomeWork'
import HomeCrew from '@/components/sections/home/HomeCrew'
import HomeNow from '@/components/sections/home/HomeNow'
import { getEpisodes, getHome, getNotes, getNowSections } from '@/lib/content'

/* One main ask per screen: the free sheet straight after the hero, proof
   (latest, work) in the middle, the crew as the big ask near the end. */
export default function Home() {
  const copy = getHome()
  const episode = getEpisodes().find((e) => e.status === 'aired') ?? null
  const hasSheet = fs.existsSync(path.join(process.cwd(), 'public', copy.sheet.file))

  return (
    <main>
      <Nav />
      <HomeHero copy={copy.hero} />
      <HomeSheet copy={copy.sheet} hasFile={hasSheet} />
      <HomeLatest copy={copy.latest} episode={episode} notes={getNotes()} />
      <HomeWork copy={copy.work} />
      <HomeCrew copy={copy.crew} />
      <HomeNow
        copy={copy.now}
        lines={getNowSections().find((s) => s.title === 'Building')?.items ?? []}
      />
      <Footer newsletter={false} />
    </main>
  )
}
