/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ThumbsUp, Share2, Clock, User, Bookmark } from "lucide-react";
import { FetchPosts } from "@/lib/actions";
import { notFound } from "next/navigation";
import CommentSection from "@/components/comments/comments";

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
}

const blogPosts: BlogPost[] = await FetchPosts() || [];

// Generate static paths
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return blogPosts.map((post) => ({
    id: post.id.toString(), // Convert `id` to a string
  }));
}

// Metadata generation
export async function generateMetadata({
  params,
}: BlogPageParams) {
  const blogId = (await params).id;
  const post = blogPosts.find((post) => post.id === (blogId));

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
  params: Promise<{
    id: string;
  }>
}

export default async function BlogPost({ params }: BlogPageParams) {
  const blogId = (await params).id 
  const post = blogPosts.find((post) => post.id === (blogId));

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation - Keeping this the same */}
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
        {/* Back to blogs link - now more subtle */}
        <Link href="/blogs" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors duration-200">
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Back to blogs</span>
        </Link>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Featured Image - Full width, higher quality */}
          <div className="relative w-full aspect-[21/9] mb-0">
            <Image
              src={post.image || "/assets/images/featured-img.png"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Category tag overlay */}
            {post.category && (
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Article content container with nice padding */}
          <div className="px-6 md:px-16 py-8 md:py-12">
            {/* Blog Header Section */}
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">{post.title}</h1>

              {/* Author info and metadata in a cleaner layout */}
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

                {/* Action buttons */}
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

            {/* Blog Content with improved typography */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>
              
              <p className="text-gray-700">
                When a fintech startup approached us with a bold vision—disrupting personal finance with a seamless, real-time app—we knew the stakes were high. Their idea was solid: simplify investing and wealth-building through automation and AI. But their technology challenges were daunting. Here is how our cloud engineering team designed and implemented a scalable platform that could grow affordably as their customer base expanded from day one. Here is how we pulled it off.
              </p>
              
              <h3 className="font-bold text-2xl mt-8 mb-4 text-gray-900">Step 1: Defining the Blueprint</h3>
              
              <p className="text-gray-700">
                The startups requirements were clear but ambitious: low-latency transaction processing, compliance with financial regulations (think GDPR and PCI-DSS), and the ability to scale from 1,000 to 1 million users without breaking a sweat. We started with a whiteboard session—virtual, of course, thanks to 2025 hybrid work vibes—and mapped out the core needs:
              </p>
              
              <ul className="list-disc pl-6 my-6 space-y-2 text-gray-700">
                <li>Microservices architecture: Monoliths do not scale well, and fintech demands flexibility.</li>
                <li>Cloud provider: AWS won out for its robust financial services toolkit and global reach.</li>
                <li>Database: A mix of SQL (for structured financial data) and NoSQL (for user analytics).</li>
                <li>Security: Encryption everywhere, plus audit trails for compliance.</li>
              </ul>
              
              <p className="text-gray-700">
                We settled on a modular design: transaction processing, user authentication, analytics, and notifications as separate services. This let us scale each piece independently—crucial when you do not know if users will swarm the app for payments or insights first.
              </p>

              <h3 className="font-bold text-2xl mt-8 mb-4 text-gray-900">Step 2: Laying the Foundation with AWS</h3>
              
              <p className="text-gray-700">
                We chose AWS as our cloud backbone, leveraged into its managed services to save time. Here is the stack we built:
              </p>
              
              <ul className="list-disc pl-6 my-6 space-y-2 text-gray-700">
                <li>Amazon ECS for containerization: Portable, scalable, and helped with consistent deployment—perfect for a startup that needs to pivot quickly.</li>
                <li>Amazon RDS (PostgreSQL): For transactional data. It is reliable, ACID-compliant, and handles heavy reads (like a change stream for analytics) as well as writes.</li>
                <li>Amazon DynamoDB: For user profiles and activity tracking, where flexible schemas matter.</li>
                <li>AWS Lambda: For event-driven processes like notifications and risk calculations.</li>
                <li>We deployed everything across multiple availability zones (AZs) for resilience. A hybrid app going down during a market shift? Not on our watch.</li>
              </ul>

              <h3 className="font-bold text-2xl mt-8 mb-4 text-gray-900">Step 3: Making It Scale-Ready from Day One</h3>
              
              <p className="text-gray-700">
                Auto-scaling was baked into the DNA from the start. The transaction engine needed low latency, so we designed both horizontal scaling (adding more instances) and vertical scaling (beefier instances when needed). Some key optimizations:
              </p>
              
              <ul className="list-disc pl-6 my-6 space-y-2 text-gray-700">
                <li>Read replicas: As user queries grew, our database could spawn read-only clones when load spiked.</li>
                <li>Connection pooling: Critical for managing database connections during traffic spikes.</li>
                <li>Caching layer with Amazon ElastiCache: Frequently-accessed market data could skip the database entirely. The startups "Market Dashboard" was blisteringly fast as a result.</li>
              </ul>

              <h3 className="font-bold text-2xl mt-8 mb-4 text-gray-900">The Payoff</h3>
              
              <p className="text-gray-700">
                Six months in, the platform is handling 50,000+ users and 250 million daily transactions. Latency is still sub-50ms, uptime is 99.99%, and—crucially—infrastructure costs grew linearly, not exponentially, as their user count tripled. Margins are comfortably sustainable even as they grow.
              </p>

              <h3 className="font-bold text-2xl mt-8 mb-4 text-gray-900">Takeaway</h3>
              
              <p className="text-gray-700">
                Building for hyper-growth taught us a few truths:
              </p>
              
              <ul className="list-disc pl-6 my-6 space-y-2 text-gray-700">
                <li>Start with scale in mind (Microservices and serverless tech costs you unit growth headroom).</li>
                <li>Invest in monitoring and operational tools early (CloudWatch + ELK Stack).</li>
                <li>Set clear health thresholds (treating infrastructure as first-class code).</li>
                <li>Document obsessively (The startup can now deploy architectural changes rapid-fire and keep the user experience fast and reliable as they scale).</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Related Posts - redesigned with cards */}
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
      
    </main>
  );
}