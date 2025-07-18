/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, l as renderScript, n as renderComponent, r as renderTemplate, h as addAttribute, o as Fragment } from '../chunks/astro/server_C7ncb0ib.mjs';
import 'kleur/colors';
import { g as getSession } from '../chunks/server_D-48n0z3.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SPECTRA | Modular AI-Powered Pipelines</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="bg-spectra-smoke text-spectra-ink font-sans" data-astro-cid-j7pv25f6> <!-- Title Bar --> <header class="bg-spectra-blue text-white py-4 px-6" data-astro-cid-j7pv25f6> <div class="max-w-5xl mx-auto flex justify-between items-center" data-astro-cid-j7pv25f6> <div class="flex items-center" data-astro-cid-j7pv25f6> <img src="https://github.com/SPECTRADataSolutions/framework/blob/main/assets/images/spectraLogo.png?raw=true" alt="SPECTRA Logo" class="h-8 mr-3" data-astro-cid-j7pv25f6> <h1 class="text-xl font-bold" style="font-family: 'Poppins', sans-serif;" data-astro-cid-j7pv25f6>
SPECTRA
</h1> </div> <nav data-astro-cid-j7pv25f6> <ul class="flex space-x-6 items-center" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <a href="#about" class="nav-link hover:text-spectra-gold transition-colors" data-astro-cid-j7pv25f6>About Us</a> </li> <li data-astro-cid-j7pv25f6> <a href="#what-we-do" class="nav-link hover:text-spectra-gold transition-colors" data-astro-cid-j7pv25f6>What We Do</a> </li> <li data-astro-cid-j7pv25f6> <a href="#framework" class="nav-link hover:text-spectra-gold transition-colors" data-astro-cid-j7pv25f6>Framework</a> </li> <li data-astro-cid-j7pv25f6> <a href="#contact" class="nav-link hover:text-spectra-gold transition-colors" data-astro-cid-j7pv25f6>Contact</a> </li> ${session ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <li data-astro-cid-j7pv25f6> <a href="/dashboard" class="hover:underline" data-astro-cid-j7pv25f6>
Dashboard
</a> </li> <li class="flex items-center space-x-2" data-astro-cid-j7pv25f6> <img${addAttribute(session.user?.image || "/default-avatar.png", "src")} alt="User Avatar" class="w-6 h-6 rounded-full" data-astro-cid-j7pv25f6> <span class="text-sm" data-astro-cid-j7pv25f6> ${session.user?.name || session.user?.email} </span> </li> <li data-astro-cid-j7pv25f6> <a href="/api/auth/signout" class="px-3 py-1 bg-spectra-orange hover:bg-spectra-gold text-spectra-ink rounded text-sm font-medium transition-colors" data-astro-cid-j7pv25f6>
Sign Out
</a> </li> ` })}` : renderTemplate`<li data-astro-cid-j7pv25f6> <a href="/login" class="px-3 py-1 bg-spectra-orange hover:bg-spectra-gold text-spectra-ink rounded text-sm font-medium transition-colors" data-astro-cid-j7pv25f6>
Sign In
</a> </li>`} </ul> </nav> </div> </header> <!-- Hero Section --> <section class="bg-spectra-dark text-spectra-cloud py-20 px-6 text-center" data-astro-cid-j7pv25f6> <img src="https://github.com/SPECTRADataSolutions/framework/blob/main/assets/images/spectraLogo.png?raw=true" alt="SPECTRA Logo" class="mx-auto mb-4 h-20" data-astro-cid-j7pv25f6> <h1 class="text-6xl font-bold tracking-tight" style="font-family: 'Poppins', sans-serif;" data-astro-cid-j7pv25f6>
SPECTRA
</h1> <p class="text-xl mt-4" data-astro-cid-j7pv25f6>
Modular AI-powered data pipelines for Microsoft Fabric
</p> </section> <!-- About SPECTRA --> <section id="about" class="py-20 px-6 bg-spectra-smoke" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-spectra-blue mb-6" data-astro-cid-j7pv25f6>
About SPECTRA
</h2> <div class="text-lg text-spectra-ink leading-relaxed space-y-4" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
SPECTRA Data Solutions is pioneering the future of data automation
            through our modular AI-powered pipeline platform. We're on a mission
            to democratize enterprise-grade data capabilities, making
            sophisticated data processing accessible to organizations of every
            size.
