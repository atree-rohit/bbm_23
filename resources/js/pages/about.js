import { createApp } from 'vue'
import store from '../store'
import About from '../components/About.vue'

const app = createApp({})
app.component('about', About)
app.use(store)
app.mount('#app')
