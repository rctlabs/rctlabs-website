import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Space_Grotesk, Space_Mono, Kanit } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema"
import { AppProviders } from "@/components/app-providers"
import { Toaster } from "sonner"
import { SITE_OG_IMAGE, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config"
import HeroAnimatedBackground from "@/components/ui/hero-animated-background"

const themeBootstrapScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'dark' || stored === 'light' ? stored : system;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  } catch {}
})();`

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.BING_SITE_VERIFICATION
const enableVercelRuntimeInsights = process.env.VERCEL === "1"

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

/* Thai: Kanit (matches Space Grotesk geometric style) */
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
  variable: "--rct-font-thai",
  display: "swap",
})

/** Resolve locale once and reuse across both generateMetadata and RootLayout */
async function getLocale(): Promise<"en" | "th"> {
  const headerList = await headers()
  return (headerList.get("x-locale") === "th" ? "th" : "en") as "en" | "th"
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()

  const title =
    locale === "th"
      ? "RCT Labs - ระบบปฏิบัติการ AI ที่เน้น Intent"
      : "RCT Labs - Intent-Driven AI Operating System"

  const description =
    locale === "th"
      ? "โครงสร้างพื้นฐาน Constitutional AI พร้อมสถาปัตยกรรม 10 ชั้น Multi-LLM Consensus และ Data Sovereignty สำหรับงานระดับองค์กร"
      : "Constitutional AI infrastructure with 10-layer architecture, multi-LLM consensus, and data sovereignty for enterprise deployment."

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | RCT Labs",
    },
    description,
    keywords: [
      "intent-driven AI",
      "AI alignment",
      "constitutional AI",
      "intent operating system",
      "FDIA formula",
      "JITNA protocol",
      "multi-LLM consensus",
      "AI verification",
      "SignedAI",
      "RCT-7 process",
      "deterministic AI",
      "enterprise AI governance",
      "AI hallucination prevention",
    ],
    authors: [{ name: "Ittirit Saengow", url: `${SITE_URL}/authors/ittirit-saengow` }],
    creator: "Ittirit Saengow",
    publisher: "RCT Labs",
    formatDetection: {
      email: false,
      telephone: false,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        th: `${SITE_URL}/th`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      url: `${SITE_URL}/${locale}`,
      siteName: "RCT Labs",
      title,
      description,
      images: [
        {
          url: `${SITE_OG_IMAGE}?locale=${locale}`,
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
      creator: SOCIAL_LINKS.twitterHandle,
      site: SOCIAL_LINKS.twitterHandle,
      images: [`${SITE_OG_IMAGE}?locale=${locale}`],
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
    manifest: "/manifest.webmanifest",
    // Note: generator field removed — do not expose internal tooling
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  const organizationSchema = getOrganizationSchema(locale)
  const websiteSchema = getWebSiteSchema(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* Preconnect to image CDN for faster LCP */}
        <link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
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
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${kanit.variable} font-sans antialiased`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-warm-amber focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AppProviders initialLocale={locale}>
          {/* Global animated background — position:fixed, z-[1], mounts once, GPU-composited only */}
          <HeroAnimatedBackground variant="global" />
          <div id="main-content" className="relative z-10" tabIndex={-1}>
            {children}
          </div>
          {enableVercelRuntimeInsights ? <Analytics /> : null}
          {enableVercelRuntimeInsights ? <SpeedInsights /> : null}
          <Toaster richColors position="bottom-right" />
        </AppProviders>
      </body>
    </html>
  )
}