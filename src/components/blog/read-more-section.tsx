"use client";

import type { BlogPost } from "@/lib/blog-data";
import { BlogCard } from "./blog-card";
import { JSX } from "react";
import Image from "next/image";

interface ReadMoreSectionProps {
  posts: BlogPost[];
}

export function ReadMoreSection({ posts }: ReadMoreSectionProps): JSX.Element {
  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 px-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg overflow-hidden p-4"
            
          >
            <div className="flex flex-col">
              {/* Image Section with Shadow */}
              <div className="relative w-full mb-3">
                <div className="absolute inset-0 ml-3 bg-black opacity-30 rounded-md shadow-lg translate-y-2"></div>
                <div className="relative w-86 h-[200px] overflow-hidden rounded-md">
                  <Image
                    src={post.image || "/assets/images/sideA.png"}
                    alt={post.title}
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-300 w-full h-full"
                  />
                </div>
              </div>

              {/* Title and Metadata Section */}
              <div className="flex flex-col mt-2">
                {/* Post Title */}
                <h3 className="font-bold text-gray-800 text-lg break-words">
                  {post.title}
                </h3>

                {/* Author and Date */}
                <div className="text-sm text-gray-500 mt-1">
                  <span>{post.author}</span>
                  <span className="ml-2">{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}