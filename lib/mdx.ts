// Configuration for MDX processing
import { compile } from "@mdx-js/mdx"

export const mdxOptions = {
  development: process.env.NODE_ENV === "development",
  useDynamicImport: true,
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
