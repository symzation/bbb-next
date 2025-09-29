import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook  from "next-auth/providers/facebook"

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
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      /* authorization: {
        params: { 
          prompt: "consent", 
          access_type: "offline", 
          response_type: "code" 
        }
      }, */
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    })
  ],
  session: { strategy: 'jwt' },
  //basePath: process.env.AUTH_BASEPATH,
})

