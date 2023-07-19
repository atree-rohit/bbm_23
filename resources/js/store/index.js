import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import partners from './partners'
import testimonials from './testimonials'
import press_links from './press_links'
import resources from './resources'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        auth,
        testimonials,
        partners,
        press_links,
        resources
    }
})

export default store