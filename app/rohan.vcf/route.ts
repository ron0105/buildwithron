import { vcardText } from '@/lib/vcard'

export async function GET() {
  return new Response(vcardText(), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="rohan-tiwarekar.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
