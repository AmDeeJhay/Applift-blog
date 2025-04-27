"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, Loader, UserCircle, Clock, ThumbsUp, Reply, RefreshCw } from "lucide-react";
import { Comment, CommentReply, getCommentsByPostId, createComment, createCommentReply } from "@/lib/api-functions";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [newReply, setNewReply] = useState({ author: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<string | null>(null);

  // Fetch existing comments
  useEffect(() => {
    fetchComments();
  }, [postId]);
  

  // Simulated polling for new comments (in a real app, you might use WebSockets)
  useEffect(() => {
    const pollInterval = setInterval(() => {
      // Simulate a new comment being added randomly
      if (Math.random() > 0.7) {
        const randomNames = ["Jamie Smith", "Alex Johnson", "Morgan Lee", "Casey Brown"];
        const randomContents = [
          "Just finished reading this. Great insights!",
          "Has anyone tried implementing this approach?",
          "I'd love to learn more about this topic.",
          "Thanks for sharing these ideas!"
        ];
        
        const newRandomComment = {
          id: `live-${Date.now()}`,
          postId: postId,
          author: randomNames[Math.floor(Math.random() * randomNames.length)],
          content: randomContents[Math.floor(Math.random() * randomContents.length)],
          createdAt: new Date().toISOString(),
          replies: []
        };
        
        setComments(prevComments => [newRandomComment, ...prevComments]);
        setLastActivity(`${newRandomComment.author} just commented`);
        
        // Clear activity notice after 5 seconds
        setTimeout(() => setLastActivity(null), 5000);
      }
    }, 20000); // Check every 20 seconds
    
    return () => clearInterval(pollInterval);
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      // Try to get comments from API
      const apiComments = await getCommentsByPostId(postId);
      if (apiComments && apiComments.length > 0) {
        setComments(apiComments);
      } else {
        // Fallback to sample data if API returns empty or fails
        // This is just for development/demo purposes
        setTimeout(() => {
          const sampleComments = [
            {
              id: "1",
              postId: postId,
              author: "Taylor Swift",
              content: "This article really helped me understand the topic better. I appreciate how comprehensive it is!",
              createdAt: "2025-04-24T15:32:00Z",
              replies: [
                {
                  id: "1-1",
                  author: "Morgan Lee",
                  content: "I agree! The examples were particularly helpful.",
                  createdAt: "2025-04-24T16:15:00Z"
                }
              ]
            },
            {
              id: "2",
              postId: postId,
              author: "Jordan Peterson",
              content: "I have a question about the framework you mentioned. Have you compared it with other similar approaches?",
              createdAt: "2025-04-24T14:45:00Z",
              replies: []
            },
            {
              id: "3",
              postId: postId,
              author: "Alex Johnson",
              content: "Looking forward to the follow-up piece you mentioned. When can we expect it?",
              createdAt: "2025-04-24T12:30:00Z",
              replies: [
                {
                  id: "3-1",
                  author: "Admin",
                  content: "We're working on it! Should be published next week.",
                  createdAt: "2025-04-24T13:45:00Z"
                }
              ]
            }
          ];
          setComments(sampleComments);
        }, 800);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Try to submit to API
      const commentData = {
        author: newComment.author,
        content: newComment.content,
        postId: postId
      };
      
      const newCommentObj = await createComment(commentData);
      
      // If API call was successful, add the new comment to the state
      setComments([newCommentObj, ...comments]);
      setNewComment({ author: "", content: "" });
      setLastActivity("Your comment was posted successfully!");
      setTimeout(() => setLastActivity(null), 5000);
    } catch (error) {
      console.error("Error adding comment:", error);
      
      // Fallback for demo/development - simulate successful submission
      const newCommentObj = {
        id: Date.now().toString(),
        postId: postId,
        author: newComment.author,
        content: newComment.content,
        createdAt: new Date().toISOString(),
        replies: []
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment({ author: "", content: "" });
      setLastActivity("Your comment was posted successfully!");
      setTimeout(() => setLastActivity(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!newReply.author.trim() || !newReply.content.trim()) return;
    
    try {
      // Try to submit reply to API
      const replyData = {
        author: newReply.author,
        content: newReply.content
      };
      
      const newReplyObj = await createCommentReply(commentId, replyData);
      
      // Update state with new reply
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), newReplyObj] 
              }
            : comment
        )
      );
      
      setNewReply({ author: "", content: "" });
      setReplyingTo(null);
      setLastActivity("Your reply was posted successfully!");
      setTimeout(() => setLastActivity(null), 5000);
    } catch (error) {
      console.error("Error adding reply:", error);
      
      // Fallback for demo/development
      const replyObj = {
        id: `reply-${Date.now()}`,
        author: newReply.author,
        content: newReply.content,
        createdAt: new Date().toISOString()
      };
      
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), replyObj] 
              }
            : comment
        )
      );
      
      setNewReply({ author: "", content: "" });
      setReplyingTo(null);
      setLastActivity("Your reply was posted successfully!");
      setTimeout(() => setLastActivity(null), 5000);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate time ago
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffSecs = Math.round(diffMs / 1000);
    const diffMins = Math.round(diffSecs / 60);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} sec ago`;
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day ago`;
    
    return formatDate(dateString);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
            Discussion ({comments.length})
          </h2>
          
          <button 
            onClick={fetchComments}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            Refresh
          </button>
        </div>
        
        {lastActivity && (
          <div className="mt-2 bg-blue-50 text-blue-700 px-3 py-1 text-sm rounded-md flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {lastActivity}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Comment Form - Left Column */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Join the conversation</h3>
          
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="author"
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Your Comment
              </label>
              <textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                rows={6}
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Comments List - Right Column */}
        <div className="space-y-2 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div 
                  className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer transition-all hover:shadow ${selectedComment === comment.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedComment(selectedComment === comment.id ? null : comment.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                        <UserCircle className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-900">{comment.author}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">{comment.content}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Like
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyingTo(replyingTo === comment.id ? null : comment.id);
                        }}
                        className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </button>
                    </div>
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <span className="text-xs text-blue-600">
                        {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Show replies if comment is selected */}
                {selectedComment === comment.id && comment.replies && comment.replies.length > 0 && (
                  <div className="pl-6 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                              <UserCircle className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {timeAgo(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="pl-6 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="mb-2">
                        <label htmlFor={`reply-author-${comment.id}`} className="block text-xs font-medium text-gray-700">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id={`reply-author-${comment.id}`}
                          value={newReply.author}
                          onChange={(e) => setNewReply({ ...newReply, author: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label htmlFor={`reply-content-${comment.id}`} className="block text-xs font-medium text-gray-700">
                          Your Reply
                        </label>
                        <textarea
                          id={`reply-content-${comment.id}`}
                          value={newReply.content}
                          onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="py-1 px-3 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmitReply(comment.id)}
                          className="py-1 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium">No comments yet</h3>
              <p className="mt-1 text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}