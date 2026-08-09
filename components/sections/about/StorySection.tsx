'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function StorySection() {
  const { t } = useLanguage()

  const blocks = [
    { label: t.storyLabel1, content: [t.story1a, t.story1b, t.story1c] },
    { label: t.storyLabel2, content: [t.story2a, t.story2b, t.story2c] },
    { label: t.storyLabel3, content: [t.story3a, t.story3b, t.story3c] },
  ]

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {blocks.map((block, blockIndex) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: blockIndex * 0.08, ease: 'easeOut' }}
            >
              <span className="font-body text-xs text-muted uppercase tracking-widest block mb-8">
                {block.label}
              </span>
              <div className="space-y-6">
                {block.content.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-base md:text-lg text-ink/75 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
