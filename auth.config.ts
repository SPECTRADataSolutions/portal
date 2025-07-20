import Apple from '@auth/core/providers/apple';
import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

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

  // 👇 Required by Auth.js — inject via environment variable
  secret: process.env.AUTH_SECRET,

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log('Sign in attempt:', { user, account, profile });

      const auditEvent = {
        type: 'SIGN_IN',
        userId: user.id,
        userEmail: user.email,
        provider: account?.provider,
        timestamp: new Date().toISOString(),
        ip: 'dev-environment',
      };

      console.log('Audit Event:', auditEvent);
      return true;
    },
    session: async ({ session, token }) => {
      const auditEvent = {
        type: 'SESSION_CREATED',
        userId: token.sub,
        userEmail: session.user?.email,
        timestamp: new Date().toISOString(),
      };

      console.log('Session Event:', auditEvent);

      if (token.provider) {
        session.user.provider = token.provider;
      }

      return session;
    },
    jwt: async ({ token, account, profile }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;

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
    maxAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});
