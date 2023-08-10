import { createApp } from 'vue'
import store from '../store'
import ButterflyCounts from '../components/ButterflyCounts.vue'

const app = createApp({})
app.component('butterfly-counts', ButterflyCounts)
app.use(store)
app.mount('#app')
