"use server"

import { z } from "zod"
import { updateUser, createAuthor } from "@/lib/db/queries"
import { getAuthSession, updateAuthSession } from "@/actions/sessionActions"
import { ENUM_ROLE } from '@/types/enums'

const maxLength = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH)

const isAtTermsEndSchema = z.string().refine(val => val === "true", {
  message: "You must read or scroll down to the end of the reviewer's terms and conditions",
})

const reviewerTermsSchema = z.union([
  z.string().transform((data) => data === "on" ? true : false),
  z.literal(undefined).transform(() => false),
])

const reviewerSignupSchema = z.object({
  isAtTermsEnd: isAtTermsEndSchema,
  whyReviewer: z.string()
    .min(20, { message: "Must be at least 20 characters" })
    .max(maxLength, { message: `Must be at most ${maxLength} characters` })
    .trim(),
  reviewerTerms: reviewerTermsSchema
})
.refine((data) => /^\S.*$/.test(data.whyReviewer), {
  message: "Cannot start or end with whitespace",
})
.superRefine((data, ctx) => {
  if (!data.reviewerTerms) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must agree to the reviewer's terms and conditions",
      path: ['reviewerTerms'],
    })
  }
})

export async function authorFormAction(prevState: any, formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData)
    console.log('formEntries:', formEntries)
    const parsedData = reviewerSignupSchema.safeParse(formEntries)
    console.log('parsedData:', parsedData)

    if (!parsedData.success) {
      return { 
        success: false, 
        errors: z.flattenError(parsedData.error).fieldErrors
      }
    }

    // Proceed with login logic (e.g., save to database)
    const session = await getAuthSession()
    console.log('session in authorFormAction:', session) 

    if (!session || !session.user) {
      return { success: false, errors: [{ message: "User session not found" }] }
    }

    const userId = String(session.user.id)

    await updateUser(userId, { role: ENUM_ROLE.AUTHOR_WAITING_APPROVAL})

    const newAuthor = await createAuthor({
      userId: userId,
      whyReviewer: parsedData.data.whyReviewer,
    })
    
    console.log("Author Form - Updated user:", newAuthor)
    
    const sessionUpdated = await updateAuthSession({
      role: ENUM_ROLE.AUTHOR_WAITING_APPROVAL
    })
    console.log("Author Form - Updated session:", sessionUpdated)

    return { success: true, data: newAuthor, errors: [] }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error)
      return { success: false, errors: error }
    }
    console.log("Unexpected error:", error)
    return { success: false, errors: [{ message: "An unexpected error occurred" }] }
  }
}