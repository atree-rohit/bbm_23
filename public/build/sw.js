if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-00efc718.js",revision:null},{url:"assets/about-1463f9dd.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-72afe852.js",revision:null},{url:"assets/butterfly_counts-caa39c8e.css",revision:null},{url:"assets/data-26d8a86e.js",revision:null},{url:"assets/data-d92ce6e7.css",revision:null},{url:"assets/DistrictCoordinators-18a621e4.css",revision:null},{url:"assets/DistrictCoordinators-fd8cc28d.js",revision:null},{url:"assets/FileUploadComponent-33690926.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/Footer-b0b2d7bd.js",revision:null},{url:"assets/home-0dab0171.css",revision:null},{url:"assets/home-d021d032.js",revision:null},{url:"assets/how_to_participate-59029415.js",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/indexRollupNext-fab2b8ab.js",revision:null},{url:"assets/login-4fe97779.js",revision:null},{url:"assets/logout-da290f9c.js",revision:null},{url:"assets/manage_users-d664e6fb.css",revision:null},{url:"assets/manage_users-fe6d5170.js",revision:null},{url:"assets/register-aa597e37.js",revision:null},{url:"assets/resources-188a135f.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/validate_forms-83b0dcbe.js",revision:null},{url:"assets/validate_forms-c785e9c9.css",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
