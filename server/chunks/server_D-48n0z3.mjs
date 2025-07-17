import { Auth } from '@auth/core';
import { parseString } from 'set-cookie-parser';
import Google from '@auth/core/providers/google';
import Apple from '@auth/core/providers/apple';

const defineConfig = (config) => {
  config.prefix ??= "/api/auth";
  config.basePath = config.prefix;
  return config;
};

const authConfig = defineConfig({
  providers: [
    Google({
      clientId: undefined                                ,
      clientSecret: undefined                                    
    }),
    Apple({
      clientId: undefined                               ,
      clientSecret: undefined                                   
    })
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log("Sign in attempt:", { user, account, profile });
      const auditEvent = {
        type: "SIGN_IN",
        userId: user.id,
        userEmail: user.email,
        provider: account?.provider,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ip: "dev-environment"
        // In production, get real IP
      };
      console.log("Audit Event:", auditEvent);
      return true;
    },
    session: async ({ session, token }) => {
      const auditEvent = {
        type: "SESSION_CREATED",
        userId: token.sub,
        userEmail: session.user?.email,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("Session Event:", auditEvent);
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
          type: "JWT_CREATED",
          provider: account.provider,
          userId: token.sub,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        console.log("JWT Event:", auditEvent);
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60
    // 30 minutes (short-lived tokens as required)
  },
  pages: {
    signIn: "/login",
    error: "/login"
    // Redirect errors back to login page
  }
});

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      const getSetCookie = res.headers.getSetCookie();
      if (getSetCookie.length > 0) {
        getSetCookie.forEach((cookie) => {
          const { name, value, ...options2 } = parseString(cookie);
          cookies.set(name, value, options2);
        });
        res.headers.delete("Set-Cookie");
      }
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign(__vite_import_meta_env__, { _: process.env._, NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV });
  options.secret ??= AUTH_SECRET;
  options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ??= Object.assign(__vite_import_meta_env__, { _: process.env._, NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV }).AUTH_SECRET;
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

export { AstroAuth as A, getSession as g };
