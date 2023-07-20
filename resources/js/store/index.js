import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import partners from './partners'
import testimonials from './testimonials'
import press_links from './press_links'
import resources from './resources'
import district_coordinators from './district_coordinators'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        auth,
        testimonials,
        partners,
        press_links,
        resources,
        district_coordinators
    }
})

export default store