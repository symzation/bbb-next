
"use client"

import { useEffect, useRef } from "react"
import { 
  useCategoryStore, updateCategories, updateCategoryTypes, useReviewsStore,
  updateReviewTypes
} from "@/store/store"
import { 
  CategoryDataProps, CategoryTypeDataProps, ReviewTypeDataProps 
} from "@/types/types"
import { getCategories } from "@/lib/db/actions/categories"
import { getCategoryTypes } from "@/lib/db/actions/categoryTypes"
//import { getReviews } from "@/lib/db/actions/reviews"
import { getReviewTypes } from "@/lib/db/actions/reviewTypes"

const defaultDays = 21
const CACHE_TIME = defaultDays * 24 * 60 * 60 * 1000

export default function StoreInitializer() {
  const initializedCategories = useRef(false)
  const initializedReviews = useRef(false)

  const categories = useCategoryStore((state) => state.categories)
  const categoryTypes = useCategoryStore((state) => state.categoryTypes)
  const reviewTypes = useReviewsStore((state) => state.reviewTypes)

  useEffect(() => {
    if (initializedCategories.current) return

    initializedCategories.current = true

    async function initializeCategoryStore() {
      const hasCategories = categories.length > 0
      const hasCategoryTypes = categoryTypes.length > 0
      const isFresh = Date.now() < CACHE_TIME

      // We already have persisted and reasonably fresh data.
      if (hasCategories && hasCategoryTypes && isFresh) return

      // Otherwise refresh it.
      const categoriesResponse = await getCategories()
      const categoriesSort = categoriesResponse.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))
      
      const categoryTypesResponse = await getCategoryTypes()
      const categoryTypesSort = categoryTypesResponse.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))

      /* if (!categoriesResponse?.ok) {
        throw new Error("Failed to load categories")
      }

      if (!categoryTypesResponse?.ok) {
        throw new Error("Failed to load category types")
      } */

      /* const categoriesData = await categoriesResponse.json()
      const categoryTypesData = await categoryTypesResponse.json() */

      updateCategories(categoriesSort as CategoryDataProps[])
      updateCategoryTypes(categoryTypesSort as CategoryTypeDataProps[])
    }

    initializeCategoryStore().catch(console.error)
  }, [ 
    categories, categoryTypes 
  ])

  useEffect(() => {
    if (initializedReviews.current) return

    initializedReviews.current = true

    async function initializeReviewStore() {
      //const hasReviews = reviews.length > 0
      const hasReviewTypes = reviewTypes.length > 0
      const isFresh = Date.now() < CACHE_TIME

      // We already have persisted and reasonably fresh data.
      if (hasReviewTypes && isFresh) return

      // Otherwise refresh it.
      /* const reviewsResponse = await getReviews()
      const reviewsSort = reviewsResponse.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? "")) */
      
      const reviewTypesResponse = await getReviewTypes()
      const reviewTypesSort = reviewTypesResponse.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))

      /* if (!reviewsResponse?.ok) {
        throw new Error("Failed to load reviews")
      }

      if (!reviewTypesResponse?.ok) {
        throw new Error("Failed to load review types")
      } */

      /* const reviewsData = await reviewsResponse.json()
      const reviewTypesData = await reviewTypesResponse.json() */

      updateReviewTypes(reviewTypesSort as ReviewTypeDataProps[])
    }

    initializeReviewStore().catch(console.error)
  }, [ 
    reviewTypes 
  ])
  return null
}
