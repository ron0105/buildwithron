import ReactMarkdown from 'react-markdown'

/* Markdown for notes and episode write-ups. Sized for reading: ~19px Inter,
   1.7 line height, and the parent caps the line at about 68 characters. */
export default function Prose({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-ink mt-14 mb-5">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-heading font-bold text-xl md:text-2xl text-ink mt-10 mb-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="font-body text-[18px] md:text-[19px] text-ink/85 leading-[1.7] mb-6">{children}</p>
        ),
        strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="mb-6 flex flex-col gap-2">{children}</ul>,
        ol: ({ children }) => (
          <ol className="mb-6 list-decimal pl-6 flex flex-col gap-2 marker:font-mono marker:text-sm marker:text-muted">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="font-body text-[18px] md:text-[19px] text-ink/85 leading-[1.7] pl-1">{children}</li>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-accent pl-6 my-10 [&_p]:font-heading [&_p]:font-bold [&_p]:text-2xl [&_p]:leading-snug [&_p]:text-ink">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
