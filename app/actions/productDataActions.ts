"use server"

//import { PrismaClient } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/root/prisma/generated/prisma/client"
import { ProductDataProps } from "@/types/types"

//const prisma = new PrismaClient()

export async function createProduct(data: ProductDataProps) {
  const newProduct = await prisma.product.create({
    data,
  })

  return newProduct
}

export async function getProducts() {
  const products = await prisma.product.findMany()
  return products
}

export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
  })

  return product
}

export async function getProductRankings() {
  const productTypes = await getProductTypes()

  if (!productTypes) {
    return { success: false, error: "No product types found for rankings"}
  }

  const results: Record<string, any[]> = {}

  for (const productType of productTypes) {
    const products = await prisma.product.findMany({
      include: {
        productType: { select: { id: true, name: true } }, // Include the entire ProductType object
        shop: { select: { id: true, name: true, url: true } }
      },
      where: {
        productTypeId: productType.id,
      },
      orderBy: [
        { rating: 'desc'}, // Order by rating descending, then by product type name ascending
        { productType: { name: 'asc' } }
      ],
      take: 10,
    })

    const flattenedProducts = products.map(product => ({
      ...product,
      productTypeName: product.productType.name,
      shopName: product.shop.name,
      shopUrl: product.shop.url,
      // Remove the nested objects
      productType: undefined,
      shop: undefined,
    }))

    results[productType.name] = flattenedProducts
  }

  if (!results) {
    return { success: false, error: "No products for rankings found" }
  }

  return { success: true, data: results }
}

export async function getProductTypes() {
  return await prisma.productType.findMany({
    select: { id: true, name: true }
  })
}