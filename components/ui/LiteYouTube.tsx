'use client'

import { useState } from 'react'

/*
  Thumbnail first, the real player only after a click, so the page does not
  pull YouTube's ~1MB of script on load (Lighthouse target). The iframe is the
  no-cookie domain and autoplays because the click was the play.
*/
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="photo overflow-hidden aspect-video bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="group relative block w-full aspect-video overflow-hidden photo bg-ink cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube already serves a sized jpg; no need to proxy it through the image optimiser */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="btn inline-flex items-center gap-2 bg-accent text-paper font-body text-sm font-semibold px-5 py-3 rounded-[3px] group-hover:bg-paper group-hover:text-ink">
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M0 0 L12 7 L0 14 Z" fill="currentColor" />
          </svg>
          Play
        </span>
      </span>
    </button>
  )
}
