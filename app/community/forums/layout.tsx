import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
}

export default function ForumsLayout({ children }: { children: React.ReactNode }) {
  return children
}
