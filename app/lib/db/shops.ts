import { db } from "@/lib/db/connect"
import { shops } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"

type NewShop = typeof shops.$inferInsert

export async function createShop(shop: NewShop) {
  try {
    const newShop = await db.insert(shops).values(shop).$returningId()
    return newShop
  } catch (error) {
    console.error("Error creating shop:", error)
    throw error
  }
}

export async function getShops() {
  try {
    const allShops = await db.select().from(shops)
    return allShops
  } catch (error) {
    console.error("Error getting shops:", error)
    throw error
  }
}

export async function getShopById(shopId: string) {
  try {
    const shop = await db.select().from(shops).where(eq(shops.id, shopId))
    return shop
  } catch (error) {
    console.error("Error getting shop by ID:", error)
    throw error
  }
}