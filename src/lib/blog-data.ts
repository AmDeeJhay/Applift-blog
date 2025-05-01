// This file contains the TypeScript interfaces and sample data for the blog posts and comments.

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
  date: string
}

// Define sample blog posts array that can be used as fallback when API fails
export const blogPosts: BlogPost[] = [
  {
    id: "scalable-cloud-platform",
    title: "How We Built a Scalable Cloud Platform for a Fintech <br/> Startup",
    author_name: "Fortune Ishaku",
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
    author_name: "Jenny Wilson",
    date: "3/4/24",
    image: "/assets/images/sideA.png",
    excerpt: "A detailed look at how our team implements agile methodologies to deliver high-quality software on time.",
  },
  {
    id: "agile-workflow-dianne",
    title: "Our Agile Workflow: From Sprint Planning to Retrospective",
    author_name: "Dianne Russell",
    date: "7/11/24",
    image: "/assets/images/sideA.png",
    excerpt: "Discover the key components of our agile process and how we continuously improve our development cycle.",
  },
  {
    id: "agile-workflow-guy",
    title: "Our Agile Workflow: From Sprint Planning to Retrospective",
    author_name: "Guy Hawkins",
    date: "9/4/24",
    image: "/assets/images/sideA.png",
    excerpt:
      "An inside look at our sprint planning, daily standups, and retrospective meetings that drive our development process.",
  },
  {
    id: "cloud-migration",
    title: "5 Lessons Learned from Our Cloud Migration Journey",
    author_name: "Sarah Chen",
    date: "2/15/24",
    image: "/assets/images/sideA.png",
    excerpt: "Key insights and challenges we faced when migrating a legacy system to a modern cloud architecture.",
  },
  {
    id: "devops-practices",
    title: "DevOps Practices That Transformed Our Delivery Pipeline",
    author_name: "Marcus Johnson",
    date: "1/22/24",
    image: "/assets/images/sideA.png",
    excerpt: "How we implemented CI/CD, infrastructure as code, and monitoring to speed up our development cycle.",
  },
];
