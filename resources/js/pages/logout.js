import { createApp } from 'vue'
import store from '../store'
import Logout from '../components/Logout.vue'

const app = createApp({})
app.component('logout', Logout)
app.use(store)
app.mount('#app')
