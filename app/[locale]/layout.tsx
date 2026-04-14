import type { ReactNode } from "react"

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const resolvedLocale = locale === "th" ? "th" : "en"

  return (
    <div
      className={`locale-shell ${resolvedLocale === "th" ? "locale-shell--th" : "locale-shell--en"}`}
      data-locale={resolvedLocale}
    >
      {children}
    </div>
  )
}