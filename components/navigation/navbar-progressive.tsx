"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getLocalePrefix } from "@/lib/i18n"

const FullNavbar = dynamic(() => import("@/components/navbar").then((module) => module.Navbar), {
  ssr: false,
  loading: () => null,
})

type NavbarProgressiveProps = {
  locale: "en" | "th"
  variant?: "default" | "article"
}

function NavbarShell({ locale }: { locale: "en" | "th" }) {
  const localePrefix = getLocalePrefix(locale)

  return (
    <header role="banner" aria-label="Main navigation shell">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-transparent" aria-label="Main navigation">
        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <div className="relative z-10 flex h-14 items-center justify-between gap-4">
            <Link href={`${localePrefix}/`} className="flex shrink-0 items-center gap-2" aria-label="RCT Ecosystem Home">
              <Image src="/RCTicon-lightVer.svg" alt="RCT" width={32} height={32} className="h-8 w-8 object-contain dark:hidden" />
              <Image src="/RCTicon.svg" alt="RCT" width={32} height={32} className="hidden h-8 w-8 object-contain dark:block" />
              <span className="hidden text-sm font-semibold tracking-tight leading-none text-neutral-900 sm:inline-block dark:text-white">RCT Labs</span>
            </Link>

            <div className="hidden items-center gap-5 lg:flex">
              <Link href={`${localePrefix}/solutions`} className="text-[13px] font-medium text-warm-gray hover:text-warm-charcoal dark:text-warm-light-gray/85 dark:hover:text-white">Solutions</Link>
              <Link href={`${localePrefix}/technology`} className="text-[13px] font-medium text-warm-gray hover:text-warm-charcoal dark:text-warm-light-gray/85 dark:hover:text-white">Technology</Link>
              <Link href={`${localePrefix}/docs`} className="text-[13px] font-medium text-warm-gray hover:text-warm-charcoal dark:text-warm-light-gray/85 dark:hover:text-white">Docs</Link>
            </div>

            <div className="h-9 w-9 rounded-full border border-[#e6ddd0] bg-white/82 dark:border-border dark:bg-card/70" aria-hidden="true" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export function NavbarProgressive({ locale, variant = "default" }: NavbarProgressiveProps) {
  const [activated, setActivated] = useState(false)
  const activatedRef = useRef(false)

  useEffect(() => {
    if (activatedRef.current) return

    const activate = () => {
      if (activatedRef.current) return
      activatedRef.current = true
      setActivated(true)
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
      window.removeEventListener("mousemove", activate)
      window.removeEventListener("scroll", activate)
    }

    const timeout = window.setTimeout(activate, 1400)

    window.addEventListener("pointerdown", activate, { passive: true })
    window.addEventListener("keydown", activate)
    window.addEventListener("touchstart", activate, { passive: true })
    window.addEventListener("mousemove", activate, { passive: true })
    window.addEventListener("scroll", activate, { passive: true })

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
      window.removeEventListener("touchstart", activate)
      window.removeEventListener("mousemove", activate)
      window.removeEventListener("scroll", activate)
    }
  }, [])

  if (!activated) {
    return <NavbarShell locale={locale} />
  }

  return <FullNavbar locale={locale} variant={variant} />
}