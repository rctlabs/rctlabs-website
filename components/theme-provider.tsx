'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Sets both .dark CSS class AND data-theme="dark" attribute
// so both next-themes components and manus-migrated components work
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"] as unknown as "class"}
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
