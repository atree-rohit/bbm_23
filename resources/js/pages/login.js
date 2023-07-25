import { createApp } from 'vue'
import store from '../store'
import Login from '../components/Login.vue'

const app = createApp({})
app.component('login', Login)
app.use(store)
app.mount('#app')
