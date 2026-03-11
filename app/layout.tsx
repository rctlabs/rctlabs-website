import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_Thai } from "next/font/google"
import "./globals.css"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap",
})

export const metadata: Metadata = {
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
        url: "https://rctlabs.co/og-image.png",
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
    images: ["https://rctlabs.co/og-image.png"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="dark light" />
        <link rel="canonical" href={`https://rctlabs.co/${locale}`} />
        {/* Hreflang tags for bilingual SEO */}
        <link rel="alternate" hrefLang="en" href="https://rctlabs.co/en" />
        <link rel="alternate" hrefLang="th" href="https://rctlabs.co/th" />
        <link rel="alternate" hrefLang="x-default" href="https://rctlabs.co/en" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://rctlabs.co" />
        
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansThai.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
