'use server'

import getServerSession from "next-auth"
import { auth, authOptions } from "@/api/auth/[...nextauth]/route"

export async function getAuthSession() {
  const session = await auth()
  return session
}

export async function getSession() {
  const session = await getServerSession(authOptions)
  console.log('getSession - session:', session)
  return session
}