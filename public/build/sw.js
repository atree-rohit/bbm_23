if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>l(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-a40c10a7.js",revision:null},{url:"assets/about-306ac913.css",revision:null},{url:"assets/about-a5877aff.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7511b928.css",revision:null},{url:"assets/bootstrap-icons-9f7ec267.css",revision:null},{url:"assets/butterfly_counts-20d23965.js",revision:null},{url:"assets/butterfly_counts-57b81b7c.css",revision:null},{url:"assets/ButterflyAnimation-11504e6b.js",revision:null},{url:"assets/ButterflyAnimation-cf431174.css",revision:null},{url:"assets/clean_data-b3d0b22e.js",revision:null},{url:"assets/clean_data-fb3bd2f5.css",revision:null},{url:"assets/data-03f528fc.js",revision:null},{url:"assets/data-35e3b2be.css",revision:null},{url:"assets/DistrictCoordinators-1e4cbfd1.css",revision:null},{url:"assets/DistrictCoordinators-9f5762d5.js",revision:null},{url:"assets/FileUploadComponent-0ed41fe7.js",revision:null},{url:"assets/Footer-0e05b9a4.js",revision:null},{url:"assets/Footer-534c752b.css",revision:null},{url:"assets/home-319226a7.css",revision:null},{url:"assets/home-68d4fd7c.js",revision:null},{url:"assets/how_to_participate-744dbd19.js",revision:null},{url:"assets/how_to_participate-c4e45082.css",revision:null},{url:"assets/indexRollupNext-217d3cd1.js",revision:null},{url:"assets/LoadingData-c5a709cb.css",revision:null},{url:"assets/LoadingData-e1e754d6.js",revision:null},{url:"assets/login-88e154f4.js",revision:null},{url:"assets/logout-4b7b20fe.js",revision:null},{url:"assets/manage_users-410463d0.css",revision:null},{url:"assets/manage_users-ed8bb8de.js",revision:null},{url:"assets/ModalShowCountForm-43e38911.css",revision:null},{url:"assets/ModalShowCountForm-820dd4c0.js",revision:null},{url:"assets/register-751dc3a8.js",revision:null},{url:"assets/resources-20d7e4d0.css",revision:null},{url:"assets/resources-4d7a2902.js",revision:null},{url:"assets/validate_forms-1272cc37.css",revision:null},{url:"assets/validate_forms-ebf82c97.js",revision:null},{url:"assets/viridis-f479ff60.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"c1b7576d2e357deebcc086e619db4c66"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
