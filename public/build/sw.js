if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>l(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(r.map((s=>o[s]||u(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-d6d83bcb.js",revision:null},{url:"assets/about-7bffcdbb.js",revision:null},{url:"assets/about-abb5dea8.css",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7a30ea22.css",revision:null},{url:"assets/butterfly_counts-c07646e5.css",revision:null},{url:"assets/butterfly_counts-cb33f805.js",revision:null},{url:"assets/data-6690a3df.css",revision:null},{url:"assets/data-8a71a3ac.js",revision:null},{url:"assets/DistrictCoordinators-c83a13f7.js",revision:null},{url:"assets/DistrictCoordinators-fb376630.css",revision:null},{url:"assets/districts-fe2f3589.js",revision:null},{url:"assets/FileUploadComponent-546ca4b3.js",revision:null},{url:"assets/home-5a3eebe1.css",revision:null},{url:"assets/home-90f3fd6b.js",revision:null},{url:"assets/how_to_participate-231c134f.css",revision:null},{url:"assets/how_to_participate-40ee1a71.js",revision:null},{url:"assets/indexRollupNext-aa4eddde.js",revision:null},{url:"assets/login-c49fd7c6.js",revision:null},{url:"assets/logout-92fe97f6.js",revision:null},{url:"assets/manage_users-35c2555d.js",revision:null},{url:"assets/manage_users-d664e6fb.css",revision:null},{url:"assets/Partners-3d6e8364.js",revision:null},{url:"assets/Partners-986efcdf.css",revision:null},{url:"assets/register-7c1e0bfd.js",revision:null},{url:"assets/resources-0e54beb7.css",revision:null},{url:"assets/resources-4a40ee87.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"3030a02cfa1600410fd4285653b8e2c4"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
