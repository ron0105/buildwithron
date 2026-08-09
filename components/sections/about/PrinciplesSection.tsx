'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function PrinciplesSection() {
  const { t } = useLanguage()

  /* One line per value in ../../FOUNDATION.md. Keep them in the same order. */
  const principles = [
    { id: '01', text: t.belief1 },
    { id: '02', text: t.belief2 },
    { id: '03', text: t.belief3 },
    { id: '04', text: t.belief4 },
    { id: '05', text: t.belief5 },
  ]

  return (
    <section className="py-28 px-6 bg-ink always-dark">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-paper/25 uppercase tracking-widest block mb-20"
        >
          {t.beliefLabel}
        </motion.span>

        <div className="border-t border-paper/10">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
              className="group flex items-center gap-8 border-b border-paper/10 py-8 hover:pl-3 transition-all duration-200 cursor-default"
            >
              <span className="font-body text-xs text-paper/20 tracking-widest shrink-0 w-6">
                {p.id}
              </span>
              <p className="font-heading text-2xl md:text-3xl font-medium text-paper/70 group-hover:text-paper transition-colors duration-200 leading-snug">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
