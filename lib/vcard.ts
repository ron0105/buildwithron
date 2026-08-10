import { readFileSync } from 'fs'
import path from 'path'

/*
  Single source of truth for the "save my contact" card, same shape as
  lib/pay.ts. Change a value here and the .vcf route picks it up, no second
  copy to forget about.

  No phone number, job title, or URL by design — this ships name, email, and
  photo only.
*/
export const contact = {
  firstName: 'Rohan',
  lastName: 'Tiwarekar',
  email: 'rohan0105@gmail.com',
  photoPath: path.join(process.cwd(), 'public', 'rohan-contact.jpg'),
} as const

/*
  RFC 6350 caps an unfolded vCard line at 75 octets; longer lines must fold
  onto continuation lines that start with a single space, or some contact
  apps truncate or garble the field. The base64 photo body is the only field
  here long enough to hit that limit.
*/
function foldLine(line: string): string {
  if (line.length <= 75) return line
  const chunks = [line.slice(0, 75)]
  let rest = line.slice(75)
  while (rest.length > 0) {
    chunks.push(' ' + rest.slice(0, 74))
    rest = rest.slice(74)
  }
  return chunks.join('\r\n')
}

export function vcardText(): string {
  const photoBase64 = readFileSync(contact.photoPath).toString('base64')
  const fullName = `${contact.firstName} ${contact.lastName}`

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${fullName}`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    foldLine(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`),
    'END:VCARD',
  ]

  return lines.join('\r\n') + '\r\n'
}
