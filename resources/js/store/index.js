import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import partners from './partners'
import testimonials from './testimonials'
import press_links from './press_links'
import butterfly_counts from './butterfly_counts'
import resources from './resources'
import district_coordinators from './district_coordinators'
import maps from './maps'
import data from './data'
import manage_users from './manage_users'
import logs from './logs'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        auth,
        testimonials,
        partners,
        press_links,
        butterfly_counts,
        resources,
        district_coordinators,
        data,
        maps,
        manage_users,
        logs
    }
})

export default store