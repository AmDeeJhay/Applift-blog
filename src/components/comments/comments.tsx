"use client";

import { useState, useEffect } from "react";
import { getCommentsByPostId, createCommentReply, createComment } from "@/lib/api-functions";

interface CommentReply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  replies: CommentReply[];
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    fetchComments();
  }, );

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const commentsData = await getCommentsByPostId(postId);
      setComments(commentsData); // Assuming the API returns an array of comments with replies
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (commentId: string, replyData: { author: string; content: string }) => {
    try {
      const newReply = await createCommentReply(commentId, replyData);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
    } catch (err) {
      console.error("Error submitting reply:", err);
    }
  };

  const handleCommentSubmit = async (commentData: { author: string; content: string }) => {
    try {
      const newComment = await createComment({ ...commentData, postId });
      setComments((prevComments) => [newComment, ...prevComments]);
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4">
            <div className="p-4 border rounded-lg">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>

              <ul className="mt-2 pl-4 border-l">
                {comment.replies.map((reply) => (
                  <li key={reply.id} className="mb-2">
                    <p className="font-bold">{reply.author}</p>
                    <p>{reply.content}</p>
                    <p className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>

              {/* Reply Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const author = formData.get("author") as string;
                  const content = formData.get("content") as string;
                  handleReplySubmit(comment.id, { author, content });
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="mt-2">
                  <input
                    type="text"
                    name="author"
                    placeholder="Your name"
                    className="border p-2 rounded w-full mb-2"
                    required
                  />
                  <textarea
                    name="content"
                    placeholder="Write a reply..."
                    className="border p-2 rounded w-full mb-2"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          </li>
        ))}
      </ul>

      {/* Comment Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const author = formData.get("author") as string;
          const content = formData.get("content") as string;
          handleCommentSubmit({ author, content });
          (e.target as HTMLFormElement).reset();
        }}
        className="mt-6"
      >
        <h3 className="text-lg font-medium mb-2">Add a Comment</h3>
        <input
          type="text"
          name="author"
          placeholder="Your name"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <textarea
          name="content"
          placeholder="Write a comment..."
          className="border p-2 rounded w-full mb-2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}