// app/api/username/check/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/db" // your drizzle client
import { authors } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { validatePenName } from "@/utils/helpers"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const penNameRaw = url.searchParams.get("penname") ?? ""
  const penName = decodeURIComponent(penNameRaw)

  // Basic guardrails (match your UI rules)
  if (
    penName.length < Number(process.env.NEXT_PUBLIC_PENNAME_LENGTH_MIN) || 
    penName.length > Number(process.env.NEXT_PUBLIC_PENNAME_LENGTH_MAX)
  ) {
    return NextResponse.json({ available: false, reason: "invalid_length" }, { status: 200 })
  }
  if (!validatePenName(penNameRaw)) {
    return NextResponse.json({ available: false, reason: "invalid_chars" }, { status: 200 })
  }

  // Fast existence check (limits to 1 row)
  const found = await db
    .select({ penName: authors.penName })
    .from(authors)
    .where(eq(authors.penName, penName))
    .limit(1)

  return NextResponse.json({ available: found.length === 0 }, { status: 200 })
}
