
import { Metadata } from "next"
import { getCookie } from "@/lib/cookies"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
//import BlogList from "@/components/Blog/BlogList"
import ReviewList from "@/components/Reviews/ReviewList"

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Read the latest reviews on bourbon, coffee and craft beers at ${process.env.NEXT_PUBLIC_SITENAME}. Discover honest opinions and immersive storytelling from our community of reviewers.`,
}

export default async function ReviewsPage() {
  const categoryCookie = await getCookie("categorySelected")

  return (
    <div className={cn(styles.pageClass)}>
      <h1 className={styles.pageHeading}>Reviews</h1>
      <ReviewList category={categoryCookie?.value} />
      {/* <BlogList count={20} /> */}
    </div>
  )
}
