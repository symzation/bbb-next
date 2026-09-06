"use client"

import { useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import {
  Select, SelectContent, SelectItem, SelectLabel,SelectTrigger, SelectValue
} from "@/components/ui/select"
import { CategoryDataProps, CategoryTypeDataProps, ReviewDataProps } from "@/types/types"
import ReviewForm from "@/components/Forms/Review/ReviewForm"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export default function ComposeReview() {
  const [reviewTypeSelected, setReviewTypeSelected] = useState<string>("")
  const [reviewCategoryTypeSelected, setReviewCategoryTypeSelected] = useState<string>("")
  
  const { categories, categoryTypes } = useCategoryStore(
    useShallow(state => ({
      categories: state.categories,
      categoryTypes: state.categoryTypes,
    }))
  )
  
  const categoryName = categories.find((category: CategoryDataProps) => category.id === Number(reviewTypeSelected))?.name

  const categorySelectsClass = "focus-visible:ring-[0px]"

  const getCategoryTypesForSelected = () => {
    return categoryTypes.filter((type: CategoryTypeDataProps) => type.categoryId === Number(reviewTypeSelected))
  }

  const handleCategorySelected = (value: string) => {
    setReviewTypeSelected(value)
    setReviewCategoryTypeSelected("")
  }



  return (
    <>
      <div className="mb-2">Select the type of review you want to compose</div>
      {/* Review Categories Select */}
      <div className="mb-4">
        <label className={styles.formLabel}>Review Category</label>
        <Select 
          name="reviewType" 
          value={reviewTypeSelected ?? ""}
          onValueChange={(value) => handleCategorySelected(value)}
        >
          <SelectTrigger className={categorySelectsClass}>
            <SelectValue placeholder="Review Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">Review Category</SelectItem>
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
        <label className={styles.formLabel}>Review Category Types</label>
        <Select 
          name="reviewCategoryType" 
          value={reviewCategoryTypeSelected ?? ""} 
          onValueChange={(value) => setReviewCategoryTypeSelected(value)}
        >
          <SelectTrigger className={categorySelectsClass}>
            <SelectValue placeholder={`${categoryName} Types`} />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">{`${categoryName} Types`}</SelectItem>
              {getCategoryTypesForSelected().map((categoryType: CategoryTypeDataProps) => (
                <SelectItem key={categoryType.name} value={`${categoryType.id}`}>
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
      { reviewTypeSelected !== "" && reviewCategoryTypeSelected !== "" && <ReviewForm /> }
    </>
  )
}
