// "use server"
// renamed this file to actions as it contains all api actions for the blog

export interface BlogPost {
 id: string;
  title: string;
  author_name: string;
  content: string;
  date?: string;
  image?: string;
  excerpt: string;
  featured?: boolean;
  category?: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  comment_count?: number;
}




