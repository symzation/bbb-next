"use server"

import { z } from "zod"
import { deleteUser, getUserByEmail } from "@/lib/db/actions/users"

export async function deleteAccountAction(
  prevState: any, formData: FormData
) {
  const deleteUserSchema = z.object({
    deleteInputTerm: z.string().min(1, { message: `Deletion term is invalid ` }),
    deleteTerm: z.string().min(1, { message: `Deletion term is required.` }),
  }).refine((data) => data.deleteInputTerm === data.deleteTerm, {
    message: "Deletion term typed is not correct.",
    path: ["deleteTerm"], // Specify the field to associate the error with
  })

  try {
    const formEntries = Object.fromEntries(formData)
    const result = deleteUserSchema.safeParse(formEntries)
    
    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      return { success: false, errors: errors }
    }

    const usersToDelete = await getUserByEmail(String(formEntries.userEmail))
    const userToDelete = Array.isArray(usersToDelete) ? usersToDelete[0] : usersToDelete

    if (!userToDelete) {
      return { success: false, errors: [{ message: "User to delete not found. " }] }
    }

    console.log("Deleting user: ", userToDelete)
    const deletedUser = await deleteUser(Number(userToDelete.id))

    if (!deletedUser) {
      return { success: false, errors: [{ message: "Failed to delete user. " }] }
    }

    console.log("Deletion successful:", deletedUser)
    return { success: true, data: deletedUser }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}