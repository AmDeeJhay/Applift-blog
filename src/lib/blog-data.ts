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
    id: "scalable-cloud-platform",
    title: "How We Built a Scalable Cloud Platform for a Fintech <br/> Startup",
    author: "Fortune Ishaku",
    date: "3/07/24",
    image: "/assets/images/featured-img.png",
    excerpt:
      "Learn how we designed and implemented a cloud-native platform that scales with business growth and handles millions of transactions.",
    featured: true,
    content: "Full blog post content goes here...",
  },
  {
    id: "agile-workflow-jenny",
    title: "Our Agile Workflow: From Sprint Planning to Retrospective",
    author: "Jenny Wilson",
    date: "3/4/24",
    image: "/assets/images/sideA.png",
    excerpt: "A detailed look at how our team implements agile methodologies to deliver high-quality software on time.",
  },
  {
    id: "agile-workflow-dianne",
    title: "Our Agile Workflow: From Sprint Planning to Retrospective",
    author: "Dianne Russell",
    date: "7/11/24",
    image: "/assets/images/sideA.png",
    excerpt: "Discover the key components of our agile process and how we continuously improve our development cycle.",
  },
  {
    id: "agile-workflow-guy",
    title: "Our Agile Workflow: From Sprint Planning to Retrospective",
    author: "Guy Hawkins",
    date: "9/4/24",
    image: "/assets/images/sideA.png",
    excerpt:
      "An inside look at our sprint planning, daily standups, and retrospective meetings that drive our development process.",
  },
  {
    id: "cloud-migration",
    title: "5 Lessons Learned from Our Cloud Migration Journey",
    author: "Sarah Chen",
    date: "2/15/24",
    image: "/assets/images/sideA.png",
    excerpt: "Key insights and challenges we faced when migrating a legacy system to a modern cloud architecture.",
  },
  {
    id: "devops-practices",
    title: "DevOps Practices That Transformed Our Delivery Pipeline",
    author: "Marcus Johnson",
    date: "1/22/24",
    image: "/assets/images/sideA.png",
    excerpt: "How we implemented CI/CD, infrastructure as code, and monitoring to speed up our development cycle.",
  },
];

// Helper functions related to blog data
export function getRelatedPosts(category: string, excludeId: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category && post.id !== excludeId)
    .slice(0, 3);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured)
  .slice(0, 3);
}

export function getRecentPosts(category: string, excludeId: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category && post.id !== excludeId)
    .slice(0, 5);
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