import type { BlogPost } from "@/lib/actions";
import { BlogCard } from "./blog-card";
import { JSX } from "react";
import Image from "next/image";
import { getAllPosts } from "@/lib/api-functions"; // Import the API function
import { useEffect, useState } from "react";


interface RecentPostsProps {
  initialPosts?: BlogPost[]; // Optional initial posts from props
  posts?: BlogPost[]; // Optional posts prop for fallback
}

export function RecentPosts({ initialPosts }: RecentPostsProps): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no initial posts were provided, fetch them
    if (!initialPosts) {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const postsData = await getAllPosts();
          setPosts(Array.isArray(postsData)? postsData.map((post) => ({
            ...post,
            author_name: post.author || "Unknown Author", // Provide a default value if necessary
            content: post.content || "", // Ensure content is never undefined
          })) : []);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setError("Failed to load posts. Please try again later.");
          
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [initialPosts]);

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-3 animate-pulse">
            <div className="bg-gray-200 h-[200px] w-full rounded-md mb-3"></div>
            <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  } 

  // No posts state
  if (posts.length === 0) {
    return <div className="text-gray-500 p-4 text-center">No posts available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.slice(0, 5).map((post, index) => {
        let variant: "standard" | "landscape" = "standard";
        let colSpan = "";

        if (index === 1) {
          variant = "landscape";
          colSpan = "lg:col-span-2";
        }

        return (
          <div
            key={post.id}
            className={`${colSpan} border border-gray-300 rounded-lg p-3`}
          >
            {variant === "landscape" ? (
              <div className="flex flex-col">
                {/* Image Section with Shadow */}
                <div className="relative w-full mb-3">
                  <div className="absolute w-full h-[300px] bg-black rounded-md bottom-0 translate-y-2 opacity-30"></div>
                  <div className="relative w-full h-[300px] overflow-hidden rounded-md">
                    <Image
                      src={post.image || "/assets/images/sideA.png"}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Title and Metadata Section */}
                <div className="flex justify-between items-center mt-2">
                  {/* Post Title */}
                  <h3 className="font-bold text-gray-800 text-lg break-words">
                    {post.title}
                  </h3>

                  {/* Author and Date */}
                  <div className="text-sm text-gray-500">
                    <span>{post.author_name}</span>
                    <span className="ml-2">{post.date}</span>
                  </div>
                </div>
              </div>
            ) : (
              <BlogCard postId={post.id} post={post} variant={variant} />
            )}
          </div>
        );
      })}

      {/* Extra Two Posts Below the Landscape Post */}
      {posts.slice(1, 5).map((post) => (
        <div
          key={post.id}
          className=" border border-gray-300 rounded-lg p-3 px-4"
        >
          <div className="flex flex-col">
            {/* Image Section with Shadow */}
            <div className="relative w-full mb-3">
              <div className="absolute w-full h-[200px] bg-black rounded-md bottom-0 translate-y-2 opacity-30"></div>
              <div className="relative w-full h-[200px] overflow-hidden rounded-md">
                <Image
                  src={post.image || "/assets/images/sideA.png"}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Title and Metadata Section */}
            <div className="flex justify-between items-center mt-2">
              {/* Post Title */}
              <h3 className="font-bold text-gray-800 text-lg break-words">
                {post.title}
              </h3>

              {/* Author and Date */}
              <div className="text-sm text-gray-500">
                <span>{post.author_name}</span>
                <span className="ml-2">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
