export interface UploadedImage {
  url: string
  objectName: string
}

export async function uploadReviewImage(
  file: File
): Promise<UploadedImage> {
  const response = await fetch("/api/uploads/review-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const data = await response.json()

    throw new Error(
      data.error ?? "Unable to upload image."
    )
  }

  const {
    uploadUrl,
    publicUrl,
    objectName,
  } = await response.json()

  /*
   * Upload directly from the browser to
   * Google Cloud Storage.
   */

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
    cache: "no-store",
  })

  if (!uploadResponse.ok) {
    throw new Error("Google Cloud image upload failed.")
  }

  return {
    url: publicUrl,
    objectName,
  }
}