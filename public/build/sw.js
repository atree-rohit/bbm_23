if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-a6d37d24.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/about-bd99e8df.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-1a10dfb7.js",revision:null},{url:"assets/butterfly_counts-57b81b7c.css",revision:null},{url:"assets/ButterflyAnimation-9f175088.js",revision:null},{url:"assets/ButterflyAnimation-cf431174.css",revision:null},{url:"assets/clean_data-200febf1.css",revision:null},{url:"assets/clean_data-235b61ce.js",revision:null},{url:"assets/data-35e3b2be.css",revision:null},{url:"assets/data-bec4c6d1.js",revision:null},{url:"assets/DistrictCoordinators-1e4cbfd1.css",revision:null},{url:"assets/DistrictCoordinators-c3ba5e73.js",revision:null},{url:"assets/FileUploadComponent-298b1199.js",revision:null},{url:"assets/Footer-0e4d1eae.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/home-55eba9fb.css",revision:null},{url:"assets/home-aa0f21e9.js",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/how_to_participate-d893def6.js",revision:null},{url:"assets/indexRollupNext-4bea5dfb.js",revision:null},{url:"assets/LoadingData-36f66e8e.js",revision:null},{url:"assets/LoadingData-c5a709cb.css",revision:null},{url:"assets/login-38a45777.js",revision:null},{url:"assets/logout-9147a673.js",revision:null},{url:"assets/manage_users-410463d0.css",revision:null},{url:"assets/manage_users-ce547f74.js",revision:null},{url:"assets/ModalShowCountForm-43e38911.css",revision:null},{url:"assets/ModalShowCountForm-657cb6e1.js",revision:null},{url:"assets/register-687fc76d.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-4300f8c6.js",revision:null},{url:"assets/validate_forms-9c5f0394.css",revision:null},{url:"assets/validate_forms-a9445f00.js",revision:null},{url:"assets/viridis-bde45e76.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
