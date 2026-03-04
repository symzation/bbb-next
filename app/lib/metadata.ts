import type { Metadata } from "next"

export function createMetadata({
  title,
  description,
}: {
  title: string
  description: string
}): Metadata {
  return {
    title,
    description,
  }
}