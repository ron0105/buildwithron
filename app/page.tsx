import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import HubTiles from '@/components/sections/HubTiles'
import NowStrip from '@/components/sections/NowStrip'
import Experiments from '@/components/sections/Experiments'
import Thinking from '@/components/sections/Thinking'
import JoinList from '@/components/sections/JoinList'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HubTiles />
      <NowStrip />
      <Experiments />
      <Thinking />
      <JoinList />
      <Footer />
    </main>
  )
}
