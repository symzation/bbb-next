import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Facebook  from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { Adapter } from "next-auth/adapters"
import { getUserByEmail, updateUser } from "@/actions/userDataActions"
import { compareSalt } from "@/lib/salt"
import { createUsername } from "@/utils/helpers"
import { UserDataProps } from "@/types/types"

const prisma = new PrismaClient()

/* import type { User as NextAuthUser } from "next-auth";
import type { AdapterUser } from "next-auth/adapters"; */

// Extend NextAuthUser and AdapterUser to include 'username', 'role', 'suspended', and 'suspendedAt'
declare module "next-auth" {
  interface User {
    username?: string | null;
    provider?: string | null;
    role?: string | null;
    suspended?: boolean | null;
    suspendedAt?: Date | string | null;
    bio?: string | null;
  }
}
declare module "next-auth/adapters" {
  interface AdapterUser {
    username?: string | null;
    provider?: string | null;
    role?: string | null;
    suspended?: boolean | null;
    suspendedAt?: Date | string | null;
    bio?: string | null;
  }
}

const log = {
  error: console.error,
  warn: console.warn,
  debug: console.debug,
}

async function verifyUserInDatabase(email: string, password: string) {
  const user = await getUserByEmail(email, { accounts: true, reviews: true })
    
    if (!user) {
      return { user: null, isMatch: false }
    } else {
      const isMatch = await compareSalt(password, user?.password ?? '')
  
      return { 
        user: {
          id: user.id, 
          name: user?.name.split(" ")[0] ?? user?.email.split("@")[0], 
          username: user?.username || null,
          email: user?.email, 
          image: user?.image || null,
          bio: user?.bio,
          reviews: (user as any).reviews || [],
          accounts: (user as any).accounts || [],
          role: user?.role
        }, 
        isMatch 
      }
    }
}
export const authOptions = { 
  debug: true,
  logger: {
    error(code: any, ...message: any[]) {
      log.error(code, ...message)
    },
    warn(code: any, ...message: any[]) {
      log.warn(code, message)
    },
    debug(code: any, ...message: any[]) {
      log.debug(code, message)
    },
  },
  trustHost: true, // For development purposes only, do not use in production
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        if (!credentials || credentials === null) {
          //throw new Error("No credentials provided")
          return null
        }

        try {
          const { email, password } = credentials as { email: string; password: string }
          const { user, isMatch } = await verifyUserInDatabase(email, password)

          if (user) {
            if (isMatch) {
              // Ensure id is a string for NextAuth compatibility
              return {
                ...user,
                id: String(user.id),
              }
            } else {
              throw new Error("Check your password")
              /* console.error("Check your password:", error)
                } }
              ) */
            }
          } else {
            throw new Error("User not found")
            /* console.error("User not found:", error)
            return null */
          }
        } catch (error) {
          throw new Error("Error authorizing user")
          /* console.error("Error authorizing user:", error)
          return null */
        }
      }
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: { 
          prompt: "consent", 
          access_type: "offline", 
          response_type: "code" 
        }
      },
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      // Opt into OAuth 2.0 so we can request the newer scopes
      // Request the email-capable scope in addition to basic read + offline
      authorization: 'https://x.com/i/oauth2/authorize?scope=users.read%20tweet.read%20offline.access%20users.email',
      // Ask the v2 userinfo endpoint to include the confirmed email
      userinfo: 'https://api.x.com/2/users/me?user.fields=confirmed_email,profile_image_url,verified',
      // Map the provider profile to NextAuth's user shape, pulling email from confirmed_email when present
      profile(profile) {
        const data = profile.data as typeof profile.data & { confirmed_email: string | null }
        return {
          id: data.id,
          name: data.name,
          email: data.confirmed_email ?? null,
          image: data.profile_image_url ?? null,
          provider: 'twitter',
        }
      }
    })
  ],
  /* pages: {
    signIn: "/",
    error: "/",
    newUser: "/settings", 
    //signIn: "/auth/signin", // Path to your custom sign-in page
    // You can also define other custom pages here:
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user",
  }, */
  session: { strategy: "jwt" },
  callbacks: {
    async signIn(
      { user, account, profile }: 
      { user?: any; account?: any; profile?: any }
    ) {
      // Implement your custom logic here
      // For example, to restrict access to a specific email domain:
      /* if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      } */

      // Return true to allow sign-in, false to deny

     /*  console.log('SignIn callback - user:', user)
      console.log('SignIn callback - account:', account)
      console.log('SignIn callback - profile:', profile)  */ 

      if (user) {
        /* const userFromDb = await getUserByEmail(user?.email ?? "", { accounts: true })
        console.log('SignIn callback - userFromDb:', userFromDb) */

        /* if (account) {
          //token.accessToken = account?.access_token

          const updatedUserData = {} as Partial<UserDataProps>

          // If the user does not have a username, create one
          
          if (user?.username === null || user?.username === '') {
            updatedUserData.username = await createUsername(user?.email ?? "")
          }

          // If the user is signing in with Google, check email verification
          if (account?.provider === "google" && profile?.email_verified) {
            updatedUserData.emailVerified = new Date()
          }

          if (user?.suspended) {
            updatedUserData.suspended = false
            updatedUserData.suspendedAt = undefined
          }

          updatedUserData.lastLogin = new Date()

          if (Object.keys(updatedUserData).length > 0) {
            console.log('SignIn callback - updating user with data:', updatedUserData)
            await updateUser(String(user?.id), updatedUserData)
          }
        } */
       return true
      }
      
      return false
    },
    async jwt(
      { token, user, account, profile }: 
      { token: any; user?: any; account?: any; profile?: any }
    ) {
      if (user) {
        token.accessToken = account?.access_token
        token.id = user.id // Add user ID to the token
        token.role = user?.role ?? 'USER' // Add user role to the token
        
        if (account) {
          token.role = user?.role ?? 'USER'
          token.provider = account?.provider ?? null
        }
      }
      return token
    },
    async session(
      { session, token }: 
      { session: any; token: any }
    ) {
      // Pass the custom properties from the token to the session
      /* console.log('Session callback - token:', token)
      console.log('Session callback - session before:', session) */

      /* const user = session?.user?.email 
        ? await getUserByEmail(session?.user?.email as string) : null

      console.log('Session callback - user from DB:', user) */

      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.provider = token.provider as string | null

      //console.log('Session callback - session after:', session)

      /* await createDbSession({
        userId: String(token?.id) ?? token.sub,
        sessionToken: token.accessToken,
        expires: session.expires,
      }) */

      const updatedSession = {
        ...session,
        user: {
          ...session.user, // Keep existing user properties
          ...{
            id: String(session.user.id), // The user ID from the JWT
            username: String(session.user?.username) ?? null,
            role: String(session.user?.role) ?? 'USER',
            bio: String(session.user?.bio) ?? '',
            provider: session.user && "provider" in session.user ? String((session.user as any).provider) : null,
            suspended: session.user?.suspended ?? false,
            suspendedAt: session.user?.suspendedAt ?? null
          }
        },
        expires: session.expires // Ensure the 'expires' property is present
      }
        return updatedSession
    },
  }
} satisfies NextAuthConfig 

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)