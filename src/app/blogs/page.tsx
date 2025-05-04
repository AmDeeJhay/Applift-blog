import Link from "next/link"
// import { ChevronLeft, ChevronRight } from "lucide-react"
import { BlogList } from "@/components/blog/blog-list"
import { FeaturedPost } from "@/components/blog/featured-post"
import { RecentPosts } from "@/components/blog/recent-post"
<<<<<<< HEAD
import  ReadMoreSection from "@/components/blog/read-more-section"
import { blogPosts } from "@/lib/blog-data"
import { Footer } from "@/components/layout/footer"
=======
import { ReadMoreSection } from "@/components/blog/read-more-section"
import { FetchPosts } from "@/lib/actions";
import { Footer } from "@/components/layout/footer";
>>>>>>> 63d6a5b5e5abe6ac4631f557c5b5692cecdcd4d6

interface BlogPost {
  id: string;
  title: string;
  author_name: string;
  content: string;
  date?: string;
  image?: string;
  excerpt?: string;
  featured?: boolean;
  category?: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  comment_count?: number;
}

export default async function BlogsPage() {
  const blogPosts: BlogPost[] = (await FetchPosts() || []).map((post) => ({
    ...post,
    published: post.published !== undefined ? post.published : false, // Ensure 'published' is always a boolean
  }));
  // Get featured post
<<<<<<< HEAD
  const featuredPost = blogPosts.filter((post) => post.featured);
=======
  const featuredPost = blogPosts?.find((post) => post.featured);
>>>>>>> 63d6a5b5e5abe6ac4631f557c5b5692cecdcd4d6

  // Get recent posts (excluding featured)
 

  const recentPosts = blogPosts
    ?.filter((post: BlogPost) => !post.featured)
    .sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    )
    .slice(0, 3);

  // Get remaining posts for "Read More" section
  const readMorePosts = blogPosts
    ?.filter((post) => !post.featured && !recentPosts.includes(post))
    .slice(0, 6);

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
          <Link
            href="/who-we-are"
            className="text-gray-600 hover:text-gray-900"
          >
            Who we are
          </Link>
          <Link
            href="/our-people"
            className="text-gray-600 hover:text-gray-900"
          >
            Our People
          </Link>
          <Link href="/blogs" className="text-blue-600 font-medium">
            Our Blogs
          </Link>
          <Link
            href="/contact-us"
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
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
              {featuredPost.length > 0 && <FeaturedPost post={featuredPost[0]} />}
            </div>

            {/* Recent Posts List */}
            <div className="lg:col-span-1">
              <div className="space-y-6 relative">
                {/* Navigation Arrows */}
                {/* <div className="absolute right-0 top-0 flex space-x-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    aria-label="Previous posts"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    aria-label="Next posts"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div> */}

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
            <Link
              href="/blogs/archive"
              className="text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <RecentPosts posts={recentPosts} />
        </section>

        {/* Read More Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Read More</h2>
            <Link
              href="/blogs/categories"
              className="text-blue-600 hover:underline"
            >
              All categories
            </Link>
          </div>
          <ReadMoreSection postId="someUniqueId" />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

