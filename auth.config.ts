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
      };
      
      // TODO: Replace with actual audit logging implementation
      console.log('Audit Event:', auditEvent);
      
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
      
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      // Configure short-lived tokens
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes (short-lived tokens)
  },
  pages: {
    signIn: '/login',
  },
});