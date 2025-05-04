import type { BlogPost } from "@/lib/actions";
import { BlogCard } from "./blog-card";
import { JSX } from "react";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps): JSX.Element {
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }
  
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          postId={post.id}
          post={post}
          variant="compact"
        />
      ))}
    </div>
  );
}
