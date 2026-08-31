import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CategoryDataProps, CategoryTypeDataProps } from "@/types/types"

type CategoryStoreProps = {
  categories: CategoryDataProps[]
  categoryTypes: CategoryTypeDataProps[]
}

export const useCategoryStore = create<CategoryStoreProps>()(
  persist(
    () => {
      return {
        categories: [] as CategoryDataProps[],
        categoryTypes: [] as CategoryTypeDataProps[]
      }
    },
    { name: "category-store" }
  )
)

export function updateCategories(categories: CategoryDataProps[]) {
  useCategoryStore.setState({ categories })
}

export function updateCategoryTypes(categoryTypes: CategoryTypeDataProps[]) {
  useCategoryStore.setState({ categoryTypes })
}
