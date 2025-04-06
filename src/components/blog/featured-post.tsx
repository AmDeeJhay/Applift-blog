import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"
import { JSX } from "react"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps): JSX.Element {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute top-4 left-4">
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full border-2 border-green-400">Featured</span>
      </div>
      <Link href={`/blogs/${post.id}`} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          {/* {post.excerpt && <p className="mb-2 text-sm text-gray-200 line-clamp-2">{post.excerpt}</p>} */}
          <div className="flex items-center text-sm">
            <span className="mr-4">{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

