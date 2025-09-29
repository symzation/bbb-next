"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext } from "react"
import { AuthContextProps } from "@/types/types"

export const AuthContext = createContext<AuthContextProps>({})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const { data, ...restSession } = session
  const sessionValue = {
    ...restSession,
    user: data?.user,
    expires: data?.expires,
    isAuthenticated: session.status === "authenticated" ? true : false 
  }

  return (
    <AuthContext value={sessionValue}>
      {children}
    </AuthContext>
  )
}

export const useAuthContext = () => useContext(AuthContext)