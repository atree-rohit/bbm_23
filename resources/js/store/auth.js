import axios from "axios"

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value){
            state.authenticated = value
        },
        SET_USER(state, value){
            state.user = value
        }
    },
    actions: {
        async login({commit}){
            try {
                const { data } = await axios.get('/api/user')
                commit('SET_USER', data)
                commit('SET_AUTHENTICATED', true)
                window.location.href = window.location.origin
            } catch ({ response: { data: data_1 } }) {
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            }
        },
        async logout({commit}){
            try {
                const { data } = await axios.get('/api/logout')
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
                window.location.href = window.location.origin
            } catch ({ response: { data: data_1 } }) {
                console.log("error logging out")
            }
        }
    }
}