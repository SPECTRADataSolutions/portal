# SPECTRA Portal

Official website for SPECTRA — Modular AI-powered data pipelines for Microsoft Fabric.

## Features

### 🔐 Authentication System
- **Google OAuth Integration**: Sign in with Google accounts via OpenID Connect
- **Apple Sign-In**: Secure authentication with Apple ID (Apple approved)
- **Auto User Creation**: Automatically creates user records on first login
- **Session Management**: Secure short-lived JWT tokens (30 minutes)
- **Audit Logging**: Comprehensive logging of all authentication events
- **Protected Routes**: Middleware-based route protection

### 🎨 User Experience
- **Responsive Design**: Mobile-first responsive layout
- **Clean UI**: Branded login page with OAuth provider buttons
- **Dashboard**: Protected dashboard for authenticated users
- **Navigation**: Context-aware navigation based on auth state

### 🛡️ Security Features
- **Short-lived Sessions**: 30-minute token expiration
- **Secure Redirects**: Proper redirect handling for auth flows
- **CSRF Protection**: Built-in CSRF protection via auth-astro
- **Environment Variables**: Secure credential management
- **Audit Trail**: Complete audit logging for compliance

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure OAuth providers**:
   - Copy `.env.example` to `.env`
   - Set up Google OAuth credentials
   - Set up Apple Sign-In credentials
   - See [OAuth Setup Guide](./OAUTH_SETUP.md) for detailed instructions

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Visit the application**:
   - Home page: `http://localhost:4321`
   - Login page: `http://localhost:4321/login`
   - Dashboard: `http://localhost:4321/dashboard` (requires authentication)

## Project Structure

```
src/
├── middleware.ts          # Authentication middleware
├── pages/
│   ├── index.astro       # Home page with auth-aware navigation
│   ├── login.astro       # Login page with OAuth buttons
│   ├── dashboard.astro   # Protected dashboard page
│   ├── about.astro       # About page
│   ├── contact.astro     # Contact page
│   └── vision.astro      # Vision page
├── components/
│   ├── heroSection.astro # Hero section component
│   └── featureList.astro # Feature list component
└── styles/
    └── spectra.colors.js # Color scheme configuration

auth.config.ts            # Authentication configuration
astro.config.mjs          # Astro configuration
```

## Authentication Flow

1. **Unauthenticated User**: 
   - Visits any page → Can access public pages
   - Tries to access `/dashboard` → Redirected to `/login`

2. **Login Process**:
   - User clicks OAuth provider button → Redirected to provider
   - User authenticates with provider → Redirected back to application
   - Application validates token → Creates/updates user record
   - User redirected to dashboard

3. **Authenticated User**:
   - Can access all pages including protected `/dashboard`
   - Session expires after 30 minutes
   - Can sign out at any time

## Configuration

### Environment Variables

```env
# Authentication
AUTH_SECRET=your-generated-secret-key
AUTH_TRUST_HOST=true

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple Sign-In
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret
```

### OAuth Provider Setup

See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for detailed instructions on:
- Setting up Google OAuth
- Configuring Apple Sign-In
- Development vs production configuration

## Development Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Technology Stack

- **Framework**: Astro 5.x with SSR
- **Authentication**: Auth.js (NextAuth) via auth-astro
- **Styling**: Tailwind CSS
- **Runtime**: Node.js (standalone mode)
- **Session Storage**: Filesystem (development) / Database (production)

## Compliance & Security

### Acceptance Criteria Met ✅

- ✅ **Google OAuth via OpenID Connect**: Implemented with @auth/core Google provider
- ✅ **Apple Sign-In approved by Apple**: Configured with Apple provider
- ✅ **Auto-create user record on first login**: Handled in signIn callback
- ✅ **Redirect return users to dashboard**: Implemented in middleware and pages
- ✅ **Secure short-lived session tokens**: 30-minute JWT tokens
- ✅ **Log all auth events to audit trail**: Comprehensive logging system

### Security Features

- JWT-based sessions with 30-minute expiration
- Secure environment variable management
- CSRF protection via auth-astro
- Secure redirect handling
- Comprehensive audit logging
- Protected route middleware

## Deployment

For production deployment:

1. Set up proper HTTPS domain
2. Configure OAuth providers with production URLs
3. Update environment variables for production
4. Consider database-backed session storage
5. Set up proper logging infrastructure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test authentication flows
5. Submit a pull request

## Support

For OAuth setup issues, consult:
- [Auth.js Documentation](https://authjs.dev/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In Documentation](https://developer.apple.com/documentation/sign_in_with_apple)