if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-47d1f91b.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/about-66ad26f3.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-bed8ec06.js",revision:null},{url:"assets/butterfly_counts-cff8ffc7.css",revision:null},{url:"assets/ButterflyAnimation-02a962f3.js",revision:null},{url:"assets/ButterflyAnimation-cf431174.css",revision:null},{url:"assets/data-35e3b2be.css",revision:null},{url:"assets/data-77bc787b.js",revision:null},{url:"assets/DistrictCoordinators-1e4cbfd1.css",revision:null},{url:"assets/DistrictCoordinators-da8241d2.js",revision:null},{url:"assets/FileUploadComponent-a6b688f0.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/Footer-ddc0a768.js",revision:null},{url:"assets/home-0dab0171.css",revision:null},{url:"assets/home-1416102e.js",revision:null},{url:"assets/how_to_participate-a0ae4bbe.js",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/indexRollupNext-49f68658.js",revision:null},{url:"assets/LoadingData-8953a7be.css",revision:null},{url:"assets/LoadingData-99164c04.js",revision:null},{url:"assets/login-8aa605fe.js",revision:null},{url:"assets/logout-948c6eb7.js",revision:null},{url:"assets/manage_users-1900d810.js",revision:null},{url:"assets/manage_users-e7ef57fc.css",revision:null},{url:"assets/ModalShowCountForm-43e38911.css",revision:null},{url:"assets/ModalShowCountForm-922db5c4.js",revision:null},{url:"assets/register-a116b04c.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-d7b1ba21.js",revision:null},{url:"assets/validate_forms-1272cc37.css",revision:null},{url:"assets/validate_forms-7a0f4add.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
