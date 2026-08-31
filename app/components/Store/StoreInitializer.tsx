
"use client"

import { useEffect, useRef } from "react"
import { 
  useCategoryStore, updateCategories, updateCategoryTypes
} from "@/store/store"
import { CategoryDataProps, CategoryTypeDataProps } from "@/types/types"
import { getCategories } from "@/lib/db/actions/categories"
import { getCategoryTypes } from "@/lib/db/actions/categoryTypes"

const days = 14
const CACHE_TIME = days * 24 * 60 * 60 * 1000

export default function StoreInitializer() {
  const initialized = useRef(false)

  const categories = useCategoryStore((state) => state.categories)
  const categoryTypes = useCategoryStore((state) => state.categoryTypes)

  useEffect(() => {
    if (initialized.current) return

    initialized.current = true

    async function initializeStore() {
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

    initializeStore().catch(console.error)
  }, [ 
    categories, categoryTypes 
  ])

  return null
}