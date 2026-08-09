'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function HubTiles() {
  const { t } = useLanguage()

  /* Titles 01 and 02 are proper nouns and stay in Latin script everywhere. */
  const tiles = [
    {
      id: '01',
      label: t.hub1Label,
      title: 'The Adda Labs',
      descriptor: t.hub1Desc,
      href: '/work',
      external: false,
    },
    {
      id: '02',
      label: t.hub2Label,
      title: 'Learn With Ron',
      descriptor: t.hub2Desc,
      href: '/learn',
      external: false,
    },
    {
      id: '03',
      label: t.hub3Label,
      title: t.hub3Title,
      descriptor: t.hub3Desc,
      href: 'https://www.instagram.com/build.with.ron/',
      external: true,
    },
  ]

  return (
    <section className="bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-2 sm:pb-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted/50 uppercase tracking-[0.2em]"
        >
          {t.hubLabel}
        </motion.span>
      </div>

      {/* Tile grid — gap-px on ink bg creates 1px dividers */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-border gap-px border border-border mt-8 sm:mt-10">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
            >
              <Link
                href={tile.href}
                target={tile.external ? '_blank' : undefined}
                rel={tile.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col justify-between min-h-[260px] sm:min-h-[300px] p-8 sm:p-10 bg-paper hover:bg-ink transition-colors duration-300 cursor-pointer"
              >
                {/* Top: label + id */}
                <div className="flex items-start justify-between">
                  <span className="font-body text-[10px] uppercase tracking-widest text-muted/50 group-hover:text-paper/40 transition-colors duration-300">
                    {tile.label}
                  </span>
                  <span className="font-body text-[10px] tabular-nums text-muted/30 group-hover:text-paper/20 transition-colors duration-300">
                    {tile.id}
                  </span>
                </div>

                {/* Bottom: title + descriptor + arrow */}
                <div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-bold text-ink group-hover:text-paper transition-colors duration-300 leading-tight mb-3">
                    {tile.title}
                  </h3>
                  <p className="font-body text-sm text-muted group-hover:text-paper/50 transition-colors duration-300 leading-relaxed mb-6">
                    {tile.descriptor}
                  </p>
                  <span className="font-body text-sm text-muted/50 group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    {t.hubExplore}
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
