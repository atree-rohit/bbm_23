import { createApp } from 'vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'

const app = createApp({})
app.component('privacy-policy', PrivacyPolicy)
app.mount('#app')
