import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";
import { JSX } from "react";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps): JSX.Element {
  return (
    <div className="relative h-[320px] w-[750px] overflow-hidden rounded-lg rounded-br-none">
      {/* Background Image */}
      <Image
        src={post.image || "/assets/images/featured-img.png"}
        alt={post.title}
        fill
        className="object-cover"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      {/* Featured Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full border-2 border-[#CCFF6F]">
          Featured
        </span>
      </div>
      {/* Link Wrapper */}
      <Link href={`/blogs/${post.id}`} className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
          {/* Green Bar Behind */}
          <div className="h-11 ml-8 bg-[#CCFF6F] p-14 rounded-b-lg  rounded-tr-lg  w-full absolute bottom-0 z-0" />

          {/* Black Title Card */}
          <div className="relative z-10 bg-black rounded-lg p-4 -mr-2 -mb-2">
            <h2 className="text-white text-2xl font-semibold leading-snug mb-2">
              {post.title}
            </h2>
            <div className="flex items-center text-sm text-[#CCFF6F] space-x-4">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}