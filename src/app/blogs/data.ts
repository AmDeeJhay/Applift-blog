export interface BlogPost {
    id: string
    title: string
    author: string
    date: string
    image: string
    excerpt: string
    content?: string
    featured?: boolean
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: "scalable-cloud-platform",
      title: "How We Built a Scalable Cloud Platform for a Fintech Startup",
      author: "Fortune Ishaku",
      date: "3/07/24",
      image: "/placeholder.svg?height=400&width=800",
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
      image: "/placeholder.svg?height=100&width=150",
      excerpt: "A detailed look at how our team implements agile methodologies to deliver high-quality software on time.",
    },
    {
      id: "agile-workflow-dianne",
      title: "Our Agile Workflow: From Sprint Planning to Retrospective",
      author: "Dianne Russell",
      date: "7/11/24",
      image: "/placeholder.svg?height=100&width=150",
      excerpt: "Discover the key components of our agile process and how we continuously improve our development cycle.",
    },
    {
      id: "agile-workflow-guy",
      title: "Our Agile Workflow: From Sprint Planning to Retrospective",
      author: "Guy Hawkins",
      date: "9/4/24",
      image: "/placeholder.svg?height=100&width=150",
      excerpt:
        "An inside look at our sprint planning, daily standups, and retrospective meetings that drive our development process.",
    },
    {
      id: "cloud-migration",
      title: "5 Lessons Learned from Our Cloud Migration Journey",
      author: "Sarah Chen",
      date: "2/15/24",
      image: "/placeholder.svg?height=100&width=150",
      excerpt: "Key insights and challenges we faced when migrating a legacy system to a modern cloud architecture.",
    },
    {
      id: "devops-practices",
      title: "DevOps Practices That Transformed Our Delivery Pipeline",
      author: "Marcus Johnson",
      date: "1/22/24",
      image: "/placeholder.svg?height=100&width=150",
      excerpt: "How we implemented CI/CD, infrastructure as code, and monitoring to speed up our development cycle.",
    },
  ]
