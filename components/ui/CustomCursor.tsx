'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Desktop-only, fine-pointer-only. Native cursor stays untouched on touch
   devices and under prefers-reduced-motion — see the .custom-cursor-active
   gate in globals.css, which only applies once this mounts and enables. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"]')
      setHovering(!!target)
      setLabel(target?.getAttribute('data-cursor-label') ?? '')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-ink mix-blend-difference flex items-center justify-center"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hovering ? 48 : 10, height: hovering ? 48 : 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {label && (
        <span className="text-[9px] uppercase tracking-widest text-paper font-body whitespace-nowrap">
          {label}
        </span>
      )}
    </motion.div>
  )
}
