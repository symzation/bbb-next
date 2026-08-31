import { Storage } from "@google-cloud/storage"

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
const clientEmail = process.env.GOOGLE_CLOUD_CLIENT_EMAIL
const privateKey = process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n")

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Google Cloud credentials are not configured.")
}

export const storage = new Storage({
  projectId,
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
})

export const bucket = storage.bucket(
  process.env.GOOGLE_CLOUD_BUCKET as string
)