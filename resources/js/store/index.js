import { createStore } from 'vuex'
import createSelectivePersistPlugin from './selectivePersist'
import auth from './auth'
import partners from './partners'
import testimonials from './testimonials'
import press_links from './press_links'
import butterfly_counts from './butterfly_counts'
import locations from './locations'
import resources from './resources'
import district_coordinators from './district_coordinators'
import maps from './maps'
import data from './data'
import manage_users from './manage_users'
import logs from './logs'
import count_forms from './count_forms'

const store = createStore({
    plugins: [
        createSelectivePersistPlugin('auth'),
        createSelectivePersistPlugin('butterfly_counts'),
        createSelectivePersistPlugin('count_forms'),
    ],
    modules: {
        auth,
        butterfly_counts,
        count_forms,
        data,
        district_coordinators,
        locations,
        logs,
        manage_users,
        maps,
        partners,
        press_links,
        resources,
        testimonials
    }
})

export default store