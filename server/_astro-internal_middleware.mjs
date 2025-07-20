import { g as getSession } from './chunks/server_CFKQCPYX.mjs';
import { d as defineMiddleware, s as sequence } from './chunks/index_Dm3EoLKV.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_3fVzHS98.mjs';
import 'kleur/colors';
import './chunks/astro/server_C7ncb0ib.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => context.url.pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    const session = await getSession(context.request);
    if (!session) {
      return context.redirect("/login");
    }
    const auditEvent = {
      type: "PROTECTED_ROUTE_ACCESS",
      route: context.url.pathname,
      userId: session.user?.id,
      userEmail: session.user?.email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ip: context.request.headers.get("x-forwarded-for") || context.request.headers.get("x-real-ip") || "unknown"
    };
    console.log("Protected Route Access:", auditEvent);
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
