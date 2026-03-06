import { MDXRemote } from "next-mdx-remote/rsc"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote source={content} />
    </div>
  )
}