</p> <p data-astro-cid-j7pv25f6>
Our goal is to eliminate the complexity and cost barriers that have
            traditionally prevented businesses from harnessing the full
            potential of their data. By providing intelligent, automated data
            pipelines that integrate seamlessly with Microsoft Fabric, we're
            empowering organizations to focus on insights rather than
            infrastructure.
</p> <p data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>For small businesses:</strong> We offer affordable, plug-and-play
            solutions that provide enterprise-level data capabilities without the
            enterprise-level complexity or cost. Get started quickly with pre-built
            connectors and automated workflows that scale with your growth.
</p> <p data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>For large enterprises:</strong> We deliver comprehensive, scalable
            data architecture that handles complex multi-source integrations, advanced
            governance requirements, and enterprise-grade security while reducing
            operational overhead and time-to-insight.
</p> </div> </div> </section> <!-- Trusted By --> <section class="bg-spectra-cloud py-10 px-6 text-center" data-astro-cid-j7pv25f6> <p class="uppercase text-sm tracking-wide text-spectra-blue mb-4" data-astro-cid-j7pv25f6>
Trusted by
</p> <div class="flex justify-center gap-12 grayscale opacity-80" data-astro-cid-j7pv25f6> <img src="/logos/dxc.svg" alt="DXC" class="h-10" data-astro-cid-j7pv25f6> <img src="/logos/velonetic.svg" alt="Velonetic" class="h-10" data-astro-cid-j7pv25f6> <img src="/logos/lloyds.svg" alt="Lloyds of London" class="h-10" data-astro-cid-j7pv25f6> </div> </section> <!-- What We Do --> <section id="what-we-do" class="py-20 px-6 bg-spectra-cloud" data-astro-cid-j7pv25f6> <div class="max-w-5xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-spectra-blue mb-4" data-astro-cid-j7pv25f6>
What We Do
</h2> <p class="text-lg text-spectra-ink mb-8" data-astro-cid-j7pv25f6>
The SPECTRA Engine is designed to automate every stage of your data lifecycle.
</p> <div class="flex flex-wrap justify-center gap-4 text-left" data-astro-cid-j7pv25f6> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Source</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Secure connection to any API, app or source system.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Prepare</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Ingest, checkpoint and validate control tables.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Extract</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Smart extract logic with schema awareness and paging.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Clean</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Flatten, restructure, rename and timestamp.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Transform</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Model-ready formats for semantic layers and BI tooling.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Refine</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Optimise for cost, scale, performance and storage class.
</p> </div> <div class="bg-white p-2 rounded shadow w-40" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-sm" data-astro-cid-j7pv25f6>Analyse</h3> <p class="text-xs mt-1" data-astro-cid-j7pv25f6>
Power BI, Fabric, semantic KPIs and AI triggers.
</p> </div> </div> </div> </section> <!-- Framework --> <section id="framework" class="py-20 px-6 bg-spectra-smoke" data-astro-cid-j7pv25f6> <div class="max-w-5xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-spectra-blue mb-4" data-astro-cid-j7pv25f6>
Framework
</h2> <p class="text-lg text-spectra-ink mb-8" data-astro-cid-j7pv25f6>
Our modular framework provides the foundation for scalable data solutions.
</p> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left" data-astro-cid-j7pv25f6> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>Modular Architecture</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Built with microservices architecture enabling flexible deployment and scaling of individual components.
</p> </div> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>Microsoft Fabric Integration</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Native integration with Microsoft Fabric for seamless data platform experiences.
</p> </div> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>AI-Powered Automation</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Intelligent automation that learns and adapts to optimize data processing workflows.
</p> </div> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>Enterprise Security</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Advanced security features including encryption, access controls, and compliance monitoring.
</p> </div> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>Scalable Performance</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Designed to handle data volumes from small datasets to enterprise-scale processing.
</p> </div> <div class="bg-white p-6 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="font-bold text-spectra-blue text-lg mb-3" data-astro-cid-j7pv25f6>Real-time Processing</h3> <p class="text-sm text-spectra-ink" data-astro-cid-j7pv25f6>
Support for both batch and real-time data processing to meet diverse business needs.
</p> </div> </div> </div> </section> <!-- Explore More --> <section class="py-20 px-6 text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-spectra-blue mb-4" data-astro-cid-j7pv25f6>Explore More</h2> <div class="flex justify-center gap-6" data-astro-cid-j7pv25f6> <a href="/vision" class="px-6 py-3 bg-spectra-blue text-white rounded-lg shadow-md hover:bg-spectra-orange transition" data-astro-cid-j7pv25f6>Our Vision</a> <a href="/strategic-plan" class="px-6 py-3 bg-spectra-blue text-white rounded-lg shadow-md hover:bg-spectra-orange transition" data-astro-cid-j7pv25f6>Strategic Plan</a> </div> </section> <!-- Contact --> <section id="contact" class="py-20 px-6 bg-spectra-cloud" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-spectra-blue mb-6" data-astro-cid-j7pv25f6>
Contact Us
</h2> <p class="text-lg text-spectra-ink mb-8" data-astro-cid-j7pv25f6>
Ready to transform your data infrastructure? Get in touch with our team.
</p> <div class="grid md:grid-cols-2 gap-8" data-astro-cid-j7pv25f6> <div class="bg-white p-8 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="text-xl font-bold text-spectra-blue mb-4" data-astro-cid-j7pv25f6>Get Started</h3> <p class="text-spectra-ink mb-4" data-astro-cid-j7pv25f6>
Schedule a consultation to discuss your data needs and explore how SPECTRA can help.
</p> <a href="/contact" class="inline-block px-6 py-3 bg-spectra-blue text-white rounded-lg shadow-md hover:bg-spectra-orange transition" data-astro-cid-j7pv25f6>
Contact Form
</a> </div> <div class="bg-white p-8 rounded-lg shadow-md" data-astro-cid-j7pv25f6> <h3 class="text-xl font-bold text-spectra-blue mb-4" data-astro-cid-j7pv25f6>Learn More</h3> <p class="text-spectra-ink mb-4" data-astro-cid-j7pv25f6>
Explore our comprehensive documentation and resources to understand our solutions.
</p> <a href="/vision" class="inline-block px-6 py-3 bg-spectra-blue text-white rounded-lg shadow-md hover:bg-spectra-orange transition" data-astro-cid-j7pv25f6>
Our Vision
</a> </div> </div> </div> </section> <!-- CTA Footer --> <section class="bg-spectra-blue text-white py-12 px-6 text-center" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-semibold mb-4" data-astro-cid-j7pv25f6>
Ready to see the SPECTRA effect?
</h2> ${session ? renderTemplate`<a href="/dashboard" class="inline-block px-6 py-3 bg-spectra-gold hover:bg-spectra-orange text-spectra-ink rounded-lg shadow-md transition" data-astro-cid-j7pv25f6>
Go to Dashboard
</a>` : renderTemplate`<a href="/login" class="inline-block px-6 py-3 bg-spectra-gold hover:bg-spectra-orange text-spectra-ink rounded-lg shadow-md transition" data-astro-cid-j7pv25f6>
Sign In to Get Started
</a>`} </section> ${renderScript($$result, "/home/runner/work/portal/portal/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/portal/portal/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/portal/portal/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
