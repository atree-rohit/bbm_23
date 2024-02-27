import { createApp } from 'vue'
import store from '../store'
import SpeciesPages from '../components/new/SpeciesPages.vue'

const app = createApp({})
app.component('SpeciesPages', SpeciesPages)
app.use(store)
app.mount('#app')
