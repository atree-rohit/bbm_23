if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-c93b608b.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/about-cc3147b3.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-0df9ed6f.css",revision:null},{url:"assets/butterfly_counts-dd39beed.js",revision:null},{url:"assets/ButterflyAnimation-cdf4898f.js",revision:null},{url:"assets/ButterflyAnimation-cf431174.css",revision:null},{url:"assets/data-6adbb87e.js",revision:null},{url:"assets/data-ecdc888b.css",revision:null},{url:"assets/DistrictCoordinators-1e4cbfd1.css",revision:null},{url:"assets/DistrictCoordinators-f09675d1.js",revision:null},{url:"assets/FileUploadComponent-81e22930.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/Footer-ce6cc9d1.js",revision:null},{url:"assets/home-02009c76.js",revision:null},{url:"assets/home-0dab0171.css",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/how_to_participate-f6cd7356.js",revision:null},{url:"assets/indexRollupNext-686e6046.js",revision:null},{url:"assets/login-5a526445.js",revision:null},{url:"assets/logout-e023d779.js",revision:null},{url:"assets/manage_users-424d23b5.js",revision:null},{url:"assets/manage_users-85169015.css",revision:null},{url:"assets/ModalShowCountForm-43e38911.css",revision:null},{url:"assets/ModalShowCountForm-c725479b.js",revision:null},{url:"assets/register-0ca72dff.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-81c1683d.js",revision:null},{url:"assets/validate_forms-0e08e278.js",revision:null},{url:"assets/validate_forms-1272cc37.css",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
