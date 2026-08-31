"use server"

import { db } from "@/lib/db"
import { asc, eq } from "drizzle-orm"
import { categories } from "@/lib/db/schema"
import { CategoryDataProps } from "@/types/types"

export type NewCategory = typeof categories.$inferInsert

export async function createCategory(category: NewCategory) {
  try {
    const newCategory = await db.insert(categories).values(category).$returningId()
    return newCategory
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

export async function getCategories() {
  try {
    const allCategories = await db.select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.name))
      
    return allCategories
  } catch (error) {
    console.error("Error getting categories:", error)
    throw error
  }
}

export async function getCategoryById(categoryId: number) {
  try {
    const category = await db.select()
      .from(categories)
      .where(eq(categories.id, categoryId))

    return category
  } catch (error) {
    console.error("Error getting category by ID:", error)
    throw error
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const deletedProductCategory = await db.delete(categories)
      .where(eq(categories.id, categoryId))

    const affectedRows = (deletedProductCategory as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Category with ID ${categoryId} was successfully deleted.` :
      `No categories found with ID ${categoryId} or no rows were deleted.`
    )

    return affectedRows > 0 ? true : false
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
}

export async function updateCategory(
  categoryId: number, 
  data: Partial<CategoryDataProps>
) {
  try {
    console.log('Update Product Category: ', data)
    const updatedCategory = await db.update(categories)
      .set(data)
      .where(eq(categories.id, categoryId))

    const updatedCategoryRows = (updatedCategory as any)[0]?.affectedRows ?? 0
    console.log(`Updated ${updatedCategoryRows} rows`)

    return updatedCategoryRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating category:", error)
    throw error
  }
}
