"use server"

import { z } from "zod"

const reviewFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).trim(),
  slug: z.string().min(1, { message: "Slug is required." }).trim(),
  // store rich text content as text
  content: z.string().min(1, { message: "Content is required." }).trim(),
  batch: z.number({
    message: "Batch must be a valid number",
  })
  .min(0, "Batch must be a positive number.")
  .refine(
    (value) => Number.isInteger(value * 10),
    "Batch can only have one decimal place"
  )
  .optional(),
  proof: z.number({
    message: "Proof must be a valid number",
  })
  .min(0, "Proof must be a positive number.")
  .refine(
    (value) => Number.isInteger(value * 10),
    "Proof can only have one decimal place"
  )
  .optional(),
  abv: z.number({
    message: "ABV must be a valid number",
  })
  .min(0, "ABV must be a positive number.")
  .refine(
    (value) => Number.isInteger(value * 10),
    "ABV can only have one decimal place"
  ).optional(),
  ibu: z.number({
    message: "IBU must be a valid number",
  })
  .min(0, "IBU must be a positive number.")
  .refine(
    (value) => Number.isInteger(value * 10),
    "IBU can only have one decimal place"
  ).optional(),
  rating: z.number({
    message: "Rating must be a valid number",
  })
  .min(0, "Rating must be a positive number.")
  .refine(
    (value) => Number.isInteger(value * 10),
    "Rating can only have one decimal place"
  ),
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
