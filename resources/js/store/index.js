import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import partners from './partners'
import testimonials from './testimonials'
import press_links from './press_links'
import resources from './resources'
import district_coordinators from './district_coordinators'
import maps from './maps'
import data from './data'
import manage_users from './manage_users'

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
        district_coordinators,
        data,
        maps,
        manage_users
    }
})

export default store