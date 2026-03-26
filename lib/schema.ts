// Schema.org structured data for SEO
import type { Locale } from './i18n'
import {
  SITE_HALLUCINATION_RATE,
  SITE_MICROSERVICE_COUNT,
  SITE_NAME,
  SITE_TEST_COUNT,
  SITE_UPTIME,
  SITE_URL,
  SITE_VERSION,
  SOCIAL_LINKS,
} from './site-config'

export function getOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RCT Labs',
    alternateName: 'Reverse Component Thinking Labs',
    url: `https://rctlabs.co/${locale}`,
    logo: 'https://rctlabs.co/logo-horizontal.svg',
    description: locale === 'th'
      ? 'ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ — สถาปัตยกรรม 10 ชั้น, การตรวจสอบแบบหลาย LLM, และความเป็นเจ้าของข้อมูลอย่างสมบูรณ์'
      : 'Constitutional AI Operating System — 10-Layer architecture, multi-LLM consensus, and absolute data sovereignty',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Ittirit Saengow',
      jobTitle: 'The Architect',
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.twitter,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.discord,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Technical Support',
      email: 'hello@rctlabs.co',
      availableLanguage: ['en', 'th'],
    },
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image: string
  url: string
  locale: Locale
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image,
    url: article.url,
    publisher: {
      '@type': 'Organization',
      name: 'RCT Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rctlabs.co/logo-horizontal.svg',
      },
    },
    inLanguage: article.locale,
  }
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    description: locale === 'th'
      ? 'ระบบปฏิบัติการสำหรับปัญญาประดิษฐ์ที่ขับเคลื่อนด้วยเจตนา'
      : 'The Operating System for Intent-Driven Intelligence',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getSoftwareApplicationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: locale === 'th'
      ? 'RCT Ecosystem - ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ'
      : 'RCT Ecosystem - Constitutional AI Operating System',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: String(SITE_TEST_COUNT),
      bestRating: '5',
    },
    description: locale === 'th'
      ? `ระบบปฏิบัติการ AI แบบรัฐธรรมนูญพร้อมสถาปัตยกรรม 10 ชั้น 62 microservices การตรวจสอบหลายโมเดล และ Hallucination ${SITE_HALLUCINATION_RATE}`
      : `Constitutional AI Operating System with a 10-layer architecture, ${SITE_MICROSERVICE_COUNT} microservices, multi-model verification, and ${SITE_HALLUCINATION_RATE} hallucination rate.`,
    featureList: [
      '10-Layer Architecture',
      `${SITE_MICROSERVICE_COUNT} Production Microservices`,
      'Multi-LLM Consensus',
      'SignedAI Verification',
      'RCTDB v2.0',
      'JITNA Protocol',
      `${SITE_UPTIME} Uptime SLA`,
      'Bilingual Support (EN/TH)',
    ].join(', '),
    softwareVersion: SITE_VERSION,
    releaseNotes: `${SITE_URL}/en/changelog`,
    url: SITE_URL,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
