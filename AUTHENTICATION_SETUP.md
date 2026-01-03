# Google Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the AI CV Builder.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "AI CV Builder")
5. Click "Create"

## Step 2: Enable Google OAuth

1. In your project, go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Fill in the required information:
   - App name: AI CV Builder
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
4. Click "Save and Continue"
5. Skip the "Scopes" section (click "Save and Continue")
6. Add test users if needed (for development)
7. Click "Save and Continue"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Name it "AI CV Builder Web Client"
5. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Click "Create"
8. Copy your Client ID and Client Secret

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-string
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

3. Generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000`
3. Click "Login"
4. Click "Sign in with Google"
5. Select your Google account
6. You should be redirected to the dashboard

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Update `NEXTAUTH_URL` to your production URL
3. Add your production domain to Google OAuth authorized origins and redirect URIs
4. Ensure `NEXTAUTH_SECRET` is a strong, unique value

## Troubleshooting

### "Redirect URI mismatch" error
- Ensure your redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check that there are no trailing slashes

### "Invalid client" error
- Verify your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces or quotes in your `.env.local` file

### Session not persisting
- Check that `NEXTAUTH_SECRET` is set
- Clear your browser cookies and try again

## Security Notes

- Never commit `.env.local` to version control
- Use different OAuth credentials for development and production
- Regularly rotate your `NEXTAUTH_SECRET`
- Review Google Cloud Console audit logs periodically

## Support

For more information, visit:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
