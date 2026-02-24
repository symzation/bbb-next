"use server"

import { z } from "zod"

const mailingListSchema = z.object({
  email: z.email({ message: "Invalid email address. " }).trim(),
})

export async function RegisterAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const parsedData = mailingListSchema.safeParse(formEntries)

    if (!parsedData.success) {
      const errors = z.flattenError(parsedData.error).fieldErrors
      return { success: false, errors: errors }
    }

    /**
     * Send email to Resend mailing list logic goes here
     */

    /* if (!newUser) {
      return { success: false, errors: [{ message: "Failed to create user. " }] }
    } */


    console.log("Added to mailing list successful:")
    return { success: true, data: parsedData.data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}
