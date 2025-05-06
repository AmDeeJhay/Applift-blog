import Image from "next/image"
import Link from "next/link"
import { blogPosts, type BlogPost } from "@/lib/actions";
import type { Metadata } from "next"
import { JSX } from "react"

export const metadata: Metadata = {
  title: "Blog Archive | APPLIFT",
  description: "Browse all blog posts by date from APPLIFT",
}

export default function ArchivePage(): JSX.Element {
  // Group posts by month and year
  const blogPosts: BlogPost[] = []; // Replace with actual data fetching logic
  const postsByDate = blogPosts.reduce<Record<string, BlogPost[]>>((acc: Record<string, BlogPost[]>, post: BlogPost) => {
    const date = new Date(post.date ?? "")
    const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

    if (!acc[monthYear]) {
      acc[monthYear] = []
    }

    acc[monthYear].push(post)
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

        <h1 className="text-3xl font-bold mb-8">Blog Archive</h1>

        {Object.entries(postsByDate).map(([monthYear, posts]) => (
          <div key={monthYear} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{monthYear}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.id}`} className="group">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={post.image || "/assets/images/sideA.png"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
