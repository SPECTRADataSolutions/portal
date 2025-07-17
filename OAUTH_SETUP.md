# OAuth Setup Guide

This guide explains how to configure Google and Apple OAuth providers for the SPECTRA portal authentication system.

## Prerequisites

- Node.js 17.4 or higher
- Valid domain for OAuth callbacks (for production)

## Environment Configuration

The authentication system uses environment variables for configuration. Update the `.env` file in the project root:

```env
# Authentication Configuration
AUTH_SECRET=c2c8e3896ed5cd63960d224d379a51ee250da09e250cac5da7e92905d7dd3216
AUTH_TRUST_HOST=true

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth Configuration
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set the application type to "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:4321/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env` file

## Apple Sign-In Setup

1. Go to the [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Create a new App ID with "Sign In with Apple" capability
4. Create a new Service ID for your web app
5. Configure the Service ID with your domain and redirect URLs:
   - Development: `http://localhost:4321/api/auth/callback/apple`
   - Production: `https://yourdomain.com/api/auth/callback/apple`
6. Generate a private key for Sign in with Apple
7. Copy the Service ID as `APPLE_CLIENT_ID` and configure the private key as `APPLE_CLIENT_SECRET`

## Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:4321/login`
3. Click on "Continue with Google" or "Continue with Apple"
4. Complete the OAuth flow
5. You should be redirected to the dashboard

## Features Implemented

### ✅ Authentication Features
- Google OAuth via OpenID Connect
- Apple Sign-In integration
- Auto-create user record on first login
- Redirect authenticated users to dashboard
- Secure short-lived session tokens (30 minutes)
- Comprehensive audit trail logging

### ✅ Security Features
- Protected routes with middleware
- Session management with JWT tokens
- Secure redirect handling
- CSRF protection (provided by auth-astro)
- Audit logging for all auth events

### ✅ User Experience
- Clean, branded login page
- Responsive design
- Clear error handling
- Seamless navigation between auth states

## File Structure

```
src/
├── middleware.ts          # Authentication middleware
├── pages/
│   ├── index.astro       # Home page with auth-aware navigation
│   ├── login.astro       # Login page with OAuth buttons
│   └── dashboard.astro   # Protected dashboard page
auth.config.ts            # Authentication configuration
```

## Troubleshooting

### Common Issues

1. **Configuration Error**: Ensure all environment variables are set correctly
2. **Redirect URI Mismatch**: Verify callback URLs match in OAuth provider settings
3. **Session Issues**: Check that `AUTH_SECRET` is set and secure
4. **HTTPS Required**: Apple Sign-In requires HTTPS in production

### Development Tips

- Use `AUTH_TRUST_HOST=true` for local development
- Check server logs for detailed error messages
- Verify OAuth provider settings in respective consoles
- Test with different browsers to ensure cross-browser compatibility

## Production Deployment

1. Set up proper HTTPS domain
2. Update OAuth provider settings with production URLs
3. Generate new `AUTH_SECRET` for production
4. Set `AUTH_TRUST_HOST=false` in production (or remove it)
5. Configure proper session storage (database recommended)

## Support

For issues with OAuth setup, consult:
- [Auth.js Documentation](https://authjs.dev/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In Documentation](https://developer.apple.com/documentation/sign_in_with_apple)