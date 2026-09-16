'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

/* Pulls its child toward the cursor on hover, springs back on leave.
   Desktop-only by design: touch devices never fire mousemove here, so
   this is naturally inert on phones without extra gating. */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    })
  }, [strength])

  const reset = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}
