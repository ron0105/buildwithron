import { getNotes } from '@/lib/content'
import { SITE } from '@/lib/schema'

/* RSS for the notes, built once at deploy: the notes only change on a push. */
export const dynamic = 'force-static'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function GET() {
  const items = getNotes()
    .map((n) => {
      const t = Date.parse(`1 ${n.date} UTC`)
      const url = `${SITE}/notes/${n.slug}`
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${esc(n.excerpt)}</description>${
        Number.isNaN(t) ? '' : `\n      <pubDate>${new Date(t).toUTCString()}</pubDate>`
      }
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Notes · Rohan Tiwarekar</title>
    <link>${SITE}/notes</link>
    <description>Short, honest writing about how I build. No polish.</description>
    <language>en</language>
    <atom:link href="${SITE}/notes/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
