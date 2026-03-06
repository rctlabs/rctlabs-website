// Utility functions for formatting dates, citations, and other content

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatReadTime(minutes: number): string {
  if (minutes < 1) return "Less than a minute"
  if (minutes === 1) return "1 minute read"
  return `${minutes} minutes read`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
}

export function generateTableOfContents(content: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const regex = /^(#{1,6})\s+(.+)$/gm
  let match

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = slugify(text)

    headings.push({ id, text, level })
  }

  return headings
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
