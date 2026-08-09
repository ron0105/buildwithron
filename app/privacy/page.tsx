import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Privacy · Rohan Tiwarekar',
  description: 'What I collect when you join the list, why, and how to get it removed.',
}

/*
  LAWYER-REVIEW DRAFT. Master CLAUDE.md Part 11 requires a real review before
  this is treated as final. Written against India's DPDP Act 2023 for the only
  personal data this site collects: an email address, given with consent, for
  one purpose.

  Deliberately in English only. Translating a legal notice risks changing what
  it means, so the switcher does not apply here and the page says so.
*/
export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      <section className="px-5 sm:px-6 pt-28 sm:pt-40 pb-20 bg-paper">
        <div className="max-w-2xl mx-auto">
          <span className="font-body text-xs text-muted uppercase tracking-widest block mb-8">
            Privacy
          </span>
          <h1 className="font-heading font-bold text-[clamp(2.2rem,7vw,4rem)] leading-[1.05] tracking-tight text-ink">
            What I do with your email<span className="text-accent">.</span>
          </h1>

          <div className="mt-12 space-y-10 font-body text-base sm:text-lg text-ink/75 leading-relaxed">
            <p className="text-ink/50 text-sm">
              Last updated 9 August 2026. This page is in English only, because
              translating a legal notice risks changing what it means.
            </p>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                What I collect
              </h2>
              <p>
                Your email address, and only if you type it into the form and tick
                the consent box yourself. Nothing else. I do not ask for your name,
                your company, or anything about you.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                Why I collect it
              </h2>
              <p>
                To email you when I write something. That is the only purpose. I
                will not use it to sell you anything on someone else&apos;s behalf,
                and I will not use it for a different purpose without asking you
                again.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                Who else can see it
              </h2>
              <p>
                Kit (formerly ConvertKit) stores the list and sends the emails.
                They process your address on my instructions and nothing more.
                Their servers are outside India, so your address is stored abroad.
                I do not sell, rent, or share it with anyone else.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                How long I keep it
              </h2>
              <p>
                Until you unsubscribe. When you do, your address is removed from
                the active list. A minimal record that you unsubscribed is kept so
                that I do not accidentally add you again.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                What you can ask me to do
              </h2>
              <p>
                Under India&apos;s Digital Personal Data Protection Act 2023 you can
                ask me to show you what I hold, correct it, or delete it. You can
                withdraw your consent at any time, and withdrawing it is as easy as
                giving it: use the unsubscribe link in any email, or write to me.
                Withdrawing consent does not undo emails already sent.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                Cookies and tracking
              </h2>
              <p>
                This site uses Vercel Analytics, which counts page views without
                cookies and without building a profile of you. Your language and
                light or dark mode preference are stored in your own browser and
                never sent to me.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                Who to contact
              </h2>
              <p>
                Me, directly. Rohan Tiwarekar, Mumbai, India.{' '}
                <a
                  href="mailto:rohan0105@gmail.com"
                  className="text-ink underline underline-offset-2 hover:text-accent transition-colors duration-200"
                >
                  rohan0105@gmail.com
                </a>
                . I read everything and reply to most things. If you are not happy
                with how I handled a request, you can raise it with the Data
                Protection Board of India.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink mb-3">
                If this changes
              </h2>
              <p>
                I will update this page and change the date at the top. If the
                change affects what I do with data you have already given me, I
                will email you before it takes effect.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
