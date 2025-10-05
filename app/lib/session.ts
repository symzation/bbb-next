"use server"

import { z } from "zod"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSSION_SECRET
const encoderKey = new TextEncoder().encode(secretKey)

export async function createSession(userId: string, expiresIn?: number) {
  const maxAge = 60 * 60 * 24 * (expiresIn ?? 7) * 1000 // 7 days
  const expiresAt = new Date(Date.now() + maxAge)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set("session", session, {
    //secure: process.env.NODE_ENV === "devlopment",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

type SessionPayload = {
  userId: string
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encoderKey)
}

export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, encoderKey, {
      algorithms: ["HS256"],
    })
    const sessionSchema = z.object({
      userId: z.string(),
      expiresAt: z.coerce.date(),
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session")
    return null
  }
}