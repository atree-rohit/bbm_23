if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-96c316a0.js",revision:null},{url:"assets/about-789c9558.css",revision:null},{url:"assets/about-ff6f4317.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-57b81b7c.css",revision:null},{url:"assets/butterfly_counts-c565135f.js",revision:null},{url:"assets/ButterflyAnimation-054a8802.js",revision:null},{url:"assets/ButterflyAnimation-cf431174.css",revision:null},{url:"assets/clean_data-200febf1.css",revision:null},{url:"assets/clean_data-b478f177.js",revision:null},{url:"assets/data-35e3b2be.css",revision:null},{url:"assets/data-6de2870f.js",revision:null},{url:"assets/DistrictCoordinators-2b223196.js",revision:null},{url:"assets/DistrictCoordinators-e197c019.css",revision:null},{url:"assets/FileUploadComponent-aa3b1213.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/Footer-cbcdab19.js",revision:null},{url:"assets/home-2caaf8d2.js",revision:null},{url:"assets/home-55eba9fb.css",revision:null},{url:"assets/how_to_participate-09090a38.css",revision:null},{url:"assets/how_to_participate-75c3e14e.js",revision:null},{url:"assets/indexRollupNext-9c49df81.js",revision:null},{url:"assets/LoadingData-8086f486.js",revision:null},{url:"assets/LoadingData-c5a709cb.css",revision:null},{url:"assets/login-6dfb5dd4.js",revision:null},{url:"assets/logout-09cacb84.js",revision:null},{url:"assets/manage_users-410463d0.css",revision:null},{url:"assets/manage_users-79f6a4d4.js",revision:null},{url:"assets/ModalShowCountForm-43e38911.css",revision:null},{url:"assets/ModalShowCountForm-62f527f1.js",revision:null},{url:"assets/register-3557c3ff.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-a30e638c.js",revision:null},{url:"assets/validate_forms-2c1c88cc.js",revision:null},{url:"assets/validate_forms-9c5f0394.css",revision:null},{url:"assets/viridis-08483685.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
