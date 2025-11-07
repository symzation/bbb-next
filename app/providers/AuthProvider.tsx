"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext } from "react"

type AuthContextProps = {
  user?: {
    id?: string | undefined
    name?: string | null
    username?: string | null
    email?: string | null
    image?: string | null
    bio?: string | null
    role?: string | null
    provider?: string | null
  }
  expires?: string
  status?: "authenticated" | "loading" | "unauthenticated"
  isAuthenticated?: boolean
} | null

export const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const { data, ...restSession } = session
  const sessionValue = {
    ...restSession,
    user: data?.user,
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