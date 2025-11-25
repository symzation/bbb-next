"use server"

//import { PrismaClient } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/root/prisma/generated/prisma/client"
import { ShopDataProps } from "@/types/types"

//const prisma = new PrismaClient()

export async function createShop(data: ShopDataProps) {
  const newShop = await prisma.shop.create({
    data,
  })

  return newShop
}

export async function getShops() {
  const shops = await prisma.shop.findMany()
  return shops
}

export async function getShopById(id: string) {
  const shop = await prisma.shop.findFirst({
    where: { id: parseInt(id) },
  })

  return shop
}