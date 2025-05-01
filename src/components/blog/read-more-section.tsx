"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, getAllPosts, getRelatedPosts } from "@/lib/api-functions";

interface ReadMoreSectionProps {
  postId: string;
  category?: string;
}

export default function ReadMoreSection({ postId, category }: ReadMoreSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let relatedPosts: BlogPost[] = [];
        const allPosts = await getAllPosts();

        if (category) {
          // Fetch related posts by category
          relatedPosts = await getRelatedPosts(category, postId);
        } else {
          // Fetch all posts if no category is provided
          relatedPosts = await getAllPosts();
        }

        // Exclude the current post and limit to 6 posts
        // const filteredPosts = relatedPosts allPosts
        const filteredPosts = allPosts
          .filter((post: BlogPost) => post.id !== postId)
          .slice(0, 6);

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set to an empty array if the API call fails
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [postId, category]);

  if (loading) {
    return (
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-16">
      <h3 className="text-xl font-bold mb-6 text-gray-900">You might also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <Link key={post.id} href={`/blogs/${post.id}`} className="group">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={post.image || "/assets/images/placeholder.png"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.category && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 flex-grow">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}