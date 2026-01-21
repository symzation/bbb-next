"use client"

import { createContext, useContext, useMemo } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import type { Session } from "next-auth"
import { ENUM_USER_STATUS } from "@/types/enums"

type SessionUpdate = (data?: unknown) => Promise<Session | null>

type AuthSessionContextValue = {
  updateSession: SessionUpdate
  // optional convenience: expose session/status too if you want
  session: Session | null
  isAuthenticated: boolean
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null)

function AuthSessionBridge({ children }: { children: React.ReactNode }) {
  const { data: session, update, status } = useSession()
  const isAuthenticated = String(ENUM_USER_STATUS[status.toUpperCase() as keyof typeof ENUM_USER_STATUS]).toLowerCase() as ENUM_USER_STATUS === "authenticated" ? true : false

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      session: session ?? null,
      updateSession: update,
      isAuthenticated,
    }),
    [update, session, status]
  )

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  )
}

export function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session?: Session | null
}) {
  return (
    <SessionProvider session={session}>
      <AuthSessionBridge>{children}</AuthSessionBridge>
    </SessionProvider>
  )
}

export function useAuthSession() {
  const ctx = useContext(AuthSessionContext)
  if (!ctx) throw new Error("useAuthSession must be used within AuthSessionProvider")
  return ctx
}

/* export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, update, status } = useSession()
  const sessionUser = session?.user

  const sessionValue = {
    ...session,
    user: {
      ...sessionUser,
      id: sessionUser?.id !== undefined && sessionUser?.id !== null ? 
        isNaN(Number(sessionUser.id)) ? undefined : Number(sessionUser.id) : undefined,
    },
    update: update,
    expires: session?.expires,
    isAuthenticated: status === "authenticated" ? true : false,
    //status, // Optionally expose status at the top level if needed
  }

  return (
    <AuthSessionContext.Provider value={sessionValue}>
      {children}
    </AuthSessionContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthSessionContext) */








