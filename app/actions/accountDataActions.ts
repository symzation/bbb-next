"use server"

import { PrismaClient } from "@prisma/client"
import { AccountDataProps } from "@/types/types"

const prisma = new PrismaClient()

export async function createDBAccount(data: AccountDataProps) {
  const newAccount = await prisma.account.create({
    data: {
      ...data,
      userId: parseInt(data.userId),
      type: data.type,
      provider: data.provider,
      providerAccountId: data.providerAccountId,
    },
  })
  return newAccount
}

export async function deleteDBAccounts(id: string) {
  const deletedAccounts = await prisma.account.deleteMany({
    where: { userId: parseInt(id) },
  })

  return deletedAccounts  
}