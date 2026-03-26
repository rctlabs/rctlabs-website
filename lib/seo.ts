import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL, SOCIAL_LINKS } from "./site-config"

export const siteConfig = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  ogImage: SITE_OG_IMAGE,
  links: {
    twitter: SOCIAL_LINKS.twitter,
    github: SOCIAL_LINKS.github,
    discord: SOCIAL_LINKS.discord,
    linkedin: SOCIAL_LINKS.linkedin,
  },
}

export const createPageMetadata = (title: string, description: string, path: string) => ({
  title: `${title} | RCT Labs`,
  description,
  canonical: `${siteConfig.url}${path}`,
  openGraph: {
    title: `${title} | RCT Labs`,
    description,
    url: `${siteConfig.url}${path}`,
    type: "website" as const,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `${title} | RCT Labs`,
    description,
    images: [siteConfig.ogImage],
  },
})
