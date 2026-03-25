import { Metadata } from "next"
import { siteConfig } from "./seo"

export type Locale = "en" | "th"

export const baseKeywords: Record<Locale, string[]> = {
  en: [
    // Core brand
    "constitutional AI", "RCT Labs", "RCT Ecosystem",
    "intent-driven AI", "AI operating system",
    // Products
    "SignedAI", "ArtentAI", "RCTDB",
    // Technical
    "multi-LLM consensus", "AI verification", "JITNA protocol",
    "10-layer architecture", "41 algorithms", "FDIA equation",
    "reverse component thinking", "production algorithms",
    // Commercial intent
    "reduce AI hallucination", "AI hallucination prevention",
    "LLM guardrails", "AI governance platform",
    "multi-LLM orchestration", "responsible AI platform",
    "AI testing platform", "AI quality assurance", "AI regression testing",
    "AI creative automation", "AI document verification",
    "enterprise LLM deployment", "enterprise AI platform",
    // Industry
    "Thailand AI company", "AI startup Thailand",
    "AI for enterprise Thailand", "PDPA AI",
    "data sovereignty", "AI compliance",
    // Performance
    "99.98% uptime", "0.3% hallucination rate",
    "AI cost optimization", "low hallucination AI",
    // Architecture
    "enterprise AI governance", "AI quality control",
    "multi-model AI orchestration", "AI memory system",
    "AI audit trail", "signed AI verification",
    "sovereign AI infrastructure", "AI infrastructure",
    "constitutional AI platform", "AI governance framework",
    // Differentiators
    "RCT-7 mental model", "AI data sovereignty", "LLM compliance",
    "intent operating system", "cognitive architecture AI",
  ],
  th: [
    // Core brand
    "ปัญญาประดิษฐ์แบบรัฐธรรมนูญ", "RCT Labs", "Constitutional AI",
    "ระบบปฏิบัติการ AI", "AI ขับเคลื่อนด้วยเจตนา",
    // Products
    "SignedAI", "ArtentAI", "JITNA", "RCTDB",
    // Commercial
    "บริษัท AI ไทย", "AI startup Thailand",
    "AI ลด hallucination", "ตรวจสอบ AI",
    "ระบบ AI ที่เชื่อถือได้", "AI ทดสอบ",
    "แพลตฟอร์ม AI ไทย", "AI สำหรับธุรกิจ",
    // Technical
    "Multi-LLM", "Enterprise AI", "Data Sovereignty", "PDPA",
    "41 อัลกอริทึม", "10 ชั้นสถาปัตยกรรม",
    "สมการ FDIA", "AI กำกับดูแล",
    // Industry
    "AI ระดับองค์กร", "AI ประเทศไทย",
    "AI สำหรับองค์กรไทย", "ระบบ AI ธุรกิจไทย",
    "ระบบ AI อัจฉริยะ", "AI ที่ปลอดภัย",
    "AI อัตราการหลอนต่ำ", "ระบบ AI ตรวจสอบได้",
    "ลด AI Hallucination", "AI คุณภาพสูง",
    "AI ประหยัดต้นทุน", "AI ตรวจสอบเอกสาร",
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

// SoftwareApplicationSchema — use getSoftwareApplicationSchema from lib/schema.ts (single source of truth)
export { getSoftwareApplicationSchema } from './schema'
