import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Facebook  from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"

import { getUserByEmail } from "@/_data/users"

// Extend the Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

const log = {
  error: console.error,
  warn: console.warn,
  debug: console.debug,
}

export const { 
  auth,
  handlers: { GET, POST },
  signIn, 
  signOut
} = NextAuth({
  debug: true,
  logger: {
    error(code, ...message) {
      log.error(code, message)
    },
    warn(code, ...message) {
      log.warn(code, message)
    },
    debug(code, ...message) {
      log.debug(code, message)
    },
  },
  trustHost: true, // For development purposes only, do not use in production
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
          const user = getUserByEmail(email)
          if (user) {
            const isMatch = user.password === password

            if (isMatch) {
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
          console.error("Error authorizing user:", error)
          return null
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
      version: "2.0",
      // Opt into OAuth 2.0 so we can request the newer scopes
      allowDangerousEmailAccountLinking: true,
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
        }
      },
    })

  ],
  session: { 
    strategy: 'jwt'
  },
})

