import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import { getMdxArticleComponents } from "@/components/blog/mdx-article-components"
import type { BlogLocale } from "@/lib/blog"

interface MDXContentProps {
  content: string
  locale: BlogLocale
}

export function MDXContent({ content, locale }: MDXContentProps) {
  return (
    <MDXRemote
      source={content}
      components={getMdxArticleComponents(locale)}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
      }}
    />
  )
}
