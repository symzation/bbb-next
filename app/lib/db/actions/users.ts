"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { ENUM_ROLE } from "@/types/enums"
import { UserDataProps } from "@/types/types"

type NewUser = typeof users.$inferInsert

export async function insertUser(user: NewUser) {
  try {
    const newUser = await db.insert(users).values(user).$returningId()
    return newUser // return new user id
  } catch (error) {
    console.error("Error inserting user:", error)
    throw error
  }
}

export async function deleteUser(userId: number) {
  try {
    const deletedUser = await db.delete(users).where(eq(users.id, userId))
    const affectedRows = (deletedUser as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `User with ID ${userId} was successfully deleted.` :
      `No users found with ID ${userId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error 
  }
}

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users)
    return allUsers
  } catch (error) {
    console.error("Error getting users:", error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export async function getUserById(userId: number) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId))
    return user
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export async function getUsersByRole(role: string) {
  try {
    const usersByRole = db.select().from(users)
      .where(eq(users.role, ENUM_ROLE[role.toUpperCase() as keyof typeof ENUM_ROLE]))
    return usersByRole
  } catch (error) {
    console.error("Error getting users by role:", error)
    throw error
  }
}

export async function deactivateUser(userId: number) {
  try {
    const deactivatedUser = await db.update(users)
      .set({ suspended: true, suspendedAt: sql`NOW()` })
      .where(eq(users.id, userId))

    const deactivatedRows = (deactivatedUser as any).affectedRows
    console.log(`Deactivated ${deactivatedRows} rows`)

    return deactivatedRows > 0 ? true : false
  } catch (error) {
    console.error("Error deactivating user:", error)
    throw error
  }
}

export async function updateUser(
  userId: number, data: Partial<UserDataProps>
) {
  try {
    const updatedUser = await db.update(users)
      .set(data)
      .where(eq(users.id, userId))

      console.log("updateUser - updatedUser:", updatedUser)
    const affectedRows = (updatedUser as any)[0]?.affectedRows ?? 0
    return affectedRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating user:", error)  
    throw error
  }
}
