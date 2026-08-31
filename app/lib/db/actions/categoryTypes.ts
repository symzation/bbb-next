"use server"

import { db } from "@/lib/db"
import { asc, eq } from "drizzle-orm"
import { categoryTypes } from "@/lib/db/schema"
import { CategoryTypeDataProps } from "@/types/types"

export type NewCategoryType = typeof categoryTypes.$inferInsert

export async function createCategoryType(categoryType: NewCategoryType) {
  try {
    const newCategoryType = await db.insert(categoryTypes).values(categoryType)
      .$returningId()

    return newCategoryType
  } catch (error) {
    console.error("Error creating category type:", error)
    throw error
  }
}

export async function getCategoryTypes() {
  try {
    const allCategoryTypes = await db.select().from(categoryTypes)
    return allCategoryTypes
  } catch (error) {
    console.error("Error getting category types:", error)
    throw error
  }
}

export async function getCategoryTypesByCategoryId(productCategoryId: number) {
  try {
    const categoryProductTypes = await db.select()
      .from(categoryTypes)
      .where(eq(categoryTypes.categoryId, productCategoryId))

    return categoryProductTypes
  } catch (error) {
    console.error("Error getting category types:", error)
    throw error
  }
}

export async function getCategoryTypeById(categoryTypeId: number) {
  try {
    const categoryType = await db.select()
      .from(categoryTypes)
      .where(eq(categoryTypes.id, categoryTypeId))

    return categoryType
  } catch (error) {
    console.error("Error getting category type by ID:", error)
    throw error
  }
}

export async function deleteCategoryType(categoryTypeId: number) {
  try {
    const deletedCategoryType = await db.delete(categoryTypes)
      .where(eq(categoryTypes.id, categoryTypeId))

    const affectedRows = (deletedCategoryType as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Category Type with ID ${categoryTypeId} was successfully deleted.` :
      `No category types found with ID ${categoryTypeId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting category type:", error)
    throw error
  }
}

export async function updateCategoryType(
  categoryTypeId: number, data: Partial<CategoryTypeDataProps>
) {
  try {
    console.log('Update Category Type: ', data)
    const updatedCategoryType = await db.update(categoryTypes)
      .set(data)
      .where(eq(categoryTypes.id, categoryTypeId))

    const updatedCategoryRows = (updatedCategoryType as any)[0]?.affectedRows ?? 0
    console.log(`Updated ${updatedCategoryRows} rows`)

    return updatedCategoryRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating category type:", error)
    throw error
  }
}
