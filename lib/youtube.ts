/* The 11-character id out of any YouTube link shape we use. */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|live\/)([\w-]{11})/)
  return m ? m[1] : null
}
