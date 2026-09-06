"use client"

import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import ReviewForm from "@/components/Forms/Review/ReviewForm"

export default function ComposeReview() {
  return (
    <div className={cn(styles.pageClass)}>
      <h1 className={styles.pageHeading}>Compose Your Review</h1>
      <p className={styles.paragraph}>
        Craft your review using the form below. Provide thoughtful observations, detailed insights, and an honest assessment of your experience. Take a moment to review your content for accuracy and completeness before submitting for publication.
      </p>
      <ReviewForm />
    </div>
  )
}
