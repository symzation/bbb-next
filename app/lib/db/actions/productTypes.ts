import { db } from "@/lib/db"
import { asc, eq } from "drizzle-orm"
import { productTypes } from "@/lib/db/schema"
import { ProductTypeDataProps } from "@/types/types"

export type NewProductType = typeof productTypes.$inferInsert

export async function createProductType(productType: NewProductType) {
  try {
    const newProductType = await db.insert(productTypes).values(productType).$returningId()
    return newProductType
  } catch (error) {
    console.error("Error creating product type:", error)
    throw error
  }
}

export async function getProductTypes() {
  try {
    const allProductTypes = await db.select().from(productTypes)
    return allProductTypes
  } catch (error) {
    console.error("Error getting product types:", error)
    throw error
  }
}

export async function getProductTypeById(productTypeId: number) {
  try {
    const productType = await db.select()
      .from(productTypes)
      .where(eq(productTypes.id, productTypeId))

    return productType
  } catch (error) {
    console.error("Error getting product type by ID:", error)
    throw error
  }
}

export async function deleteProductType(productTypeId: number) {
  try {
    const deletedProductType = await db.delete(productTypes)
      .where(eq(productTypes.id, productTypeId))

    const affectedRows = (deletedProductType as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Product Type with ID ${productTypeId} was successfully deleted.` :
      `No product types found with ID ${productTypeId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting product type:", error)
    throw error
  }
}

export async function updateProductType(
  productTypeId: number, data: Partial<ProductTypeDataProps>
) {
  try {
    console.log('Update Product Type: ', data)
    const updatedProductType = await db.update(productTypes)
      .set(data)
      .where(eq(productTypes.id, productTypeId))

    const updatedProductRows = (updatedProductType as any)[0]?.affectedRows ?? 0
    console.log(`Updated ${updatedProductRows} rows`)

    return updatedProductRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}
