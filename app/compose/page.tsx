"use client"

import { useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { useReviewsStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { ReviewTypeDataProps, ReviewDataProps } from "@/types/types"
import ReviewForm from "@/components/Forms/Review/ReviewForm"

export default function ComposeReview() {
  const [reviewTypeSelected, setReviewTypeSelected] = useState("")
  const [reviewData, setReviewData] = useState<ReviewDataProps | undefined>(undefined)

  const { reviewTypes } = useReviewsStore(
    useShallow(state => ({
      reviewTypes: state.reviewTypes,
    }))
  )

  const reviewPublisheStatus = reviewData?.isPublished ? "Published" 
    : reviewData?.readyToPublish ? "Ready to Publish" : "Draft"

  const reviewStatusClass = reviewData?.isPublished ? "text-success" 
    : reviewData?.readyToPublish ? "text-caution" : "text-warning"

  /* useEffect(() => {
    // Retrieve the review content data based on the slug
    const fetchReviewContentData = async () => {
      try {
        const result = await getReviewBySlug(slug)
        const data: ReviewDataProps | null = Array.isArray(result) ? (result[0] as ReviewDataProps) : result

        if (!data) {
          throw new Error("Failed to fetch review content data")
        }
        setReviewContentData(data)
        setReviewType(data.reviewType)
        setReviewTitle(data.reviewTitle)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviewContentData()
  }, [slug]) */

  return (
    <div className={cn(styles.pageClass)}>
      <h1 className={styles.pageHeading}>Compose Your Review</h1>
      <p className={styles.paragraph}>
        Craft your review using the form below. Provide thoughtful observations, detailed insights, and an honest assessment of your experience. Take a moment to review your content for accuracy and completeness before submitting for publication.
      </p>
      <div className="flex flex-col mb-4">
        <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide mb-1")}>
          <span className="text-error">*</span> Please select the type of review you would like to compose. 
        </label>
        <Select 
          name="reviewType" 
          value={reviewTypeSelected}
          onValueChange={(value) => setReviewTypeSelected(value)}
        >
          <SelectTrigger className={cn(styles.selectTriggerClass)}>
            <SelectValue placeholder="Review Type" />
          </SelectTrigger>
          <SelectContent className={cn(styles.selectContentClass)}>
              <SelectItem value="">Select Review Type</SelectItem>
              {reviewTypes.map((reviewType: ReviewTypeDataProps) => (
                <SelectItem 
                  key={reviewType.name} 
                  value={`${reviewType.id}`} 
                  className={styles.selectItemClass}
                >
                  {reviewType.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      {reviewTypeSelected && (
        <div className="text-sm font-bold tracking-wide mb-4">
          <span className="mr-2">Publish Status:</span> 
          <span className={cn("font-bold", reviewStatusClass)}>
            {reviewPublisheStatus}
          </span>
        </div>
      )}

      {reviewTypeSelected === "1" && <ReviewForm reviewType={reviewTypeSelected} />}
      {/* reviewTypeSelected === "2" && <GuideForm reviewType={reviewTypeSelected} /> */}
      {/* reviewTypeSelected === "3" && <ExperienceForm reviewType={reviewTypeSelected} /> */}
    </div>
  )
}
