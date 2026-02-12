import { db } from "@/lib/db"
import { eq, sql, count } from "drizzle-orm"
import { addresses, shops, shopTypes } from "@/lib/db/schema"
import { ShopDataProps } from "@/types/types"

type NewShop = typeof shops.$inferInsert

export async function createShop(newShopData: NewShop) {
  try {
    const newShop = await db.insert(shops).values(newShopData).$returningId()
    return newShop
  } catch (error) {
    console.error("Error creating shop:", error)
    throw error
  }
}

export async function countShops() {
  const result = await db.select({ count: count() }).from(shops)
  //const total = result[0]?.count ?? 0
console.log('Shoups Count: ', result)
  return result
}

export async function getRandomShop() {
  /* const totalShops = await db.select({ count: count() }).from(shops)
  const randomOffset = Math.floor(Math.random() * 20)
 */
  try {
    const randomShop = await db.select().from(shops)
    //.innerJoin(addresses, eq(shops.addressId, addresses.id))
    //.innerJoin(shopTypes, eq(shops.shopTypeId, shopTypes.id))
    //.orderBy(sql`RAND()`)
    //.limit(1)
    //.offset(randomOffset)

    console.log('randomShop: ',randomShop)
    //return randomShop[0] ?? null
    return randomShop[0] ?? null
  } catch (error) {
    console.error("Error getting random shop:", error)
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