"use server"

import { TransferManager } from '@google-cloud/storage'
import { gcs, bucket } from "@/lib/google-storage"

type GCSImageProps = {
  images: string[]
  folder: string
}

// Creates a client
const storage = gcs

// Creates a transfer manager client
const transferManager = new TransferManager(storage.bucket(bucket.name))

export async function uploadManyGCStorageImages(GCSImages: GCSImageProps) {
  // Uploads the files
  await transferManager.uploadManyFiles(GCSImages.images, { prefix: GCSImages.folder });

  for (const filePath of GCSImages.images) {
    console.log(`${filePath} uploaded to '${bucket.name}/${GCSImages.folder}'.`);
  }
}

/* uploadManyGCStorageImages({
  images: ['path/to/image1.jpg', 'path/to/image2.jpg'],
  folder: `images/`
}).catch(console.error) */

export async function getGCStorageImages(folder: string) {
  const [files] = await bucket.getFiles({ prefix: folder })

  /* const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file.name)
  ) */

  const images = await Promise.all(
    files.map(async (file) => {
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000),
      })

      return {
        name: file.name,
        fileName: file.name.split('/').pop(),
        url,
      };
    })
  )

  return images
}

export async function uploadProfileGCSImage(profileImage: File) {
  try {
    if (!profileImage || profileImage.size === 0) {
      throw new Error("No file uploaded");
    }
    
    const buffer = Buffer.from(await profileImage.arrayBuffer())
    const filename = `${Date.now()}_${profileImage.name.replaceAll(" ", "_")}`
    const folderPath = process.env.GCS_AVATARS_FOLDER
    
    // Generate a unique filename to prevent overwriting existing files
    const blob = storage.bucket(bucket.name).file(`${folderPath}/${filename}`)

    // Stream the buffer into the Google Cloud Storage Bucket
    await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: profileImage.type, // Ensures the browser renders it properly later
        },
      })

      blobStream.on('error', (err) => reject(err))
      blobStream.on('finish', () => resolve(true))
      blobStream.end(buffer)
    });

    return { 
      success: true, 
      message: `Successfully uploaded ${filename}! to ${folderPath}` 
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, message: error.message || "Upload failed." };
  }
}