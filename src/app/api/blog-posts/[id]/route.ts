import { blogPosts } from "@/lib/blog-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Find the post by ID from your data source
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return NextResponse.json(
      { error: "Blog post not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(post);
}