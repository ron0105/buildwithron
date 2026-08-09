'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface Props {
  value: string
}

/*
  The fallback path matters here. navigator.clipboard is gated on a secure
  context and, on some in-app browsers, on a permission that quietly rejects.
  A payment ID that silently fails to copy is worse than no button, so the ID
  is always selectable text and the button is an accelerator, not the only way.
*/
export default function CopyField({ value }: Props) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Leave the state alone: the user can still select the text by hand. */
    }
  }

  return (
    <div className="flex items-stretch border border-border rounded-lg overflow-hidden">
      <code className="flex-1 font-body text-base text-ink px-4 py-3 select-all break-all">
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={`${t.payCopy} ${value}`}
        className="shrink-0 px-4 border-l border-border font-body text-sm text-muted hover:text-ink hover:bg-paper-dark transition-colors duration-200"
      >
        {copied ? t.payCopied : t.payCopy}
      </button>
    </div>
  )
}
