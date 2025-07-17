import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C3_sFmq4.mjs';
import { manifest } from './manifest_BrZZEcvC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/strategic-plan.astro.mjs');
const _page7 = () => import('./pages/vision.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/dashboard.astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/strategic-plan.astro", _page6],
    ["src/pages/vision.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/runner/work/portal/portal/dist/client/",
    "server": "file:///home/runner/work/portal/portal/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
