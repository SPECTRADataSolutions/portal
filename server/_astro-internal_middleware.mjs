import { g as getSession } from './chunks/server_D-48n0z3.mjs';
import { d as defineMiddleware, s as sequence } from './chunks/index_-VA3joAj.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_X3tUxz2Z.mjs';
import 'kleur/colors';
import './chunks/astro/server_PQjVkaSF.mjs';
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
