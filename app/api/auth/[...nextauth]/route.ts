import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextResponse } from "next/server"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

const missingVars: string[] = []
if (!GOOGLE_CLIENT_ID) missingVars.push("GOOGLE_CLIENT_ID")
if (!GOOGLE_CLIENT_SECRET) missingVars.push("GOOGLE_CLIENT_SECRET")
if (!NEXTAUTH_SECRET) missingVars.push("NEXTAUTH_SECRET")

const hasConfig = missingVars.length === 0

if (!hasConfig) {
  console.error(`[NextAuth] Missing required environment variables: ${missingVars.join(", ")}`)
  console.error("[NextAuth] Please configure Google OAuth credentials to enable authentication")
  console.error("[NextAuth] See GOOGLE_OAUTH_SETUP.md for instructions")
}

const configErrorResponse = () =>
  NextResponse.json(
    {
      error: "Configuration Error",
      message: `Missing required environment variables: ${missingVars.join(", ")}`,
      details:
        "Google OAuth authentication is not configured. Please add the required environment variables to your Vercel project or .env.local file.",
    },
    { status: 500 },
  )

let handler: any

if (hasConfig) {
  const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
      }),
    ],
    pages: {
      signIn: "/",
      error: "/",
    },
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.sub || ""
        }
        return session
      },
      async jwt({ token, user }) {
        if (user) {
          token.sub = user.id
        }
        return token
      },
    },
    secret: NEXTAUTH_SECRET,
  }

  handler = NextAuth(authOptions)
}

export const GET = hasConfig ? handler : configErrorResponse
export const POST = hasConfig ? handler : configErrorResponse
