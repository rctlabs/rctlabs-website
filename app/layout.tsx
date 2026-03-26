import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, JetBrains_Mono, Noto_Sans_Thai, Space_Grotesk, Space_Mono, Kanit } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema"
import { AppProviders } from "@/components/app-providers"
import { Toaster } from "sonner"

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.BING_SITE_VERIFICATION

const verification = googleSiteVerification || bingSiteVerification
  ? {
      google: googleSiteVerification,
      other: bingSiteVerification
        ? {
            "msvalidate.01": bingSiteVerification,
          }
        : undefined,
    }
  : undefined

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

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers()
  const locale = (headerList.get("x-locale") === "th" ? "th" : "en") as "en" | "th"
  const title = locale === "th" ? "RCT Labs - ระบบปฏิบัติการ AI ที่เน้น Intent" : "RCT Labs - Intent Operating System"
  const description = locale === "th"
    ? "โครงสร้างพื้นฐาน Constitutional AI พร้อมสถาปัตยกรรม 10 ชั้น Multi-LLM Consensus และ Data Sovereignty สำหรับงานระดับองค์กร"
    : "Constitutional AI infrastructure with 10-layer architecture, multi-LLM consensus, and data sovereignty for enterprise deployment."

  return {
    metadataBase: new URL("https://rctlabs.co"),
    title,
    description,
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
    alternates: {
      canonical: `https://rctlabs.co/${locale}`,
      languages: {
        en: "https://rctlabs.co/en",
        th: "https://rctlabs.co/th",
        "x-default": "https://rctlabs.co/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      url: `https://rctlabs.co/${locale}`,
      siteName: "RCT Labs",
      title,
      description,
      images: [
        {
          url: `https://rctlabs.co/opengraph-image?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@RCTLabs",
      images: [`https://rctlabs.co/opengraph-image?locale=${locale}`],
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
    verification,
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon-dark-32x32.png",
      apple: "/apple-icon.png",
    },
    manifest: "/site.webmanifest",
    generator: "v0.app",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const locale = (headersList.get('x-locale') || 'en') as 'en' | 'th'

  const organizationSchema = getOrganizationSchema(locale)
  const websiteSchema = getWebSiteSchema(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://rctlabs.co" />
        {/* Preload font for performance */}
        <link rel="preload" as="font" href="/fonts/space-grotesk.woff2" type="font/woff2" crossOrigin="anonymous" />
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
          <Analytics />
          <Toaster richColors position="bottom-right" />
        </AppProviders>
      </body>
    </html>
  )
}
