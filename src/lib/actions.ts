// "use server"
// renamed this file to actions as it contains all api actions for the blog

import axios from "axios";
const API_URL = process.env.API_URL;

export interface BlogPost {
 id: string;
  title: string;
  author_name: string;
  content: string;
  date?: string;
  image?: string;
  excerpt?: string;
  featured?: boolean;
  category?: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  comment_count?: number;
}


//   export const blogPosts: BlogPost[] = [
//   {
//     id: "scalable-cloud-platform",
//     title: "How We Built a Scalable Cloud Platform for a Fintech Startup",
//     author: "Fortune Ishaku",
//     date: "3/07/24",
//     image: "/assets/images/featured-img.png",
//     excerpt:
//       "Learn how we designed and implemented a cloud-native platform that scales with business growth and handles millions of transactions.",
//     featured: true,
//     category: "Cloud",
//   },
//   {
//     id: "agile-workflow-jenny",
//     title: "Our Agile Workflow: From Sprint Planning to Retrospective",
//     author: "Jenny Wilson",
//     date: "3/4/24",
//     image: "/assets/images/sideA.png",
//     excerpt: "A detailed look at how our team implements agile methodologies to deliver high-quality software on time.",
//     category: "Agile",
//   },
//   {
//     id: "agile-workflow-dianne",
//     title: "Our Agile Workflow: From Sprint Planning to Retrospective",
//     author: "Dianne Russell",
//     date: "7/11/24",
//     image: "/assets/images/sideA.png",
//     excerpt: "Discover the key components of our agile process and how we continuously improve our development cycle.",
//     category: "Agile",
//   },
//   {
//     id: "agile-workflow-guy",
//     title: "Our Agile Workflow: From Sprint Planning to Retrospective",
//     author: "Guy Hawkins",
//     date: "9/4/24",
//     image: "/assets/images/pics.png",
//     excerpt:
//       "An inside look at our sprint planning, daily standups, and retrospective meetings that drive our development process.",
//     category: "Agile",
//   },
//   {
//     id: "cloud-migration",
//     title: "5 Lessons Learned from Our Cloud Migration Journey",
//     author: "Sarah Chen",
//     date: "2/15/24",
//     image: "/assets/images/pics.png",
//     excerpt: "Key insights and challenges we faced when migrating a legacy system to a modern cloud architecture.",
//     category: "Cloud",
//   },
//   {
//     id: "devops-practices",
//     title: "DevOps Practices That Transformed Our Delivery Pipeline",
//     author: "Marcus Johnson",
//     date: "1/22/24",
//     image: "/assets/images/pics.png",
//     excerpt: "How we implemented CI/CD, infrastructure as code, and monitoring to speed up our development cycle.",
//     category: "DevOps",
//   },
//   {
//     id: "microservices-architecture",
//     title: "Microservices Architecture: Benefits and Challenges",
//     author: "Elena Rodriguez",
//     date: "4/10/24",
//     image: "/assets/images/pics.png",
//     excerpt: "Our experience implementing a microservices architecture and the lessons we learned along the way.",
//     category: "Architecture",
//   },
//   {
//     id: "ai-in-software-development",
//     title: "How We're Using AI to Improve Software Development",
//     author: "David Kim",
//     date: "5/2/24",
//     image: "/assets/images/pics.png",
//     excerpt: "Practical applications of AI and machine learning in our software development process.",
//     category: "AI",
//   },
//   {
//     id: "mobile-app-performance",
//     title: "Optimizing Mobile App Performance: Our Approach",
//     author: "Sophia Patel",
//     date: "3/28/24",
//     image: "/assets/images/pics.png",
//     excerpt: "Techniques and strategies we use to ensure our mobile applications perform well on all devices.",
//     category: "Mobile",
//   },
//   {
//     id: "security-best-practices",
//     title: "Security Best Practices for Modern Web Applications",
//     author: "Michael Brown",
//     date: "2/5/24",
//     image: "/assets/images/pics.png",
//     excerpt: "Essential security measures we implement to protect our web applications from common threats.",
//     category: "Security",
//   },
// ]

// Fetch blog post by ID using Axios
export async function FetchPosts(): Promise<BlogPost[] | undefined> {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log("Fetched Blog Posts:", response.data);

    // Convert id to string and ensure correct typing
    const blogPosts: BlogPost[] = response.data.map((post: any) => ({
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      published: post.published,
      author_name: post.author_name,
      created_at: post.created_at,
      updated_at: post.updated_at,
      comment_count: post.comment_count,
    }));

    return blogPosts; // Return properly typed array
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return undefined; // Return undefined if there's an error
  }
}


export async function CreatePost(
  post: BlogPost
): Promise<BlogPost[] | undefined> {
  try {
    const response = await axios.post(`${API_URL}/posts/`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    }); // Include post data
    console.log("Created Blog Post:", response.data);

    // If the API returns the created post, you may not need an array here
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return undefined;
  }
}