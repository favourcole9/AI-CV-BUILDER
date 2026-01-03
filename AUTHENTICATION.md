# Authentication System

## Overview

The AI CV Builder uses **real Google OAuth authentication** powered by NextAuth.js v5. This is not a demo or mock system - it uses production-ready authentication with secure session management.

## Features

- **Real Google Sign-In**: Users authenticate with their Google accounts
- **Secure Sessions**: JWT-based session management with HTTP-only cookies
- **Protected Routes**: Builder page requires authentication
- **User-Specific Data**: CVs are stored per authenticated user
- **Persistent Sessions**: Authentication persists across page refreshes
- **Automatic Redirects**: Unauthenticated users are redirected to sign in

## How It Works

### 1. Sign In Flow

1. User clicks "Login" button
2. Modal opens with "Continue with Google" button
3. User is redirected to Google OAuth consent screen
4. After approving, Google redirects back to the app
5. NextAuth creates a secure session
6. User is redirected to `/builder` page

### 2. Session Management

- Sessions are stored as JWT tokens
- Tokens are stored in HTTP-only cookies (secure, not accessible via JavaScript)
- Session includes user ID, name, email, and profile picture
- Sessions persist until user logs out or token expires

### 3. Protected Routes

The `/builder` page checks authentication status:
- ✅ **Authenticated**: User can access the builder
- ❌ **Not Authenticated**: User sees authentication prompt and is redirected to home

### 4. User Data Storage

- Each user's CVs are stored in localStorage with their user ID as the key
- Format: `cvBuilder_savedCVs_${userId}`
- CVs are only accessible to the authenticated user who created them

## Environment Variables

### Required Variables

```env
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=<generated-secret>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

### What Happens if Variables Are Missing

If any required environment variables are missing, the app will:
1. Log a clear error message to the console listing which variables are missing
2. NextAuth will fail to initialize
3. Users will see an authentication error

**Example Error Message:**
```
❌ Missing required environment variables for Google OAuth:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET

Please add these to your .env.local file or Vercel environment variables.
See AUTH_SETUP.md for setup instructions.
```

## Setup Instructions

### Local Development

1. **Copy environment variables template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Generate AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to `.env.local`

3. **Get Google OAuth credentials:**
   - Follow the detailed guide in `AUTH_SETUP.md`
   - Add credentials to `.env.local`

4. **Start the development server:**
   ```bash
   npm install
   npm run dev
   ```

5. **Test authentication:**
   - Go to http://localhost:3000
   - Click "Login"
   - Sign in with Google
   - You should be redirected to `/builder`

### Production (Vercel)

1. **Add environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all four variables:
     - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
     - `AUTH_SECRET`: Same secret from local development
     - `GOOGLE_CLIENT_ID`: Your Google Client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

2. **Update Google OAuth settings:**
   - Go to Google Cloud Console
   - Add production URLs to authorized origins and redirect URIs
   - Format: `https://your-app.vercel.app/api/auth/callback/google`

3. **Deploy:**
   - Push to GitHub
   - Vercel will automatically deploy with the new environment variables

## Code Structure

### Core Files

- `auth.ts` - NextAuth configuration with Google provider
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API routes
- `lib/auth-context.tsx` - Auth context using NextAuth session
- `app/layout.tsx` - SessionProvider wrapper
- `components/login-modal.tsx` - Real Google sign-in button
- `components/navbar.tsx` - User profile and logout
- `app/builder/page.tsx` - Protected route with auth check

### Key Components

**SessionProvider**: Wraps the entire app to provide session access
```tsx
<SessionProvider>
  <AuthProvider>{children}</AuthProvider>
</SessionProvider>
```

**useSession Hook**: Access current session
```tsx
const { data: session } = useSession()
const isAuthenticated = !!session?.user
```

**signIn Function**: Trigger Google OAuth
```tsx
await signIn("google", { callbackUrl: "/builder" })
```

**signOut Function**: Log out user
```tsx
await signOut({ callbackUrl: "/" })
```

## Security

✅ **Secure by default**:
- HTTP-only cookies prevent XSS attacks
- CSRF protection built into NextAuth
- Secure session tokens
- Google OAuth 2.0 standard

✅ **Best practices**:
- Environment variables never exposed to client
- Secrets not committed to git
- Production and development use separate OAuth clients
- Sessions expire and refresh automatically

## Troubleshooting

### "Missing required environment variables"

**Solution**: Make sure all environment variables are set in `.env.local` (local) or Vercel environment variables (production)

### Session not working locally

**Solution**: 
1. Check that NEXTAUTH_URL matches your development URL (usually `http://localhost:3000`)
2. Clear browser cookies
3. Restart dev server after changing environment variables

### "Redirect URI mismatch" error

**Solution**: 
1. Go to Google Cloud Console
2. Verify redirect URIs match exactly: `http://localhost:3000/api/auth/callback/google`
3. No trailing slashes
4. Make sure you're using the correct OAuth client

### Can't sign in on production

**Solution**:
1. Check Vercel environment variables are set correctly
2. Verify production URL is added to Google OAuth authorized URIs
3. Check browser console for errors
4. Verify AUTH_SECRET is set in Vercel

## Support

For detailed setup instructions, see `AUTH_SETUP.md`

For NextAuth.js documentation: https://next-auth.js.org/
