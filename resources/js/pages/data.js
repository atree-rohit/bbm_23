import { createApp } from 'vue'
import store from '../store'
import DataComponent from '../components/DataComponent.vue'

const app = createApp({})
app.component('DataComponent', DataComponent)
app.use(store)
app.mount('#app')
