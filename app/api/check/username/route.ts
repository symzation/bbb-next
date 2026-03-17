// app/api/username/check/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/db" // your drizzle client
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { validateUsername } from "@/utils/helpers"

function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase()
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const usernameRaw = url.searchParams.get("username") ?? ""
  const username = normalizeUsername(decodeURIComponent(usernameRaw))

  // Basic guardrails (match your UI rules)
  if (
    username.length < Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MIN) || 
    username.length > Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MAX)
  ) {
    return NextResponse.json({ available: false, reason: "invalid_length" }, { status: 200 })
  }
  
  if (!validateUsername(username)) {
    return NextResponse.json({ available: false, reason: "invalid_chars" }, { status: 200 })
  }

  // Fast existence check (limits to 1 row)
  const found = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  return NextResponse.json({ available: found.length === 0 }, { status: 200 })
}
