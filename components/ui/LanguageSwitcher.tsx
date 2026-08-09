'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { locales, localeNames, localeShort } from '@/lib/i18n'

/*
  Two shapes, same state.
  'nav'  — collapsed button plus dropdown, for the desktop bar.
  'menu' — flat row of options, for the mobile overlay where a dropdown inside
           a fixed full-screen panel is more trouble than it is worth.
*/
export default function LanguageSwitcher({ variant = 'nav' }: { variant?: 'nav' | 'menu' }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (variant === 'menu') {
    return (
      <div>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted block mb-3">
          {t.langLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {locales.map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-current={code === lang}
              className={`font-body text-sm px-4 py-2.5 border transition-colors duration-200 cursor-pointer ${
                code === lang
                  ? 'border-ink bg-ink text-paper'
                  : 'border-border text-muted hover:text-ink hover:border-ink/40'
              }`}
            >
              {localeNames[code]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.langLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="font-body text-[11px] uppercase tracking-[0.2em] text-muted/60 hover:text-ink transition-colors duration-300 cursor-pointer"
      >
        {localeShort[lang]}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-4 min-w-[9rem] bg-paper border border-border shadow-lg py-1 z-[110]"
          >
            {locales.map((code) => (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={code === lang}
                  onClick={() => {
                    setLang(code)
                    setOpen(false)
                  }}
                  className={`w-full text-left font-body text-sm px-4 py-2.5 transition-colors duration-200 cursor-pointer ${
                    code === lang ? 'text-ink font-medium' : 'text-muted hover:text-ink hover:bg-paper-dark/40'
                  }`}
                >
                  {localeNames[code]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
