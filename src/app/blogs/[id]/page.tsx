"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ThumbsUp, Share2, Clock, User, Bookmark } from "lucide-react"
import { notFound } from "next/navigation"
import CommentSection from "@/components/comments/comments"
import { useEffect, useState } from "react"
import { getPostById, getRelatedPosts } from "@/lib/api-functions"
import { blogPosts } from "@/lib/blog-data" // Import mock data for fallback
import { Footer } from "@/components/layout/footer"
import type { BlogPost } from "@/lib/actions"

interface BlogPageParams {
  params: {
    id: string
  }
}

export default function BlogPost({ params }: BlogPageParams) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const blogId = params.id

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        // Try to fetch from API
        const fetchedPost = await getPostById(blogId)

        if (fetchedPost) {
          setPost(fetchedPost)

          // If we have a category, fetch related posts
          if (fetchedPost.category) {
            const fetchedRelatedPosts = await getRelatedPosts(fetchedPost.category, blogId)
            setRelatedPosts(fetchedRelatedPosts)
          }
        } else {
          // If API fails, try to find in mock data
          const mockPost = blogPosts.find((p) => p.id === blogId)
          if (mockPost) {
            // Convert mock data to match API format
            setPost({
              ...mockPost,
              author_name: mockPost.author,
              content: mockPost.content || "",
            })

            // Get related posts from mock data
            const mockRelatedPosts = blogPosts
              .filter((p) => p.id !== blogId && p.category === mockPost.category)
              .slice(0, 3)
              .map((p) => ({
                ...p,
                author_name: p.author,
                content: p.content || "",
              }))

            setRelatedPosts(mockRelatedPosts)
          } else {
            // If not found in mock data either, show 404
            notFound()
          }
        }
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("Failed to load blog post")

        // Try to find in mock data as fallback
        const mockPost = blogPosts.find((p) => p.id === blogId)
        if (mockPost) {
          setPost({
            ...mockPost,
            author_name: mockPost.author,
            content: mockPost.content || "",
          })

          const mockRelatedPosts = blogPosts
            .filter((p) => p.id !== blogId && p.category === mockPost.category)
            .slice(0, 3)
            .map((p) => ({
              ...p,
              author_name: p.author,
              content: p.content || "",
            }))

          setRelatedPosts(mockRelatedPosts)
        } else {
          notFound()
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPostData()
  }, [blogId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">{error || "Post not found"}</p>
          <Link href="/blogs" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="ml-2 font-bold text-blue-600">APPLIFT</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/who-we-are" className="text-gray-600 hover:text-gray-900">
            Who we are
          </Link>
          <Link href="/our-people" className="text-gray-600 hover:text-gray-900">
            Our People
          </Link>
          <Link href="/blogs" className="text-blue-600 font-medium">
            Our Blogs
          </Link>
          <Link href="/contact-us" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back to blogs link */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors duration-200"
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Back to blogs</span>
        </Link>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Featured Image */}
          <div className="relative w-full aspect-[21/9] mb-0">
            <Image
              src={post.image || "/assets/images/featured-img.png"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {post.category && (
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Article content */}
          <div className="px-6 md:px-16 py-8 md:py-12">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">{post.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">{post.author_name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <Bookmark size={18} className="mr-1" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <ThumbsUp size={18} className="mr-1" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <Share2 size={18} className="mr-1" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6 text-gray-900">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blogs/${relatedPost.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={relatedPost.image || "/assets/images/sideA.png"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {relatedPost.category && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-grow">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="bg-white border-t border-gray-100 mt-12 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <CommentSection postId={blogId} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
