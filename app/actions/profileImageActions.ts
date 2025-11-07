"use server"

import fs from "fs/promises"
import path from "node:path"

export async function profileImageUpload(profileImage: File) {
  const profileImageFolder = process.env.PROFILE_IMAGE_FOLDER

  try {
    if (!profileImageFolder) {
      return { success: false, error: "Profile image folder is not configured." }
    }
  
    if (!profileImage) {
      return { success: false, error: "No file uploaded." }
    }
    
    const buffer = Buffer.from(await profileImage.arrayBuffer())
    const filename = Date.now() + "_" + profileImage.name.replaceAll(" ", "_")
    const folderPath = process.env.PROFILE_IMAGE_FOLDER
    const uploadPath = path.join(process.cwd(), profileImageFolder, 
      `${folderPath?.replace('public', '') ?? '/profiles/'}${filename}`
    )

    await fs.writeFile(uploadPath, buffer)

    return { success: true, data: { filename } }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Image upload failed." }
  }
}