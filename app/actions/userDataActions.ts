"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@/root/prisma/generated/prisma/client"
import { Role } from "@/types/enums"
//import type { User, Account } from '@prisma/client'


export async function createUser(data: Prisma.UserCreateInput) {
  const { accounts, ...userData } = data
  const prismaData: any = { ...userData }
  if (accounts) {
    prismaData.accounts = {
      create: accounts
    }
  }
  const newUser = await prisma.user.create({ data })
  return newUser
}

export async function deleteUser(userId: string) {
  await prisma.account.deleteMany({
    where: { userId: parseInt(userId) },
  })

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(userId) },
  })

  return deletedUser  
}

export async function getUsers() {
  const users = await prisma.user.findMany()
  return users
}


export async function getUserByEmail(
  email: string, 
  includes?: { accounts?: boolean; sessions?: boolean; reviews?: boolean, author?: boolean }
) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: includes
  })

  return user
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: parseInt(userId) },
    //include: { accounts: true, session: true, reviews: true }
  })

  return user
}

export async function getUsersByRole(role: string) {
  const users = await prisma.user.findMany({
    where: { role: Role[role.toUpperCase() as keyof typeof Role] },
  })

  return users
}

export async function deactivateUser(userId: string) {
  const deactivatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: { suspended: true, suspendedAt: new Date() },
  })

  return deactivatedUser
}

export async function updateUser(userId: string, data: any) {
  console.log('Update User: ', data)
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data,
  })

  return updatedUser
}
