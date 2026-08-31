"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { getReviewsByCategory } from "@/lib/db/actions/reviews"
import { ReviewDataProps } from "@/types/types"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export default function ReviewList() {
  const { categories, categoryTypes } = useCategoryStore(
    useShallow(state => ({
      categories: state.categories,
      categoryTypes: state.categoryTypes,
    }))
  )
  
  const [categorySelected, setCategorySelected] = useState("all")
  /* const [reviewProductTypes, setReviewProductTypes] = useState<Partial<ProductTypeDataProps>[]>([]) */
  const [reviews, setReviews] = useState<ReviewDataProps[]>([])
  
  const reviewProductLinks = cn(styles.linkClass, "text-blue-500 no-underline first:before:content-[''] before:px-2 before:content-['|']")
  
  /* useEffect(() => {
    const fetchProductTypes = async () => {
      const types = await getProductTypes()
      setReviewProductTypes(types as ProductTypeDataProps[])
    }

    fetchProductTypes()
  }, []) */
  
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviewsByCategory(categorySelected, 12)
      const normalizedReviews = Array.isArray(reviewsData)
        ? reviewsData
            .map((item: any) => item?.reviews ?? item)
            .filter((item: any): item is ReviewDataProps => !!item && typeof item === "object" && "id" in item)
        : []

      setReviews(normalizedReviews)
    }

    fetchReviews()
  }, [categorySelected])

  const getReviewsList = () => {
    if (reviews && reviews.length > 0) {
      return reviews.map((review: ReviewDataProps) => {
        return (
          <div key={review.id} className={cn(styles.blogGridItem)}>
            <div className={cn("w-full px-4 pb-5 border-b border-b-primary grow")}>
              {review.content}
            </div>
          </div>
        )
      })
    } else {
      return (
        <div className="text-error font-bold m-0 text-center list-none">
          There are currently no reviews at this time.
        </div>
      )
    }
  }

  return (
    <>
      <div>category selected: {categorySelected}</div>
      <div className="flex justify-start items-start gap-2 mt-4 text-sm">
        <div className="text-sm text-gray-500">Filter by category:</div>
        <div className="-ml-4">
          <Link 
            href="#"
            className={reviewProductLinks}
            onClick={() => setCategorySelected("All")}
          >
            All
          </Link>
          {categories.map((type) => {
            return (
              <Link 
                key={type.name}
                href="#"
                className={reviewProductLinks}
                onClick={() => setCategorySelected(type.name as string)}
              >
                {type.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className={cn(styles.blogGrid, 'mt-10')}>
        {getReviewsList()}
      </div>
    </>
  )
}