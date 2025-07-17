/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, l as renderScript, r as renderTemplate } from '../chunks/astro/server_C7ncb0ib.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getSession } from '../chunks/server_D-48n0z3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  const auditEvent = {
    type: "DASHBOARD_ACCESS",
    userId: session.user?.id,
    userEmail: session.user?.email,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  console.log("Dashboard Access Event:", auditEvent);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Dashboard - SPECTRA</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="bg-spectra-smoke text-spectra-ink font-sans"> <!-- Title Bar --> <header class="bg-spectra-blue text-white py-4 px-6"> <div class="max-w-5xl mx-auto flex justify-between items-center"> <div class="flex items-center"> <img src="https://github.com/SPECTRADataSolutions/framework/blob/main/assets/images/spectraLogo.png?raw=true" alt="SPECTRA Logo" class="h-8 mr-3"> <h1 class="text-xl font-bold" style="font-family: 'Poppins', sans-serif;">
SPECTRA Dashboard
</h1> </div> <nav> <ul class="flex space-x-4 items-center"> <li><a href="/" class="hover:underline">Home</a></li> <li><a href="/about" class="hover:underline">About</a></li> <li><a href="/contact" class="hover:underline">Contact</a></li> <li class="flex items-center space-x-2"> <img${addAttribute(session.user?.image || "/default-avatar.png", "src")} alt="User Avatar" class="w-6 h-6 rounded-full"> <span class="text-sm">${session.user?.name || session.user?.email}</span> </li> <li> <button id="sign-out" class="px-3 py-1 bg-spectra-orange hover:bg-spectra-gold text-spectra-ink rounded text-sm font-medium transition-colors">
Sign Out
</button> </li> </ul> </nav> </div> </header> <!-- Welcome Section --> <section class="bg-spectra-dark text-spectra-cloud py-16 px-6 text-center"> <h1 class="text-4xl font-bold mb-4" style="font-family: 'Poppins', sans-serif;">
Welcome, ${session.user?.name || "User"}!
</h1> <p class="text-xl">
You have successfully signed in to your SPECTRA dashboard
</p> </section> <!-- User Information --> <section class="py-12 px-6 bg-spectra-cloud"> <div class="max-w-4xl mx-auto"> <h2 class="text-2xl font-bold text-spectra-blue mb-8">Account Information</h2> <div class="bg-white rounded-lg shadow-md p-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <h3 class="text-lg font-semibold text-spectra-blue mb-2">Profile</h3> <div class="space-y-2"> <p><strong>Name:</strong> ${session.user?.name || "Not provided"}</p> <p><strong>Email:</strong> ${session.user?.email || "Not provided"}</p> <p><strong>Provider:</strong> ${session.user?.provider || "OAuth"}</p> </div> </div> <div> <h3 class="text-lg font-semibold text-spectra-blue mb-2">Session</h3> <div class="space-y-2"> <p><strong>Status:</strong> <span class="text-green-600">Active</span></p> <p><strong>Signed in:</strong> ${new Date(session.expires).toLocaleString()}</p> <p><strong>Session expires:</strong> ${new Date(session.expires).toLocaleString()}</p> </div> </div> </div> </div> </div> </section> <!-- Quick Actions --> <section class="py-12 px-6"> <div class="max-w-4xl mx-auto"> <h2 class="text-2xl font-bold text-spectra-blue mb-8">Quick Actions</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="bg-white rounded-lg shadow-md p-6 text-center"> <h3 class="text-lg font-semibold text-spectra-blue mb-2">Data Pipelines</h3> <p class="text-sm text-gray-600 mb-4">Create and manage your data pipelines</p> <button class="px-4 py-2 bg-spectra-blue text-white rounded hover:bg-spectra-orange transition-colors">
View Pipelines
</button> </div> <div class="bg-white rounded-lg shadow-md p-6 text-center"> <h3 class="text-lg font-semibold text-spectra-blue mb-2">Data Sources</h3> <p class="text-sm text-gray-600 mb-4">Connect to your data sources</p> <button class="px-4 py-2 bg-spectra-blue text-white rounded hover:bg-spectra-orange transition-colors">
Manage Sources
</button> </div> <div class="bg-white rounded-lg shadow-md p-6 text-center"> <h3 class="text-lg font-semibold text-spectra-blue mb-2">Analytics</h3> <p class="text-sm text-gray-600 mb-4">View your data analytics</p> <button class="px-4 py-2 bg-spectra-blue text-white rounded hover:bg-spectra-orange transition-colors">
View Analytics
</button> </div> </div> </div> </section> ${renderScript($$result, "/home/runner/work/portal/portal/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/portal/portal/src/pages/dashboard.astro", void 0);

const $$file = "/home/runner/work/portal/portal/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
