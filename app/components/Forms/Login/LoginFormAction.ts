import { z } from "zod"
import { credentialsLogin } from "@/actions/loginActions"

type credentialResponseProps = {
  credential: string
  clientId: string
  select_by: string
}

type loginUserInfoProps = {
  email: string
  password: string
}

const passwordSchema = z.string().regex(
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]).{8,}$/, {
    message: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long."
  }
)

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  //password: z.string().min(8, { message: "Invalid password" }),
  password: passwordSchema,
})

export async function emailLoginAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = loginSchema.safeParse(formEntries)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return { success: false, errors: errors }
    }

    //const parsedData = loginSchema.parse(formEntries)

    // Proceed with login logic (e.g., save to database)
    const validateLoginData = await credentialsLogin(formData)
    console.log('validateLoginData: ', validateLoginData)
    
    if (validateLoginData?.error) {
      throw new Error(validateLoginData.error)
    } else {
      console.log("Login successful")
      return { success: true, data: validateLoginData }
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.error("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}