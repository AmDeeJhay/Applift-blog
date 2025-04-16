import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";


// Generate static path0s
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return blogPosts.map((post) => ({ id: post.id }));
}

// Metadata generation - Fixed by removing the unnecessary await
export function generateMetadata({
  params,
}: {
  params: { id: string }
}) {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    return {
      title: "Blog Post Not Found"
    };
  }

  return {
    title: `${post.title} | APPLIFT Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
interface BlogPageParams {
  params : Promise<{
    id: string;
  }>
} 

// Blog Post Page Component

export default async function BlogPost({ params }: BlogPageParams) {
  const blogId = (await params).id
  const post = blogPosts.find((post) => post.id === blogId);
  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

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

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/blogs" className="inline-flex items-center text-blue-600 mb-6">
          <ChevronLeft size={16} />
          <span>Back to blogs</span>
        </Link>

        <article className="max-w-3xl mx-auto">
          {post.category && (
            <div className="mb-4">
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center mb-6">
            <span className="text-blue-600 mr-4">{post.author}</span>
            <span className="text-gray-500">{post.date}</span>
          </div>

          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg font-medium mb-6">{post.excerpt}</p>
            <p>{post.content || "Full blog post content would go here..."}</p>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blogs/${relatedPost.id}`} className="group">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}