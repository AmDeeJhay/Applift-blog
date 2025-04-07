import type { BlogPost } from "@/lib/blog-data";
import { BlogCard } from "./blog-card";
import { JSX } from "react";

interface RecentPostsProps {
  posts: BlogPost[];
}

export function RecentPosts({ posts }: RecentPostsProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        let variant: "standard" | "landscape" = "standard";
        let colSpan = "";

        if (index === 1) {
          variant = "landscape";
          colSpan = "lg:col-span-2";
        }

        return (
          <div key={post.id} className={colSpan}>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <BlogCard post={post} variant={variant} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
