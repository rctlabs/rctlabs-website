'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeProviderProps {
  children: ReactNode
  attribute?: string | string[]
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  forcedTheme?: Theme | ResolvedTheme
  storageKey?: string
}

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme
  forcedTheme?: Theme | ResolvedTheme
  themes: Theme[]
  setTheme: (theme: Theme) => void
}

const DEFAULT_ATTRIBUTES = ['class', 'data-theme']
const STORAGE_KEY = 'theme'
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveThemeValue(theme: Theme | ResolvedTheme, enableSystem: boolean): ResolvedTheme {
  if (theme === 'system' && enableSystem) return getSystemTheme()
  return theme === 'dark' ? 'dark' : 'light'
}

function setDocumentTheme(attributes: string[], resolvedTheme: ResolvedTheme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  attributes.forEach((attribute) => {
    if (attribute === 'class') {
      root.classList.toggle('dark', resolvedTheme === 'dark')
      root.classList.toggle('light', resolvedTheme === 'light')
      return
    }

    root.setAttribute(attribute, resolvedTheme)
  })

  root.style.colorScheme = resolvedTheme
}

function temporarilyDisableTransitions() {
  if (typeof document === 'undefined') return () => {}

  const style = document.createElement('style')
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{transition:none!important;animation:none!important}'
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    window.setTimeout(() => {
      document.head.removeChild(style)
    }, 1)
  }
}

export function ThemeProvider({
  children,
  attribute = DEFAULT_ATTRIBUTES,
  defaultTheme = 'light',
  enableSystem = true,
  disableTransitionOnChange = false,
  forcedTheme,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const attributes = useMemo(
    () => (Array.isArray(attribute) ? attribute : [attribute]),
    [attribute]
  )

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme

    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null
      if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
        return storedTheme
      }
    } catch {
      // Ignore storage failures in privacy-restricted browsers.
    }

    return defaultTheme
  })
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme())

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (forcedTheme) {
      return resolveThemeValue(forcedTheme, enableSystem)
    }

    return resolveThemeValue(theme, enableSystem)
  }, [enableSystem, forcedTheme, theme])

  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [enableSystem])

  useEffect(() => {
    const effectiveTheme = forcedTheme ?? theme
    const cleanup = disableTransitionOnChange ? temporarilyDisableTransitions() : () => {}
    setDocumentTheme(attributes, resolveThemeValue(effectiveTheme, enableSystem))
    cleanup()
  }, [attributes, disableTransitionOnChange, enableSystem, forcedTheme, theme])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      const nextTheme = event.newValue as Theme | null
      if (nextTheme === 'light' || nextTheme === 'dark' || nextTheme === 'system') {
        setThemeState(nextTheme)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storageKey])

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)
      try {
        window.localStorage.setItem(storageKey, nextTheme)
      } catch {
        // Ignore storage failures in privacy-restricted browsers.
      }
    },
    [storageKey]
  )

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      forcedTheme,
      themes: ['light', 'dark', 'system'],
      setTheme,
    }),
    [forcedTheme, resolvedTheme, setTheme, systemTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}

