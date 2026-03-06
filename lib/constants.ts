// Navigation and configuration constants
export const NAV_ITEMS = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Research", href: "/research" },
  { label: "Protocol", href: "/open-protocol" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Company", href: "/company" },
]

export const PHILOSOPHY_CONCEPTS = [
  {
    id: "fdia",
    title: "F=(D^I)×A Formula",
    description: "The mathematical foundation of intent operations",
    href: "/philosophy/fdia",
    icon: "Formula",
  },
  {
    id: "rct-7",
    title: "RCT-7 Process",
    description: "Seven-step framework for intent-driven analysis",
    href: "/philosophy/rct-7",
    icon: "Process",
  },
  {
    id: "jitna",
    title: "JITNA Language",
    description: "Domain-specific language for intent specification",
    href: "/philosophy/jitna",
    icon: "Code",
  },
  {
    id: "intent-os",
    title: "Intent OS",
    description: "The future of human-AI interaction",
    href: "/philosophy/intent-os",
    icon: "Zap",
  },
]

export const RESEARCH_CATEGORIES = [
  { id: "all", label: "All Papers", value: "all" },
  { id: "mathematics", label: "Mathematics", value: "mathematics" },
  { id: "ethics", label: "Ethics", value: "ethics" },
  { id: "systems", label: "Systems", value: "systems" },
  { id: "algorithms", label: "Algorithms", value: "algorithms" },
]

export const COMPANY_VALUES = [
  {
    title: "Open Innovation",
    description: "We believe in open protocols and collaborative research.",
  },
  {
    title: "Rigorous Science",
    description: "Every claim is backed by peer-reviewed research and evidence.",
  },
  {
    title: "Human-Centric",
    description: "AI should augment human capabilities, not replace them.",
  },
  {
    title: "Ethical AI",
    description: "We prioritize safety, transparency, and responsible development.",
  },
  {
    title: "Community-Driven",
    description: "Our strength comes from our diverse, global community.",
  },
  {
    title: "Continuous Learning",
    description: "We embrace change and adapt as our understanding grows.",
  },
]

export const FOOTER_LINKS = {
  product: [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Research", href: "/research" },
    { label: "Open Protocol", href: "/open-protocol" },
  ],
  community: [
    { label: "Discord", href: "https://discord.gg/rctlabs" },
    { label: "GitHub", href: "https://github.com/rctlabs" },
    { label: "Twitter", href: "https://twitter.com/rctlabs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/company/careers" },
    { label: "Press", href: "/company/press" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}
