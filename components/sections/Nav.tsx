'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'The 12-Day Build', href: '/cohort' },
  { label: 'Work', href: '/work' },
  { label: 'Learn', href: '/learn' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
]

const SHEET_HREF = '/#get-sheet'

/*
  Plain CSS transitions, no animation library (motion spec). The free sheet
  button is the one orange thing in the bar, like the REC light. It points at
  the sign-up on the home page, the site's main ask.
*/
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close the menu when the route changes, during render rather than in an
     effect, so there is no extra paint with the menu still open. */
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 right-0 z-[100] transition-[padding,background-color,border-color] duration-300 border-b ${
          scrolled || menuOpen
            ? 'py-3 bg-paper border-ink/10'
            : 'py-5 bg-paper/0 border-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading font-extrabold text-sm tracking-[0.2em] uppercase text-ink shrink-0"
          >
            ROH<span className="text-accent">A</span>N
          </Link>

          <ul className="hidden lg:flex items-center gap-7 ml-auto">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 underline-offset-[6px] decoration-2 decoration-accent ${
                    isActive(link.href) ? 'text-ink underline' : 'text-muted hover:text-ink hover:underline'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={SHEET_HREF}
            className="btn hidden lg:inline-flex items-center gap-2 bg-accent text-paper font-body text-sm font-semibold px-5 py-2.5 rounded-[3px] hover:bg-ink hover:text-paper"
          >
            Get the free sheet <span className="arrow" aria-hidden="true">→</span>
          </Link>

          <button
            className="lg:hidden flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2 font-mono text-xs uppercase tracking-[0.08em] text-ink cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile menu: full screen, fades in with CSS. Kept in the DOM and
          hidden with `invisible` so the transition can run both ways. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[90] bg-paper flex flex-col pt-24 pb-10 lg:hidden overflow-y-auto transition-[opacity,visibility] duration-200 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="wrap flex flex-col flex-1 w-full">
          <ul className="flex flex-col gap-1 flex-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={menuOpen ? undefined : -1}
                  className={`block py-2 display text-5xl ${isActive(link.href) ? 'text-accent' : 'text-ink'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={SHEET_HREF}
            tabIndex={menuOpen ? undefined : -1}
            className="btn mt-10 inline-flex items-center justify-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-4 rounded-[3px] w-full"
          >
            Get the free sheet <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  )
}
