import { createApp } from 'vue'
import store from '../store'
import Resources from '../components/Resources.vue'

const app = createApp({})
app.component('resources', Resources)
app.use(store)
app.mount('#app')
