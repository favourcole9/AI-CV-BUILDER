# Google Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the AI CV Builder.

## Prerequisites

- A Google Cloud Platform account
- Node.js installed on your machine

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "AI CV Builder")
4. Click "Create"

## Step 2: Enable Google OAuth

1. In the Google Cloud Console, navigate to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in the required fields:
     - App name: "AI CV Builder"
     - User support email: Your email
     - Developer contact email: Your email
   - Click "Save and Continue"
   - Add scopes (optional for testing)
   - Click "Save and Continue"

## Step 3: Create OAuth 2.0 Client ID

1. Select "Web application" as the application type
2. Add a name (e.g., "AI CV Builder Web Client")
3. Add Authorized JavaScript origins:
   - For local development: `http://localhost:3000`
   - For production: `https://your-domain.com`
4. Add Authorized redirect URIs:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.com/api/auth/callback/google`
5. Click "Create"

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your credentials to `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret-here
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. Generate a NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

4. Click "Login" and test the Google Sign-In

## Deployment to Vercel

1. Push your code to GitHub (without .env.local)

2. In Vercel project settings → Environment Variables, add:
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Same secret from local development
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

3. In Google Cloud Console, add your Vercel URL to:
   - Authorized JavaScript origins: `https://your-app.vercel.app`
   - Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

4. Redeploy your Vercel app

## Troubleshooting

### "Error: Missing GOOGLE_CLIENT_ID"

- Make sure `.env.local` exists in your project root
- Verify the environment variable names match exactly
- Restart your dev server after adding environment variables

### "Redirect URI mismatch"

- Check that your authorized redirect URIs in Google Cloud Console match exactly
- Format: `http://localhost:3000/api/auth/callback/google` (no trailing slash)

### "Access blocked: This app's request is invalid"

- Make sure your OAuth consent screen is configured
- Add test users if your app is not published
- Verify all required fields are filled in

### Session not persisting

- Check that NEXTAUTH_SECRET is set
- Clear browser cookies and try again
- Verify NEXTAUTH_URL matches your current URL

## Security Notes

- Never commit `.env.local` to version control
- Use different OAuth clients for development and production
- Regularly rotate your NEXTAUTH_SECRET in production
- Keep your Google Client Secret confidential

## Support

For more information:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
