import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rohan Tiwarekar · Building in public'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
        <div style={{ display: 'flex', width: 120, height: 8, backgroundColor: '#C2410C' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, color: '#F7F6F3', letterSpacing: -2 }}>
            Rohan Tiwarekar<span style={{ color: '#C2410C' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#A9B0C0', marginTop: 24 }}>
            I build things and figure it out in public
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#7D869B', letterSpacing: 4 }}>
          BUILDWITHRON.COM
        </div>
      </div>
    ),
    { ...size }
  )
}
