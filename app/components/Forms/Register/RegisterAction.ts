"use server"

import { z } from "zod"
import { getCookie } from "@/lib/cookies"
//import { PrismaClient } from "@/generated/prisma/client"
import { hashSalt } from "@/lib/salt"
import { credentialsLogin } from "@/actions/loginActions"
import { createUser } from "@/actions/userDataActions"
import { UserDataProps } from "@/types/types"

//const prisma = new PrismaClient()

const stringLength = process.env.PASSWORD_LETTER_LENGTH ? parseInt(process.env.PASSWORD_LETTER_LENGTH) : 8
const passwordRegExString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const passwordSchema = z.string()
  .min(8, { message: "Invalid password" })
  .regex(passwordRegExString, {
    message: `Password must contain at least one uppercase letter, one special character, and be at least ${stringLength} characters long. `
  }
)

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required. " }).trim(),
  email: z.email({ message: "Invalid email address. " }).trim(),
  password: passwordSchema,
  confirmPassword: z.string().min(1, { message: "Confirm password is required. " }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match. ",
  path: ["confirmPassword"], // Specify the field to associate the error with
})

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = registerSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      return { success: false, errors: errors }
    }

    // Proceed with registration logic (e.g., save to database)
    const ageConsent = await getCookie('age-consent')
    const hashedPassword = await hashSalt(formEntries?.password as string)

    const newUser = createUser({
      name: formEntries.name as string,
      email: formEntries.email as string,
      password: hashedPassword,
      ageConsent: Boolean(ageConsent?.value) ?? false,
    })

    if (!newUser) {
      return { success: false, errors: [{ message: "Failed to create user. " }] }
    }

    // SEND EMAIL TO VERIFY USER'S EMAIL ADDRESS HERE [TODO]
    const loginResult = await credentialsLogin(formData)

    if (!loginResult.success) {
      return { success: false, errors: [{ message: "Registration succeeded but login failed. " }] }
    }

    console.log("Registration successful:", newUser)
    return { success: true, data: newUser }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}
