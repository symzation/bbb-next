import { db } from "@/lib/db"
import { sessions, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { SessionDataProps } from "@/types/types"

type NewSession = typeof sessions.$inferInsert

export async function createDbSession(data: NewSession) {
  try {
    const newSession = await db.insert(sessions).values(data).$returningId()
    return newSession
  } catch (error) {
    console.error("Error creating session:", error)
    throw error
  }
}

export async function deleteDbSessions(userId: number) {
  try {
    const deletedSessions = await db.delete(sessions).where(eq(sessions.userId, userId))
    const affectedRows = (deletedSessions as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Sessions for user ID: ${userId} was successfully deleted.` :
      `No sessions found for user ID ${userId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting sessions:", error)
    throw error
  }
}

export async function getSessionsByUserId(userId: number) {
  try {
    const sessionsByUser = await db.select().from(sessions)
      .where(eq(sessions.userId, userId))
    return sessionsByUser
  } catch (error) {
    console.error("Error getting sessions by user ID:", error)
    throw error
  }
}
