import type { Metadata } from 'next'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import ApplyForm from '@/components/ui/ApplyForm'
import Todo from '@/components/ui/Todo'
import { getCohort } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Apply · The 12-Day Build · Rohan Tiwarekar',
  description: 'Apply for the first cohort of The 12-Day Build. About 10 minutes.',
  robots: { index: false, follow: true },
}

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* Its own page so a visit counts as an apply click, and a saved application
   (Blob, applications/) counts as a submit. */
export default function ApplyPage() {
  const { apply } = getCohort()

  return (
    <main>
      <Nav />
      <section className="wrap pt-32 md:pt-44 pb-[72px] md:pb-[120px]">
        <p className="label rise" style={{ '--i': 0 } as CSSVars}>
          {apply.label}
        </p>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[14ch] text-ink rise" style={{ '--i': 1 } as CSSVars}>
          {apply.title}
        </h1>
        <p className="font-body text-lg md:text-xl text-muted mt-6 max-w-[48ch] leading-relaxed rise" style={{ '--i': 2 } as CSSVars}>
          {apply.sub}
        </p>
        <div className="mt-12 rise" style={{ '--i': 3 } as CSSVars}>
          <ApplyForm
            copy={apply}
            todo={
              apply.task.todo ? (
                <div className="mb-3">
                  <Todo>{apply.task.todo}</Todo>
                </div>
              ) : null
            }
          />
          {apply.done.todo && (
            <div className="mt-6">
              <Todo>after sending: {apply.done.todo}</Todo>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
