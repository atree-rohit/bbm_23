if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-a532bba2.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/about-4183ab49.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-c7770342.js",revision:null},{url:"assets/butterfly_counts-caa39c8e.css",revision:null},{url:"assets/data-d92ce6e7.css",revision:null},{url:"assets/data-f4866ecf.js",revision:null},{url:"assets/DistrictCoordinators-2d555ac3.js",revision:null},{url:"assets/DistrictCoordinators-e39f5ee3.css",revision:null},{url:"assets/FileUploadComponent-9aef82c8.js",revision:null},{url:"assets/Footer-13ca0e0d.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/home-5f94fd43.css",revision:null},{url:"assets/home-cf58313c.js",revision:null},{url:"assets/how_to_participate-58287a52.js",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/indexRollupNext-2e814360.js",revision:null},{url:"assets/login-8469afc5.js",revision:null},{url:"assets/logout-721cbda1.js",revision:null},{url:"assets/manage_users-8aeae6bc.js",revision:null},{url:"assets/manage_users-d664e6fb.css",revision:null},{url:"assets/register-97c3fe5f.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-3b8c8822.js",revision:null},{url:"assets/validate_forms-c5bb428e.js",revision:null},{url:"assets/validate_forms-c785e9c9.css",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));