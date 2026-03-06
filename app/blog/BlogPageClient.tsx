"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PostCard } from "@/components/blog/post-card"
import { Button } from "@/components/ui/button"
import { RESEARCH_CATEGORIES } from "@/lib/constants"
import type { BlogPost } from "@/lib/blog"

interface BlogPageClientProps {
  posts: BlogPost[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">Blog</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Insights, research, and updates from RCT Labs
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2">
              <Link href={`/blog/${filteredPosts[0].slug}`} className="group block h-full">
                <div className="bg-card border-2 border-accent rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition">
                  <div className="h-64 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-accent/40">{filteredPosts[0].title.charAt(0)}</div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-accent uppercase mb-3">
                      {filteredPosts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition line-clamp-3">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground flex-grow mb-4 line-clamp-2">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{filteredPosts[0].author}</span>
                      <span>{filteredPosts[0].readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Categories</h3>
                <div className="flex flex-col gap-2">
                  {RESEARCH_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left px-4 py-2 rounded transition text-sm font-medium ${
                        selectedCategory === cat.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-card border border-border hover:border-accent"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">
              {selectedCategory === "all"
                ? "All Posts"
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Posts`}
            </h2>
            <p className="text-muted-foreground">{filteredPosts.length} posts</p>
          </div>

          {filteredPosts.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  category={post.category}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  readTime={post.readTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No posts found in this category.</p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Posts
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
