"use client";

import { createContext, useState, useContext, useEffect } from "react";

import { ReactNode } from "react";
import { BlogPost } from "@/lib/actions"; // Import BlogPost type
import { getAllPosts } from "@/lib/api-functions";

// Create context
interface BlogContextType {
  blogPosts: BlogPost[]; // Add blogPosts to the context
    fetchData: () => Promise<void>; // Add fetchPosts function
    loading: boolean; // Loading state

}




const BlogContext = createContext<BlogContextType | null>(null);

// Context provider
export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // State for blog posts
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data has been fetched
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state


  useEffect(() => {
    if (!isDataFetched) {
      fetchData();
    }

    if (isDataFetched) {
      setLoading(false);
    }
    // stop loading when data is fetched
  }, [isDataFetched]);

  const fetchData = async () => {

    try {
        setLoading(true); // Set loading state
      setError(null); // Reset error state

      // Fetch blog profile & stores in parallel
      const res = await getAllPosts();
 

      setBlogPosts(res.map(post => ({ ...post, content: post.content || "" })));
      setIsDataFetched(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is cleared after fetch
    }
  };

  return (
    <BlogContext.Provider
      value={{ blogPosts, fetchData,loading }} // Provide blogPosts and fetchPosts to context consumers
    >
       
        {children}
     
    </BlogContext.Provider>
  );
};

// Custom hook for accessing context
export const useBlogContext = () => useContext(BlogContext);

