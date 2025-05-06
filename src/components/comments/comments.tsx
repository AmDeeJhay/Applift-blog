"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getCommentsByPostId, createCommentReply, createComment } from "@/lib/api-functions"

interface CommentReply {
  id: string
  author: string
  content: string
  createdAt: string
}

interface Comment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
  replies: CommentReply[]
}

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newCommentAuthor, setNewCommentAuthor] = useState("")
  const [newCommentContent, setNewCommentContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyAuthor, setReplyAuthor] = useState("")
  const [replyContent, setReplyContent] = useState("")

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    if (!postId) return

    setLoading(true)
    setError(null)
    try {
      const commentsData = await getCommentsByPostId(postId)
      setComments(Array.isArray(commentsData) ? commentsData : [])
    } catch (err) {
      console.error("Error fetching comments:", err)
      setError("Failed to load comments. Please try again later.")
      setComments([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  const handleReplySubmit = async (commentId: string) => {
    if (!replyAuthor.trim() || !replyContent.trim()) {
      return
    }

    try {
      const newReply = await createCommentReply(commentId, {
        author: replyAuthor,
        content: replyContent,
      })

      // Update the comments state with the new reply
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              }
            : comment,
        ),
      )

      // Reset form
      setReplyingTo(null)
      setReplyAuthor("")
      setReplyContent("")
    } catch (err) {
      console.error("Error submitting reply:", err)
      alert("Failed to submit reply. Please try again.")
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newCommentAuthor.trim() || !newCommentContent.trim()) {
      return
    }

    try {
      const newComment = await createComment({
        author: newCommentAuthor,
        content: newCommentContent,
        postId,
      })

      // Add the new comment to the top of the list
      setComments((prevComments) => [newComment, ...prevComments])

      // Reset form
      setNewCommentAuthor("")
      setNewCommentContent("")
    } catch (err) {
      console.error("Error submitting comment:", err)
      alert("Failed to submit comment. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-10 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Join the conversation</h3>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="author"
            value={newCommentAuthor}
            onChange={(e) => setNewCommentAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="content"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your thoughts..."
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div>
        <h3 className="text-xl font-semibold mb-6">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        {loading && <p className="text-gray-500">Loading comments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        <ul className="space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b border-gray-100 pb-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 mr-3">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 ml-13">{comment.content}</p>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="ml-12 mb-4 bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Reply to {comment.author}</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your reply..."
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  <button
                    onClick={() => handleReplySubmit(comment.id)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Reply
                  </button>
                </div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <ul className="ml-12 space-y-4 mt-4">
                  {comment.replies.map((reply) => (
                    <li key={reply.id} className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 mr-3">
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{reply.author}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()} at{" "}
                            {new Date(reply.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-11">{reply.content}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
