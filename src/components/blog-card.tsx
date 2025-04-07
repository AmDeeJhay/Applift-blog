import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  id: string
  title: string
  author: string
  date: string
  image: string
  featured?: boolean
  excerpt?: string
}

export function BlogCard({ id, title, author, date, image, featured, excerpt }: BlogCardProps) {
  if (featured) {
    return (
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full border-2 border-green-400">Featured</span>
        </div>
        <Link href={`/blogs/${id}`} className="absolute inset-0">
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {excerpt && <p className="mb-2 text-sm text-gray-200 line-clamp-2">{excerpt}</p>}
            <div className="flex items-center text-sm">
              <span className="mr-4">{author}</span>
              <span>{date}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <Link href={`/blogs/${id}`} className="flex gap-4 group">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={image || "/src/assets/images/pics.png"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <div className="mt-2 text-sm">
          <span className="text-blue-600">{author}</span>
          <span className="text-gray-500 ml-2">{date}</span>
        </div>
      </div>
    </Link>
  )
}

