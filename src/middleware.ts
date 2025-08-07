import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // For static sites, middleware only handles general request processing
  // Authentication is not available on GitHub Pages
  
  return next();
});