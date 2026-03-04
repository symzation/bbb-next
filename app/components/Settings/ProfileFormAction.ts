"use server"

import { z } from "zod"
import { GetAuthSession, updateAuthSession } from "@/actions/sessionActions"
import { updateUser } from "@/lib/db/actions/users"
import { profileImageUpload } from "@/actions/profileImageActions"
import { validateBio, validateUsername} from "@/utils/helpers"


export async function profileFormAction(prevState: any, formData: FormData) {
  const session = await GetAuthSession()
  //const NEXT_PUBLIC_BIO_MAX_LENGTH = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH)
  const NEXT_PUBLIC_BIO_MAX_LENGTH = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH)
  const USERNAME_LENGTH_MIN = Number(process.env.USERNAME_LENGTH_MIN) || 3
  const USERNAME_LENGTH_MAX = Number(process.env.USERNAME_LENGTH_MAX) || 32
  const MAX_FILE_SIZE = 512 * 512 * 4 // Approx 1MB for a 512x512 image with 4 bytes per pixel
  const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png"]

  const fileSchema = z.instanceof(File)
    .superRefine((file, ctx) => {
      if (file && !ACCEPTED_MIME_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: "custom",
          path: ["profileImage"],
          message: `File must be one of [
            ${ACCEPTED_MIME_TYPES.join(", ")}
          ] but was ${file.type}`,
        })
      }
      if (file && file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: "custom",
          path: ["profileImage"],
          message: `File size must be less than ${
            MAX_FILE_SIZE / (512 * 512)
          }MB`,
        })
      }
    })
    .optional()

  /* const bioSchema = z.string()
    .max(
      NEXT_PUBLIC_BIO_MAX_LENGTH, 
      { message: `Bio must be at most ${NEXT_PUBLIC_BIO_MAX_LENGTH} characters` }
    )
    .refine((value) => {
      const test = validateBio(JSON.stringify(value))
      console.log('Bio RegEx test:', test)
      return test
    }, { message: "Bio cannot contain special characters." })
    .optional() */

  const usernameSchema = z.string()
    .min(
      USERNAME_LENGTH_MIN, 
      { message: `Username must be at least ${USERNAME_LENGTH_MIN} characters` }
    )
    .max(
      USERNAME_LENGTH_MAX, 
      { message: `Username must be at most ${USERNAME_LENGTH_MAX} characters` }
    )
    .refine((val) => {
      const test = validateUsername(val)
      console.log('Username RegEx test:', test)
      // Need to add async check for existing username here
      return test
    }, { message: "Can only contain letters, numbers, and underscores." })
    .trim()
    .optional()

  const profileSchema = z.object({
    username: usernameSchema,
    email: z.email({ message: "Invalid email address" }).trim(),
    name: z.string()
      .min(1, { message: "Name must be at least 1 character" })
      //.max(50, { message: "Name must be less than 50 characters" })
      .trim(),
    //bio: bioSchema,
    file: fileSchema
  })

  try {
    //console.log('profileFormAction - session:', session)
    const formEntries = Object.fromEntries(formData)
    const userId = Number(session?.user?.id)
    const result = profileSchema.safeParse(formEntries)
    console.log('profileFormAction - validation result:', result)
    
    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      return { success: false, errors: errors }
    }
    
    console.log("Validated form formData:", formData.get("profileImage"))
    console.log("Validated form formEntries:", formEntries.profileImage)
    /* console.log("Validated form entries:", formEntries)
    console.log("Validated userId:", userId) */ 
    
    const profileImage = formData.get("profileImage")
    if (profileImage instanceof File && profileImage.size > 0) {
      const imgUpload = await profileImageUpload(profileImage)
      if (imgUpload?.data?.filename) {
        const folder = process.env.PROFILE_IMAGE_FOLDER
        formEntries.image = `${folder?.replace("public", "")}${imgUpload.data.filename}`
      }
    }
    
    delete formEntries.profileId
    delete formEntries.profileImage

    const updatedUser = await updateUser(userId, formEntries)
    console.log("Update successful:", updatedUser)

    if (!updatedUser) {
      return { success: false, errors: [{ message: "User to update not found. " }] }
    }

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