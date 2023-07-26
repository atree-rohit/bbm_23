import { createApp } from 'vue'
import store from '../store'
import ManageUsers from '../components/ManageUsers.vue'

const app = createApp({})
app.component('manage-users', ManageUsers)
app.use(store)
app.mount('#app')
