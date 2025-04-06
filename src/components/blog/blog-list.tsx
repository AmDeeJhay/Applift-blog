import type { BlogPost } from "@/lib/blog-data"
import { BlogCard } from "./blog-card"
import { JSX } from "react"

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps): JSX.Element {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} variant="compact" />
      ))}
    </div>
  )
}

