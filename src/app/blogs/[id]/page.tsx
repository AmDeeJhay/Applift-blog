/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ThumbsUp, Share2 } from "lucide-react";
// import { blogPosts } from "@/lib/blog-data";
import { blogPosts } from "@/lib/blog-data"; 
import { notFound } from "next/navigation";
import CommentSection from "@/components/comments/comments";


interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}


// Generate static paths
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return blogPosts.map((post) => ({
    id: post.id 
  }));
// try {
//   const blogPosts = await FetchPosts(); // Fetch posts from your API or data source
//   return blogPosts.map((post) => ({ 
//     id: post.id 
//   }));
// } catch (error) {
//   console.error("Error generating static paths:", error);
//   // Fall back to static data if API fetch fails
//   return fallbackPosts.map((post) => ({
//     id: post.id
//   }));
}


// Metadata generation
export async function generateMetadata({
  params,
}: BlogPageParams) {
  const blogId = (await params).id;
  // const blogPosts = await FetchPosts(); // Fetch posts from your API or data source 
  const post = blogPosts.find((post) => post.id === blogId);

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
  // const blogPosts = await FetchPosts(); // Fetch posts from your API or data source
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
      <nav className="flex items-center justify-between px-6 md:px-8 py-4 border-b">
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
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <div className="flex justify-between items-center mb-6 px-11">
          {/* Back to blogs link */}
          <Link href="/blogs" className="inline-flex items-center text-blue-600">
            <ChevronLeft size={16} />
            <span>Back to blogs</span>
          </Link>
          
          {/* Like and Share buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <ThumbsUp size={18} className="mr-1" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 size={18} className="mr-1" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        <article className="max-w-6xl mx-auto">
          {/* Blog Header Section */}
          <div className="mb-6">
            {post.category && (
              <div className="mb-2">
                <span className="bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h1>

            <div className="flex items-center text-sm">
              <span className="text-blue-600 mr-2">{post.author}</span>
              <span className="text-gray-500">{post.date}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video mb-6">
            <Image
              src={post.image || "/assets/images/featured-img.png"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-4">{post.excerpt}</p>
            
            <p>
              When a fintech startup approached us with a bold vision—disrupting personal finance with a seamless, real-time app—we knew the stakes were high. Their idea was solid: simplify investing and wealth-building through automation and AI. But their technology challenges were daunting. Here is how our cloud engineering team designed and implemented a scalable platform that could grow affordably as their customer base expanded from day one. Here is how we pulled it off.
            </p>
            
            <h3 className="font-bold text-xl mt-6 mb-4">Step 1: Defining the Blueprint</h3>
            
            <p>
              The startups requirements were clear but ambitious: low-latency transaction processing, compliance with financial regulations (think GDPR and PCI-DSS), and the ability to scale from 1,000 to 1 million users without breaking a sweat. We started with a whiteboard session—virtual, of course, thanks to 2025 hybrid work vibes—and mapped out the core needs:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>Microservices architecture: Monoliths do not scale well, and fintech demands flexibility.</li>
              <li>Cloud provider: AWS won out for its robust financial services toolkit and global reach.</li>
              <li>Database: A mix of SQL (for structured financial data) and NoSQL (for user analytics).</li>
              <li>Security: Encryption everywhere, plus audit trails for compliance.</li>
            </ul>
            
            <p>
              We settled on a modular design: transaction processing, user authentication, analytics, and notifications as separate services. This let us scale each piece independently—crucial when you do not know if users will swarm the app for payments or insights first.
            </p>

            <h3 className="font-bold text-xl mt-6 mb-4">Step 2: Laying the Foundation with AWS</h3>
            
            <p>
              We chose AWS as our cloud backbone, leveraged into its managed services to save time. Here is the stack we built:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>Amazon ECS for containerization: Portable, scalable, and helped with consistent deployment—perfect for a startup that needs to pivot quickly.</li>
              <li>Amazon RDS (PostgreSQL): For transactional data. It is reliable, ACID-compliant, and handles heavy reads (like a change stream for analytics) as well as writes.</li>
              <li>Amazon DynamoDB: For user profiles and activity tracking, where flexible schemas matter.</li>
              <li>AWS Lambda: For event-driven processes like notifications and risk calculations.</li>
              <li>We deployed everything across multiple availability zones (AZs) for resilience. A hybrid app going down during a market shift? Not on our watch.</li>
            </ul>

            <h3 className="font-bold text-xl mt-6 mb-4">Step 3: Making It Scale-Ready from Day One</h3>
            
            <p>
              Auto-scaling was baked into the DNA from the start. The transaction engine needed low latency, so we designed both horizontal scaling (adding more instances) and vertical scaling (beefier instances when needed). Some key optimizations:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>Read replicas: As user queries grew, our database could spawn read-only clones when load spiked.</li>
              <li>Connection pooling: Critical for managing database connections during traffic spikes.</li>
              <li>Caching layer with Amazon ElastiCache: Frequently-accessed market data could skip the database entirely. The startups "Market Dashboard" was blisteringly fast as a result.</li>
            </ul>

            <h3 className="font-bold text-xl mt-6 mb-4">The Payoff</h3>
            
            <p>
              Six months in, the platform is handling 50,000+ users and 250 million daily transactions. Latency is still sub-50ms, uptime is 99.99%, and—crucially—infrastructure costs grew linearly, not exponentially, as their user count tripled. Margins are comfortably sustainable even as they grow.
            </p>

            <h3 className="font-bold text-xl mt-6 mb-4">Takeaway</h3>
            
            <p>
              Building for hyper-growth taught us a few truths:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>Start with scale in mind (Microservices and serverless tech costs you unit growth headroom).</li>
              <li>Invest in monitoring and operational tools early (CloudWatch + ELK Stack).</li>
              <li>Set clear health thresholds (treating infrastructure as first-class code).</li>
              <li>Document obsessively (The startup can now deploy architectural changes rapid-fire and keep the user experience fast and reliable as they scale).</li>
            </ul>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12">
            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blogs/${relatedPost.id}`} className="group">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-2">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

        
      {/* Comments Section */}  
      <CommentSection postId={blogId} /> 
      
    </main>
  );
}