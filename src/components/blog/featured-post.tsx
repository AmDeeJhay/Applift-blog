"use client"

import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/actions"
import { type JSX, useEffect, useState } from "react"
import { getPostById } from "@/lib/api-functions"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps): JSX.Element {
  const [apiPost, setApiPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch if we have an ID and it's not already from the API
    if (post.id && !post.content) {
      const fetchFeaturedPost = async () => {
        setLoading(true)
        try {
          const fetchedPost = await getPostById(post.id)
          if (fetchedPost) {
            setApiPost(fetchedPost)
          }
        } catch (err) {
          console.error("Error fetching featured post:", err)
          setError("Failed to load featured post details")
          // We'll fall back to the mock data
        } finally {
          setLoading(false)
        }
      }

      fetchFeaturedPost()
    }
  }, [post.id, post.content])

  // Use API data if available, otherwise fall back to mock data
  const displayPost = apiPost || post

  return (
    <div className="relative h-[320px] w-[770px] left-5 overflow-hidden rounded-lg rounded-br-none">
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading featured post...</p>
        </div>
      )}

      {/* Background Image */}
      <Image
        src={displayPost.image || "/assets/images/featured-img.png"}
        alt={displayPost.title}
        fill
        className="object-cover"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      {/* Featured Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full border-2 border-[#CCFF6F]">Featured</span>
      </div>
      {/* Link Wrapper */}
      <Link href={`/blogs/${displayPost.id}`} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
          {/* Green Bar Behind */}
          <div className="h-11 ml-8 bg-[#CCFF6F] p-14 rounded-b-lg rounded-tr-lg w-full absolute bottom-0 z-0" />

          {/* Black Title Card */}
          <div className="relative z-10 bg-[#202020] rounded-lg p-4 -mr-2 -mb-2">
            <h2 className="text-white text-2xl font-sm leading-snug mb-2">
              <span dangerouslySetInnerHTML={{ __html: displayPost.title }} />
            </h2>
            <div className="flex items-center text-sm text-[#CCFF6F] space-x-4">
              <span>{displayPost.author_name}</span>
              <span>{displayPost.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
