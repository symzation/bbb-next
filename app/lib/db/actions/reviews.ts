"use server"

import { db } from "@/lib/db"
import { categories, reviews, users } from "@/lib/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import { ReviewDataProps } from "@/types/types"

type NewReviews = typeof reviews.$inferInsert

export async function createReview(review: NewReviews) {
  try {
    const newReview = await db.insert(reviews).values(review).$returningId()
    return newReview
  } catch (error) {
    console.error("Error creating review:", error)
    throw error
  }
}

export async function deleteReview(reviewId: number) {
  try {
    const deletedReview = await db.delete(reviews).where(eq(reviews.id, reviewId))
    const affectedRows = (deletedReview as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Review with ID ${reviewId} was successfully deleted.` :
      `No reviews found with ID ${reviewId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting review:", error)
    throw error
  }
}

export async function getReviews() {
  try {
    const allReviews = await db.select()
      .from(reviews)
      .innerJoin(categories, eq(reviews.categoryId, categories.id))
      .where(eq(reviews.isPublished, true))
      .orderBy(desc(reviews.publishedAt))

    return allReviews
  } catch (error) {
    console.error("Error getting reviews:", error)
    throw error
  }
}

export async function getReviewsByCategory(
  category: string = 'all', 
  limit: number = 12
) {
  if (category === 'all') {
    return getReviewsByLimit(limit)
  } else {
    try {
      const reviewsByCategory = await db.select()
        .from(reviews)
        .innerJoin(categories, eq(reviews.categoryId, categories.id))
        .where(
          and(
            eq(categories.name, category),
            eq(reviews.isPublished, true)
          )
        )
        .orderBy(desc(reviews.publishedAt))
        .limit(limit + 3) // Replace 10 with the desired limit
  
      return reviewsByCategory
    } catch (error) {
      console.error("Error getting reviews by category:", error)
      throw error
    }
  }
}

export async function getReviewsByLimit(limit: number = 12) {
  try {
    const reviewsByLimit = await db.select()
      .from(reviews)
      .innerJoin(categories, eq(reviews.categoryId, categories.id))
      .where(eq(reviews.isPublished, true))
      .orderBy(desc(reviews.publishedAt))
      .limit(limit + 3) // Replace 10 with the desired limit

    return reviewsByLimit.length > 0 ? reviewsByLimit : []
  } catch (error) {
    console.error("Error getting reviews by limit:", error)
    throw error
  }
}

export async function getReviewBySlug(slug: string) {
  try {
    const review = await db.select()
      .from(reviews)
      .innerJoin(categories, eq(reviews.categoryId, categories.id))
      .where(eq(reviews.slug, slug))
    return review
  } catch (error) {
    console.error("Error getting review by slug:", error)
    throw error
  }
}

export async function updateReview(
  reviewId: number, data: Partial<ReviewDataProps>
) {
  try {
    console.log('Update Review: ', data)
    const updatedReview = await db.update(reviews)
      .set(data)
      .where(eq(reviews.id, reviewId))

    const updatedReviewRows = (updatedReview as any).affectedRows
    console.log(`Updated ${updatedReviewRows} rows`)

    return updatedReviewRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating review:", error)
    throw error
  }
}

