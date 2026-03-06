import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPostMetadata {
  title: string
  author: string
  date: string
  category: "research" | "philosophy" | "industry" | "news"
  excerpt: string
  tags: string[]
  readTime: number
}

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as BlogPostMetadata),
      }
    })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as BlogPostMetadata),
    }
  } catch (error) {
    return null
  }
}

export function getBlogPostsByCategory(category: BlogPostMetadata["category"]): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category)
}
