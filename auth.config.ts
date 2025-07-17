import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';
import Apple from '@auth/core/providers/apple';

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    Apple({
      clientId: import.meta.env.APPLE_CLIENT_ID,
      clientSecret: import.meta.env.APPLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // Auto-create user record on first login
      console.log('Sign in attempt:', { user, account, profile });
      
      // Log auth event to audit trail
      const auditEvent = {
        type: 'SIGN_IN',
        userId: user.id,
        userEmail: user.email,
        provider: account?.provider,
        timestamp: new Date().toISOString(),
        ip: 'dev-environment', // In production, get real IP
      };
      
      // TODO: Replace with actual audit logging implementation
      // This could be sent to a logging service, database, or file
      console.log('Audit Event:', auditEvent);
      
      // Auto-approve all sign-in attempts
      // In production, you might want to add additional checks here
      return true;
    },
    session: async ({ session, token }) => {
      // Log session creation
      const auditEvent = {
        type: 'SESSION_CREATED',
        userId: token.sub,
        userEmail: session.user?.email,
        timestamp: new Date().toISOString(),
      };
      
      console.log('Session Event:', auditEvent);
      
      // Add provider information to session
      if (token.provider) {
        session.user.provider = token.provider;
      }
      
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      // Configure short-lived tokens and store provider info
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        
        // Log token creation
        const auditEvent = {
          type: 'JWT_CREATED',
          provider: account.provider,
          userId: token.sub,
          timestamp: new Date().toISOString(),
        };
        
        console.log('JWT Event:', auditEvent);
      }
      
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes (short-lived tokens as required)
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors back to login page
  },
});