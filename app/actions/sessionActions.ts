"use server"

import { auth, unstable_update } from "@/lib/auth"
import { SessionUser } from "@/types/types"

export async function GetAuthSession() {
  const session = await auth()
  return session
}

export const updateAuthSession = async (newData: Partial<SessionUser>) => {
  const session = await auth()
  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        ...newData,
      },
    })
  }
}
