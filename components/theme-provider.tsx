'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Sets both .dark CSS class AND data-theme="dark" attribute
// suppressing the React 19 warning about the inline script next-themes injects for FOUC prevention
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={["class", "data-theme"] as unknown as "class"}
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {/* suppressHydrationWarning on the root prevents the next-themes script-tag React warning */}
      <div suppressHydrationWarning style={{ display: 'contents' }}>
        {children}
      </div>
    </NextThemesProvider>
  )
}
