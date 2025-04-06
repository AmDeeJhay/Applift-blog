import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BlogCard } from "@/components/blog/blog-card"
import { blogPosts } from "./data"

export default function BlogsPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
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

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Blog Post */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
            {featuredPost && (
              <BlogCard
                id={featuredPost.id}
                title={featuredPost.title}
                author={featuredPost.author}
                date={featuredPost.date}
                image={featuredPost.image}
                featured={true}
                excerpt={featuredPost.excerpt}
              />
            )}
          </div>

          {/* Blog List */}
          <div className="lg:col-span-1">
            <div className="space-y-6 relative">
              {/* Navigation Arrows */}
              <div className="absolute right-0 top-0 flex space-x-2">
                <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100">
                  <ChevronLeft size={18} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Blog Items */}
              {regularPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  image={post.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

