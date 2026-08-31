'use client'

import { useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { formatPhoneNumber } from "@/utils/helpers"
import Editor from "@/components/Editor/Editor"
import { ReviewFormAction } from "@/components/Forms/Review/ReviewFormAction"
import { getReviewBySlug } from "@/lib/db/actions/reviews"
import { ReviewDataProps } from "@/types/types"

export default function ReviewForm({ slug }: { slug: string }) {
  const [reviewContentData, setReviewContentData] = useState<ReviewDataProps | null>(null)
  const [reviewType, setReviewType] = useState<string>("")

  const [reviewTitle, setReviewTitle] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(ReviewFormAction, undefined)

  const reviewPublisheStatus = slug ? "Published" : "Draft"
  const reviewStatusClass = formState?.success ? "text-success" : "text-warning"

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

  useEffect(() => {
    if (formState && formState?.success) {
    }
  }, [formState])

  return (
    <div className="mt-0 mb-2">
      <div className="mb-4">
        <span className="mr-2">Publish Status:</span> 
        <span className={cn("font-bold", reviewStatusClass)}>{reviewPublisheStatus}</span>
      </div>
      <form action={formAction} className="flex flex-col space-y-4 w-full mx-auto">
        <div className="flex flex-col">
          <label 
            htmlFor="reviewTitle" 
            className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
          >
            <span className="text-error">*</span> Review Title 
          </label>
          <input type="text" name="reviewTitle" defaultValue={reviewTitle} 
            placeholder="Review Title" className={cn(styles.formInput)}
            onBlur={(e) => setReviewTitle(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewTitle" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).reviewTitle)
                ? (formState.errors as any).reviewTitle.join(", ")
                : String((formState.errors as any).reviewTitle)
              }
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="content" 
            className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
          >
            <span className="text-error">*</span>Review 
          </label>
          <Editor value={reviewContentData?.content || ""} />
          {/* {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "content" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).content)
                ? (formState.errors as any).content.join(", ")
                : String((formState.errors as any).content)
              }
            </span>
          )} */}
        </div>
      </form>
    </div>
  )
}