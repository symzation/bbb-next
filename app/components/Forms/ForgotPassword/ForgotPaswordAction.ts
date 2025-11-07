"use server"

import { z } from "zod"
//import { cookies } from "next/headers"

const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
})

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = forgotPasswordSchema.safeParse(formEntries)

    if (!result.success) {
      return { 
        success: false, 
        errors: z.flattenError(result.error).fieldErrors 
      }
    }

    const parsedData = forgotPasswordSchema.parse(formEntries)

    // Proceed with registration logic (e.g., save to database)

    console.log("Forgot Password Reset successful:", parsedData)
    return { success: true, data: parsedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.issues)
      return { success: false, errors: error.issues }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}