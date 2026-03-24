import { Metadata } from "next"
import { siteConfig } from "./seo"

export type Locale = "en" | "th"

export const baseKeywords: Record<Locale, string[]> = {
  en: [
    "constitutional AI",
    "multi-LLM consensus",
    "AI verification",
    "SignedAI",
    "intent-driven AI",
    "AI operating system",
    "JITNA protocol",
    "RCTDB",
    "enterprise AI platform",
    "10-layer architecture",
    "AI hallucination prevention",
    "Thailand AI",
    "RCT Labs",
    "AI infrastructure",
    "data sovereignty",
    "AI compliance",
    "PDPA AI",
    "production algorithms",
    "41 algorithms",
    "99.98% uptime"
  ],
  th: [
    "ปัญญาประดิษฐ์แบบรัฐธรรมนูญ",
    "ระบบ AI ตรวจสอบได้",
    "AI ระดับองค์กร",
    "แพลตฟอร์ม AI ไทย",
    "ระบบปฏิบัติการ AI",
    "AI สำหรับธุรกิจ",
    "AI อัตราการหลอนต่ำ",
    "AI ที่ปลอดภัย",
    "SignedAI",
    "JITNA",
    "RCTDB",
    "RCT Labs",
    "Constitutional AI",
    "Multi-LLM",
    "Enterprise AI",
    "Data Sovereignty",
    "PDPA",
    "AI ประเทศไทย",
    "41 อัลกอริทึม",
    "10 ชั้นสถาปัตยกรรม"
  ]
}

export const createBilingualMetadata = (
  locale: Locale,
  titleEN: string,
  titleTH: string,
  descEN: string,
  descTH: string,
  path: string,
  additionalKeywords?: string[]
): Metadata => {
  const title = locale === "th" ? titleTH : titleEN
  const description = locale === "th" ? descTH : descEN
  const keywords = [
    ...baseKeywords[locale],
    ...(additionalKeywords || [])
  ]

  return {
    title: `${title} | RCT Labs`,
    description,
    keywords,
    alternates: {
      canonical: `https://rctlabs.co/${locale}${path}`,
      languages: {
        "en": `https://rctlabs.co/en${path}`,
        "th": `https://rctlabs.co/th${path}`,
        "x-default": `https://rctlabs.co/en${path}`,
      }
    },
    openGraph: {
      title: `${title} | RCT Labs`,
      description,
      url: `https://rctlabs.co/${locale}${path}`,
      siteName: "RCT Labs",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      type: "website",
      images: [
        {
          url: "https://rctlabs.co/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | RCT Labs`,
      description,
      images: ["https://rctlabs.co/opengraph-image"],
      creator: "@rctlabs",
      site: "@rctlabs"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      }
    },
    verification: {
      google: "your-google-verification-code",
    }
  }
}

export const getBreadcrumbSchema = (
  locale: Locale,
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

export const getFAQSchema = (
  locale: Locale,
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

export const getSoftwareApplicationSchema = (locale: Locale) => {
  const name = locale === "th" 
    ? "RCT Ecosystem - ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ"
    : "RCT Ecosystem - Constitutional AI Operating System"
  
  const description = locale === "th"
    ? "ระบบปฏิบัติการ AI แบบรัฐธรรมนูญพร้อมสถาปัตยกรรม 10 ชั้น 41 อัลกอริทึม และ Multi-LLM Consensus"
    : "Constitutional AI Operating System with 10-layer architecture, 41 algorithms, and Multi-LLM Consensus"

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2210",
      bestRating: "5",
    },
    featureList: [
      "10-Layer Architecture",
      "41 Production Algorithms",
      "Multi-LLM Consensus",
      "SignedAI Verification",
      "RCTDB v2.0",
      "JITNA Protocol",
      "99.98% Uptime SLA",
      "Bilingual Support (EN/TH)"
    ].join(", "),
    softwareVersion: "2.7.0",
    releaseNotes: "https://rctlabs.co/changelog",
    url: "https://rctlabs.co",
    author: {
      "@type": "Organization",
      name: "RCT Labs",
      url: "https://rctlabs.co"
    }
  }
}
