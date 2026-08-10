'use client'

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.volume = 0
      audioRef.current.play().catch(console.error)
      
      // Subtle fade in
      let vol = 0
      const fadeIn = setInterval(() => {
        vol += 0.05
        if (vol >= 0.3) {
          vol = 0.3
          clearInterval(fadeIn)
        }
        if (audioRef.current) audioRef.current.volume = vol
      }, 50)
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
      {/*
        preload="none": this element is mounted globally in the root layout,
        so without it every page — including /links and /pay, both hand-tuned
        to paint instantly with zero extra requests — eagerly fetched this
        file on load despite having no audio UI at all. Browsers honor
        preload="none" and wait for .play() before requesting anything.
      */}
      <audio
        ref={audioRef}
        src="/audio/rap.mp3"
        preload="none"
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
