import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the blogs page
  redirect("/blogs")
}

