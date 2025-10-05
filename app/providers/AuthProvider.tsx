"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext, useState } from "react"
import { getCookie, getAllCookies } from "@/lib/cookies"

type AuthContextProps = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires?: string
  status?: "authenticated" | "loading" | "unauthenticated"
  isAuthenticated?: boolean
  loginFrom?: string | null
} | null

export const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessionValues, setSessionValues] = useState<AuthContextProps>({})
  
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