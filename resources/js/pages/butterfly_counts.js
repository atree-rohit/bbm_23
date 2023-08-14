import { createApp } from 'vue'
import store from '../store'
import ButterflyCounts from '../components/ButterflyCounts.vue'

const app = createApp({})
app.component('butterfly-counts', ButterflyCounts)
app.use(store)
app.mount('#app')

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//           console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch(error => {
//           console.error('Service Worker registration failed:', error);
//         });
//     });
//   }
  
