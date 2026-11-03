import { ImageResponse } from 'next/og'
import { getCohort } from '@/lib/content'

export const alt = 'The 12-Day Build · Rohan Tiwarekar'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* The share card for /cohort, the page most likely to be sent around on
   WhatsApp. Title and facts come from content/cohort.md, so they never
   drift from the page. */
export default function Image() {
  const { hero } = getCohort()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#14213D',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, color: '#C2410C', letterSpacing: 6 }}>
          {hero.label.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#F7F6F3', letterSpacing: -2, lineHeight: 1.05 }}>
            {hero.title}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
            {hero.facts.map((f) => (
              <div
                key={f}
                style={{ display: 'flex', fontSize: 36, fontWeight: 700, color: '#F7F6F3', border: '2px solid #F7F6F3', borderRadius: 4, padding: '8px 20px' }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#7D869B', letterSpacing: 4 }}>
          BUILDWITHRON.COM/COHORT
        </div>
      </div>
    ),
    { ...size }
  )
}
