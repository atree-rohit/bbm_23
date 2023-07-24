import { createApp } from 'vue'
import store from '../store'
import HowToParticipate from '../components/HowToParticipate.vue'

const app = createApp({})
app.component('how-to-participate', HowToParticipate)
app.use(store)
app.mount('#app')
