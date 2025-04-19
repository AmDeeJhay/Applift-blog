"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";
import { JSX } from "react";

type BlogCardVariant = "compact" | "standard" | "featured" | "landscape";

interface BlogCardProps {
  post?: BlogPost;
  id?: string;
  title?: string;
  author?: string;
  date?: string;
  image?: string;
  excerpt?: string;
  featured?: boolean;
  variant?: BlogCardVariant;
}

export function BlogCard({
  post,
  id,
  title,
  author,
  date,
  image,
  excerpt,
  featured,
  variant = "compact",
}: BlogCardProps): JSX.Element {
  // If a post object is provided, use its properties
  const postId = post?.id || id || "";
  const postTitle = post?.title || title || "";
  const postAuthor = post?.author || author || "";
  const postDate = post?.date || date || "";
  const postImage = post?.image || image || "/placeholder.svg";
  const postExcerpt = post?.excerpt || excerpt || "";
  const isFeatured = post?.featured || featured;

  // Ensure we have the minimum required props
  if (!postId) {
    console.warn("BlogCard: Missing required 'id' prop");
    return <div className="p-4 border rounded">Missing blog post data</div>;
  }

  if (variant === "featured") {
    return (
      
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={postImage || "/assets/images/pics.png"}
          alt={postTitle || "Featured post"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full border-2 border-green-400">Featured</span>
        </div>
        <Link href={`/blogs/${postId}`} className="absolute inset-0">
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{postTitle}</h2>
            {postExcerpt && <p className="mb-2 text-sm text-gray-200 line-clamp-2">{postExcerpt}</p>}
            <div className="flex items-center text-sm">
              <span className="mr-4">{postAuthor}</span>
              <span>{postDate}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "standard") {
    return (
      
      <div className="flex flex-col h-[350px] max-w-[350px] mx-auto">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={postImage || "/assets/images/pics.png"}
            alt={postTitle || "Blog post"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {post?.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <Link href={`/blogs/${postId}`} className="group">
            <h3 className="font-bold text-gray-800 text-base mb-2 group-hover:text-blue-600 transition-colors">
              {postTitle}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{postExcerpt}</p>
          <div className="mt-auto text-sm">
            <span className="text-gray-500">{postAuthor}</span>
            <span className="text-gray-500 ml-2">{postDate}</span>
          </div>
        </div>
      </div>
    );
  }


  if (variant === "landscape") {
    return (
      <div className="justify-between flex p-4">
      <div className="flex flex-col h-[250px] overflow-hidden  rounded-lg gap-4">
        <div className="relative w-full h-full overflow-hidden rounded-lg flex justify-center items-center">
          <Image
            src={postImage || "/assets/images/pics.png"}
            alt={postTitle || "Blog post"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {post?.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 p-3">
          <div>
            <Link href={`/blogs/${postId}`} className="group">
              <h3 className="font-bold text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                {postTitle}
              </h3>
            </Link>
          </div>
          <div className="text-sm text-right">
            <span className="text-blue-600">{postAuthor}</span>
            <span className="text-gray-500 ml-2">{postDate}</span>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  
  

  // Default compact variant
  return (
    <Link href={`/blogs/${postId}`} className="flex gap-4 group"> 
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={postImage || "/assets/images/pics.png"}
          alt={postTitle || "Blog post"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {postTitle}
        </h3>
        <div className="mt-2 text-sm">
          <span className="text-blue-600">{postAuthor}</span>
          <span className="text-gray-500 ml-2">{postDate}</span>
        </div>
      </div>
    </Link>
  );
}