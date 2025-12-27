import { db } from "@/lib/db/connect"
import { authors, users } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { AuthorDataType } from "@/types/types"

type NewAuthor = typeof authors.$inferInsert

export async function createAuthor(author: NewAuthor) {
  try {
    const newAuthor = await db.insert(authors).values(author).$returningId()
    return newAuthor // return new user id
  } catch (error) {
    console.error("Error creating author:", error)
    throw error
  }
}

export async function getAuthors() {
  try {
    const allAuthors = await db.select().from(authors)
      .innerJoin(users, eq(authors.userId, users.id))
    return allAuthors
  } catch (error) {
    console.error("Error getting authors:", error)
    throw error
  }
}
export async function getAuthorAwaitingApproval() {
  try {
    const authorsAwaitingApproval = await db.select().from(authors)
      .where(eq(users.role, 'AUTHOR_WAITING_APPROVAL'))
      .innerJoin(users, eq(authors.userId, users.id))
    return authorsAwaitingApproval
  } catch (error) {
    console.error("Error getting authors awaiting approval:", error)
    throw error
  }
}

export async function updateAuthor(
  authorId: string, data: Partial<AuthorDataType>
) {
  try {
    console.log('Update Author: ', data)
    const updatedAuthor = await db.update(authors)
      .set(data)
      .where(eq(authors.id, authorId))

    const updatedAuthorRows = (updatedAuthor as any).affectedRows
    console.log(`Updated ${updatedAuthorRows} rows`)

    return updatedAuthorRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating author:", error)
    throw error
  } 
}
