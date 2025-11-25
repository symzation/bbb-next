/* import { Prisma, PrismaClient, Author } from "@prisma/client"
import { AuthorDataType } from "@/types/types" */

import { prisma } from "@/lib/prisma"
import { Prisma } from "@/root/prisma/generated/prisma/client"


//const prisma = new PrismaClient()

export async function createAuthor(data: Prisma.AuthorUncheckedCreateInput) {
  const newAuthor = await prisma.author.create({ data })
  return newAuthor
}

export async function getAuthors() {
  const author = await prisma.author.findMany({
    where: { authorApproved: true },
  })

  return author
}

export async function getAuthorAwaitingApproval() {
  const authors = await prisma.author.findMany({
    where: { authorApproved: false },
  })

  return authors
}

/* export async function updateAuthorByUserId(userId: string, data: Prisma.AuthorUncheckedUpdateInput) {
  console.log('Update Author By User Id: ', data)
  const updatedAuthor = await prisma.author.update({
    where: { userId: parseInt(userId) },
    data,
  })

  return updatedAuthor
}

export async function updateAuthor(authorId: string, data: Prisma.AuthorUncheckedUpdateInput) {
  console.log('Update Author: ', data)
  const updatedAuthor = await prisma.author.update({
    where: { id: parseInt(authorId) },
    data,
  })

  return updatedAuthor
} */

export async function updateAuthor(
  data: Prisma.AuthorUncheckedUpdateInput,
  authorId?: string,
  userId?: string,
) {
  const where =
    authorId ? { id: parseInt(authorId) } :
    userId ? { userId: parseInt(userId) } :
    (() => { throw new Error("No author identifier provided.") })()

  const updatedAuthor = await prisma.author.update({ where, data })

  console.log('Updated Author:', updatedAuthor)
  return updatedAuthor
}