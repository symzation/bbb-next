"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext } from "react"
import { AuthContextProps } from "@/types/types"

const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const { data, ...restSession } = session
  const sessionValue = {
    ...restSession,
    user: { ...data?.user, ...{ status: session.status }},
    update: session.update,
    expires: data?.expires,
    isAuthenticated: session.status === "authenticated" ? true : false,
  }

  return (
    <AuthContext value={sessionValue}>
      {children}
    </AuthContext>
  )
}

export const useAuthContext = () => useContext(AuthContext)