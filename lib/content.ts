// Central content data for RCT Labs
import type { ResearchPaper, BlogPost, TeamMember } from "./types"

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Intent-Driven AI: A New Paradigm for Human-Machine Collaboration",
    authors: ["Dr. Sarah Chen", "Prof. James Wilson"],
    date: "2024-01-15",
    category: "systems",
    abstract: "This paper explores how intent-driven design principles can revolutionize AI system architecture...",
    tags: ["AI", "Intent", "Systems"],
    downloadUrl: "/papers/intent-driven-ai.pdf",
    citationText: "Chen, S., & Wilson, J. (2024). Intent-Driven AI: A New Paradigm for Human-Machine Collaboration.",
  },
  {
    id: "2",
    title: "The Mathematics of Intent Operations",
    authors: ["Dr. Alex Patel", "Dr. Maria Garcia"],
    date: "2024-02-20",
    category: "mathematics",
    abstract: "A rigorous mathematical framework for modeling intent operations using category theory...",
    tags: ["Mathematics", "Intent", "Theory"],
    downloadUrl: "/papers/mathematics-intent.pdf",
    citationText: "Patel, A., & Garcia, M. (2024). The Mathematics of Intent Operations.",
  },
  {
    id: "3",
    title: "Ethical Considerations in Intent-Based AI Systems",
    authors: ["Dr. Emily Johnson", "Prof. Robert Lee"],
    date: "2024-03-10",
    category: "ethics",
    abstract: "An examination of ethical frameworks applicable to intent-based AI systems...",
    tags: ["Ethics", "AI", "Philosophy"],
    downloadUrl: "/papers/ethics-intent-ai.pdf",
    citationText: "Johnson, E., & Lee, R. (2024). Ethical Considerations in Intent-Based AI Systems.",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-intent-operations",
    title: "Understanding Intent Operations: The Foundation of RCT Labs",
    author: "Dr. Sarah Chen",
    date: "2024-01-20",
    category: "philosophy",
    excerpt: "Intent operations form the core of RCT Labs' approach to AI. Let's dive into what they mean...",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["Intent", "Philosophy", "Basics"],
    readTime: 5,
  },
  {
    id: "2",
    slug: "rct-7-process-explained",
    title: "The RCT-7 Process: A Step-by-Step Guide",
    author: "Prof. James Wilson",
    date: "2024-01-25",
    category: "research",
    excerpt: "Breaking down the seven-step RCT process and how it revolutionizes AI research...",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["RCT-7", "Process", "Guide"],
    readTime: 8,
  },
  {
    id: "3",
    slug: "jitna-language-debut",
    title: "Introducing JITNA: Our New Domain-Specific Language",
    author: "Dr. Alex Patel",
    date: "2024-02-01",
    category: "news",
    excerpt: "JITNA brings a new level of precision to intent-based AI programming...",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["JITNA", "Language", "Release"],
    readTime: 7,
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Co-Founder & CEO",
    bio: "Leading RCT Labs with 15 years of AI research and systems design experience.",
    socials: {
      twitter: "https://twitter.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
  },
  {
    id: "2",
    name: "Prof. James Wilson",
    title: "Chief Research Officer",
    bio: "Advancing the frontiers of intent-driven AI through groundbreaking research.",
    socials: {
      github: "https://github.com/jameswilson",
      linkedin: "https://linkedin.com/in/jameswilson",
    },
  },
]
