import { createApp } from 'vue'
import store from '../store'
import ValidateForms from '../components/ValidateForms.vue'

const app = createApp({})
app.component('ValidateForms', ValidateForms)
app.use(store)
app.mount('#app')
