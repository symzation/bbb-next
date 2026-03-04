
import { Metadata } from "next"
import BlogList from "@/components/Blog/BlogList"

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Read the latest reviews on fine spirits, craft beers, wines, coffees, and great food at ${process.env.NEXT_PUBLIC_SITENAME}. Discover honest opinions and immersive storytelling from our community of reviewers.`,
}

export default function ReviewsPage() {
  return (
    <div className="flex flex-col">
      <BlogList count={20} />
    </div>
  )
}
