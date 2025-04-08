"use client";

import type { BlogPost } from "@/lib/blog-data";
import { BlogCard } from "./blog-card";
import { JSX, useState } from "react";

interface ReadMoreSectionProps {
  posts: BlogPost[];
}

export function ReadMoreSection({ posts }: ReadMoreSectionProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category || "Uncategorized")))];

  // Filter posts by category
  const filteredPosts =
    activeCategory === "all"
    ? posts
    : posts.filter(
    (post) => post.category === activeCategory || (activeCategory === "Uncategorized" && !post.category)
  );

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.toLowerCase()}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeCategory === category.toLowerCase()
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setActiveCategory(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>
  
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg overflow-hidden p-4" // Added padding for spacing
          >
            <BlogCard post={post} variant="standard" />
          </div>
        ))}
      </div>
    </div>
  );
}