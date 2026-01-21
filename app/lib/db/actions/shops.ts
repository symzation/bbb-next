import { db } from "@/lib/db"
import { shops } from "@/lib/db/schema"
import { ShopDataProps } from "@/types/types"
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

export async function getShopById(shopId: number) {
  try {
    const shop = await db.select().from(shops).where(eq(shops.id, shopId))
    return shop
  } catch (error) {
    console.error("Error getting shop by ID:", error)
    throw error
  }
}

export async function updateShop(
  shopId: number, data: Partial<ShopDataProps>
) {
  try {
    const updatedShop = await db.update(shops)
      .set(data)
      .where(eq(shops.id, shopId))
      
    const affectedRows = (updatedShop as any)[0]?.affectedRows ?? 0
    return affectedRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating shop:", error)  
    throw error
  }
}