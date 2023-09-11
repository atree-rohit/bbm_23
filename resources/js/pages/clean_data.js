import { createApp } from 'vue'
import store from '../store'
import CleanData from '../components/CleanData.vue'

const app = createApp({})
app.component('clean-data', CleanData)
app.use(store)
app.mount('#app')
