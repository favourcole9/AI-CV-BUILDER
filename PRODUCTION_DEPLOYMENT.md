# Production Deployment Guide

This guide covers deploying the AI CV Builder to production with real Google OAuth authentication.

## Pre-Deployment Checklist

- [ ] Google OAuth credentials configured (see GOOGLE_OAUTH_SETUP.md)
- [ ] All demo authentication code removed
- [ ] Environment variables ready
- [ ] Code pushed to GitHub
- [ ] Production domain available

## Deploy to Vercel

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the AI CV Builder repository

### 2. Configure Environment Variables

Before deploying, add these environment variables in Vercel:

```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

To add them:
1. In the import screen, expand "Environment Variables"
2. Add each variable with its value
3. Select "Production", "Preview", and "Development" for all variables

### 3. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a production URL

### 4. Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project > "APIs & Services" > "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Add your Vercel production URL to:
   - **Authorized JavaScript origins**: `https://your-app.vercel.app`
   - **Authorized redirect URIs**: `https://your-app.vercel.app/api/auth/callback/google`
5. Click "Save"

### 5. Test Production Authentication

1. Visit your production URL
2. Click "Login"
3. Sign in with Google
4. Verify you're redirected back to the app
5. Test creating and saving a CV
6. Verify the Dashboard shows saved CVs

## Custom Domain (Optional)

### Add Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `cv-builder.com`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### Update Configuration

After adding a custom domain:

1. Update `NEXTAUTH_URL` in Vercel environment variables to your custom domain
2. Update Google OAuth authorized origins and redirect URIs to use your custom domain
3. Redeploy the application

## Monitoring and Maintenance

### Check Application Health

- Monitor [Vercel Analytics](https://vercel.com/docs/analytics)
- Check error logs in Vercel dashboard
- Review Google Cloud Console API usage

### Security Best Practices

- Regularly rotate `NEXTAUTH_SECRET`
- Review Google OAuth console for suspicious activity
- Keep dependencies updated: `npm audit` and `npm update`
- Enable Vercel's security headers
- Monitor for unauthorized access attempts

### Performance Optimization

- Enable Vercel's Edge Functions if needed
- Optimize images with Next.js Image component
- Use Vercel's caching for static assets
- Monitor Core Web Vitals in Vercel Analytics

## Troubleshooting Production Issues

### Authentication Fails in Production

1. Verify `NEXTAUTH_URL` exactly matches your domain (no trailing slash)
2. Check Google Console authorized URIs match exactly
3. Verify environment variables are set in Vercel
4. Check Vercel function logs for errors

### "Invalid Client" Error

- Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Vercel
- Ensure no extra spaces in environment variable values
- Verify the OAuth consent screen is published

### Session Not Persisting

- Check that `NEXTAUTH_SECRET` is set correctly
- Verify cookies are enabled and working
- Check for CORS issues in browser console
- Ensure HTTPS is enabled (Vercel does this automatically)

### Users Can't Save CVs

- Check browser localStorage is enabled
- Verify user is authenticated (session exists)
- Check Vercel function logs for errors
- Test with different browsers

## Rollback Procedure

If issues occur in production:

1. Go to Vercel dashboard > Deployments
2. Find the last working deployment
3. Click the three dots menu > "Promote to Production"
4. Verify the rollback worked
5. Fix issues locally before redeploying

## Support

For issues:
- Check Vercel documentation: https://vercel.com/docs
- Review NextAuth.js docs: https://next-auth.js.org
- Check Google OAuth docs: https://developers.google.com/identity/protocols/oauth2
