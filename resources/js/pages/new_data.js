import { createApp } from 'vue'
import store from '../store'
import NewData from '../components/new/NewData.vue'

const app = createApp({})
app.component('NewData', NewData)
app.use(store)
app.mount('#app')
