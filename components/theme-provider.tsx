'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Sets both .dark CSS class AND data-theme="dark" attribute
// Note: next-themes injects a <script> tag for FOUC prevention — this is expected behavior
// and the React 19 console warning about it is a known library-level cosmetic warning.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"] as unknown as "class"}
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

