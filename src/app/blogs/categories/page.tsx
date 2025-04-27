import Link from "next/link"
// import { blogPosts } from "@/lib/actions";
import type { Metadata } from "next"
import { JSX } from "react"
import { FetchPosts } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Blog Categories | APPLIFT",
  description: "Browse all blog categories from APPLIFT",
}

export default function CategoriesPage(): JSX.Element {
  const blogPosts = await FetchPosts() || []
  // Get all categories and count posts in each
  const categories = blogPosts.reduce<Record<string, number>>((acc, post) => {
    const category = post.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = 0
    }
    acc[category]++
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-18 py-4 border-b">
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
        <Link href="/blogs" className="inline-flex items-center text-blue-600 mb-6">
          <span>Back to blogs</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Blog Categories</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">{category}</h2>
              <p className="text-gray-600 mb-4">
                {count} {count === 1 ? "post" : "posts"}
              </p>
              <Link href={`/blogs?category=${category}`} className="text-blue-600 hover:underline">
                View all posts
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

