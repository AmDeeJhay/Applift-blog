"use server"
import axios from "axios"
import { blogPosts, getMockCommentsByPostId } from "./blog-data"

const API_URL = process.env.API_URL

export interface BlogPost {
  id: string
  title: string
  author_name: string
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
  createdAt: string
  replies?: CommentReply[]
}

export interface CommentReply {
  id: string
  author: string
  content: string
  createdAt: string
}

// === POSTS ===

// GET /posts/ - Read all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!API_URL) {
      console.warn("API_URL is not defined, using mock data")
      return blogPosts.map((post) => ({
        ...post,
        author_name: post.author || post.author_name,
      }))
    }

    console.log("API URL:", API_URL) // Debugging log
    console.log("Fetching posts from:", `${API_URL}/posts`) // Debugging log
    const response = await axios.get(`${API_URL}/posts`)
    console.log("Fetched posts:", response.data) // Debugging log
    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    // Return mock data as fallback
    return blogPosts.map((post) => ({
      ...post,
      author_name: post.author || post.author_name,
    }))
  }
}

// GET /posts/{post_id} - Read a specific post
export async function getPostById(postId: string) {
  try {
    if (!API_URL) {
      console.warn("API_URL is not defined, using mock data")
      const mockPost = blogPosts.find((post) => post.id === postId)
      return mockPost
        ? {
            ...mockPost,
            author_name: mockPost.author || mockPost.author_name,
          }
        : null
    }

    const response = await axios.get(`${API_URL}/posts/${postId}`)
    console.log("Fetched post:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error)
    // Return mock data as fallback
    const mockPost = blogPosts.find((post) => post.id === postId)
    return mockPost
      ? {
          ...mockPost,
          author_name: mockPost.author || mockPost.author_name,
        }
      : null
  }
}

// GET /posts/related/{category}/{postId} - Get related posts by category (excluding current post)
export async function getRelatedPosts(category: string, currentPostId: string) {
  try {
    if (!API_URL) {
      console.warn("API_URL is not defined, using mock data")
      return blogPosts
        .filter((post) => post.category === category && post.id !== currentPostId)
        .map((post) => ({
          ...post,
          author_name: post.author || post.author_name,
        }))
    }

    const response = await axios.get(`${API_URL}/posts/related/${category}/${currentPostId}`)
    console.log("Fetched related posts:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching related posts:`, error)
    // Return mock data as fallback
    return blogPosts
      .filter((post) => post.category === category && post.id !== currentPostId)
      .map((post) => ({
        ...post,
        author_name: post.author || post.author_name,
      }))
  }
}

// POST /posts/ - Create a new post
export async function createPost(postData: Omit<BlogPost, "id">) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.post(`${API_URL}/posts`, postData)
    console.log("Created post:", response.data)
    return response.data
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

// PUT /posts/{post_id} - Update an existing post
export async function updatePost(postId: string, postData: Partial<BlogPost>) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.put(`${API_URL}/posts/${postId}`, postData)
    console.log("Updated post:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error)
    throw error
  }
}

// DELETE /posts/{post_id} - Delete a post
export async function deletePost(postId: string) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.delete(`${API_URL}/posts/${postId}`)
    console.log("Deleted post:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error)
    throw error
  }
}

// === COMMENTS ===

// POST /comments/ - Create a new comment
export async function createComment(commentData: { author: string; content: string; postId: string }) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.post(`${API_URL}/comments`, commentData)
    console.log("Created comment:", response.data)
    return response.data
  } catch (error) {
    console.error("Error creating comment:", error)
    // For demo purposes, return a mock response
    const newComment = {
      id: `comment-${Date.now()}`,
      ...commentData,
      createdAt: new Date().toISOString(),
      replies: [],
    }
    console.log("Created mock comment:", newComment)
    return newComment
  }
}

// POST /comments/{commentId}/replies - Create a reply to a comment
export async function createCommentReply(commentId: string, replyData: { author: string; content: string }) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.post(`${API_URL}/comments/${commentId}/replies`, replyData)
    console.log("Created comment reply:", response.data)
    return response.data
  } catch (error) {
    console.error("Error creating comment reply:", error)
    // For demo purposes, return a mock response
    const newReply = {
      id: `reply-${Date.now()}`,
      ...replyData,
      createdAt: new Date().toISOString(),
    }
    console.log("Created mock reply:", newReply)
    return newReply
  }
}

// GET /comments/post/{post_id} - Read comments by post ID
export async function getCommentsByPostId(postId: string) {
  try {
    if (!API_URL) {
      console.warn("API_URL is not defined, using mock data")
      return getMockCommentsByPostId(postId)
    }

    const response = await axios.get(`${API_URL}/comments/post/${postId}`)
    console.log("Fetched comments for post:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching comments for post ID ${postId}:`, error)
    // Return mock data as fallback
    return getMockCommentsByPostId(postId)
  }
}

// PUT /comments/{comment_id} - Update a comment
export async function updateComment(commentId: string, commentData: Partial<Comment>) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.put(`${API_URL}/comments/${commentId}`, commentData)
    console.log("Updated comment:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error updating comment with ID ${commentId}:`, error)
    throw error
  }
}

// DELETE /comments/{comment_id} - Delete a comment
export async function deleteComment(commentId: string) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined")
    }

    const response = await axios.delete(`${API_URL}/comments/${commentId}`)
    console.log("Deleted comment:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error deleting comment with ID ${commentId}:`, error)
    throw error
  }
}

// === DEFAULT ===

// GET / - Root endpoint health check
export async function getApiStatus() {
  try {
    if (!API_URL) {
      return { status: "offline", message: "API_URL is not defined" }
    }

    const response = await axios.get(`${API_URL}/`)
    console.log("API status:", response.data)
    return response.data
  } catch (error) {
    console.error("Error checking API status:", error)
    return { status: "offline", error: String(error) }
  }
}
