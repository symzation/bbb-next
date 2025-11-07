"use server"

import { PrismaClient } from "@prisma/client"
import { UserDataProps } from "@/types/types"

const prisma = new PrismaClient()

export async function createUser(data: UserDataProps) {
  const { accounts, ...userData } = data
  const prismaData: any = { ...userData }
  if (accounts && accounts.length > 0) {
    prismaData.accounts = {
      create: accounts
    }
  }
  const newUser = await prisma.user.create({ data: prismaData })
  return newUser
}

export async function deleteUser(id: string) {
  await prisma.account.deleteMany({
    where: { userId: parseInt(id) },
  })

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  })

  return deletedUser  
}

export async function getUsers() {
  const users = await prisma.user.findMany()
  return users
}

export async function getUserByEmail(
  email: string, 
  includes?: { accounts?: boolean; sessions?: boolean; reviews?: boolean }
) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: includes
  })

  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    //include: { accounts: true, session: true, reviews: true }
  })

  return user
}

export async function getUsersByRole(role: string) {
  const users = await prisma.user.findMany({
    where: { role: role.toUpperCase() },
  })

  return users
}

export async function deactivateUser(id: string) {
  const deactivatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { suspended: true, suspendedAt: new Date() },
  })

  return deactivatedUser
}

export async function updateUser(id: string, data: any) {
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  })

  return updatedUser
}
