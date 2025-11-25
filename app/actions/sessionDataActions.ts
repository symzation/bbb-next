"use server"

//import { PrismaClient } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/root/prisma/generated/prisma/client"
import { SessionDataProps } from "@/types/types"

//const prisma = new PrismaClient()

export async function createDbSession(data: SessionDataProps) {
  const newSession = await prisma.session.create({
    data: {
      ...data,
      userId: parseInt(data.userId),
      sessionToken: data.sessionToken,
      expires: data.expires,
    },
  })
  return newSession
}

export async function deleteDbSessions(id: string) {
  const deletedSessions = await prisma.session.deleteMany({
    where: { userId: parseInt(id) },
  })

  return deletedSessions  
}

export async function getSessionsByUserId(id: string) {
  const sessions = await prisma.session.findMany({
    where: { userId: parseInt(id) },
  })

  return sessions
}
