
import BlogList from "@/components/Blog/BlogList"

export default function Articles() {
  return (
    <div className="flex flex-col">
      <BlogList count={20} />
    </div>
  )
}
