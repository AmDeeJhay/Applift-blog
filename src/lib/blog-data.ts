// "use server"

import axios from "axios";
const API_URL = process.env.API_URL;

export interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  image: string
  excerpt: string
  content?: string
  featured?: boolean
  category?: string
}

export interface Comment {
  id: string
  postId: string
  author: string
  content: string
  date: string
}

// Define sample blog posts array that can be used as fallback when API fails
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Scaling Cloud Infrastructure for Fintech <br /> Startups",
    author: "Fortune Ishaku",
    date: "April 15, 2025",
    image: "/assets/images/featured-img.png",
    excerpt: "How we helped a fintech startup scale their cloud infrastructure to handle millions of transactions while maintaining security and compliance.",
    category: "Cloud Engineering",
    featured: true
  },
  {
    id: "2",
    title: "AI-Powered Data Analytics for E-commerce",
    author: "John Doe",
    date: "April 10, 2025",
    image: "/assets/images/sideA.png",
    excerpt: "Implementing machine learning algorithms to optimize inventory management and improve customer experience.",
    category: "AI & Machine Learning"
  },
  {
    id: "3",
    title: "Building Resilient Microservices Architecture",
    author: "Sarah Johnson",
    date: "April 5, 2025",
    image: "/assets/images/sideA.png",
    excerpt: "Best practices for designing and implementing microservices that can withstand failures and scale efficiently.",
    category: "Architecture"
  },
  {
    id: "4",
    title: "DevOps Transformation for Legacy Systems",
    author: "Mike Chen",
    date: "March 28, 2025",
    image: "/assets/images/sideA.png",
    excerpt: "How we helped a traditional enterprise modernize their development pipeline and adopt DevOps practices.",
    category: "DevOps"
  },
  {
    id: "5",
    title: "Securing API Gateways in Multi-cloud Environments",
    author: "Alex Kumar",
    date: "March 20, 2025",
    image: "/assets/images/sideA.png",
    excerpt: "Strategies for implementing robust security controls for API gateways across different cloud providers.",
    category: "Security"
  }
];

// Helper functions related to blog data
export function getRelatedPosts(category: string, excludeId: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category && post.id !== excludeId)
    .slice(0, 3);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// === POSTS ===

// GET /posts/ - Read all posts
export async function getAllPosts() {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log("Fetched all posts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// GET /posts/{post_id} - Read a specific post
export async function getPostById(postId: string) {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    console.log("Fetched post:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    return undefined;
  }
}

// POST /posts/ - Create a new post
export async function createPost(postData: Omit<BlogPost, "id">) {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    console.log("Created post:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// PUT /posts/{post_id} - Update an existing post
export async function updatePost(postId: string, postData: Partial<BlogPost>) {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, postData);
    console.log("Updated post:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
}

// DELETE /posts/{post_id} - Delete a post
export async function deletePost(postId: string) {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    console.log("Deleted post:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error);
    throw error;
  }
}

// === COMMENTS ===

// POST /comments/ - Create a new comment
export async function createComment(commentData: Omit<Comment, "id">) {
  try {
    const response = await axios.post(`${API_URL}/comments`, commentData);
    console.log("Created comment:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// GET /comments/post/{post_id} - Read comments by post ID
export async function getCommentsByPostId(postId: string) {
  try {
    const response = await axios.get(`${API_URL}/comments/post/${postId}`);
    console.log("Fetched comments for post:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ID ${postId}:`, error);
    return [];
  }
}

// PUT /comments/{comment_id} - Update a comment
export async function updateComment(commentId: string, commentData: Partial<Comment>) {
  try {
    const response = await axios.put(`${API_URL}/comments/${commentId}`, commentData);
    console.log("Updated comment:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating comment with ID ${commentId}:`, error);
    throw error;
  }
}

// DELETE /comments/{comment_id} - Delete a comment
export async function deleteComment(commentId: string) {
  try {
    const response = await axios.delete(`${API_URL}/comments/${commentId}`);
    console.log("Deleted comment:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment with ID ${commentId}:`, error);
    throw error;
  }
}

// === DEFAULT ===

// GET / - Root endpoint
export async function getRoot() {
  try {
    const response = await axios.get(`${API_URL}/`);
    console.log("Root API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error accessing root endpoint:", error);
    return undefined;
  }
}