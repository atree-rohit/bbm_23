import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import testimonials from './testimonials'
import press_links from './press_links'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        auth,
        testimonials,
        press_links
    }
})

export default store