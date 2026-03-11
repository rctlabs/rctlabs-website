import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, detectLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) as Locale | undefined

  if (pathnameLocale) {
    // Strip locale prefix and rewrite to the original page path
    // e.g. /en/about → /about, /th → /
    const pathnameWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/'
    const url = new URL(pathnameWithoutLocale, request.url)

    const response = NextResponse.rewrite(url)
    response.headers.set('x-locale', pathnameLocale)
    return response
  }

  // No locale prefix detected → redirect to add one based on Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  const locale = detectLocale(acceptLanguage)

  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
