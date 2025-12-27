"use server"

import { auth, unstable_update } from "@/lib/auth"
import { UserDataProps } from "@/types/types"

export async function getAuthSession() {
  const session = await auth()
  return session
}

export const updateAuthSession = async (data: Partial<UserDataProps>) => {
  const session = await auth() // Get the current session
  
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
