import { db } from "@/lib/db/connect"
import { accounts } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

type NewAccount = typeof accounts.$inferInsert

export async function createDBAccount(account: NewAccount) {
  try {
    const newAccount = await db.insert(accounts).values(account).$returningId()
    return newAccount
  } catch (error) {
    console.error("Error creating account:", error)
    throw error
  }
}

export async function deleteDBAccounts(userId: string) {
  try {
    const deletedAccounts = await db.delete(accounts).where(eq(accounts.userId, userId))
    const affectedRows = (deletedAccounts as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Acccount with ID ${userId} was successfully deleted.` :
      `No accounts found with ID ${userId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting account:", error)
    throw error 
  }
}