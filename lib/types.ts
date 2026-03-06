// Research paper and blog post types for consistent data structure
export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  date: string
  category: "mathematics" | "ethics" | "systems" | "algorithms"
  abstract: string
  tags: string[]
  downloadUrl?: string
  citationText: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  author: string
  date: string
  category: "research" | "philosophy" | "industry" | "news"
  excerpt: string
  content: string
  image?: string
  tags: string[]
  readTime: number
}

export interface CommunityEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "webinar" | "workshop" | "meetup" | "conference"
  image?: string
  description: string
  registrationUrl?: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image?: string
  socials?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface Contributor {
  id: string
  name: string
  avatar?: string
  contributions: number
  role: string
  github?: string
}
