import type { BlogPost } from "@/lib/blog-data";
import { BlogCard } from "./blog-card";
import { JSX } from "react";
import Image from "next/image";

interface RecentPostsProps {
  posts: BlogPost[];
}

export function RecentPosts({ posts }: RecentPostsProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.slice(0, 3).map((post, index) => {
        let variant: "standard" | "landscape" = "standard";
        let colSpan = "";

        if (index === 1) {
          variant = "landscape";
          colSpan = "lg:col-span-2";
        }

        return (
          <div key={post.id} className={`${colSpan} border border-gray-300 rounded-lg p-3`}>
            {variant === "landscape" ? (
              <div className="flex flex-col">
                {/* Image Section */}
                <div className="relative w-full h-[300px] overflow-hidden rounded-md mb-3">
                  <Image
                    src={post.image || "/assets/images/pics.png"}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title and Metadata Section */}
                <div className="flex justify-between items-center mt-2">
                  {/* Post Title */}
                  <h3 className="font-bold text-gray-800 text-lg break-words">
                    {post.title}
                  </h3>

                  {/* Author and Date */}
                  <div className="text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span className="ml-2">{post.date}</span>
                  </div>
                </div>
              </div>
            ) : (
              <BlogCard post={post} variant={variant} />
            )}
          </div>
        );
      })}

      {/* Extra Two Posts Below the Landscape Post */}
      <div className="lg:col-span-1 border border-gray-300 rounded-lg p-3">
        <BlogCard post={posts[3]} variant="standard" />
      </div>
      <div className="lg:col-span-1 border border-gray-300 rounded-lg p-3">
        <BlogCard post={posts[4]} variant="standard" />
      </div>
    </div>
  );
}