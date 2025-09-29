import { z } from "zod"
//import { cookies } from "next/headers"

type credentialResponseProps = {
  credential: string
  clientId: string
  select_by: string
}

type loginUserInfoProps = {
  email: string
  password: string
}

async function checkLoginAgainstDatabase(parsedData: loginUserInfoProps) {
  console.log('Against DB parsedData: ', parsedData)
  return true
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Invalid password" }),
})

export async function emailLoginAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = loginSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return { success: false, errors: errors }
    }

    const parsedData = loginSchema.parse(formEntries)

    // Proceed with login logic (e.g., save to database)
    const validateLoginData = await checkLoginAgainstDatabase(parsedData)

    console.log("Login successful:", parsedData)
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