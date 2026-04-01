// Custom lightweight i18n solution for RCT Labs
// No external dependencies - works with Next.js 16 App Router

export type Locale = 'en' | 'th'

export const locales: Locale[] = ['en', 'th']
export const defaultLocale: Locale = 'en'

export interface Translations {
  [key: string]: string | Translations
}

let translations: Record<Locale, Translations> = {
  en: {},
  th: {}
}

// Load translations dynamically
export async function loadTranslations(locale: Locale): Promise<Translations> {
  if (Object.keys(translations[locale]).length > 0) {
    return translations[locale]
  }

  try {
    const messages = await import(`@/messages/${locale}.json`)
    translations[locale] = messages.default
    return translations[locale]
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error)
    return {}
  }
}

// Get nested translation by key path (e.g., "nav.platform")
export function getTranslation(
  translations: Translations,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.')
  let value: string | Translations = translations

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return fallback || key
    }
  }

  return typeof value === 'string' ? value : fallback || key
}

// Translation hook for client components
export function useTranslations(locale: Locale) {
  return (key: string, fallback?: string) => {
    return getTranslation(translations[locale], key, fallback)
  }
}

// Detect locale from Accept-Language header
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())

  for (const lang of languages) {
    if (lang.startsWith('th')) return 'th'
    if (lang.startsWith('en')) return 'en'
  }

  return defaultLocale
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string | null | undefined): Locale | null {
  if (!pathname) return null

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }

  return null
}

export function resolveLocale(pathname: string | null | undefined, fallback: Locale = defaultLocale): Locale {
  if (!pathname) return fallback
  return getLocaleFromPathname(pathname) ?? fallback
}

// Remove locale from pathname
export function removeLocaleFromPathname(pathname: string | null | undefined): string {
  if (!pathname) return '/'

  const locale = getLocaleFromPathname(pathname)
  if (!locale) return pathname

  return pathname.replace(`/${locale}`, '') || '/'
}

// Add locale to pathname
export function addLocaleToPathname(pathname: string | null | undefined, locale: Locale): string {
  const cleanPath = removeLocaleFromPathname(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

export function getLocalePrefix(locale: Locale): `/${Locale}` {
  return locale === 'th' ? '/th' : '/en'
}

export function localizeHref(href: string, locale: Locale): string {
  if (/^(https?:)?\/\//.test(href)) return href
  return `${getLocalePrefix(locale)}${href === '/' ? '' : href}`
}
