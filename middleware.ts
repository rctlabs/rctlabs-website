import { NextRequest, NextResponse } from "next/server"

const PUBLIC_FILE = /\.(.*)$/
const SUPPORTED_LOCALES = ["en", "th"]
const DEFAULT_LOCALE = "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public files, API routes, _next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale prefix
  const matchedLocale = SUPPORTED_LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (matchedLocale) {
    // Strip the locale prefix and rewrite to the underlying route
    const strippedPathname =
      pathname === `/${matchedLocale}` ? "/" : pathname.replace(`/${matchedLocale}`, "") || "/"

    const url = request.nextUrl.clone()
    url.pathname = strippedPathname

    // Forward x-locale to the rewritten request
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", matchedLocale)

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })

    // Also expose x-locale on the response
    response.headers.set("x-locale", matchedLocale)

    return response
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || ""
  const preferredLocale = acceptLanguage
    .split(",")
    .some((lang) => lang.trim().toLowerCase().startsWith("th"))
    ? "th"
    : DEFAULT_LOCALE

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|api).*)",
  ],
}
