'use server'

import { Session } from "next-auth"
import { auth, unstable_update } from "@/lib/auth"

export async function getAuthSession() {
  const session = await auth()
  console.log('getAuthSession: ', session)
  return session
}

export const updateAuthSession = async (data: Partial<Session["user"]>) => {
  const session = await auth() // Get the current session
  console.log('updateAuthSession: ', session)
  
  if (session) {
    const updatedSession = await unstable_update({
      ...session,
      user: {
        ...session.user,
        ...data // Merge new data into the user object
      },
    })

    return updatedSession
  }
}
