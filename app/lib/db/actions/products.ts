import { db } from "@/lib/db"
import { products, productTypes, shops } from "@/lib/db/schema"
import { asc, desc, eq } from "drizzle-orm"
import { ProductDataProps } from "@/types/types"
import { getProductTypes } from "@/lib/db/actions/productTypes"

type NewProducts = typeof products.$inferInsert

export async function createProduct(product: NewProducts) {
  try {
    const newProduct = await db.insert(products).values(product).$returningId()
    return newProduct
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

export async function deleteProduct(productId: number) {
  try {
    const deletedProduct = await db.delete(products).where(eq(products.id, productId))
    const affectedRows = (deletedProduct as any).affectedRows
    
    console.log(
      (affectedRows > 0) ? 
      `Product with ID ${productId} was successfully deleted.` :
      `No products found with ID ${productId} or no rows were deleted.`
    )

    return (affectedRows > 0) ? true : false
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

export async function getProducts() {
  try {
    const allProducts = await db.select().from(products)
    return allProducts
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

export async function getProductById(productId: number) {
  try {
    const product = await db.select().from(products).where(eq(products.id, productId))
    return product
  } catch (error) {
    console.error("Error getting product by ID:", error)
    throw error
  }
}

export async function getProductRankings() {
  try {
    let results: any = []
    const ptArr = await getProductTypes()

    for (const ptItem of ptArr) {
      const ptName = ptItem?.name

      if (ptName === null) return
      
      const productResults = await db
        .select({
          id: products.id,
          name: products.name,
          rating: products.rating,
          productType: {
            id: productTypes.id,
            name: productTypes.name,
          },
          shop: {
            id: shops.id,
            name: shops.name,
            website: shops.website
          }
        })
        .from(products)
        .innerJoin(productTypes, eq(products.productTypeId, ptItem?.id))
        .innerJoin(shops, eq(products.shopId, shops.id))
        .where(eq(products.productTypeId, ptItem.id))
        .orderBy(
          desc(products.rating),
          asc(productTypes.name)
        )

      const flattenedProducts = productResults.map(product => ({
        ...product,
        productTypeName: product.productType.name,
        shopName: product.shop.name,
        shopUrl: product.shop.website,
        // Remove the nested objects
        productType: undefined,
        shop: undefined,
      }))
      
      results[ptName] = flattenedProducts
    }
    
    return results
  } catch (error) {
    console.error("Error getting product rankings:", error)
    throw error
  }
}

export async function updateProduct(
  productId: number, data: Partial<ProductDataProps>
) {
  try {
    console.log('Update Product: ', data)
    const updatedProduct = await db.update(products)
      .set(data)
      .where(eq(products.id, productId))

    const updatedProductRows = (updatedProduct as any).affectedRows
    console.log(`Updated ${updatedProductRows} rows`)

    return updatedProductRows > 0 ? true : false
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

