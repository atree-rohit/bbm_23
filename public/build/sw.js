if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>l(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(r.map((s=>o[s]||u(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-b0ae1e6c.js",revision:null},{url:"assets/about-abb5dea8.css",revision:null},{url:"assets/about-c90b640b.js",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7a30ea22.css",revision:null},{url:"assets/butterfly_counts-4326f4f5.css",revision:null},{url:"assets/butterfly_counts-696970eb.js",revision:null},{url:"assets/data-2923b24e.css",revision:null},{url:"assets/data-e8e39a93.js",revision:null},{url:"assets/DistrictCoordinators-d0b42ea7.js",revision:null},{url:"assets/DistrictCoordinators-fb376630.css",revision:null},{url:"assets/districts-fe2f3589.js",revision:null},{url:"assets/FileUploadComponent-2813424f.js",revision:null},{url:"assets/home-49240297.js",revision:null},{url:"assets/home-5a3eebe1.css",revision:null},{url:"assets/how_to_participate-231c134f.css",revision:null},{url:"assets/how_to_participate-97c0da90.js",revision:null},{url:"assets/indexRollupNext-cfd1a63d.js",revision:null},{url:"assets/login-5ad8963b.js",revision:null},{url:"assets/logout-6c6d71cb.js",revision:null},{url:"assets/manage_users-7b7334ec.js",revision:null},{url:"assets/manage_users-d664e6fb.css",revision:null},{url:"assets/Partners-24fe185b.js",revision:null},{url:"assets/Partners-cf927c98.css",revision:null},{url:"assets/register-1171cb1b.js",revision:null},{url:"assets/resources-0e54beb7.css",revision:null},{url:"assets/resources-d13147a6.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"3030a02cfa1600410fd4285653b8e2c4"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
