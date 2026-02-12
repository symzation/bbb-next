import NextAuth from "next-auth"
import { authConfig } from "@/root/auth.config"

// Ensure session.strategy is set to "jwt" or "database" as SessionStrategy type
const fixedAuthConfig = {
  ...authConfig,
  session: {
    ...authConfig.session,
    strategy: (authConfig.session?.strategy === "jwt" || authConfig.session?.strategy === "database"
      ? authConfig.session.strategy
      : "jwt") as "jwt" | "database" // default to "jwt" if not set correctly
  }
}

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update
} = NextAuth(fixedAuthConfig)