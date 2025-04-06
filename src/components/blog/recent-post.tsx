import type { BlogPost } from "@/lib/blog-data"
import { BlogCard } from "./blog-card"
import { JSX } from "react"

interface RecentPostsProps {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: RecentPostsProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} variant="standard" />
      ))}
    </div>
  )
}

