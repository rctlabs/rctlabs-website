// Configuration for MDX processing
import { compile } from "@mdx-js/mdx"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export const mdxOptions = {
  development: process.env.NODE_ENV === "development",
  useDynamicImport: true,
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }] as [typeof rehypeAutolinkHeadings, Record<string, unknown>],
  ],
}

export async function compileMDX(content: string) {
  try {
    const compiled = await compile(content, mdxOptions)
    return compiled
  } catch (error) {
    console.error("MDX compilation error:", error)
    throw error
  }
}
