export const siteConfig = {
  name: "RCT Labs",
  description: "Revolutionizing human-AI interaction through intent-driven design.",
  url: "https://rctlabs.co",
  ogImage: "https://rctlabs.co/opengraph-image",
  links: {
    twitter: "https://twitter.com/rctlabs",
    github: "https://github.com/rctlabs",
    discord: "https://discord.gg/rctlabs",
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
