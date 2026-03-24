import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, detectLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

/* ─── Simple sliding-window rate limiter for /api/* ────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

/* ─── Internal routes blocked in production ──────────────── */
const INTERNAL_PREFIXES = ['/admin', '/owner', '/monitor', '/analytics', '/test-console', '/websocket']

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Block internal/admin routes in production (no auth system yet)
  if (process.env.NODE_ENV === 'production' || process.env.BLOCK_INTERNAL_ROUTES === 'true') {
    const stripped = pathname.replace(/^\/(en|th)/, '') // handle locale-prefixed paths
    if (INTERNAL_PREFIXES.some((p) => stripped === p || stripped.startsWith(p + '/'))) {
      const url = new URL('/not-found', request.url)
      return NextResponse.rewrite(url)
    }
  }

  // Rate-limit API routes
  if (pathname.startsWith('/api')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'
    if (!checkRateLimit(ip)) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      })
    }
    return NextResponse.next()
  }

  // Skip middleware for static files and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
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
    '/api/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}
