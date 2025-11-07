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

const stringLength = process.env.PASSWORD_LETTER_LENGTH ? parseInt(process.env.PASSWORD_LETTER_LENGTH) : 8
const regExString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const passwordSchema = z.string()
  .min(8, { message: "Invalid password" })
  .regex(regExString, {
    message: `Password must contain at least one uppercase letter, one special character, and be at least ${stringLength} characters long. `
  }
)

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: passwordSchema,
})

export async function emailLoginAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    const result = loginSchema.safeParse(formEntries)

    if (!result.success) {
      return { 
        success: false, 
        errors: z.flattenError(result.error).fieldErrors
      }
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