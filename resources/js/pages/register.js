import { createApp } from 'vue'
import store from '../store'
import Register from '../components/Register.vue'

const app = createApp({})
app.component('register', Register)
app.use(store)
app.mount('#app')
