import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import Facebook  from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import { compareSalt } from "@/lib/salt"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db/connect"
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema"
import { getUserByEmail, createDbSession, deleteDbSessions, getSessionsByUserId } from "@/lib/db/queries"
import { updateAuthSession } from "@/actions/sessionActions"

async function verifyUserInDatabase(email: string, password: string) {
  const result = await getUserByEmail(email)
  const user = Array.isArray(result) ? result[0] : result

  if (!user) {
    return { user: null, isPasswordValid: false }
  }

  // Users created via OAuth providers may not have a password hash stored.
  if (!user.password) {
    return { user, isPasswordValid: false }
  }

  const isPasswordValid = await compareSalt(password, user.password)
  return { user, isPasswordValid }
}

export const authConfig = { 
  debug: true,
  trustHost: true, // For development purposes only, do not use in production
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions, // Only required if you’re using the database session strategy.
    verificationTokensTable: verificationTokens, // Only required if you’re using a Magic Link provider
  }),
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
          throw new Error("No credentials provided")
          /* console.error("Must provide credentials")
          return null */
        }

        try {
          const { email, password } = credentials as { email: string; password: string }
          const { user, isPasswordValid } = await verifyUserInDatabase(email, password)

          if (user) {
            if (isPasswordValid) {
              // Ensure id is a string for NextAuth compatibility
              return {
                ...user,
                id: String(user.id),
              }
            } else {
              throw new Error("Check your password")
            }
          } else {
            throw new Error("User not found")
          }
        } catch (error) {
          console.log("Error authorizing user", error)
          throw new Error("Error authorizing user")
        }
      }
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
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
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  callbacks: {
    async jwt(
      { token, user, account, profile }: 
      { token: any; user?: any; account?: any; profile?: any }
    ) {
      if (user) {
        token.accessToken = account.access_token
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

      /* console.log('Session callback - session:', session) 
      console.log('Session callback - token:', token)  */

      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.provider = token.provider as string | null

      const hasSessionInDb = await getSessionsByUserId(token.id as string)
      
      if (hasSessionInDb.length === 0) {
        console.log('Session callback - creating new session in DB')
        await createDbSession({
          sessionToken: token.accessToken as string,
          userId: token.id as string,
          expires: session.expires ? new Date(session.expires) 
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        })
      } 

      /* console.log('Session callback - session after:', session) */

      const updatedSession = {
        ...session,
        user: {
          ...session.user, // Keep existing user properties
          ...{
            id: String(session.user.id), // The user ID from the JWT
            username: String(session.user?.username) ?? null,
            role: String(session.user?.role) ?? 'USER',
            approved: session.user?.approved ?? false,
            bio: String(session.user?.bio) ?? '',
            provider: session.user && "provider" in session.user ? 
              String((session.user as any).provider) : null,
            suspended: session.user?.suspended ?? false,
            suspendedAt: session.user?.suspendedAt ?? null
          }
        },
        expires: session.expires // Ensure the 'expires' property is present
      }
      
      //updateAuthSession(updatedSession)
      return updatedSession
    },
    async signIn({ user: User, account: Account, profile, email: string, credentials  }) {
      // Implement your custom logic here
      // For example, to restrict access to a specific email domain:
      /* if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      } */

      // Return true to allow sign-in, false to deny

     /*  console.log('SignIn callback - user:', user)
      console.log('SignIn callback - account:', account)
      console.log('SignIn callback - profile:', profile)  */ 

      /* if (user) {
        const userFromDb = await getUserByEmail(user?.email ?? "", { accounts: true })
        console.log('SignIn callback - userFromDb:', userFromDb) 

        if (account) {
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
        } 
       return true
      } */
      
      return true
    },   
  }
} satisfies NextAuthConfig