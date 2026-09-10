"use server"

import { db } from "@/lib/db"
import { asc, eq } from "drizzle-orm"
import { categories, reviewTypes } from "@/lib/db/schema"
import { ReviewTypeDataProps } from "@/types/types"

export type NewReviewType = typeof reviewTypes.$inferInsert

export async function createReviewType(reviewType: NewReviewType) {
  try {
    const newReviewType = await db.insert(reviewTypes).values(reviewType)
      .$returningId()

    return newReviewType
  } catch (error) {
    console.error("Error creating review type:", error)
    throw error
  }
}

export async function getReviewTypes() {
  try {
    const allReviewTypes = await db.select()
      .from(reviewTypes)
      .where(eq(reviewTypes.isActive, true))
      .orderBy(asc(reviewTypes.name))

    return allReviewTypes
  } catch (error) {
    console.error("Error getting review types:", error)
    throw error
  }
}

export async function getReviewTypeById(reviewTypeId: number) {
  try {
    const reviewType = await db.select().from(reviewTypes)
      .where(eq(reviewTypes.id, reviewTypeId))

    return reviewType
  } catch (error) {
    console.error("Error getting review type by ID:", error)
    throw error
  }
}

export async function getReviewTypeByName(reviewTypeName: string) {
  try {
    const reviewType = await db.select()
      .from(reviewTypes)
      .where(eq(reviewTypes.name, reviewTypeName))

    return reviewType
  } catch (error) {
    console.error("Error getting review type by name:", error)
    throw error
  }
}

export async function deleteReviewType(reviewTypeId: number) {
  try {
    const deletedReviewType = await db.delete(reviewTypes)
      .where(eq(reviewTypes.id, reviewTypeId))

    const affectedRows = (deletedReviewType as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Review Type with ID ${reviewTypeId} was successfully deleted.` :
      `No review types found with ID ${reviewTypeId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting review type:", error)
    throw error
  }
}

export async function updateReviewType(
  reviewTypeId: number, data: Partial<ReviewTypeDataProps>
) {
  try {
    console.log('Update Review Type: ', data)
    const updatedReviewType = await db.update(reviewTypes)
      .set(data)
      .where(eq(reviewTypes.id, reviewTypeId))

    const updatedReviewRows = (updatedReviewType as any)[0]?.affectedRows ?? 0
    console.log(`Updated ${updatedReviewRows} rows`)

    return updatedReviewRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating review type:", error)
    throw error
  }
}
