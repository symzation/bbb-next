// app/api/places/autocomplete/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input")?.trim();

  if (!input || input.length < 3) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY" },
      { status: 500 }
    );
  }

  // Optional: bias results (example: US)
  const regionCode = searchParams.get("regionCode") ?? "US";

  // Places API (new) Autocomplete endpoint
  const url = "https://places.googleapis.com/v1/places:autocomplete";

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      // Field mask keeps responses small (and cheaper)
      "X-Goog-FieldMask":
        "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
    },
    body: JSON.stringify({
      input,
      regionCode,
      // You can add locationBias / locationRestriction here if needed
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    return NextResponse.json(
      { error: "Google Places error", details: text },
      { status: resp.status }
    );
  }

  const data = await resp.json();

  // Normalize the response into a simple array
  const predictions =
    data?.suggestions
      ?.map((s: any) => s.placePrediction)
      ?.filter(Boolean)
      ?.map((p: any) => ({
        placeId: p.placeId,
        description: p.text?.text ?? "",
      })) ?? [];

  return NextResponse.json({ predictions });
}
