if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>l(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(r.map((s=>o[s]||u(s)))).then((s=>(i(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-6b89c5ea.js",revision:null},{url:"assets/about-a16d7000.js",revision:null},{url:"assets/about-abb5dea8.css",revision:null},{url:"assets/app-4ed993c7.js",revision:null},{url:"assets/app-7a30ea22.css",revision:null},{url:"assets/butterfly_counts-00683445.css",revision:null},{url:"assets/butterfly_counts-04d6940e.js",revision:null},{url:"assets/CountFormRow-a0ab33bf.js",revision:null},{url:"assets/CountFormRow-cf5893cd.css",revision:null},{url:"assets/data-6690a3df.css",revision:null},{url:"assets/data-669fc550.js",revision:null},{url:"assets/DistrictCoordinators-14a2829c.js",revision:null},{url:"assets/DistrictCoordinators-fb376630.css",revision:null},{url:"assets/districts-fe2f3589.js",revision:null},{url:"assets/FileUploadComponent-0ff7ac94.js",revision:null},{url:"assets/home-798bcdc5.css",revision:null},{url:"assets/home-bf664f1a.js",revision:null},{url:"assets/how_to_participate-231c134f.css",revision:null},{url:"assets/how_to_participate-33d13187.js",revision:null},{url:"assets/indexRollupNext-a8d9ae7e.js",revision:null},{url:"assets/login-16ef5644.js",revision:null},{url:"assets/logout-32b20211.js",revision:null},{url:"assets/manage_users-39de940c.js",revision:null},{url:"assets/manage_users-d664e6fb.css",revision:null},{url:"assets/Partners-12477cc9.js",revision:null},{url:"assets/Partners-dc2033b8.css",revision:null},{url:"assets/register-9f8f9b32.js",revision:null},{url:"assets/resources-b6fb3534.css",revision:null},{url:"assets/resources-e766b8af.js",revision:null},{url:"assets/validate_forms-5eb8a7a1.js",revision:null},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
