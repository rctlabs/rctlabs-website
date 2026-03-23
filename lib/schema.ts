// Schema.org structured data for SEO
import type { Locale } from './i18n'

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
      'https://github.com/rct-ecosystem',
      'https://twitter.com/rctlabs',
      'https://linkedin.com/company/rctlabs',
      'https://discord.gg/rctlabs',
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
    name: 'RCT Labs',
    url: `https://rctlabs.co/${locale}`,
    description: locale === 'th'
      ? 'ระบบปฏิบัติการสำหรับปัญญาประดิษฐ์ที่ขับเคลื่อนด้วยเจตนา'
      : 'The Operating System for Intent-Driven Intelligence',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://rctlabs.co/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getSoftwareApplicationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RCT Labs Platform',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
    description: locale === 'th'
      ? 'แพลตฟอร์ม AI แบบรัฐธรรมนูญพร้อมสถาปัตยกรรม 10 ชั้น'
      : 'Constitutional AI Platform with 10-Layer Architecture',
  }
}
