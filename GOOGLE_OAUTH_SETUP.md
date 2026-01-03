# Google OAuth Setup Guide

This guide will walk you through setting up Google OAuth authentication for the AI CV Builder.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "AI CV Builder")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in the required fields:
   - App name: `AI CV Builder`
   - User support email: Your email
   - Developer contact information: Your email
5. Click "Save and Continue"
6. On the Scopes page, click "Add or Remove Scopes"
7. Select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
8. Click "Update" then "Save and Continue"
9. Add test users if needed (optional for development)
10. Click "Save and Continue"
11. Review and click "Back to Dashboard"

## Step 4: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name it: `AI CV Builder Web Client`
5. Under "Authorized JavaScript origins", add:
   - `http://localhost:3000` (for local development)
   - `https://your-production-domain.com` (for production)
6. Under "Authorized redirect URIs", add:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - `https://your-production-domain.com/api/auth/callback/google` (for production)
7. Click "Create"
8. Copy your Client ID and Client Secret

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Generate a NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

3. Update `.env.local` with your credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<paste-generated-secret-here>
   GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

4. Save the file

## Step 6: Test Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Login" and try signing in with Google
4. You should be redirected to Google's sign-in page
5. After signing in, you should be redirected back to the CV Builder

## Step 7: Deploy to Production (Vercel)

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)

2. In Vercel project settings, go to "Environment Variables"

3. Add the following variables:
   - `NEXTAUTH_URL`: `https://your-app.vercel.app`
   - `NEXTAUTH_SECRET`: (use the same secret you generated locally)
   - `GOOGLE_CLIENT_ID`: (your Google Client ID)
   - `GOOGLE_CLIENT_SECRET`: (your Google Client Secret)

4. In Google Cloud Console, add your production URL to authorized origins and redirect URIs:
   - Authorized JavaScript origins: `https://your-app.vercel.app`
   - Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

5. Redeploy your application in Vercel

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google` (or your production URL)
- Check for trailing slashes - they should NOT be included

### "Access blocked: This app's request is invalid"
- Make sure you've configured the OAuth consent screen
- Add your email as a test user if the app is not verified

### NextAuth session not persisting
- Make sure NEXTAUTH_SECRET is properly set
- Check that cookies are enabled in your browser
- Verify NEXTAUTH_URL matches your current domain exactly

### Google sign-in button does nothing
- Check browser console for errors
- Verify all environment variables are loaded correctly
- Make sure the NextAuth API route is accessible at `/api/auth`

## Security Notes

- Never commit `.env.local` to version control
- Keep your `GOOGLE_CLIENT_SECRET` private
- Rotate your `NEXTAUTH_SECRET` periodically
- Use HTTPS in production (Vercel provides this automatically)
- Review Google Cloud Console security recommendations regularly

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
