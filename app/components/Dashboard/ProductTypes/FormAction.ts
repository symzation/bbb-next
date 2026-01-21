"use server"

import { z } from "zod"
import { getCookie } from "@/lib/cookies"
import { hashSalt } from "@/lib/salt"
import { credentialsLogin } from "@/actions/loginActions"
import { createProductType } from "@/lib/db/actions/products"

const productTypeFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required. " }).trim(),
})

export async function ProductTypesFormAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = productTypeFormSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      return { success: false, errors: errors }
    }

    // Proceed with registration logic (e.g., save to database)
    const newProductType = createProductType({
      name: formEntries.name as string,
    })

    if (!newProductType) {
      return { success: false, errors: [
        { message: "Failed to create new product type. " }
      ] }
    }

    return { success: true, data: newProductType }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}
