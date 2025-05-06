"use client"
import Link from "next/link"
import { BlogList } from "@/components/blog/blog-list"
import { FeaturedPost } from "@/components/blog/featured-post"
import { RecentPosts } from "@/components/blog/recent-posts"
import ReadMoreSection from "@/components/blog/read-more-section"
import { Footer } from "@/components/layout/footer"
import { useBlogContext } from "../context/blogsContext"
import { useEffect, useState } from "react"
import { blogPosts } from "@/lib/blog-data" // Import mock data for fallback
import type { BlogPost } from "@/lib/actions"

export default function BlogsPage() {
  const blogContextData = useBlogContext() // Get blog context
  const loading = blogContextData?.loading || false
  const apiBlogPosts = blogContextData?.blogPosts || []

  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [readMorePosts, setReadMorePosts] = useState<BlogPost[]>([])

  // Process posts when they change
  useEffect(() => {
    // If we have API posts, use them
    if (apiBlogPosts && apiBlogPosts.length > 0) {
      // Find featured post from API
      const apiFeaturePost = apiBlogPosts.find((post) => post.featured)
      if (apiFeaturePost) {
        setFeaturedPost(apiFeaturePost)
      }

      // Get recent posts from API (excluding featured)
      const apiRecentPosts = apiBlogPosts
        .filter((post) => !post.featured)
        .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
        .slice(0, 5)

      setRecentPosts(apiRecentPosts)

      // Get remaining posts for "Read More" section
      const apiReadMorePosts = apiBlogPosts
        .filter((post) => !post.featured && !apiRecentPosts.includes(post))
        .slice(0, 6)

      setReadMorePosts(apiReadMorePosts)
      setDisplayPosts(apiBlogPosts)
    } else if (!loading) {
      // If API failed or returned no posts, use mock data as fallback
      // Convert mock data to match API format
      const convertedMockPosts = blogPosts.map((post) => ({
        ...post,
        author_name: post.author,
        content: post.content || "",
      }))

      // Find featured post from mock data
      const mockFeaturePost = convertedMockPosts.find((post) => post.featured)
      if (mockFeaturePost) {
        setFeaturedPost(mockFeaturePost)
      }

      // Get recent posts from mock data (excluding featured)
      const mockRecentPosts = convertedMockPosts
        .filter((post) => !post.featured)
        .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
        .slice(0, 5)

      setRecentPosts(mockRecentPosts)

      // Get remaining posts for "Read More" section
      const mockReadMorePosts = convertedMockPosts
        .filter((post) => !post.featured && !mockRecentPosts.includes(post))
        .slice(0, 6)

      setReadMorePosts(mockReadMorePosts)
      setDisplayPosts(convertedMockPosts)
    }
  }, [apiBlogPosts, loading])

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-14 py-4 border-b">
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
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

      <div className="container mx-auto px-4 py-8">
        {/* Featured Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Blog Post */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
              {featuredPost && <FeaturedPost post={featuredPost} />}
            </div>

            {/* Recent Posts List */}
            <div className="lg:col-span-1">
              <div className="space-y-6 relative">
                {/* Blog Items */}
                <BlogList posts={recentPosts} />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <Link href="/blogs/archive" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <RecentPosts posts={recentPosts} />
        </section>

        {/* Read More Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Read More</h2>
            <Link href="/blogs/categories" className="text-blue-600 hover:underline">
              All categories
            </Link>
          </div>
          <ReadMoreSection postId="someUniqueId" />
        </section>
      </div>

      {/* Footer */}
      <div className="px-8">
        <Footer />
      </div>
    </main>
  )
}
