/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, l as renderScript, r as renderTemplate } from '../chunks/astro/server_PQjVkaSF.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getSession } from '../chunks/server_D-48n0z3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const session = await getSession(Astro2.request);
  if (session) {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - SPECTRA</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="bg-spectra-smoke text-spectra-ink font-sans"> <!-- Title Bar --> <header class="bg-spectra-blue text-white py-4 px-6"> <div class="max-w-5xl mx-auto flex justify-between items-center"> <div class="flex items-center"> <img src="https://github.com/SPECTRADataSolutions/framework/blob/main/assets/images/spectraLogo.png?raw=true" alt="SPECTRA Logo" class="h-8 mr-3"> <h1 class="text-xl font-bold" style="font-family: 'Poppins', sans-serif;">
SPECTRA
</h1> </div> <nav> <ul class="flex space-x-4"> <li><a href="/" class="hover:underline">Home</a></li> <li><a href="/about" class="hover:underline">About</a></li> <li><a href="/contact" class="hover:underline">Contact</a></li> </ul> </nav> </div> </header> <!-- Login Form --> <section class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <h2 class="mt-6 text-center text-3xl font-extrabold text-spectra-blue">
Sign in to your account
</h2> <p class="mt-2 text-center text-sm text-spectra-ink">
Access your SPECTRA dashboard using your preferred provider
</p> </div> <div class="mt-8 space-y-6"> <div class="space-y-4"> <!-- Google Sign In Button --> <button id="google-signin" class="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#4285f4] hover:bg-[#357ae8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285f4] transition-colors"> <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"> <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path> <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path> <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path> <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path> </svg>
Continue with Google
</button> <!-- Apple Sign In Button --> <button id="apple-signin" class="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"> <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"> <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path> </svg>
Continue with Apple
</button> </div> <div class="text-center"> <p class="text-xs text-gray-500">
By signing in, you agree to our terms of service and privacy policy.
</p> </div> </div> </div> </section> ${renderScript($$result, "/home/runner/work/portal/portal/src/pages/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/portal/portal/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/portal/portal/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
