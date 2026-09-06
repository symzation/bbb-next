// app/api/username/check/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/db" // your drizzle client
import { reviews } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { validateSlug } from "@/utils/helpers"

function normalizeSlug(raw: string) {
  return raw.trim().toLowerCase()
}

export async function GET(req: Request) {
  console.log("Checking review slug availability")
  const url = new URL(req.url)
  const slugRaw = url.searchParams.get("slug") ?? ""
  const slug = normalizeSlug(decodeURIComponent(slugRaw))

  // Basic guardrails (match your UI rules)
  if (!validateSlug(slug)) {
    return NextResponse.json({ available: false, reason: "invalid" }, { status: 200 })
  }

  // Fast existence check (limits to 1 row)
  const found = await db
    .select({ slug: reviews.slug })
    .from(reviews)
    .where(eq(reviews.slug, slug))
    .limit(1)

  console.log("Review slug found:", found)
  return NextResponse.json({ available: found.length === 0 }, { status: 200 })
}
