"use server"

import { z } from "zod"
//import { cookies } from "next/headers"


const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
  dateOfBirth: z.string().refine((date) => {
    const [year, month, day] = date.split('-').map(Number)
    const dob = new Date(year, month - 1, day)
    const ageDifMs = Date.now() - dob.getTime()
    const ageDate = new Date(ageDifMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age >= 21
  }, { message: "You must be at least 21 years old to register" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Specify the field to associate the error with
})

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = registerSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return { success: false, errors: errors }
    }

    const parsedData = registerSchema.parse(formEntries)

    // Proceed with registration logic (e.g., save to database)
    
    console.log("Registration successful:", parsedData)
    return { success: true, data: parsedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}
