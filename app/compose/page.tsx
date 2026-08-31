"use client"

import { useEffect, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
//import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { CategoryDataProps, CategoryTypeDataProps, ReviewDataProps } from "@/types/types"
import ReviewForm from "@/components/Forms/Review/ReviewForm"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export default function ComposeReview() {
  /* const params = useParams<{ slug?: string }>()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "" */

  const [reviewTypeSelected, setReviewTypeSelected] = useState<string | undefined>(undefined)
  const [reviewCategoryTypeSelected, setReviewCategoryTypeSelected] = useState<string | undefined>(undefined)
  
  const { categories, categoryTypes } = useCategoryStore(
    useShallow(state => ({
      categories: state.categories,
      categoryTypes: state.categoryTypes,
    }))
  )

  const categoryName = categories.find((category: CategoryDataProps) => category.id === Number(reviewTypeSelected))?.name

  console.log('categoryName:', categoryName)

  const getCategoryTypesForSelected = () => {
    return categoryTypes.filter((type: CategoryTypeDataProps) => type.categoryId === Number(reviewTypeSelected))
  }

  return (
    <div className={cn(styles.pageClass, "px-10")}>
      <h1 className="text-3xl font-bold mb-4">Compose Your Review</h1>
      <p className={styles.paragraph}>
        Craft your review using the form below. Provide thoughtful observations, detailed insights, and an honest assessment of your experience. Take a moment to review your content for accuracy and completeness before submitting for publication.
      </p>
      <div className="mb-2">Select the type of review you want to compose</div>
      {/* Review Categories Select */}
      <div className="mb-4">
        <Select 
          name="reviewType" 
          value={reviewTypeSelected ?? undefined} 
          onValueChange={(value) => setReviewTypeSelected(value)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Review Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">Review Type</SelectItem>
              {categories.map((category: CategoryDataProps) => (
                <SelectItem key={category.name} value={`${category.id}`}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Review Category Types Select */}
      <div className={cn("mb-4", reviewTypeSelected ? "" : "hidden")}>
        <Select 
          name="reviewCategoryType" 
          value={reviewCategoryTypeSelected ?? undefined} 
          onValueChange={(value) => setReviewCategoryTypeSelected(value ?? undefined)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Review Category Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">Review Category Type</SelectItem>
              {getCategoryTypesForSelected().map((categoryType: CategoryTypeDataProps) => (
                <SelectItem key={categoryType.name} value={categoryType.name}>
                  {categoryType.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>


      <div className={cn("", reviewCategoryTypeSelected ? "" : "hidden")}>
        <h2 className="text-2xl font-bold mb-2">
          Showing {`${reviewTypeSelected} - ${categoryName}`} Review Form
        </h2>
        <h2 className="text-2xl font-bold mb-2">
          Showing {reviewCategoryTypeSelected} Review Category
        </h2>
      </div>
    
      {reviewTypeSelected && reviewCategoryTypeSelected && (
        <>
          

          {/* <ReviewForm slug={slug} /> */}
        </>
      )}
    </div>
  )
}
