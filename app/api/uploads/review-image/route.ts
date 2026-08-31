import { NextRequest, NextResponse } from "next/server"
import { bucket } from "@/lib/google-storage"
import crypto from "crypto"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      fileName,
      contentType,
    }: {
      fileName: string
      contentType: string
    } = body

    if (!fileName || !contentType) {
      return NextResponse.json(
        {
          error: "File name and content type are required.",
        },
        {
          status: 400,
        }
      )
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        {
          error: "Unsupported image type.",
        },
        {
          status: 400,
        }
      )
    }

    const extension = fileName
      .split(".")
      .pop()
      ?.toLowerCase()

    const id = crypto.randomUUID()

    /*
     * Organize review images inside:
     *
     * reviews/
     *    2026/
     *       uuid-image.jpg
     */

    const year = new Date().getFullYear()

    const objectName = `reviews/${year}/${id}.${extension}`

    const file = bucket.file(objectName)

    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,

      contentType,
    })

    const publicUrl =
      `${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_IMAGE_URL}/${objectName}`

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      objectName,
    })
  } catch (error) {
    console.error("Image upload URL error:", error)

    return NextResponse.json(
      {
        error: "Unable to create image upload URL.",
      },
      {
        status: 500,
      }
    )
  }
}