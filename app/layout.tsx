import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_Thai, Space_Grotesk, Space_Mono, Kanit } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema"
import { FloatingAI } from "@/components/floating-ai"
import { AppProviders } from "@/components/app-providers"
import { Toaster } from "sonner"

/* Display: Space Grotesk (headings) */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

/* Body: Inter */
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

/* Mono: Space Mono */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
})

/* Backward-compat mono */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-alt",
  display: "swap",
})

/* Thai: Kanit (matches Space Grotesk geometric style) */
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
})

/* Thai fallback: Noto Sans Thai */
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai-fallback",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rctlabs.co"),
  title: "RCT Labs - Intent Operating System",
  description:
    "Revolutionizing human-AI interaction through intent-driven design. Explore cutting-edge philosophy, research, and open protocols.",
  keywords: [
    "intent-driven AI",
    "AI alignment",
    "machine learning",
    "intent operating system",
    "FDIA formula",
    "research",
    "constitutional AI",
    "multi-LLM consensus",
    "AI verification",
    "SignedAI",
    "JITNA language",
    "RCT-7 process",
  ],
  authors: [{ name: "RCT Labs" }, { name: "Ittirit Saengow" }],
  creator: "RCT Labs",
  publisher: "RCT Labs",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["th_TH"],
    url: "https://rctlabs.co",
    siteName: "RCT Labs",
    title: "RCT Labs - Intent Operating System",
    description:
      "Constitutional AI Operating System — 10-Layer architecture, multi-LLM consensus, and absolute data sovereignty.",
    images: [
      {
        url: "https://rctlabs.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RCT Labs - Intent Operating System",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCT Labs - Intent Operating System",
    description: "Revolutionizing human-AI interaction through intent-driven design.",
    creator: "@RCTLabs",
    images: ["https://rctlabs.co/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
    generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const locale = (headersList.get('x-locale') || 'en') as 'en' | 'th'

  const organizationSchema = getOrganizationSchema(locale)
  const websiteSchema = getWebSiteSchema(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        <link rel="canonical" href={`https://rctlabs.co/${locale}`} />
        {/* Hreflang tags for bilingual SEO */}
        <link rel="alternate" hrefLang="en" href="https://rctlabs.co/en" />
        <link rel="alternate" hrefLang="th" href="https://rctlabs.co/th" />
        <link rel="alternate" hrefLang="x-default" href="https://rctlabs.co/en" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://rctlabs.co" />
        {/* Fonts are loaded via next/font/google — no manual preload needed */}
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${jetbrainsMono.variable} ${kanit.variable} ${notoSansThai.variable} font-sans antialiased`}>
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-warm-amber text-white px-4 py-2 rounded">Skip to content</a>
        <AppProviders initialLocale={locale as "en" | "th"}>
          {children}
          <FloatingAI />
          <Toaster richColors position="bottom-right" />
          <Analytics />
        </AppProviders>
      </body>
    </html>
  )
}
