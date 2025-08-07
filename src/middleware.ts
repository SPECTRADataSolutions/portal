// Temporarily disabled for static generation
// import { getSession } from 'auth-astro/server';
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Auth middleware temporarily disabled for static generation
  // Protected routes that require authentication
  // const protectedRoutes = ['/dashboard'];
  
  // const isProtectedRoute = protectedRoutes.some(route => 
  //   context.url.pathname.startsWith(route)
  // );
  
  // if (isProtectedRoute) {
  //   const session = await getSession(context.request);
    
  //   if (!session) {
  //     // Redirect to login page if not authenticated
  //     return context.redirect('/login');
  //   }
    
  //   // Log access to protected route
  //   const auditEvent = {
  //     type: 'PROTECTED_ROUTE_ACCESS',
  //     route: context.url.pathname,
  //     userId: session.user?.id,
  //     userEmail: session.user?.email,
  //     timestamp: new Date().toISOString(),
  //     ip: context.request.headers.get('x-forwarded-for') || 
  //         context.request.headers.get('x-real-ip') || 
  //         'unknown'
  //   };
    
  //   // TODO: Replace with actual audit logging implementation
  //   console.log('Protected Route Access:', auditEvent);
  // }
  
  return next();
});