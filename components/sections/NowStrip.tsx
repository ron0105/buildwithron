import { getNow } from '@/lib/content'
import NowStripView from './NowStripView'

/* Server half: reads content/now.md at build time, hands it to the client
   view so the labels can be translated. */
export default function NowStrip() {
  const now = getNow()
  if (!now) return null

  return <NowStripView now={now} />
}
