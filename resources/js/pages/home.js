import { createApp } from 'vue'
import store from '../store'
import Home from '../components/Home.vue'

const app = createApp({});
app.component('home', Home);
app.use(store);
app.mount('#app');