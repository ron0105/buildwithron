'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { experiments } from '@/lib/data'
import { useLanguage } from '@/context/LanguageContext'
import type { Dict } from '@/lib/i18n'

/* Colours are static; only the label needs the dictionary. */
const statusConfig = {
  active: {
    labelKey: 'statusActive' as const,
    dot: 'bg-accent animate-pulse',
    text: 'text-accent',
    bg: 'bg-accent/8',
  },
  exploring: {
    labelKey: 'statusInProgress' as const,
    dot: 'bg-amber-400',
    text: 'text-amber-600',
    bg: 'bg-amber-400/10',
  },
  shipped: {
    labelKey: 'statusLive' as const,
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
}

function statusLabel(t: Dict, status: keyof typeof statusConfig) {
  return t[statusConfig[status].labelKey]
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof experiments)[0]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const status = statusConfig[project.status]
  const copy = t.projects[project.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className={`border border-border transition-colors duration-200 ${open ? 'border-ink/20' : 'hover:border-ink/20'}`}
    >
      {/* Card header : always visible, always clickable */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-7 md:p-8 cursor-pointer group"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left: number + title + tags */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-xs text-muted/40 tracking-widest tabular-nums">
                {project.id}
              </span>
              {/* Status pill */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-body ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {statusLabel(t, project.status)}
              </span>
            </div>

            <h3 className={`font-heading text-2xl md:text-3xl font-bold leading-snug mb-2 transition-colors duration-200 ${open ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
              {project.title}
            </h3>

            <p className="font-body text-base text-muted leading-relaxed max-w-xl">
              {copy.teaser}
            </p>
          </div>

          {/* Right: tags + expand icon */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xl leading-none transition-colors duration-200 ${open ? 'text-accent' : 'text-muted group-hover:text-ink'}`}
            >
              +
            </motion.span>
            <div className="hidden md:flex flex-wrap gap-1.5 justify-end mt-1">
              {copy.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs text-muted/50 border border-border px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded story */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border mx-7 md:mx-8" />
            <div className="p-7 md:p-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <span className="font-body text-xs text-muted uppercase tracking-widest block mb-3">
                    {t.projWhy}
                  </span>
                  <p className="font-body text-base text-ink/75 leading-relaxed">
                    {copy.why}
                  </p>
                </div>
                <div>
                  <span className="font-body text-xs text-muted uppercase tracking-widest block mb-3">
                    {t.projWhat}
                  </span>
                  <p className="font-body text-base text-ink/75 leading-relaxed">
                    {copy.what}
                  </p>
                </div>
                <div>
                  <span className="font-body text-xs text-muted uppercase tracking-widest block mb-3">
                    {t.projHappened}
                  </span>
                  <p className="font-body text-base text-ink/75 leading-relaxed">
                    {copy.learned}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex flex-wrap gap-1.5 md:hidden">
                  {copy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs text-muted/50 border border-border px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-body text-xs text-muted/40">{project.year}</span>
                {project.href && project.href !== '#' && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 font-body text-xs text-muted hover:text-accent transition-colors duration-200 group/link"
                  >
                    {t.projView}
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ProjectGrid() {
  return (
    <section className="py-20 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3">
          {experiments.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
