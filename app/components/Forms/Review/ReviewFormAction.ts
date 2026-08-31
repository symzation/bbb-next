"use server"

import { z } from "zod"

const reviewFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).trim(),
  lastName: z.string().min(1, { message: "Last name is required." }).trim(),
  email: z.email({ message: "Invalid email address." }).trim(),
  phone: z.string()
    .min(1, { message: "Phone number is required." })
    .max(10, { message: "Phone number is too long." })
    .trim(),
  message: z.string()
    .min(1, { message: "Message is required." })
    .max(500, { message: "Message is too long." })
    .trim(),
})

export async function ReviewFormAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = reviewFormSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      return { success: false, errors: errors }
    }

    console.log("Contact Form submission successful:", formEntries)
    return { success: true, data: formEntries }

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}
